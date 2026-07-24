/** 날짜 유틸. 저장 키는 로컬 기준 'YYYY-MM-DD'. */

export type DayId = string

export function toDayId(d: Date): DayId {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function todayId(): DayId {
  return toDayId(new Date())
}

export function fromDayId(id: DayId): Date {
  const [y, m, d] = id.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function addDays(id: DayId, delta: number): DayId {
  const d = fromDayId(id)
  d.setDate(d.getDate() + delta)
  return toDayId(d)
}

export function diffDays(a: DayId, b: DayId): number {
  return Math.round((fromDayId(a).getTime() - fromDayId(b).getTime()) / 86400000)
}

/** "7월 18일" / 오늘·어제·내일은 말로 */
export function prettyDate(id: DayId): string {
  const d = diffDays(id, todayId())
  if (d === 0) return '오늘'
  if (d === -1) return '어제'
  if (d === 1) return '내일'
  const dt = fromDayId(id)
  return `${dt.getMonth() + 1}월 ${dt.getDate()}일`
}

/** 복습 예정일까지 남은 날 → 말로 ("오늘 복습!", "3일 뒤") */
export function untilLabel(id: DayId): string {
  const d = diffDays(id, todayId())
  if (d <= 0) return '지금 복습!'
  if (d === 1) return '내일 복습'
  return `${d}일 뒤 복습`
}
