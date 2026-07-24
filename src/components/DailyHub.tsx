import { useState } from 'react'
import EnglishDaily from './EnglishDaily'
import KoreanDaily from './KoreanDaily'
import MathDaily from './MathDaily'
import { prettyDate, todayId } from '../lib/date'
import type { NewNoteInput } from '../lib/store'

/** 오늘의 학습 허브 — 영어 5문장 · 국어 어휘 · 수학 공식을 전환한다. */
type Sub = 'english' | 'korean' | 'math'

export default function DailyHub({ onSaveToNote }: { onSaveToNote: (initial: Partial<NewNoteInput>) => void }) {
  const [sub, setSub] = useState<Sub>('english')

  return (
    <div className="daily-hub">
      <div className="eng-head">
        <h1>오늘의 학습 ✨</h1>
        <span className="eng-date">📅 {prettyDate(todayId())}</span>
      </div>

      <div className="segmented">
        <button className={sub === 'english' ? 'on' : ''} onClick={() => setSub('english')}>
          🔤 영어
        </button>
        <button className={sub === 'korean' ? 'on' : ''} onClick={() => setSub('korean')}>
          📖 어휘
        </button>
        <button className={sub === 'math' ? 'on' : ''} onClick={() => setSub('math')}>
          🔢 수학
        </button>
      </div>

      {sub === 'english' && <EnglishDaily onSaveToNote={onSaveToNote} embedded />}
      {sub === 'korean' && <KoreanDaily onSaveToNote={onSaveToNote} />}
      {sub === 'math' && <MathDaily onSaveToNote={onSaveToNote} />}
    </div>
  )
}
