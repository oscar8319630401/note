import { useMemo } from 'react'
import { AREA_LABEL, type Formula } from '../data/formulas'
import { dailyFormulas } from '../lib/daily'
import type { NewNoteInput } from '../lib/store'

/**
 * 오늘의 수학 공식 (초등 6학년). 매일 몇 개씩 바뀐다.
 * 공식·설명·예시를 보고, 수학 노트로 담아 '내가 만든 문제'로 복습할 수 있다.
 */
export default function MathDaily({ onSaveToNote }: { onSaveToNote: (initial: Partial<NewNoteInput>) => void }) {
  const formulas = useMemo(() => dailyFormulas(), [])

  const toNote = (f: Formula) => {
    onSaveToNote({
      subject: 'math',
      title: f.title,
      summary: `${f.formula}\n\n${f.meaning}`,
      keyPoint: f.formula,
      question: `${f.title} 공식은?`,
      answer: f.formula,
      understanding: 3,
    })
  }

  return (
    <div className="english">
      <p className="muted">6학년 핵심 공식이에요. 공식과 예시를 함께 익히고 문제로 연습해요!</p>
      <div className="phrase-list">
        {formulas.map((f, i) => {
          const meta = AREA_LABEL[f.area]
          return (
            <div key={i} className="phrase-card formula-card" style={{ borderTopColor: meta.color }}>
              <div className="pc-head">
                <span className="pc-type" style={{ color: meta.color }}>
                  {meta.emoji} {meta.label}
                </span>
              </div>
              <p className="fc-title">{f.title}</p>
              <p className="fc-formula">{f.formula}</p>
              <p className="pc-ko">{f.meaning}</p>
              <p className="pc-ex">📝 {f.example}</p>
              <button className="pc-save" onClick={() => toNote(f)}>
                ＋ 수학 노트에 담기
              </button>
            </div>
          )
        })}
      </div>
      <p className="app-credit">공식은 예시와 함께 손으로 풀어보면 확실히 내 것이 돼요 ✏️</p>
    </div>
  )
}
