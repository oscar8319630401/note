import { PHRASES, type Phrase } from '../data/phrases'
import { VOCAB, type Vocab } from '../data/vocab'
import { FORMULAS, type Formula } from '../data/formulas'
import { fromDayId, todayId, type DayId } from './date'

/**
 * 종류가 섞여 나오도록 '가장 뒤처진 종류를 먼저 꺼내는' 비율 균형 방식으로
 * 항목을 전체에 고르게 흩뿌린다. 그러면 어느 날 몇 개를 연속으로 뽑아도 종류가 섞인다.
 * (종류마다 개수가 다를 때 한 종류로 몰리는 걸 막는다)
 */
function evenInterleave<T>(items: T[], typeOf: (t: T) => string): T[] {
  const byType = new Map<string, T[]>()
  for (const it of items) {
    const k = typeOf(it)
    const arr = byType.get(k) ?? []
    arr.push(it)
    byType.set(k, arr)
  }
  const groups = [...byType.values()]
  const idx = groups.map(() => 0)
  const total = items.length
  const order: T[] = []
  while (order.length < total) {
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
}

/** 날짜를 씨앗으로 오늘의 항목을 고른다. 같은 날은 항상 같은 결과, 다음 날은 count칸 밀린다. */
function dailyPick<T>(interleaved: T[], count: number, day: DayId): T[] {
  const epochDay = Math.floor(fromDayId(day).getTime() / 86400000)
  const start = (epochDay * count) % interleaved.length
  const out: T[] = []
  for (let i = 0; i < count; i++) out.push(interleaved[(start + i) % interleaved.length])
  return out
}

const PHRASE_ORDER = evenInterleave(PHRASES, (p) => p.type)
const VOCAB_ORDER = evenInterleave(VOCAB, (v) => v.type)
const FORMULA_ORDER = evenInterleave(FORMULAS, (f) => f.area)

export const dailyPhrases = (day: DayId = todayId(), count = 5): Phrase[] => dailyPick(PHRASE_ORDER, count, day)
export const dailyVocab = (day: DayId = todayId(), count = 5): Vocab[] => dailyPick(VOCAB_ORDER, count, day)
export const dailyFormulas = (day: DayId = todayId(), count = 3): Formula[] => dailyPick(FORMULA_ORDER, count, day)

/** 브라우저 내장 음성으로 읽어주기 (설치 불필요). 영어는 en-US, 국어는 ko-KR. */
export function speak(text: string, lang: 'en-US' | 'ko-KR' = 'en-US') {
  if (typeof speechSynthesis === 'undefined') return
  speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = lang
  u.rate = lang === 'en-US' ? 0.9 : 0.95
  speechSynthesis.speak(u)
}

export const speakSupported = () => typeof window !== 'undefined' && 'speechSynthesis' in window
