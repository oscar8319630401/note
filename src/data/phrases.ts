/**
 * 오늘의 영어 5문장 데이터.
 * type: talk(생활회화) · quote(명언) · proverb(속담)
 * 초등 고학년이 소화할 수 있는 수준으로 골랐다. 매일 5문장씩 날짜 기준으로 바뀐다.
 */

export type PhraseType = 'talk' | 'quote' | 'proverb'

export interface Phrase {
  en: string
  ko: string
  type: PhraseType
  by?: string // 명언 출처
}

export const PHRASE_LABEL: Record<PhraseType, { label: string; emoji: string; color: string }> = {
  talk: { label: '생활회화', emoji: '💬', color: '#3f8cff' },
  quote: { label: '명언', emoji: '🌟', color: '#a06bf0' },
  proverb: { label: '속담', emoji: '🦉', color: '#2bb673' },
}

export const PHRASES: Phrase[] = [
  // ── 생활회화 ──
  { en: 'How are you doing today?', ko: '오늘 어떻게 지내?', type: 'talk' },
  { en: "Nice to meet you.", ko: '만나서 반가워.', type: 'talk' },
  { en: 'Can you help me, please?', ko: '나 좀 도와줄래?', type: 'talk' },
  { en: 'What time is it now?', ko: '지금 몇 시야?', type: 'talk' },
  { en: "I don't understand. Can you say it again?", ko: '이해가 안 돼. 다시 말해줄래?', type: 'talk' },
  { en: 'That sounds like a great idea!', ko: '정말 좋은 생각인 것 같아!', type: 'talk' },
  { en: 'May I go to the bathroom?', ko: '화장실에 다녀와도 될까요?', type: 'talk' },
  { en: 'Thank you so much for your help.', ko: '도와줘서 정말 고마워.', type: 'talk' },
  { en: "I'm sorry. It was my fault.", ko: '미안해. 내 잘못이야.', type: 'talk' },
  { en: 'What is your favorite subject?', ko: '가장 좋아하는 과목이 뭐야?', type: 'talk' },
  { en: 'Can I borrow your pencil?', ko: '연필 좀 빌릴 수 있을까?', type: 'talk' },
  { en: "Let's play together after school.", ko: '학교 끝나고 같이 놀자.', type: 'talk' },
  { en: 'How was your weekend?', ko: '주말 어떻게 보냈어?', type: 'talk' },
  { en: 'I would like some water, please.', ko: '물 좀 주세요.', type: 'talk' },
  { en: 'Excuse me, where is the library?', ko: '실례합니다, 도서관이 어디예요?', type: 'talk' },
  { en: 'Have a nice day!', ko: '좋은 하루 보내!', type: 'talk' },
  { en: 'I agree with you.', ko: '네 말에 동의해.', type: 'talk' },
  { en: "Don't worry. You can do it!", ko: '걱정 마. 넌 할 수 있어!', type: 'talk' },
  { en: 'What do you want to be in the future?', ko: '너는 커서 뭐가 되고 싶어?', type: 'talk' },
  { en: 'It was really fun today.', ko: '오늘 정말 재미있었어.', type: 'talk' },
  { en: 'Could you speak more slowly?', ko: '조금 더 천천히 말해줄래요?', type: 'talk' },
  { en: 'I really appreciate it.', ko: '정말 고맙게 생각해.', type: 'talk' },
  { en: 'See you tomorrow!', ko: '내일 보자!', type: 'talk' },
  { en: 'Congratulations! You did a great job.', ko: '축하해! 정말 잘했어.', type: 'talk' },
  { en: 'What are you doing right now?', ko: '지금 뭐 하고 있어?', type: 'talk' },
  { en: 'I am looking forward to it.', ko: '그거 정말 기대돼.', type: 'talk' },
  { en: 'Please be careful.', ko: '조심해.', type: 'talk' },
  { en: 'Can you tell me one more time?', ko: '한 번만 더 말해줄 수 있어?', type: 'talk' },
  { en: 'That makes sense.', ko: '그거 말 되네.', type: 'talk' },
  { en: 'I feel much better now.', ko: '이제 훨씬 나아졌어.', type: 'talk' },

  // ── 명언 ──
  { en: 'Believe you can and you are halfway there.', ko: '할 수 있다고 믿으면 이미 반은 온 것이다.', type: 'quote', by: '시어도어 루스벨트' },
  { en: 'The best way to predict the future is to create it.', ko: '미래를 예측하는 가장 좋은 방법은 미래를 만드는 것이다.', type: 'quote', by: '피터 드러커' },
  { en: 'Stay hungry, stay foolish.', ko: '늘 갈망하고, 우직하게 나아가라.', type: 'quote', by: '스티브 잡스' },
  { en: 'It always seems impossible until it is done.', ko: '무엇이든 해내기 전까지는 불가능해 보인다.', type: 'quote', by: '넬슨 만델라' },
  { en: 'A journey of a thousand miles begins with a single step.', ko: '천 리 길도 한 걸음부터 시작된다.', type: 'quote', by: '노자' },
  { en: 'Dream big and dare to fail.', ko: '크게 꿈꾸고 실패를 두려워하지 마라.', type: 'quote', by: '노먼 본' },
  { en: 'What we think, we become.', ko: '우리가 생각하는 대로 우리는 된다.', type: 'quote', by: '부처' },
  { en: 'Little by little, one walks far.', ko: '조금씩 걷다 보면 멀리 간다.', type: 'quote' },
  { en: 'Mistakes are proof that you are trying.', ko: '실수는 네가 노력하고 있다는 증거다.', type: 'quote' },
  { en: 'Knowledge is power.', ko: '아는 것이 힘이다.', type: 'quote', by: '프랜시스 베이컨' },
  { en: 'Where there is a will, there is a way.', ko: '뜻이 있는 곳에 길이 있다.', type: 'quote' },
  { en: 'Today is a gift. That is why it is called the present.', ko: '오늘은 선물이다. 그래서 present(선물·현재)라고 부른다.', type: 'quote' },
  { en: 'Be yourself; everyone else is already taken.', ko: '너 자신이 되어라. 다른 사람은 이미 있으니까.', type: 'quote', by: '오스카 와일드' },
  { en: 'The only way to do great work is to love what you do.', ko: '훌륭한 일을 하는 유일한 방법은 그 일을 사랑하는 것이다.', type: 'quote', by: '스티브 잡스' },
  { en: 'Practice makes perfect.', ko: '연습이 완벽을 만든다.', type: 'quote' },
  { en: 'Never give up on what you really want.', ko: '정말 원하는 것을 절대 포기하지 마라.', type: 'quote' },
  { en: 'Every day is a new beginning.', ko: '매일이 새로운 시작이다.', type: 'quote' },

  // ── 속담 ──
  { en: 'Practice what you preach.', ko: '말한 대로 실천하라.', type: 'proverb' },
  { en: 'Better late than never.', ko: '늦더라도 안 하는 것보다 낫다.', type: 'proverb' },
  { en: 'Two heads are better than one.', ko: '백지장도 맞들면 낫다.', type: 'proverb' },
  { en: 'The early bird catches the worm.', ko: '일찍 일어나는 새가 벌레를 잡는다.', type: 'proverb' },
  { en: 'Slow and steady wins the race.', ko: '천천히 그리고 꾸준히 하면 이긴다.', type: 'proverb' },
  { en: 'Actions speak louder than words.', ko: '말보다 행동이 중요하다.', type: 'proverb' },
  { en: 'Honesty is the best policy.', ko: '정직이 최선의 방책이다.', type: 'proverb' },
  { en: 'When in Rome, do as the Romans do.', ko: '로마에서는 로마법을 따르라.', type: 'proverb' },
  { en: 'A friend in need is a friend indeed.', ko: '어려울 때 친구가 진짜 친구다.', type: 'proverb' },
  { en: 'Look before you leap.', ko: '돌다리도 두드려 보고 건너라.', type: 'proverb' },
  { en: 'Rome was not built in a day.', ko: '로마는 하루아침에 이루어지지 않았다.', type: 'proverb' },
  { en: 'No pain, no gain.', ko: '고생 없이는 얻는 것도 없다.', type: 'proverb' },
  { en: 'Birds of a feather flock together.', ko: '끼리끼리 모인다 (유유상종).', type: 'proverb' },
  { en: 'All that glitters is not gold.', ko: '반짝인다고 다 금은 아니다.', type: 'proverb' },
  { en: 'Where there is smoke, there is fire.', ko: '아니 땐 굴뚝에 연기 날까.', type: 'proverb' },
]
