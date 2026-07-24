import { subjectById, MEMORY_STAGES } from '../data/config'
import { useStore, type Note } from '../lib/store'
import { dueNotes } from '../lib/selectors'
import { prettyDate } from '../lib/date'
import StudyTimer from './StudyTimer'

/** 오늘 복습할 노트 모음 (간격 반복 도착한 것). 여기서 바로 노트를 열어 복습한다. */
export default function Review({ onOpen }: { onOpen: (n: Note) => void }) {
  const notes = useStore((s) => s.notes)
  const due = dueNotes(notes)
  const growing = notes.filter((n) => n.nextReview != null)
  const mastered = notes.filter((n) => n.nextReview == null)

  return (
    <div className="review">
      <h1>오늘의 복습 🌱</h1>

      <StudyTimer />

      {due.length === 0 ? (
        <div className="review-clear">
          <div className="rc-emoji">✅</div>
          <p>오늘 복습할 노트가 없어요!</p>
          <span className="muted">정해진 날에 복습하면 기억이 오래가요. 내일 또 만나요 👋</span>
        </div>
      ) : (
        <>
          <p className="review-count">
            복습할 노트가 <b>{due.length}개</b> 있어요. 하나씩 열어서 스스로 문제를 풀어봐요!
          </p>
          <div className="cards">
            {due.map((n) => {
              const s = subjectById(n.subject)
              const stage = MEMORY_STAGES[n.stage]
              return (
                <button key={n.id} className="note-card due" style={{ borderLeftColor: s.accent }} onClick={() => onOpen(n)}>
                  <div className="nc-top">
                    <span className="nc-subj" style={{ color: s.accent }}>
                      {s.emoji} {s.name}
                    </span>
                    <span className="nc-tree">{stage.emoji} → {MEMORY_STAGES[Math.min(5, n.stage + 1)].emoji}</span>
                  </div>
                  <span className="nc-title">{n.title}</span>
                  <span className="nc-date">📅 {prettyDate(n.createdAt)}에 배움</span>
                </button>
              )
            })}
          </div>
        </>
      )}

      <div className="grow-summary">
        <div className="gs-tile">
          <span className="gs-num">🌿 {growing.length}</span>
          <span className="gs-label">자라는 중</span>
        </div>
        <div className="gs-tile">
          <span className="gs-num">⭐ {mastered.length}</span>
          <span className="gs-label">완전 내 것</span>
        </div>
      </div>
    </div>
  )
}
