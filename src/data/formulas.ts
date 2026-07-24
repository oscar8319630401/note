/**
 * 초등 6학년 수학 공식 데이터.
 * 6학년 교육과정의 핵심 공식(분수 나눗셈, 원, 각기둥·각뿔, 비와 비율, 부피·겉넓이 등)을 담았다.
 * type로 영역을 구분한다. 매일 몇 개씩 바뀌며 복습에 쓴다.
 */

export type FormulaArea = 'number' | 'measure' | 'ratio' | 'shape'

export interface Formula {
  title: string
  formula: string // 공식 (기호는 텍스트로)
  meaning: string // 설명
  example: string // 예시
  area: FormulaArea
}

export const AREA_LABEL: Record<FormulaArea, { label: string; emoji: string; color: string }> = {
  number: { label: '수와 연산', emoji: '➗', color: '#3f8cff' },
  measure: { label: '측정', emoji: '📐', color: '#e8615d' },
  ratio: { label: '비와 비율', emoji: '⚖️', color: '#a06bf0' },
  shape: { label: '도형', emoji: '🧊', color: '#2bb673' },
}

export const FORMULAS: Formula[] = [
  // ── 수와 연산 ──
  {
    title: '분수의 나눗셈',
    formula: '(가/나) ÷ (다/라) = (가/나) × (라/다)',
    meaning: '분수로 나눌 때는 나누는 분수를 뒤집어(역수) 곱한다.',
    example: '2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6',
    area: 'number',
  },
  {
    title: '분수 ÷ 자연수',
    formula: '(가/나) ÷ 다 = 가 / (나 × 다)',
    meaning: '분모에 나누는 수를 곱한다.',
    example: '3/4 ÷ 2 = 3 / (4×2) = 3/8',
    area: 'number',
  },
  {
    title: '소수의 나눗셈',
    formula: '소수 ÷ 소수 = 두 수에 같은 10, 100…을 곱해 자연수 나눗셈으로',
    meaning: '나누는 수가 자연수가 되도록 소수점을 같이 옮긴다.',
    example: '1.5 ÷ 0.3 = 15 ÷ 3 = 5',
    area: 'number',
  },

  // ── 비와 비율 ──
  {
    title: '비율',
    formula: '비율 = 비교하는 양 ÷ 기준량',
    meaning: '기준량에 대한 비교하는 양의 크기.',
    example: '20에 대한 5의 비율 = 5 ÷ 20 = 0.25',
    area: 'ratio',
  },
  {
    title: '백분율',
    formula: '백분율(%) = 비율 × 100',
    meaning: '비율을 100을 기준으로 나타낸 것.',
    example: '0.25 × 100 = 25%',
    area: 'ratio',
  },
  {
    title: '비례식',
    formula: '가 : 나 = 다 : 라  →  가 × 라 = 나 × 다',
    meaning: '비례식에서 바깥쪽 곱과 안쪽 곱은 같다.',
    example: '2 : 3 = 4 : 6  →  2×6 = 3×4 = 12',
    area: 'ratio',
  },
  {
    title: '비의 값',
    formula: '가 : 나 의 비의 값 = 가 ÷ 나 = 가/나',
    meaning: '비를 하나의 수로 나타낸 값.',
    example: '3 : 4 의 비의 값 = 3/4',
    area: 'ratio',
  },

  // ── 측정 (원, 부피, 겉넓이) ──
  {
    title: '원주 (원의 둘레)',
    formula: '원주 = 지름 × 원주율(3.14) = 2 × 반지름 × 3.14',
    meaning: '원의 둘레는 지름에 원주율을 곱한다.',
    example: '지름 10cm → 원주 = 10 × 3.14 = 31.4cm',
    area: 'measure',
  },
  {
    title: '원의 넓이',
    formula: '원의 넓이 = 반지름 × 반지름 × 3.14',
    meaning: '반지름을 두 번 곱하고 원주율을 곱한다.',
    example: '반지름 5cm → 5 × 5 × 3.14 = 78.5cm²',
    area: 'measure',
  },
  {
    title: '직육면체의 부피',
    formula: '부피 = 가로 × 세로 × 높이',
    meaning: '세 모서리의 길이를 모두 곱한다.',
    example: '2 × 3 × 4 = 24cm³',
    area: 'measure',
  },
  {
    title: '정육면체의 부피',
    formula: '부피 = 한 모서리 × 한 모서리 × 한 모서리',
    meaning: '한 모서리를 세 번 곱한다.',
    example: '한 모서리 3cm → 3×3×3 = 27cm³',
    area: 'measure',
  },
  {
    title: '직육면체의 겉넓이',
    formula: '겉넓이 = (가로×세로 + 세로×높이 + 가로×높이) × 2',
    meaning: '세 종류 면의 넓이를 더해 2배 한다.',
    example: '2×3 + 3×4 + 2×4 = 6+12+8 = 26 → ×2 = 52cm²',
    area: 'measure',
  },
  {
    title: '각기둥의 부피',
    formula: '부피 = 밑넓이 × 높이',
    meaning: '밑면의 넓이에 높이를 곱한다.',
    example: '밑넓이 12cm², 높이 5cm → 12 × 5 = 60cm³',
    area: 'measure',
  },
  {
    title: '원기둥의 부피',
    formula: '부피 = 밑넓이 × 높이 = (반지름 × 반지름 × 3.14) × 높이',
    meaning: '원 모양 밑면의 넓이에 높이를 곱한다.',
    example: '반지름 2cm, 높이 5cm → (2×2×3.14) × 5 = 62.8cm³',
    area: 'measure',
  },
  {
    title: '평균',
    formula: '평균 = 자료 값의 합 ÷ 자료의 개수',
    meaning: '전체를 고르게 나눈 값.',
    example: '(80+90+100) ÷ 3 = 270 ÷ 3 = 90',
    area: 'measure',
  },

  // ── 도형 ──
  {
    title: '각기둥의 성질',
    formula: '(면의 수) = 밑면 2 + 옆면,  (모서리 수) = 밑면 변의 수 × 3',
    meaning: '밑면이 n각형이면 면 n+2개, 모서리 3n개, 꼭짓점 2n개.',
    example: '삼각기둥: 면 5, 모서리 9, 꼭짓점 6',
    area: 'shape',
  },
  {
    title: '각뿔의 성질',
    formula: '(면의 수) = 밑면 1 + 옆면,  (모서리 수) = 밑면 변의 수 × 2',
    meaning: '밑면이 n각형이면 면 n+1개, 모서리 2n개, 꼭짓점 n+1개.',
    example: '사각뿔: 면 5, 모서리 8, 꼭짓점 5',
    area: 'shape',
  },
  {
    title: '쌓기나무 개수',
    formula: '전체 개수 = 각 층에 놓인 나무 개수의 합',
    meaning: '위·앞·옆에서 본 모양으로 각 자리의 개수를 세어 더한다.',
    example: '1층 5개 + 2층 2개 = 7개',
    area: 'shape',
  },
]
