/**
 * 오늘의 어휘 데이터 (국어 어휘력 향상용).
 * type: sino(한자어) · idiom(사자성어) · native(순우리말)
 * 초등 고학년이 교과서·책에서 자주 만나는 낱말로 골랐다. 매일 5개씩 바뀐다.
 */

export type VocabType = 'sino' | 'idiom' | 'native'

export interface Vocab {
  word: string
  hanja?: string
  meaning: string
  example: string
  type: VocabType
}

export const VOCAB_LABEL: Record<VocabType, { label: string; emoji: string; color: string }> = {
  sino: { label: '한자어', emoji: '📘', color: '#e8615d' },
  idiom: { label: '사자성어', emoji: '🀄', color: '#f2a03d' },
  native: { label: '순우리말', emoji: '🌸', color: '#2bb673' },
}

export const VOCAB: Vocab[] = [
  // ── 한자어 ──
  { word: '관찰', hanja: '觀察', meaning: '사물이나 현상을 주의 깊게 살펴봄', example: '과학 시간에 나뭇잎을 자세히 관찰했다.', type: 'sino' },
  { word: '예측', hanja: '豫測', meaning: '앞으로 일어날 일을 미리 헤아려 짐작함', example: '내일 날씨를 예측하기는 어렵다.', type: 'sino' },
  { word: '협동', hanja: '協同', meaning: '서로 마음과 힘을 하나로 합함', example: '우리 모둠은 협동해서 과제를 끝냈다.', type: 'sino' },
  { word: '존중', hanja: '尊重', meaning: '높이어 귀중하게 대함', example: '친구의 의견도 존중해야 한다.', type: 'sino' },
  { word: '기록', hanja: '記錄', meaning: '뒤에 남기려고 사실을 적음', example: '매일 읽은 책을 공책에 기록했다.', type: 'sino' },
  { word: '집중', hanja: '集中', meaning: '한 가지 일에 마음과 힘을 모음', example: '수업에 집중하니 이해가 잘 됐다.', type: 'sino' },
  { word: '비교', hanja: '比較', meaning: '둘 이상을 견주어 공통점과 차이점을 살핌', example: '두 이야기를 비교하며 읽었다.', type: 'sino' },
  { word: '반성', hanja: '反省', meaning: '자기의 말과 행동을 돌이켜 살핌', example: '실수를 반성하고 다음엔 조심했다.', type: 'sino' },
  { word: '독창적', hanja: '獨創的', meaning: '남을 따라 하지 않고 새롭게 만들어 내는', example: '그림에 독창적인 생각을 담았다.', type: 'sino' },
  { word: '풍부', hanja: '豐富', meaning: '넉넉하고 많음', example: '책을 많이 읽으면 어휘가 풍부해진다.', type: 'sino' },
  { word: '신중', hanja: '愼重', meaning: '매우 조심스럽고 진중함', example: '중요한 결정은 신중하게 해야 한다.', type: 'sino' },
  { word: '용기', hanja: '勇氣', meaning: '겁내지 않는 씩씩한 마음', example: '용기를 내어 발표에 손을 들었다.', type: 'sino' },
  { word: '질서', hanja: '秩序', meaning: '혼란 없이 이루어지는 순서나 차례', example: '급식을 받을 때 질서를 지켰다.', type: 'sino' },
  { word: '배려', hanja: '配慮', meaning: '남을 도와주거나 마음을 써 줌', example: '몸이 아픈 친구를 배려해 자리를 양보했다.', type: 'sino' },
  { word: '탐구', hanja: '探究', meaning: '깊이 파고들어 연구함', example: '궁금한 것을 끝까지 탐구했다.', type: 'sino' },
  { word: '성실', hanja: '誠實', meaning: '정성스럽고 참됨', example: '성실하게 숙제를 해 오는 친구다.', type: 'sino' },
  { word: '주장', hanja: '主張', meaning: '자기 의견을 굳게 내세움', example: '글쓴이의 주장을 찾아 밑줄을 그었다.', type: 'sino' },
  { word: '근거', hanja: '根據', meaning: '어떤 주장이 옳음을 뒷받침하는 까닭', example: '주장에는 알맞은 근거가 필요하다.', type: 'sino' },

  // ── 사자성어 ──
  { word: '유비무환', hanja: '有備無患', meaning: '미리 준비가 되어 있으면 걱정할 것이 없음', example: '유비무환이라고, 미리 공부해 두니 시험이 쉬웠다.', type: 'idiom' },
  { word: '작심삼일', hanja: '作心三日', meaning: '결심이 사흘을 못 감', example: '운동하겠다는 다짐이 작심삼일로 끝났다.', type: 'idiom' },
  { word: '십중팔구', hanja: '十中八九', meaning: '열 중 여덟이나 아홉. 거의 대부분', example: '이렇게 하면 십중팔구 성공한다.', type: 'idiom' },
  { word: '일석이조', hanja: '一石二鳥', meaning: '한 가지 일로 두 가지 이익을 얻음', example: '산책은 건강도 챙기고 기분도 좋아지는 일석이조다.', type: 'idiom' },
  { word: '자업자득', hanja: '自業自得', meaning: '자기가 저지른 일의 결과를 자기가 받음', example: '미루다 혼난 건 자업자득이다.', type: 'idiom' },
  { word: '동고동락', hanja: '同苦同樂', meaning: '괴로움도 즐거움도 함께함', example: '우리 반은 일 년 동안 동고동락한 사이다.', type: 'idiom' },
  { word: '다다익선', hanja: '多多益善', meaning: '많으면 많을수록 좋음', example: '좋은 책은 다다익선이다.', type: 'idiom' },
  { word: '고진감래', hanja: '苦盡甘來', meaning: '고생 끝에 즐거움이 옴', example: '고진감래라더니 열심히 하니 상을 받았다.', type: 'idiom' },
  { word: '역지사지', hanja: '易地思之', meaning: '처지를 바꾸어 상대의 입장에서 생각함', example: '다툴 때는 역지사지로 생각해 보자.', type: 'idiom' },
  { word: '설상가상', hanja: '雪上加霜', meaning: '어려운 일이 겹쳐서 일어남', example: '비가 오는데 설상가상으로 우산까지 잃어버렸다.', type: 'idiom' },
  { word: '금상첨화', hanja: '錦上添花', meaning: '좋은 일에 또 좋은 일이 더해짐', example: '맛도 좋은데 몸에도 좋으니 금상첨화다.', type: 'idiom' },
  { word: '대기만성', hanja: '大器晩成', meaning: '큰 그릇은 늦게 만들어짐. 크게 될 사람은 늦게 이루어짐', example: '대기만성이라니 조급해하지 말자.', type: 'idiom' },
  { word: '우유부단', hanja: '優柔不斷', meaning: '망설이기만 하고 결단을 내리지 못함', example: '우유부단하면 기회를 놓치기 쉽다.', type: 'idiom' },
  { word: '전화위복', hanja: '轉禍爲福', meaning: '나쁜 일이 바뀌어 오히려 복이 됨', example: '넘어진 게 전화위복이 되어 새 친구를 사귀었다.', type: 'idiom' },
  { word: '백문불여일견', hanja: '百聞不如一見', meaning: '백 번 듣는 것이 한 번 보는 것만 못함', example: '백문불여일견이니 직접 가서 보자.', type: 'idiom' },

  // ── 순우리말 ──
  { word: '아름드리', meaning: '두 팔을 벌려 안아야 할 만큼 큰', example: '공원에 아름드리 느티나무가 서 있다.', type: 'native' },
  { word: '가없다', meaning: '끝이 없다', example: '부모님의 사랑은 가없이 넓다.', type: 'native' },
  { word: '오롯이', meaning: '모자람 없이 온전하게', example: '주말을 오롯이 책 읽는 데 썼다.', type: 'native' },
  { word: '함초롬', meaning: '젖거나 서려 있는 모습이 가지런하고 차분한 모양', example: '풀잎이 이슬에 함초롬 젖어 있다.', type: 'native' },
  { word: '시나브로', meaning: '모르는 사이에 조금씩', example: '시나브로 실력이 늘고 있었다.', type: 'native' },
  { word: '올곧다', meaning: '마음이 정직하고 바르다', example: '그 친구는 올곧은 성격이다.', type: 'native' },
  { word: '설레발', meaning: '몹시 서두르며 부산하게 구는 행동', example: '설레발 치지 말고 차분히 하자.', type: 'native' },
  { word: '어름', meaning: '두 물건의 끝이 맞닿은 자리', example: '하늘과 바다의 어름이 붉게 물들었다.', type: 'native' },
  { word: '해거름', meaning: '해가 서쪽으로 넘어가는 무렵', example: '해거름에 집으로 돌아왔다.', type: 'native' },
  { word: '도탑다', meaning: '서로의 정이 두텁다', example: '두 사람의 우정이 도탑다.', type: 'native' },
  { word: '곰비임비', meaning: '물건이 자꾸 쌓이거나 일이 겹치는 모양', example: '좋은 일이 곰비임비 생겼다.', type: 'native' },
  { word: '푸르대다', meaning: '자꾸 성을 내며 말하다', example: '괜히 푸르대지 말고 이야기로 풀자.', type: 'native' },
  { word: '너나들이', meaning: '서로 너니 나니 하며 허물없이 지내는 사이', example: '우리는 너나들이하는 오랜 친구다.', type: 'native' },
  { word: '살갑다', meaning: '마음씨가 부드럽고 다정하다', example: '동생은 늘 살갑게 인사한다.', type: 'native' },
  { word: '옹골지다', meaning: '실속 있게 속이 꽉 차 있다', example: '작아도 옹골진 열매가 열렸다.', type: 'native' },
]
