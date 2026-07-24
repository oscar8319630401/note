import { useMemo } from 'react'
import { BADGES, MEMORY_STAGES, SUBJECTS } from '../data/config'
import { useStore } from '../lib/store'
import { evaluateBadges, streak } from '../lib/selectors'
import { todayId, addDays } from '../lib/date'

/** 수집·성취 화면 — 스트릭, 배지, 과목별 스티커(노트 수), 기억 나무 현황 */
export default function Collection() {
  const notes = useStore((s) => s.notes)
  const stats = useStore((s) => s.stats)
  const resetAll = useStore((s) => s.resetAll)

  const earned = useMemo(() => new Set(evaluateBadges(notes, stats)), [notes, stats])
  const st = streak(stats)

  // 오늘·이번 주 공부 시간(분)
  const todayMin = Math.round((stats.studySec[todayId()] ?? 0) / 60)
  const weekMin = useMemo(() => {
    let sec = 0
    for (let i = 0; i < 7; i++) sec += stats.studySec[addDays(todayId(), -i)] ?? 0
    return Math.round(sec / 60)
  }, [stats.studySec])

  // 과목별 노트 수 = 스티커 개수
  const bySubject = SUBJECTS.map((s) => ({ ...s, count: notes.filter((n) => n.subject === s.id).length }))
  // 기억 나무 단계별 분포
  const stageDist = MEMORY_STAGES.map((stg, i) => ({ ...stg, count: notes.filter((n) => n.stage === i).length }))

  return (
    <div className="collection">
      <h1>나의 성취 🏆</h1>

      <div className="stat-tiles">
        <div className="stat-tile">
          <span className="st-num">🔥 {st}</span>
          <span className="st-label">연속 기록</span>
        </div>
        <div className="stat-tile">
          <span className="st-num">📚 {notes.length}</span>
          <span className="st-label">쓴 노트</span>
        </div>
        <div className="stat-tile">
          <span className="st-num">🔁 {stats.reviewTotal}</span>
          <span className="st-label">복습 횟수</span>
        </div>
        <div className="stat-tile">
          <span className="st-num">🧠 {stats.quizCorrect}</span>
          <span className="st-label">퀴즈 정답</span>
        </div>
      </div>

      <section className="panel study-panel">
        <h2>⏱️ 공부 시간</h2>
        <div className="study-times">
          <div className="study-time">
            <span className="stm-num">{todayMin}<span className="stm-unit">분</span></span>
            <span className="stm-label">오늘</span>
          </div>
          <div className="study-time">
            <span className="stm-num">
              {weekMin >= 60 ? `${Math.floor(weekMin / 60)}시간 ${weekMin % 60}` : weekMin}
              <span className="stm-unit">분</span>
            </span>
            <span className="stm-label">이번 주</span>
          </div>
        </div>
        <p className="muted">복습 탭의 '공부 시작' 버튼으로 시간을 재요</p>
      </section>

      <section className="panel">
        <h2>과목 스티커</h2>
        <p className="muted">노트를 쓸 때마다 스티커가 쌓여요</p>
        <div className="sticker-row">
          {bySubject.map((s) => (
            <div key={s.id} className="sticker" style={{ background: s.soft }}>
              <span className="sticker-emoji">{s.emoji}</span>
              <span className="sticker-name">{s.name}</span>
              <span className="sticker-count" style={{ color: s.accent }}>
                {s.count}장
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>기억 나무 숲 🌳</h2>
        <p className="muted">복습할수록 노트가 자라요</p>
        <div className="tree-dist">
          {stageDist.map((stg) => (
            <div key={stg.label} className="tree-col">
              <span className="tree-big">{stg.emoji}</span>
              <span className="tree-n">{stg.count}</span>
              <span className="tree-lab">{stg.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>배지 ({earned.size}/{BADGES.length})</h2>
        <div className="badge-grid">
          {BADGES.map((b) => {
            const has = earned.has(b.id)
            return (
              <div key={b.id} className={`badge ${has ? 'has' : 'locked'}`}>
                <span className="badge-emoji">{has ? b.emoji : '🔒'}</span>
                <span className="badge-name">{b.name}</span>
                <span className="badge-desc">{b.desc}</span>
              </div>
            )
          })}
        </div>
      </section>

      <button
        className="act danger center-btn"
        onClick={() => confirm('모든 노트와 기록을 지울까요? 되돌릴 수 없어요.') && resetAll()}
      >
        전체 초기화
      </button>
      <p className="app-credit">나의 복습 노트 · 모든 기록은 이 기기에만 저장돼요</p>
    </div>
  )
}
