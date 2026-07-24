import { useEffect, useRef, useState } from 'react'

/**
 * 브라우저 내장 음성 인식(Web Speech API) 래퍼.
 * 크롬·엣지·삼성인터넷에서 동작. 마이크 권한과 HTTPS 필요.
 * 미지원 브라우저에서는 supported=false → 마이크 버튼을 숨긴다.
 */

interface SRResult {
  isFinal: boolean
  0: { transcript: string }
}
interface SREvent {
  resultIndex: number
  results: { length: number; [i: number]: SRResult }
}
interface SRLike {
  lang: string
  continuous: boolean
  interimResults: boolean
  onresult: ((e: SREvent) => void) | null
  onerror: (() => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
  abort: () => void
}
type SRCtor = new () => SRLike

function getCtor(): SRCtor | null {
  const w = window as unknown as { SpeechRecognition?: SRCtor; webkitSpeechRecognition?: SRCtor }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

export function useSpeech() {
  const [supported] = useState(() => getCtor() != null)
  const [listening, setListening] = useState(false)
  const rec = useRef<SRLike | null>(null)

  useEffect(() => () => rec.current?.abort(), [])

  const stop = () => {
    rec.current?.stop()
    setListening(false)
  }

  const start = (onFinal: (t: string) => void, onInterim?: (t: string) => void) => {
    const Ctor = getCtor()
    if (!Ctor) return
    if (rec.current) {
      stop()
      return
    }
    const r = new Ctor()
    r.lang = 'ko-KR'
    r.continuous = true
    r.interimResults = true
    r.onresult = (e) => {
      let interim = ''
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i]
        if (res.isFinal) onFinal(res[0].transcript.trim())
        else interim += res[0].transcript
      }
      if (interim) onInterim?.(interim)
    }
    r.onerror = () => {
      setListening(false)
      rec.current = null
    }
    r.onend = () => {
      setListening(false)
      rec.current = null
    }
    rec.current = r
    r.start()
    setListening(true)
  }

  return { supported, listening, start, stop }
}
