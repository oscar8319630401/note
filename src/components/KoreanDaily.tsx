import { useMemo } from 'react'
import { VOCAB_LABEL, type Vocab } from '../data/vocab'
import { dailyVocab, speak, speakSupported } from '../lib/daily'
import type { NewNoteInput } from '../lib/store'

/**
 * 오늘의 어휘 5개 (국어 어휘력 향상). 한자어·사자성어·순우리말이 매일 바뀐다.
 * 🔊로 낱말을 듣고, 뜻·예문을 보고, 국어 노트로 담을 수 있다.
 */
export default function KoreanDaily({ onSaveToNote }: { onSaveToNote: (initial: Partial<NewNoteInput>) => void }) {
  const words = useMemo(() => dailyVocab(), [])
  const canSpeak = speakSupported()

  const toNote = (v: Vocab) => {
    onSaveToNote({
      subject: 'korean',
      title: `${v.word}${v.hanja ? ` (${v.hanja})` : ''}`,
      summary: `${v.meaning}\n예: ${v.example}`,
      keyPoint: VOCAB_LABEL[v.type].label,
      question: `'${v.word}'의 뜻은?`,
      answer: v.meaning,
      understanding: 3,
    })
  }

  return (
    <div className="english">
      <p className="muted">교과서에서 자주 나오는 낱말이에요. 뜻과 예문을 함께 익혀요!</p>
      <div className="phrase-list">
        {words.map((v, i) => {
          const meta = VOCAB_LABEL[v.type]
          return (
            <div key={i} className="phrase-card" style={{ borderTopColor: meta.color }}>
              <div className="pc-head">
                <span className="pc-type" style={{ color: meta.color }}>
                  {meta.emoji} {meta.label}
                </span>
                {canSpeak && (
                  <button className="pc-speak" onClick={() => speak(v.word, 'ko-KR')} title="낱말 듣기">
                    🔊
                  </button>
                )}
              </div>
              <p className="pc-en">
                {v.word}
                {v.hanja && <span className="pc-hanja"> {v.hanja}</span>}
              </p>
              <p className="pc-ko">{v.meaning}</p>
              <p className="pc-ex">📝 {v.example}</p>
              <button className="pc-save" onClick={() => toNote(v)}>
                ＋ 국어 노트에 담기
              </button>
            </div>
          )
        })}
      </div>
      <p className="app-credit">낱말을 예문과 함께 외우면 오래 기억돼요 🌱</p>
    </div>
  )
}
