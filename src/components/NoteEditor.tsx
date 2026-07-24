import { useState } from 'react'
import { SUBJECTS, UNDERSTANDING, CHEERS, type SubjectId } from '../data/config'
import { useStore, type Note, type NewNoteInput } from '../lib/store'
import { todayId, prettyDate } from '../lib/date'
import VoiceField from './VoiceField'

/**
 * 복습 노트 쓰기/고치기.
 * 코넬식 6칸: 제목 · 핵심 · 꼭 기억할 것 · 내가 만든 문제+답 · 어려웠던 것 · 이해도.
 * '내가 만든 문제'는 나중에 퀴즈가 되므로 특별히 강조한다.
 */
export default function NoteEditor({
  edit,
  initial,
  onDone,
}: {
  edit?: Note
  initial?: Partial<NewNoteInput>
  onDone: (savedId?: string) => void
}) {
  const addNote = useStore((s) => s.addNote)
  const updateNote = useStore((s) => s.updateNote)

  const [subject, setSubject] = useState<SubjectId>(edit?.subject ?? initial?.subject ?? 'korean')
  const [title, setTitle] = useState(edit?.title ?? initial?.title ?? '')
  const [summary, setSummary] = useState(edit?.summary ?? initial?.summary ?? '')
  const [keyPoint, setKeyPoint] = useState(edit?.keyPoint ?? initial?.keyPoint ?? '')
  const [question, setQuestion] = useState(edit?.question ?? initial?.question ?? '')
  const [answer, setAnswer] = useState(edit?.answer ?? initial?.answer ?? '')
  const [hard, setHard] = useState(edit?.hard ?? initial?.hard ?? '')
  const [understanding, setUnderstanding] = useState(edit?.understanding ?? initial?.understanding ?? 3)
  const [cheer, setCheer] = useState<string | null>(null)

  const canSave = title.trim().length > 0 && summary.trim().length > 0

  const save = () => {
    if (!canSave) return
    const input: NewNoteInput = { subject, title: title.trim(), summary, keyPoint, question, answer, hard, understanding }
    if (edit) {
      updateNote(edit.id, input)
      onDone(edit.id)
    } else {
      const id = addNote(input)
      setCheer(CHEERS[Math.floor(Math.random() * CHEERS.length)])
      setTimeout(() => onDone(id), 900)
    }
  }

  if (cheer) {
    return (
      <div className="cheer-screen">
        <div className="cheer-emoji">🌱</div>
        <h2>{cheer}</h2>
        <p>씨앗을 심었어요. 내일 다시 복습하면 새싹이 자라요!</p>
      </div>
    )
  }

  return (
    <div className="editor">
      <div className="editor-head">
        <button className="back" onClick={() => onDone()}>
          ‹ 뒤로
        </button>
        <span className="editor-date">📅 {prettyDate(edit?.createdAt ?? todayId())} 저장</span>
      </div>

      <h1>{edit ? '노트 고치기' : '오늘의 복습 노트'}</h1>

      <label className="lab">어떤 과목이야?</label>
      <div className="subj-pick">
        {SUBJECTS.map((s) => (
          <button
            key={s.id}
            className={`subj-chip ${subject === s.id ? 'on' : ''}`}
            style={subject === s.id ? { background: s.accent, borderColor: s.accent, color: '#fff' } : undefined}
            onClick={() => setSubject(s.id)}
          >
            {s.emoji} {s.name}
          </button>
        ))}
      </div>

      <label className="lab">오늘 배운 것 (제목)</label>
      <VoiceField singleLine value={title} onChange={setTitle} placeholder="예: 분수의 덧셈" maxLength={40} />

      <label className="lab">핵심 내용 — 내 말로 정리하기 ✍️</label>
      <p className="hint">그대로 베끼지 말고, 친구에게 설명하듯 내 말로 써보자!</p>
      <VoiceField value={summary} onChange={setSummary} placeholder="오늘 배운 내용을 정리해요" rows={4} />

      <label className="lab">⭐ 꼭 기억할 것</label>
      <VoiceField value={keyPoint} onChange={setKeyPoint} placeholder="가장 중요한 한두 가지" rows={2} />

      <div className="quiz-box">
        <label className="lab hi">✏️ 내가 만든 문제 (나중에 퀴즈로 나와요!)</label>
        <VoiceField singleLine value={question} onChange={setQuestion} placeholder="예: 1/2 + 1/3 은?" maxLength={80} />
        <label className="lab">정답</label>
        <VoiceField singleLine value={answer} onChange={setAnswer} placeholder="예: 5/6" maxLength={80} />
      </div>

      <label className="lab">❓ 어려웠던 것 / 궁금한 것</label>
      <VoiceField value={hard} onChange={setHard} placeholder="헷갈리거나 더 알고 싶은 것 (없으면 비워도 돼)" rows={2} />

      <label className="lab">오늘 이 내용, 얼마나 이해했어?</label>
      <div className="under-row">
        {UNDERSTANDING.map((u) => (
          <button
            key={u.level}
            className={`under ${understanding === u.level ? 'on' : ''}`}
            onClick={() => setUnderstanding(u.level)}
            title={u.label}
          >
            <span className="under-emoji">{u.emoji}</span>
            <span className="under-label">{u.label}</span>
          </button>
        ))}
      </div>

      <button className="save-btn" disabled={!canSave} onClick={save}>
        {edit ? '고친 내용 저장' : '🌱 노트 저장하고 씨앗 심기'}
      </button>
      {!canSave && <p className="hint center">제목과 핵심 내용은 꼭 써야 저장돼요</p>}
    </div>
  )
}
