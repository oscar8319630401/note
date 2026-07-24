import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MEMORY_STAGES, maxStage, type SubjectId } from '../data/config'
import { addDays, todayId, type DayId } from './date'

/**
 * 복습 노트 한 장. 코넬식 구조 + 간격 반복 상태.
 * stage = 기억 나무 단계(0~5). 복습을 제때 할 때마다 1씩 오른다.
 * nextReview = 다음 복습 예정일. stage가 오르면 더 먼 미래로 밀린다.
 */
export interface Note {
  id: string
  subject: SubjectId
  title: string
  summary: string // 핵심 내용 (내 말로)
  keyPoint: string // ⭐ 꼭 기억할 것
  question: string // ✏️ 내가 만든 문제
  answer: string // 답
  hard: string // ❓ 어려웠던 것
  understanding: number // 이해도 1~5
  createdAt: DayId
  stage: number // 기억 나무 단계
  reviewCount: number
  nextReview: DayId | null // null = 장기기억 완성
  lastReviewedAt?: DayId
}

export interface Stats {
  streakDates: DayId[] // 노트를 쓰거나 복습한 날들 (중복 없이)
  reviewTotal: number
  quizCorrect: number
  earnedBadges: string[]
  studySec: Record<DayId, number> // 날짜별 누적 공부(복습) 시간(초)
}

export interface NewNoteInput {
  subject: SubjectId
  title: string
  summary: string
  keyPoint: string
  question: string
  answer: string
  hard: string
  understanding: number
}

interface Store {
  notes: Note[]
  stats: Stats

  addNote: (input: NewNoteInput) => string
  updateNote: (id: string, patch: Partial<NewNoteInput>) => void
  deleteNote: (id: string) => void
  reviewNote: (id: string) => void // 복습 완료 → 나무 성장 + 다음 일정
  recordQuiz: (correct: boolean) => void
  markStreakToday: () => void
  addStudySec: (sec: number) => void // 공부 타이머 누적
  resetAll: () => void
}

let seq = 0
const uid = () => `n-${Date.now().toString(36)}-${seq++}`

const addToday = (dates: DayId[]): DayId[] => {
  const t = todayId()
  return dates.includes(t) ? dates : [...dates, t]
}

const emptyStats = (): Stats => ({ streakDates: [], reviewTotal: 0, quizCorrect: 0, earnedBadges: [], studySec: {} })

export const useStore = create<Store>()(
  persist(
    (set) => ({
      notes: [],
      stats: emptyStats(),

      addNote: (input) => {
        const id = uid()
        const today = todayId()
        const note: Note = {
          id,
          ...input,
          createdAt: today,
          stage: 0,
          reviewCount: 0,
          // 씨앗을 심었으니 첫 복습은 MEMORY_STAGES[0].days(=1일) 뒤
          nextReview: addDays(today, MEMORY_STAGES[0].days ?? 1),
        }
        set((s) => ({ notes: [note, ...s.notes], stats: { ...s.stats, streakDates: addToday(s.stats.streakDates) } }))
        return id
      },

      updateNote: (id, patch) =>
        set((s) => ({ notes: s.notes.map((n) => (n.id === id ? { ...n, ...patch } : n)) })),

      deleteNote: (id) => set((s) => ({ notes: s.notes.filter((n) => n.id !== id) })),

      reviewNote: (id) =>
        set((s) => {
          const today = todayId()
          const notes = s.notes.map((n) => {
            if (n.id !== id) return n
            const stage = Math.min(maxStage, n.stage + 1)
            const days = MEMORY_STAGES[stage].days
            return {
              ...n,
              stage,
              reviewCount: n.reviewCount + 1,
              lastReviewedAt: today,
              nextReview: days == null ? null : addDays(today, days),
            }
          })
          return {
            notes,
            stats: {
              ...s.stats,
              reviewTotal: s.stats.reviewTotal + 1,
              streakDates: addToday(s.stats.streakDates),
            },
          }
        }),

      recordQuiz: (correct) =>
        set((s) => ({
          stats: {
            ...s.stats,
            quizCorrect: s.stats.quizCorrect + (correct ? 1 : 0),
            streakDates: addToday(s.stats.streakDates),
          },
        })),

      markStreakToday: () =>
        set((s) => ({ stats: { ...s.stats, streakDates: addToday(s.stats.streakDates) } })),

      addStudySec: (sec) =>
        set((s) => {
          if (sec <= 0) return s
          const t = todayId()
          const studySec = { ...s.stats.studySec, [t]: (s.stats.studySec[t] ?? 0) + sec }
          return { stats: { ...s.stats, studySec, streakDates: addToday(s.stats.streakDates) } }
        }),

      resetAll: () => set({ notes: [], stats: emptyStats() }),
    }),
    { name: 'review-note', version: 1 },
  ),
)
