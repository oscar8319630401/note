import { useState } from 'react'
import { useSpeech } from '../lib/useSpeech'

/**
 * 마이크 버튼이 달린 입력칸. 눌러 말하면 인식된 문장이 뒤에 붙는다.
 * 초등학생이 타이핑 대신 말로 정리할 수 있게 해준다.
 * 음성 미지원 브라우저에서는 마이크 버튼을 숨긴다.
 */
export default function VoiceField({
  value,
  onChange,
  placeholder,
  rows = 3,
  singleLine = false,
  maxLength,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
  singleLine?: boolean
  maxLength?: number
}) {
  const { supported, listening, start, stop } = useSpeech()
  const [interim, setInterim] = useState('')

  const toggle = () => {
    if (listening) {
      stop()
      setInterim('')
      return
    }
    start(
      (text) => {
        if (!text) return
        const next = value ? `${value} ${text}` : text
        onChange(maxLength ? next.slice(0, maxLength) : next)
        setInterim('')
      },
      (text) => setInterim(text),
    )
  }

  const shown = listening && interim ? (value ? `${value} ${interim}` : interim) : value

  return (
    <div className={`voice-field ${listening ? 'listening' : ''}`}>
      {singleLine ? (
        <input
          className="vf-input"
          value={shown}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <textarea
          className="vf-input"
          value={shown}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {supported && (
        <button
          type="button"
          className={`mic ${listening ? 'on' : ''}`}
          onClick={toggle}
          title={listening ? '멈추기' : '말해서 쓰기'}
        >
          {listening ? '⏹' : '🎤'}
        </button>
      )}
    </div>
  )
}
