import { PHRASES, type Phrase } from '../data/phrases'
import { fromDayId, todayId, type DayId } from './date'

/**
 * 문장이 종류별로 묶여 있어서, 연속으로 뽑으면 한 종류만 나온다.
 * 회화·명언·속담을 번갈아 배치한 순서를 미리 만들어 두면 어느 날 뽑아도 골고루 섞인다.
 */
const INTERLEAVED: Phrase[] = (() => {
  const groups = {
    talk: PHRASES.filter((p) => p.type === 'talk'),
    quote: PHRASES.filter((p) => p.type === 'quote'),
    proverb: PHRASES.filter((p) => p.type === 'proverb'),
  }
  const order: Phrase[] = []
  const max = Math.max(groups.talk.length, groups.quote.length, groups.proverb.length)
  for (let i = 0; i < max; i++) {
    if (groups.talk[i]) order.push(groups.talk[i])
    if (groups.quote[i]) order.push(groups.quote[i])
    if (groups.proverb[i]) order.push(groups.proverb[i])
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
