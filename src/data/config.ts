/**
 * 나의 복습 노트 — 과목 정의와 '기억 나무' 단계.
 *
 * 핵심 아이디어: 간격 반복(장기기억)을 '식물 키우기'로 시각화한다.
 * 노트를 쓰면 씨앗을 심고, 정해진 날 복습할 때마다 한 단계씩 자란다.
 * = 재미(수집·성장)와 장기기억 장치(spaced repetition)가 하나로 묶인다.
 */

export type SubjectId = 'korean' | 'math' | 'social' | 'science' | 'english'

export interface Subject {
  id: SubjectId
  name: string
  emoji: string
  accent: string
  soft: string // 옅은 배경색
}

export const SUBJECTS: Subject[] = [
  { id: 'korean', name: '국어', emoji: '📖', accent: '#e8615d', soft: '#fdeceb' },
  { id: 'math', name: '수학', emoji: '🔢', accent: '#3f8cff', soft: '#e9f1ff' },
  { id: 'social', name: '사회', emoji: '🌍', accent: '#f2a03d', soft: '#fdf1e2' },
  { id: 'science', name: '과학', emoji: '🔬', accent: '#2bb673', soft: '#e5f7ee' },
  { id: 'english', name: '영어', emoji: '🔤', accent: '#a06bf0', soft: '#f2eafd' },
]

export const subjectById = (id: SubjectId) => SUBJECTS.find((s) => s.id === id)!

/**
 * 기억 나무 단계. index가 곧 '복습 횟수'.
 * days = 이 단계가 된 뒤 '며칠 뒤' 다시 복습할지 (간격 반복 간격).
 * 마지막 단계는 장기기억 완성 — 더 이상 재촉하지 않는다.
 */
export interface MemoryStage {
  emoji: string
  label: string
  days: number | null // null = 복습 완료(장기기억)
}

export const MEMORY_STAGES: MemoryStage[] = [
  { emoji: '🌱', label: '씨앗', days: 1 },
  { emoji: '🌿', label: '새싹', days: 3 },
  { emoji: '🪴', label: '잎', days: 7 },
  { emoji: '🌳', label: '나무', days: 14 },
  { emoji: '🍎', label: '열매', days: 30 },
  { emoji: '⭐', label: '완전 내 것!', days: null },
]

export const maxStage = MEMORY_STAGES.length - 1

/** 이해도(별점) 라벨 */
export const UNDERSTANDING = [
  { level: 1, emoji: '😵', label: '아직 어려워' },
  { level: 2, emoji: '😕', label: '조금 알아' },
  { level: 3, emoji: '🙂', label: '보통이야' },
  { level: 4, emoji: '😃', label: '잘 알아' },
  { level: 5, emoji: '🤩', label: '완벽해!' },
] as const

/** 노트를 쓰거나 복습하면 받는 칭찬 문구 (랜덤) */
export const CHEERS = [
  '잘했어! 🎉',
  '오늘도 한 뼘 자랐어 🌱',
  '기억이 튼튼해지고 있어 💪',
  '멋진 복습이야! ✨',
  '이렇게 하면 시험도 문제없어 😎',
  '뇌가 좋아하고 있어 🧠',
]

/** 배지 정의 — 조건은 store 통계로 판정 */
export interface BadgeDef {
  id: string
  emoji: string
  name: string
  desc: string
}

export const BADGES: BadgeDef[] = [
  { id: 'first-note', emoji: '📝', name: '첫 노트', desc: '복습 노트를 처음 썼어요' },
  { id: 'notes-10', emoji: '📚', name: '노트 수집가', desc: '노트 10개를 모았어요' },
  { id: 'all-subjects', emoji: '🌈', name: '올라운더', desc: '다섯 과목을 모두 복습했어요' },
  { id: 'streak-7', emoji: '🔥', name: '일주일 개근', desc: '7일 연속 복습했어요' },
  { id: 'review-20', emoji: '🔁', name: '복습왕', desc: '복습을 20번 했어요' },
  { id: 'tree-master', emoji: '⭐', name: '기억의 달인', desc: '노트를 완전한 내 것으로 만들었어요' },
  { id: 'quiz-10', emoji: '🧠', name: '퀴즈 마스터', desc: '내가 만든 문제를 10번 맞혔어요' },
]
