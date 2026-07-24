import { useMemo } from 'react'
import { PHRASE_LABEL, type Phrase } from '../data/phrases'
import { dailyPhrases, speak, speakSupported } from '../lib/daily'
import { prettyDate, todayId } from '../lib/date'
import type { NewNoteInput } from '../lib/store'

/**
 * 오늘의 영어 5문장. 생활회화·명언·속담이 매일 바뀐다.
 * 🔊로 원어민 발음을 듣고, 마음에 들면 영어 노트로 담을 수 있다.
 */
export default function EnglishDaily({ onSaveToNote }: { onSaveToNote: (initial: Partial<NewNoteInput>) => void }) {
  const phrases = useMemo(() => dailyPhrases(), [])
  const canSpeak = speakSupported()

  const toNote = (p: Phrase) => {
    onSaveToNote({
      subject: 'english',
      title: p.en,
      summary: `${p.ko}${p.by ? ` — ${p.by}` : ''}`,
      keyPoint: PHRASE_LABEL[p.type].label,
      question: `"${p.ko}"를 영어로?`,
      answer: p.en,
      understanding: 3,
    })
  }

  return (
    <div className="english">
      <div className="eng-head">
        <h1>오늘의 영어 5문장 📣</h1>
        <span className="eng-date">📅 {prettyDate(todayId())}</span>
      </div>
      <p className="muted">매일 새로운 5문장이 나와요. 🔊로 발음을 듣고 소리 내어 따라 해봐요!</p>

      <div className="phrase-list">
        {phrases.map((p, i) => {
          const meta = PHRASE_LABEL[p.type]
          return (
            <div key={i} className="phrase-card" style={{ borderTopColor: meta.color }}>
              <div className="pc-head">
                <span className="pc-type" style={{ color: meta.color }}>
                  {meta.emoji} {meta.label}
                </span>
                {canSpeak && (
                  <button className="pc-speak" onClick={() => speak(p.en)} title="발음 듣기" aria-label="발음 듣기">
                    🔊
                  </button>
                )}
              </div>
              <p className="pc-en">{p.en}</p>
              <p className="pc-ko">{p.ko}</p>
              {p.by && <p className="pc-by">— {p.by}</p>}
              <button className="pc-save" onClick={() => toNote(p)}>
                ＋ 영어 노트에 담기
              </button>
            </div>
          )
        })}
      </div>

      <p className="app-credit">소리 내어 읽으면 훨씬 오래 기억돼요 🗣️</p>
    </div>
  )
}
