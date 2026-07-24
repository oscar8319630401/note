import { BADGES, SUBJECTS } from '../data/config'
import type { Note, Stats } from './store'
import { todayId, fromDayId, type DayId } from './date'

/** 오늘 복습할 노트 (예정일이 오늘이거나 지난 것). 오래 밀린 것부터. */
export function dueNotes(notes: Note[]): Note[] {
  const today = todayId()
  return notes
    .filter((n) => n.nextReview != null && n.nextReview <= today)
    .sort((a, b) => (a.nextReview! < b.nextReview! ? -1 : 1))
}

/** 오늘부터 거꾸로 세는 연속 기록 일수 */
export function streak(stats: Stats): number {
  const set = new Set(stats.streakDates)
  const today = todayId()
  // 오늘 아직 아무것도 안 했으면 어제부터 이어준다
  let cursor = set.has(today) ? today : yesterday(today)
  let count = 0
  while (set.has(cursor)) {
    count++
    cursor = yesterday(cursor)
  }
  return count
}

function yesterday(id: DayId): DayId {
  const d = fromDayId(id)
  d.setDate(d.getDate() - 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** 지금 조건을 만족하는 배지 id 목록 */
export function evaluateBadges(notes: Note[], stats: Stats): string[] {
  const earned: string[] = []
  if (notes.length >= 1) earned.push('first-note')
  if (notes.length >= 10) earned.push('notes-10')
  if (SUBJECTS.every((s) => notes.some((n) => n.subject === s.id))) earned.push('all-subjects')
  if (streak(stats) >= 7) earned.push('streak-7')
  if (stats.reviewTotal >= 20) earned.push('review-20')
  if (notes.some((n) => n.nextReview == null)) earned.push('tree-master')
  if (stats.quizCorrect >= 10) earned.push('quiz-10')
  return earned
}

export const allBadges = BADGES

/** 퀴즈에 쓸 수 있는 노트 (문제와 답이 채워진 것) */
export function quizableNotes(notes: Note[]): Note[] {
  return notes.filter((n) => n.question.trim() && n.answer.trim())
}
