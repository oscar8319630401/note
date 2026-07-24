import { useState } from 'react'
import { MEMORY_STAGES, UNDERSTANDING, subjectById } from '../data/config'
import { useStore, type Note } from '../lib/store'
import { prettyDate, untilLabel, todayId } from '../lib/date'

/** 노트 한 장 자세히 보기 — 기억 나무, 복습하기, 고치기, 삭제, 인쇄 */
export default function NoteView({
  note,
  onEdit,
  onBack,
}: {
  note: Note
  onEdit: () => void
  onBack: () => void
}) {
  const reviewNote = useStore((s) => s.reviewNote)
  const deleteNote = useStore((s) => s.deleteNote)
  const [showAnswer, setShowAnswer] = useState(false)
  const [justGrew, setJustGrew] = useState(false)

  const subject = subjectById(note.subject)
  const stage = MEMORY_STAGES[note.stage]
  const under = UNDERSTANDING.find((u) => u.level === note.understanding)
  const due = note.nextReview != null && note.nextReview <= todayId()
  const done = note.nextReview == null

  const doReview = () => {
    reviewNote(note.id)
    setShowAnswer(false)
    setJustGrew(true)
    setTimeout(() => setJustGrew(false), 1600)
  }

  const remove = () => {
    if (confirm('이 노트를 삭제할까요? 지우면 되돌릴 수 없어요.')) {
      deleteNote(note.id)
      onBack()
    }
  }

  return (
    <div className="note-view" style={{ ['--subj' as string]: subject.accent }}>
      {/* 인쇄 영역 시작 */}
      <div className="printable">
        <div className="nv-head" style={{ background: subject.soft }}>
          <div className="nv-head-top">
            <span className="nv-subject" style={{ color: subject.accent }}>
              {subject.emoji} {subject.name}
            </span>
            <span className="nv-date">📅 {prettyDate(note.createdAt)} 저장</span>
          </div>
          <h1 className="nv-title">{note.title}</h1>
          <div className="nv-tree">
            <span className={`tree-emoji ${justGrew ? 'grew' : ''}`}>{stage.emoji}</span>
            <div>
              <b>{stage.label}</b>
              <span className="tree-sub">
                {done ? '장기기억 완성! 🎉' : `${note.reviewCount}번 복습함`}
              </span>
            </div>
          </div>
        </div>

        <section className="nv-sec">
          <h2>핵심 내용</h2>
          <p className="nv-text">{note.summary || '—'}</p>
        </section>

        {note.keyPoint.trim() && (
          <section className="nv-sec key">
            <h2>⭐ 꼭 기억할 것</h2>
            <p className="nv-text">{note.keyPoint}</p>
          </section>
        )}

        {note.question.trim() && (
          <section className={`nv-sec quiz ${showAnswer ? 'revealed' : ''}`}>
            <h2>✏️ 내가 만든 문제</h2>
            <p className="nv-text q">{note.question}</p>
            {/* 정답은 화면에선 숨겼다가 버튼으로 열고, 인쇄할 땐 항상 보인다 */}
            <p className="nv-answer">정답: {note.answer || '—'}</p>
            {!showAnswer && (
              <button className="reveal-btn no-print" onClick={() => setShowAnswer(true)}>
                정답 확인하기 👀
              </button>
            )}
          </section>
        )}

        {note.hard.trim() && (
          <section className="nv-sec hard">
            <h2>❓ 어려웠던 것</h2>
            <p className="nv-text">{note.hard}</p>
          </section>
        )}

        {under && (
          <p className="nv-under">
            이해도: {under.emoji} {under.label}
          </p>
        )}
      </div>
      {/* 인쇄 영역 끝 */}

      {/* 복습 안내 */}
      {!done && (
        <div className={`review-cta ${due ? 'due' : ''} no-print`}>
          {due ? (
            <>
              <p>지금 복습하면 기억 나무가 자라요! 문제를 스스로 풀어본 뒤 눌러요.</p>
              <button className="grow-btn" onClick={doReview}>
                🌱 복습 완료! 나무 키우기
              </button>
            </>
          ) : (
            <p className="next-review">다음 복습: {note.nextReview && untilLabel(note.nextReview)} 🗓️</p>
          )}
        </div>
      )}

      {/* 액션 버튼들 */}
      <div className="nv-actions no-print">
        <button className="act" onClick={onBack}>
          🏠 홈
        </button>
        <button className="act" onClick={() => window.print()}>
          🖨️ 인쇄
        </button>
        <button className="act" onClick={onEdit}>
          ✏️ 고치기
        </button>
        <button className="act danger" onClick={remove}>
          🗑️ 삭제
        </button>
      </div>
    </div>
  )
}
