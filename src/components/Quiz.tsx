import { useMemo, useState } from 'react'
import { subjectById, type SubjectId } from '../data/config'
import { SUBJECTS } from '../data/config'
import { useStore } from '../lib/store'
import { quizableNotes } from '../lib/selectors'

/**
 * 내가 만든 문제로 퀴즈. 스스로 낸 문제를 카드로 보고, 답을 떠올린 뒤 확인한다.
 * (액티브 리콜 — 가장 강력한 복습법)
 */
function shuffle<T>(a: T[]): T[] {
  const arr = [...a]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export default function Quiz() {
  const notes = useStore((s) => s.notes)
  const recordQuiz = useStore((s) => s.recordQuiz)

  const [subject, setSubject] = useState<SubjectId | 'all'>('all')
  const [started, setStarted] = useState(false)
  const [deck, setDeck] = useState<ReturnType<typeof quizableNotes>>([])
  const [idx, setIdx] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const pool = useMemo(() => {
    const q = quizableNotes(notes)
    return subject === 'all' ? q : q.filter((n) => n.subject === subject)
  }, [notes, subject])

  const start = () => {
    setDeck(shuffle(pool))
    setIdx(0)
    setRevealed(false)
    setScore({ correct: 0, total: 0 })
    setStarted(true)
  }

  const mark = (correct: boolean) => {
    recordQuiz(correct)
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))
    if (idx + 1 >= deck.length) {
      setIdx(deck.length) // 종료 표시
    } else {
      setIdx((i) => i + 1)
      setRevealed(false)
    }
  }

  if (!started) {
    return (
      <div className="quiz-start">
        <h1>내 문제로 퀴즈 🧠</h1>
        <p className="muted">노트에 적은 '내가 만든 문제'가 퀴즈로 나와요. 스스로 답을 맞혀보자!</p>

        <div className="subj-filter">
          <button className={`fchip ${subject === 'all' ? 'on' : ''}`} onClick={() => setSubject('all')}>
            전체
          </button>
          {SUBJECTS.map((s) => (
            <button
              key={s.id}
              className={`fchip ${subject === s.id ? 'on' : ''}`}
              style={subject === s.id ? { background: s.accent, borderColor: s.accent, color: '#fff' } : undefined}
              onClick={() => setSubject(s.id)}
            >
              {s.emoji} {s.name}
            </button>
          ))}
        </div>

        {pool.length === 0 ? (
          <div className="empty">
            <div className="empty-emoji">✏️</div>
            <p>아직 만든 문제가 없어요.{'\n'}노트를 쓸 때 '내가 만든 문제'를 채우면 여기서 퀴즈로 풀 수 있어요!</p>
          </div>
        ) : (
          <button className="save-btn" onClick={start}>
            문제 {pool.length}개로 퀴즈 시작 🚀
          </button>
        )}
      </div>
    )
  }

  // 종료
  if (idx >= deck.length) {
    const pct = score.total ? Math.round((score.correct / score.total) * 100) : 0
    return (
      <div className="quiz-done">
        <div className="qd-emoji">{pct === 100 ? '🏆' : pct >= 60 ? '🎉' : '💪'}</div>
        <h1>{score.correct} / {score.total} 맞혔어요!</h1>
        <p className="muted">{pct === 100 ? '완벽해! 정말 잘했어요.' : '틀린 문제는 노트에서 다시 복습해봐요.'}</p>
        <div className="row">
          <button className="save-btn" onClick={start}>
            다시 풀기
          </button>
          <button className="act" onClick={() => setStarted(false)}>
            과목 바꾸기
          </button>
        </div>
      </div>
    )
  }

  const card = deck[idx]
  const s = subjectById(card.subject)

  return (
    <div className="quiz-play">
      <div className="qp-progress">
        {idx + 1} / {deck.length} · {score.correct}점
      </div>
      <div className="quiz-card" style={{ ['--subj' as string]: s.accent }}>
        <span className="qc-subj" style={{ color: s.accent }}>
          {s.emoji} {s.name}
        </span>
        <span className="qc-from">{card.title}</span>
        <p className="qc-question">{card.question}</p>

        {!revealed ? (
          <button className="reveal-btn" onClick={() => setRevealed(true)}>
            답을 떠올렸으면 확인 👀
          </button>
        ) : (
          <div className="qc-answer-box">
            <p className="qc-answer">정답: {card.answer}</p>
            <p className="qc-ask">스스로 맞혔나요?</p>
            <div className="row">
              <button className="mark wrong" onClick={() => mark(false)}>
                아직 몰라요
              </button>
              <button className="mark right" onClick={() => mark(true)}>
                맞혔어요! 🎉
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
