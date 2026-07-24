import { useMemo, useState } from 'react'
import { MEMORY_STAGES, SUBJECTS, subjectById, type SubjectId } from '../data/config'
import { useStore, type Note } from '../lib/store'
import { prettyDate, fromDayId, type DayId } from '../lib/date'

/** 노트 목록 — 과목 필터 + 검색, 날짜별로 묶어서 보여준다. */
export default function NoteList({ onOpen, onNew }: { onOpen: (n: Note) => void; onNew: () => void }) {
  const notes = useStore((s) => s.notes)
  const [filter, setFilter] = useState<SubjectId | 'all'>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return notes.filter((n) => {
      if (filter !== 'all' && n.subject !== filter) return false
      if (!q) return true
      return (
        n.title.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q) ||
        n.keyPoint.toLowerCase().includes(q)
      )
    })
  }, [notes, filter, query])

  // 날짜별 그룹 (최신 날짜 먼저)
  const groups = useMemo(() => {
    const map = new Map<DayId, Note[]>()
    for (const n of filtered) {
      const arr = map.get(n.createdAt) ?? []
      arr.push(n)
      map.set(n.createdAt, arr)
    }
    return [...map.entries()].sort((a, b) => (a[0] < b[0] ? 1 : -1))
  }, [filtered])

  return (
    <div className="note-list">
      <div className="list-head">
        <h1>복습 노트</h1>
        <button className="new-btn" onClick={onNew}>
          ＋ 새 노트
        </button>
      </div>

      <input
        className="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="🔍 노트 검색 (제목·내용)"
      />

      <div className="subj-filter">
        <button className={`fchip ${filter === 'all' ? 'on' : ''}`} onClick={() => setFilter('all')}>
          전체 {notes.length}
        </button>
        {SUBJECTS.map((s) => {
          const count = notes.filter((n) => n.subject === s.id).length
          return (
            <button
              key={s.id}
              className={`fchip ${filter === s.id ? 'on' : ''}`}
              style={filter === s.id ? { background: s.accent, borderColor: s.accent, color: '#fff' } : undefined}
              onClick={() => setFilter(s.id)}
            >
              {s.emoji} {s.name} {count}
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="empty">
          <div className="empty-emoji">📒</div>
          <p>{notes.length === 0 ? '아직 노트가 없어요.\n오늘 배운 걸 복습하며 첫 노트를 써볼까요?' : '검색 결과가 없어요.'}</p>
          {notes.length === 0 && (
            <button className="new-btn big" onClick={onNew}>
              ＋ 첫 노트 쓰기
            </button>
          )}
        </div>
      ) : (
        groups.map(([date, dayNotes]) => (
          <div key={date} className="date-group">
            <div className="date-label">
              📅 {prettyDate(date)}{' '}
              <span className="date-full">
                {fromDayId(date).getFullYear()}. {fromDayId(date).getMonth() + 1}. {fromDayId(date).getDate()}.
              </span>
            </div>
            <div className="cards">
              {dayNotes.map((n) => {
                const s = subjectById(n.subject)
                const stage = MEMORY_STAGES[n.stage]
                return (
                  <button key={n.id} className="note-card" style={{ borderLeftColor: s.accent }} onClick={() => onOpen(n)}>
                    <div className="nc-top">
                      <span className="nc-subj" style={{ color: s.accent }}>
                        {s.emoji} {s.name}
                      </span>
                      <span className="nc-tree" title={stage.label}>
                        {stage.emoji}
                      </span>
                    </div>
                    <span className="nc-title">{n.title}</span>
                    {n.summary && <span className="nc-sum">{n.summary}</span>}
                  </button>
                )
              })}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
