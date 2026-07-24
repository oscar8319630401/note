import { PHRASES, type Phrase } from '../data/phrases'
import { fromDayId, todayId, type DayId } from './date'

/**
 * 문장이 종류별로 묶여 있어서 연속으로 뽑으면 한 종류만 나온다.
 * 종류마다 개수가 다르므로(회화 많고 속담 적음) '가장 뒤처진 종류를 먼저 꺼내는' 방식으로
 * 전체 길이에 고르게 흩뿌린다. 그러면 어느 날 5개를 연속으로 뽑아도 자연스럽게 섞인다.
 */
const INTERLEAVED: Phrase[] = (() => {
  const groups = [
    PHRASES.filter((p) => p.type === 'talk'),
    PHRASES.filter((p) => p.type === 'quote'),
    PHRASES.filter((p) => p.type === 'proverb'),
  ]
  const idx = [0, 0, 0]
  const total = groups.reduce((s, g) => s + g.length, 0)
  const order: Phrase[] = []
  while (order.length < total) {
    // 이미 꺼낸 비율(idx/len)이 가장 낮은 = 가장 뒤처진 종류를 고른다
    let best = -1
    let bestRatio = Infinity
    for (let g = 0; g < groups.length; g++) {
      if (idx[g] >= groups[g].length) continue
      const ratio = idx[g] / groups[g].length
      if (ratio < bestRatio) {
        bestRatio = ratio
        best = g
      }
    }
    order.push(groups[best][idx[best]++])
  }
  return order
})()

/**
 * 오늘의 5문장. 날짜를 씨앗으로 매일 다른 5개를 고른다.
 * 같은 날은 항상 같은 5개(안정적), 다음 날은 5칸 밀려서 새 문장.
 */
export function dailyPhrases(day: DayId = todayId(), count = 5): Phrase[] {
  const epochDay = Math.floor(fromDayId(day).getTime() / 86400000)
  const start = (epochDay * count) % INTERLEAVED.length
  const out: Phrase[] = []
  for (let i = 0; i < count; i++) out.push(INTERLEAVED[(start + i) % INTERLEAVED.length])
  return out
}

/** 브라우저 내장 음성으로 영어 문장 읽어주기 (SpeechSynthesis, 설치 불필요) */
export function speak(text: string) {
  if (typeof speechSynthesis === 'undefined') return
  speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'en-US'
  u.rate = 0.9 // 초등학생이 따라 하기 좋게 살짝 느리게
  speechSynthesis.speak(u)
}

export const speakSupported = () => typeof window !== 'undefined' && 'speechSynthesis' in window
