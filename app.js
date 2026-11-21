/* ========================================================
   채식요리추천 - 자바스크립트 로직 (app.js)
   내장 레시피 데이터베이스, 추천 알고리즘, 반응형 인터랙션
   ======================================================== */

/* 1. IN-MEMORY RECIPE DATABASE (16 Seasonal Vegetarian Dishes) */
const RECIPES = [
  {
    id: "dish-01",
    name: "들깨 버섯 순두부탕",
    season: ["가을", "겨울"],
    time: 15,
    calories: 240,
    difficulty: "쉬움",
    keyIngredients: ["버섯", "두부", "순두부", "들깨가루", "대파", "마늘"],
    extraIngredients: ["들기름 1큰술", "국간장 1큰술", "소금 약간", "물 400ml"],
    reason: "쌀쌀한 날씨에 몸을 따뜻하게 보호해 주는 최고의 면역식입니다. 제철 버섯의 깊은 감칠맛과 들깨의 풍부한 오메가3 불포화지방산이 어우러져 자극 없이 속을 든든하게 채워줍니다.",
    nutrition: {
      calories: "240kcal",
      protein: "14g",
      fiber: "6.2g",
      key: "오메가3",
      description: [
        "순두부의 풍부한 식물성 이소플라본과 단백질이 소화 부담 없이 든든한 에너지를 줍니다.",
        "들깨의 리놀렌산(오메가3)이 혈관 탄력을 돕고 뇌 피로를 개선합니다.",
        "버섯의 베타글루칸 성분이 가을·겨울철 면역 체계를 강화합니다."
      ]
    },
    steps: [
      "냄비에 들기름을 살짝 두르고 송송 썬 대파와 다진 마늘을 볶아 고소한 파기름 향을 냅니다.",
      "먹기 좋게 찢은 버섯(표고, 느타리, 팽이버섯 등)을 넣고 1분간 가볍게 볶아 숨을 죽입니다.",
      "물 400ml를 붓고 끓어오르면 순두부(또는 두부)를 큼직하게 숟가락으로 떠 넣습니다.",
      "국간장 1큰술과 소금 한 꼬집으로 간을 맞춘 뒤, 고소한 들깨가루 2큰술을 듬뿍 풀어 2분간 보글보글 끓여 완성합니다."
    ]
  },
  {
    id: "dish-02",
    name: "알배기 배추 된장 덮밥",
    season: ["가을", "겨울"],
    time: 15,
    calories: 285,
    difficulty: "아주 쉬움",
    keyIngredients: ["배추", "된장", "두부", "양파", "대파", "마늘"],
    extraIngredients: ["참기름 1큰술", "전분물 1큰술", "물 100ml", "통깨"],
    reason: "늦가을 찬 바람을 맞아 달콤함이 무르익은 알배기 배추와 구수한 된장의 환상적인 조화입니다. 위장에 부담을 주지 않으면서도 풍부한 수분과 식이섬유로 장을 편안하게 정돈해 줍니다.",
    nutrition: {
      calories: "285kcal",
      protein: "13g",
      fiber: "7.5g",
      key: "비타민C",
      description: [
        "알배기 배추의 풍부한 비타민C는 가열해도 쉽게 파괴되지 않아 피로 회복을 돕습니다.",
        "재래 된장의 발효 유익균이 장내 미생물 생태계를 건강하게 지켜줍니다.",
        "칼륨이 풍부하여 체내 불필요한 노폐물과 나트륨 배출에 탁월합니다."
      ]
    },
    steps: [
      "알배기 배추는 깨끗이 씻어 한 입 크기로 숭덩숭덩 자르고, 두부는 1.5cm 큐브로 깍둑썰기합니다.",
      "팬에 기름을 두르고 다진 파와 마늘을 볶다가 배추 줄기부터 넣어 센 불에서 아삭하게 볶습니다.",
      "된장 1큰술과 물 100ml를 잘 풀어 부어주고, 썰어둔 두부를 넣어 자작하게 2분간 졸입니다.",
      "물 1큰술에 전분 0.5큰술을 섞은 전분물을 둘러 윤기 있게 농도를 맞춘 뒤, 참기름을 뿌려 따끈한 밥 위에 얹어 즐깁니다."
    ]
  },
  {
    id: "dish-03",
    name: "매콤달콤 만능 가지 덮밥",
    season: ["여름", "가을"],
    time: 15,
    calories: 310,
    difficulty: "쉬움",
    keyIngredients: ["가지", "양파", "대파", "마늘", "간장", "고춧가루"],
    extraIngredients: ["올리고당 1큰술", "참기름 1큰술", "식용유 2큰술", "통깨"],
    reason: "제철 가지 특유의 부드러운 과육이 매콤달콤한 불맛 양념을 쏙 흡수해 고기 부럽지 않은 든든한 풍미를 선사합니다. 조리 시간이 15분으로 매우 짧아 바쁜 날에도 훌륭한 한 끼가 됩니다.",
    nutrition: {
      calories: "310kcal",
      protein: "8g",
      fiber: "5.8g",
      key: "안토시아닌",
      description: [
        "가지의 보랏빛 껍질에 가득한 안토시아닌(나스닌)은 강력한 항산화 작용으로 혈관을 깨끗하게 해줍니다.",
        "열을 내려주는 성질이 있어 신체 활력을 증진하고 눈의 피로를 덜어줍니다.",
        "수분 함량이 90% 이상으로 칼로리 부담 없이 수분을 풍부하게 보충해 줍니다."
      ]
    },
    steps: [
      "가지는 반으로 갈라 어슷하게 큼직하게 썰고, 양파는 굵게 채 썰어 줍니다.",
      "달군 팬에 기름을 넉넉히 두르고 대파를 넣어 향긋한 파기름을 충분히 냅니다.",
      "가지와 양파를 넣고 강불에서 기름이 겉면에 코팅되도록 1분간 빠르게 볶습니다.",
      "간장 1.5큰술, 고춧가루 1큰술, 올리고당 1큰술, 다진마늘을 섞은 양념장을 팬 가장자리에 둘러 불맛을 입힌 후 밥 위에 얹어 마무리합니다."
    ]
  },
  {
    id: "dish-04",
    name: "단호박 견과류 조림 & 웜샐러드",
    season: ["가을", "겨울"],
    time: 20,
    calories: 225,
    difficulty: "쉬움",
    keyIngredients: ["단호박", "견과류", "올리브유", "간장"],
    extraIngredients: ["올리고당 또는 꿀 2큰술", "소금 한 꼬집", "물 50ml"],
    reason: "달콤하고 포슬포슬한 제철 단호박은 가을·겨울철 대표 보약입니다. 지용성 비타민이 가득한 단호박을 견과류와 함께 섭취하면 영양 흡수율이 3배 이상 극대화됩니다.",
    nutrition: {
      calories: "225kcal",
      protein: "5.5g",
      fiber: "6.8g",
      key: "베타카로틴",
      description: [
        "풍부한 베타카로틴이 체내에서 비타민A로 전환되어 호흡기 점막과 환절기 피부를 보호합니다.",
        "루테인 성분이 스마트폰으로 지친 눈 건강을 지켜줍니다.",
        "견과류의 필수 불포화지방산이 두뇌 건강과 콜레스테롤 개선을 돕습니다."
      ]
    },
    steps: [
      "단호박을 전자레인지에 통째로 2분간 돌려 부드럽게 만든 뒤, 속의 씨를 숟가락으로 긁어내고 한 입 크기로 썹니다.",
      "팬에 올리브유 1큰술을 두르고 단호박을 중불에서 겉면이 노릇해지도록 3분간 굴려가며 굽습니다.",
      "물 50ml, 간장 1작은술, 올리고당 2큰술을 넣고 뚜껑을 덮어 약불에서 5분간 속까지 포슬포슬하게 익힙니다.",
      "호두나 아몬드 등 준비한 견과류를 넣고 소스가 윤기 나게 코팅되도록 센 불에 1분간 조려 따뜻하게 냅니다."
    ]
  },
  {
    id: "dish-05",
    name: "아삭 쫀득 연근 간장 조림 스테이크",
    season: ["가을", "겨울"],
    time: 20,
    calories: 210,
    difficulty: "보통",
    keyIngredients: ["연근", "간장", "올리고당", "참기름", "통깨"],
    extraIngredients: ["식용유 2큰술", "식초 1큰술(데침용)", "물 4큰술"],
    reason: "땅속 보물 연근의 아삭하고 쫀득한 식감을 그대로 살린 고급 채식 요리입니다. 연근 표면의 뮤신 성분이 위벽을 보호하여 속 쓰림을 예방하고 포만감을 오래 유지시켜 줍니다.",
    nutrition: {
      calories: "210kcal",
      protein: "4.2g",
      fiber: "5.4g",
      key: "뮤신·탄닌",
      description: [
        "연근 속 끈적한 뮤신 성분이 위 점막을 감싸 소화 불량과 위염을 예방합니다.",
        "탄닌 성분이 함유되어 소염 및 수렴 작용으로 체내 염증 완화에 도움을 줍니다.",
        "레몬에 버금가는 비타민C가 들어있어 면역력 증진에 탁월합니다."
      ]
    },
    steps: [
      "연근은 껍질을 벗긴 후 1cm 두께로 도톰하게 썰고, 식초 1큰술을 넣은 끓는 물에 2분간 살짝 데쳐 아린 맛을 제거합니다.",
      "달군 팬에 기름을 넉넉히 두르고 데친 연근을 올려 앞뒤로 노릇노릇하고 바삭하게 굽습니다.",
      "간장 2큰술, 물 4큰술, 올리고당 2큰술을 붓고 약불에서 소스가 연근 겉면에 진한 갈색으로 코팅될 때까지 졸입니다.",
      "국물이 자작해지면 불을 끄고 참기름과 통깨를 솔솔 뿌려 스테이크처럼 도톰하게 즐깁니다."
    ]
  },
  {
    id: "dish-06",
    name: "바삭 촉촉 찹쌀 두부 강정",
    season: ["사계절"],
    time: 20,
    calories: 340,
    difficulty: "보통",
    keyIngredients: ["두부", "마늘", "간장", "고추장"],
    extraIngredients: ["전분가루 3큰술", "케첩 1큰술", "올리고당 2큰술", "식용유"],
    reason: "집에 흔히 있는 두부 한 모로 전문점 양념치킨 못지않은 바삭하고 쫀득한 핑거푸드를 완성합니다. 양질의 식물성 단백질을 맛있게 섭취할 수 있어 남녀노소 모두가 사랑하는 메뉴입니다.",
    nutrition: {
      calories: "340kcal",
      protein: "18.5g",
      fiber: "4.0g",
      key: "고단백질",
      description: [
        "두부 한 모에 풍부한 식물성 고단백질과 필수 아미노산이 근육 건강과 기초대사량을 지켜줍니다.",
        "칼슘과 마그네슘이 풍부하여 뼈 건강과 신경 안정에 도움을 줍니다.",
        "육류 대비 포화지방과 콜레스테롤이 없어 혈관에 매우 안전합니다."
      ]
    },
    steps: [
      "두부는 키친타월로 꼭꼭 눌러 수분을 충분히 제거한 후 한 입 크기 큐브로 썰어 소금 한 꼬집을 뿌립니다.",
      "위생백에 전분가루 3큰술과 썰어둔 두부를 넣고 공기를 넣어 흔들며 겉면에 전분 옷을 골고루 입힙니다.",
      "팬에 기름을 넉넉히 두르고 두부를 올려 모든 면이 노릇하고 바삭해질 때까지 튀기듯 굽습니다.",
      "고추장 0.5큰술, 케첩 1큰술, 간장 1큰술, 올리고당 2큰술, 다진마늘을 살짝 끓인 양념에 구운 두부를 넣고 재빨리 버무려 냅니다."
    ]
  },
  {
    id: "dish-07",
    name: "달큰한 겨울 무나물 들깨 볶음",
    season: ["가을", "겨울"],
    time: 15,
    calories: 165,
    difficulty: "아주 쉬움",
    keyIngredients: ["무", "들깨가루", "들기름", "마늘", "대파"],
    extraIngredients: ["소금 0.5작은술", "물 50ml", "통깨"],
    reason: "겨울 무는 '밭에서 나는 천연 소화제'라 불릴 만큼 당도와 수분이 뛰어납니다. 무 특유의 천연 소화효소가 위를 편안하게 해주고 들기름과 들깨가 담백함을 극대화합니다.",
    nutrition: {
      calories: "165kcal",
      protein: "4.5g",
      fiber: "5.5g",
      key: "디아스타아제",
      description: [
        "무에 함유된 디아스타아제 효소가 탄수화물 분해를 촉진해 소화 불량을 말끔히 해소합니다.",
        "식이섬유 리그닌이 장운동을 활발하게 만들어 변비 예방에 탁월합니다.",
        "풍부한 비타민C와 시니그린 성분이 기관지 점막을 튼튼하게 보호합니다."
      ]
    },
    steps: [
      "무는 결을 따라 0.5cm 두께로 일정하게 채를 썰어 부서짐을 방지합니다.",
      "달군 냄비에 들기름 1.5큰술과 다진마늘을 넣고 볶다가 채 썬 무와 소금 0.5작은술을 넣고 중불에서 볶습니다.",
      "무에서 수분이 나오기 시작하면 물 50ml를 붓고 뚜껑을 덮어 약불에서 3분간 나른하게 뜸을 들입니다.",
      "무가 투명하게 익으면 들깨가루 2큰술과 송송 썬 대파를 넣고 가볍게 섞어 따뜻하게 담아냅니다."
    ]
  },
  {
    id: "dish-08",
    name: "토마토 시금치 두부 오일 파스타/볶음",
    season: ["봄", "여름", "사계절"],
    time: 15,
    calories: 275,
    difficulty: "쉬움",
    keyIngredients: ["시금치", "토마토", "두부", "마늘", "올리브유"],
    extraIngredients: ["소금 한 꼬집", "후추 약간", "페페론치노 또는 고춧가루"],
    reason: "봄·사계절 활력을 채워주는 시금치의 철분과 토마토의 라이코펜이 완벽한 시너지를 내는 지중해풍 채식 볶음입니다. 기름에 익힌 토마토가 항산화 성분의 흡수율을 4배 이상 높여줍니다.",
    nutrition: {
      calories: "275kcal",
      protein: "14g",
      fiber: "5.0g",
      key: "라이코펜·철분",
      description: [
        "토마토의 라이코펜은 활성산소를 억제해 노화 방지와 심혈관 보호에 핵심적인 역할을 합니다.",
        "시금치의 철분과 엽산이 빈혈을 예방하고 활기찬 에너지를 채워줍니다.",
        "단백질이 풍부한 두부면이나 으깬 두부를 더해 탄수화물 부담 없는 다이어트 건강식이 됩니다."
      ]
    },
    steps: [
      "편으로 썬 마늘을 올리브유 3큰술을 두른 팬에 넣고 약불에서 은은하게 볶아 마늘 기름을 냅니다.",
      "반으로 자른 방울토마토(또는 깍둑 썬 완숙 토마토)를 넣고 껍질이 살짝 쭈글해질 때까지 볶아 즙을 냅니다.",
      "물기를 뺀 두부(두부면 또는 깍둑 썬 단단한 두부)와 소금, 후추를 넣고 소스가 잘 배어들도록 1분간 볶습니다.",
      "깨끗이 씻은 시금치를 넣고 센 불에서 딱 30초만 빠르게 숨을 죽여 초록빛 생명력을 살려 완성합니다."
    ]
  },
  {
    id: "dish-09",
    name: "포슬포슬 감자 버섯 된장찌개",
    season: ["사계절"],
    time: 20,
    calories: 215,
    difficulty: "쉬움",
    keyIngredients: ["감자", "버섯", "된장", "양파", "대파", "마늘"],
    extraIngredients: ["청양고추 1개(선택)", "물 500ml", "다시마 한 조각"],
    reason: "포슬포슬한 햇감자와 쫄깃한 버섯이 진하게 우러난 된장찌개는 사계절 언제나 든든한 한국인의 소울푸드입니다. 풍부한 칼륨이 몸의 붓기와 피로를 씻은 듯이 덜어줍니다.",
    nutrition: {
      calories: "215kcal",
      protein: "9.5g",
      fiber: "6.0g",
      key: "칼륨·비타민B",
      description: [
        "감자의 풍부한 칼륨이 나트륨과 노폐물을 체외로 배출시켜 부종을 가라앉힙니다.",
        "된장의 발효 펩타이드가 항산화 및 면역력 강화에 긍정적인 영향을 줍니다.",
        "감자의 판토텐산과 비타민C가 스트레스 완화와 위 점막 보호를 돕습니다."
      ]
    },
    steps: [
      "감자와 양파는 한 입 크기로 깍둑썰기하고, 버섯은 결대로 먹기 좋게 찢어 준비합니다.",
      "냄비에 물 500ml와 단단한 감자를 먼저 넣고 끓여 감자 속까지 부드럽게 익힙니다.",
      "물이 끓어오르면 된장 1.5큰술을 체에 걸러 맑게 풀고, 썰어둔 버섯과 양파, 다진마늘을 넣습니다.",
      "중약불에서 7분간 보글보글 끓인 후 송송 썬 대파를 넣고 한소끔 더 끓여 구수하게 차려냅니다."
    ]
  },
  {
    id: "dish-10",
    name: "향긋한 우엉 버섯 영양 솥밥",
    season: ["가을", "겨울"],
    time: 30,
    calories: 330,
    difficulty: "보통",
    keyIngredients: ["우엉", "버섯", "간장", "들기름"],
    extraIngredients: ["쌀 1컵", "물 1컵 미만", "통깨", "대파 양념장"],
    reason: "가을·겨울철 깊은 땅의 기운을 담은 우엉과 버섯의 진한 풍미가 밥알 하나하나에 배어든 최고급 영양식입니다. 천연 인슐린이라 불리는 이눌린이 혈당 스파이크를 막아줍니다.",
    nutrition: {
      calories: "330kcal",
      protein: "7.8g",
      fiber: "8.2g",
      key: "이눌린(혈당케어)",
      description: [
        "우엉의 이눌린 성분은 소화 효소에 분해되지 않아 식후 급격한 혈당 상승을 자연스럽게 억제합니다.",
        "버섯의 비타민D 전구체 에르고스테롤이 칼슘 흡수를 도와 뼈를 튼튼하게 합니다.",
        "풍부한 수용성·불용성 식이섬유가 장내 노폐물을 깨끗하게 비워줍니다."
      ]
    },
    steps: [
      "우엉은 칼등으로 껍질을 살살 긁어내어 어슷하게 채 썰고, 버섯도 먹기 좋게 채 썰어 둡니다.",
      "냄비에 들기름 1큰술을 두르고 우엉과 간장 1큰술을 넣어 2분간 볶아 특유의 흙냄새를 구수한 향으로 바꿉니다.",
      "불린 쌀 위에 볶은 우엉과 버섯을 평평하게 얹고 일반 밥물보다 약간 적게 물을 맞춥니다.",
      "중불에서 끓이다가 밥물이 잦아들면 약불로 줄여 12분, 불을 끄고 5분간 뜸을 들여 섞어 먹습니다."
    ]
  },
  {
    id: "dish-11",
    name: "단호박 두부 크리미 스프",
    season: ["가을", "겨울"],
    time: 20,
    calories: 210,
    difficulty: "쉬움",
    keyIngredients: ["단호박", "두부", "양파", "올리브유"],
    extraIngredients: ["물 1컵", "소금 0.5작은술", "두유 반 컵(선택)", "후추"],
    reason: "버터나 생크림 없이도 두부의 고소함과 단호박의 천연 단맛으로 벨벳처럼 부드러운 질감을 낸 비건 힐링 스프입니다. 지친 소화기관을 따뜻하고 편안하게 감싸 안아줍니다.",
    nutrition: {
      calories: "210kcal",
      protein: "10.5g",
      fiber: "5.5g",
      key: "비타민A·칼륨",
      description: [
        "단호박의 풍부한 펙틴 성분이 위벽을 보호하고 이뇨 작용을 촉진해 부기를 싹 빼줍니다.",
        "두부의 식물성 단백질이 스프에 크리미한 질감과 포만감을 동시에 더해줍니다.",
        "소화 흡수율이 95% 이상으로 속이 더부룩할 때 가장 이상적인 회복식입니다."
      ]
    },
    steps: [
      "채 썬 양파를 올리브유에 갈색빛이 돌 때까지 충분히 볶아 천연 캐러멜 단맛을 끌어올립니다.",
      "전자레인지에 살짝 돌려 껍질을 벗긴 단호박과 물 1컵을 넣고 단호박이 푹 무를 때까지 8분간 삶습니다.",
      "믹서기나 블렌더에 익힌 단호박, 볶은 양파, 부드러운 두부 1/4모를 넣고 곱고 부드럽게 갈아줍니다.",
      "냄비에 다시 부어 약불에서 살짝 저어가며 끓인 뒤 소금과 후추로 간을 맞춰 따스하게 즐깁니다."
    ]
  },
  {
    id: "dish-12",
    name: "고소한 브로콜리 으깬두부 버무리",
    season: ["가을", "겨울", "사계절"],
    time: 10,
    calories: 175,
    difficulty: "아주 쉬움",
    keyIngredients: ["브로콜리", "두부", "마늘", "참기름", "통깨"],
    extraIngredients: ["소금 0.5작은술", "국간장 0.5작은술"],
    reason: "슈퍼푸드 브로콜리와 담백한 두부를 으깨어 고소한 참기름에 버무린 10분 완성 웰빙 반찬입니다. 불을 거의 쓰지 않고도 씹을수록 깊은 고소함과 풍부한 영양을 만끽할 수 있습니다.",
    nutrition: {
      calories: "175kcal",
      protein: "12.0g",
      fiber: "4.8g",
      key: "설포라판(항암)",
      description: [
        "브로콜리의 설포라판 성분은 세계 10대 슈퍼푸드로 꼽히는 강력한 항암·항산화 물질입니다.",
        "레몬의 2배에 달하는 비타민C가 피로 회복과 피부 톤 개선을 촉진합니다.",
        "두부와 통깨의 식물성 칼슘과 단백질이 조화롭게 결합되어 뼈 건강을 지켜줍니다."
      ]
    },
    steps: [
      "브로콜리는 작은 송이로 잘라 끓는 소금물에 40초간 살짝 데친 후 찬물에 헹궈 물기를 꽉 짭니다.",
      "두부 반 모는 면포나 키친타월로 꼭 짜서 수분을 뺀 뒤 포크나 칼등으로 곱게 으깹니다.",
      "볼에 손질한 브로콜리와 으깬 두부를 넣고 다진마늘 약간, 소금 0.5작은술로 간을 맞춥니다.",
      "참기름 1큰술과 갓 빻은 통깨를 듬뿍 넣어 조물조물 가볍게 버무려 내면 완성됩니다."
    ]
  },
  {
    id: "dish-13",
    name: "아삭 매콤 콩나물 버섯 찜",
    season: ["사계절"],
    time: 20,
    calories: 190,
    difficulty: "보통",
    keyIngredients: ["버섯", "양파", "대파", "고춧가루", "간장", "마늘"],
    extraIngredients: ["콩나물 또는 숙주 1봉", "전분물 2큰술", "참기름 1큰술", "물 반 컵"],
    reason: "해물이나 고기 없이도 쫄깃한 버섯과 아삭한 채소만으로 해물찜 이상의 감칠맛을 내는 매콤한 일품요리입니다. 칼로리 부담 없이 땀을 쏙 빼며 스트레스를 날려줍니다.",
    nutrition: {
      calories: "190kcal",
      protein: "9.0g",
      fiber: "7.0g",
      key: "아스파라긴산",
      description: [
        "콩나물의 아스파라긴산이 간 해독과 피로 물질 분해를 강력하게 도와줍니다.",
        "고추의 캡사이신이 신진대사를 촉진하여 체지방 연소를 유도합니다.",
        "버섯의 식이섬유가 포만감을 극대화하여 늦은 저녁 식사로도 안성맞춤입니다."
      ]
    },
    steps: [
      "냄비 바닥에 깨끗이 씻은 콩나물을 깔고 도톰하게 썬 버섯과 양파를 넉넉히 올립니다.",
      "물 반 컵을 붓고 뚜껑을 덮은 뒤 센 불에서 김이 오를 때까지 3분간 찝니다.",
      "고춧가루 2큰술, 간장 2큰술, 올리고당 1큰술, 다진마늘 1큰술 양념장을 넣고 주걱으로 고루 볶습니다.",
      "불을 줄이고 전분물 2큰술을 둘러 걸쭉하게 농도를 맞춘 뒤 참기름과 통깨를 둘러 매콤하게 완성합니다."
    ]
  },
  {
    id: "dish-14",
    name: "양파 캐러멜라이징 덮밥 & 두부 부침",
    season: ["사계절"],
    time: 15,
    calories: 310,
    difficulty: "쉬움",
    keyIngredients: ["양파", "두부", "간장", "마늘"],
    extraIngredients: ["올리고당 1큰술", "식용유", "김가루", "참기름"],
    reason: "식재료의 기본인 양파 하나만으로 레스토랑 덮밥 요리를 연출합니다. 약불에서 천천히 볶아 단맛이 농축된 양파의 퀘르세틴 성분이 혈관을 맑게 청소해 줍니다.",
    nutrition: {
      calories: "310kcal",
      protein: "13.5g",
      fiber: "4.5g",
      key: "퀘르세틴(혈관청소)",
      description: [
        "양파의 퀘르세틴 성분이 혈관 벽에 쌓인 콜레스테롤과 중성지방을 분해합니다.",
        "유화아릴 성분이 혈액 순환을 원활하게 하고 몸을 따뜻하게 데워줍니다.",
        "두부 부침을 곁들여 양질의 식물성 단백질과 부드러운 식감을 완벽히 채웁니다."
      ]
    },
    steps: [
      "양파 1개 반을 결대로 얇게 채 썰어 준비하고, 두부는 도톰하게 썰어 노릇하게 부쳐둡니다.",
      "팬에 기름을 두르고 채 썬 양파를 중약불에서 갈색빛이 날 때까지 6~7분간 정성껏 볶아 단맛을 극대화합니다.",
      "물 3큰술, 간장 1.5큰술, 올리고당 1큰술, 다진마늘 약간을 붓고 양파가 소스를 흠뻑 머금을 때까지 조립니다.",
      "따뜻한 밥 위에 조린 양파 소스를 듬뿍 얹고, 노릇한 두부 부침과 김가루를 올려 비벼 먹습니다."
    ]
  },
  {
    id: "dish-15",
    name: "향긋한 미나리 팽이버섯 바삭전",
    season: ["봄", "여름"],
    time: 15,
    calories: 220,
    difficulty: "쉬움",
    keyIngredients: ["버섯", "양파", "마늘"],
    extraIngredients: ["미나리(또는 부추) 1줌", "부침가루 4큰술", "물 4큰술", "식용유"],
    reason: "나른한 계절에 활력을 불어넣는 미나리의 향긋함과 팽이버섯의 쫄깃한 식감이 어우러진 바삭한 전입니다. 밀가루 양을 최소화하여 속이 편안하고 깔끔합니다.",
    nutrition: {
      calories: "220kcal",
      protein: "5.5g",
      fiber: "5.0g",
      key: "퀘르시트린(해독)",
      description: [
        "미나리의 퀘르시트린 성분이 체내 중금속과 독소를 흡착해 배출하는 천연 해독제 역할을 합니다.",
        "팽이버섯의 풍부한 키토산이 중성지방 분해를 도와 체중 조절에 좋습니다.",
        "봄철 춘곤증을 날려주는 풍부한 비타민A와 칼륨이 가득합니다."
      ]
    },
    steps: [
      "미나리는 깨끗이 씻어 4cm 길이로 썰고, 팽이버섯은 밑동을 잘라 가닥가닥 찢어줍니다.",
      "볼에 부침가루 4큰술과 찬물 4큰술을 섞어 채소들이 살짝만 엉길 정도로 묽은 반죽물을 만듭니다.",
      "팬에 식용유를 넉넉히 두르고 달군 뒤, 반죽에 버무린 미나리와 팽이버섯을 얇고 넓게 펼쳐 올립니다.",
      "센 불에서 겉면이 바삭해지면 뒤집어 앞뒤로 노릇노릇하게 구워 초간장에 곁들여 냅니다."
    ]
  },
  {
    id: "dish-16",
    name: "아삭 상큼 오이 미역 냉채 & 비빔국수",
    season: ["여름", "봄"],
    time: 12,
    calories: 140,
    difficulty: "아주 쉬움",
    keyIngredients: ["마늘", "간장"],
    extraIngredients: ["오이 1개", "불린 미역 1줌", "식초 2큰술", "매실액 1큰술", "통깨"],
    reason: "갈증을 단번에 날려주고 몸의 열을 차분하게 식혀주는 청량한 여름철 제철 메뉴입니다. 미역의 풍부한 미네랄과 오이의 풍부한 수분이 신진대사를 깨워줍니다.",
    nutrition: {
      calories: "140kcal",
      protein: "3.5g",
      fiber: "4.8g",
      key: "알긴산·엽록소",
      description: [
        "미역의 알긴산(수용성 식이섬유)이 혈관 내 중성지방과 노폐물을 흡착해 밖으로 내보냅니다.",
        "오이의 풍부한 칼륨과 수분이 이뇨 작용을 촉진하고 체온을 시원하게 조절해 줍니다.",
        "초저칼로리로 식후 혈당 부담이 전혀 없으며 활력을 채워줍니다."
      ]
    },
    steps: [
      "불린 미역은 끓는 물에 10초간 살짝 데친 후 찬물에 헹궈 물기를 꼭 짭니다.",
      "오이는 가늘게 채 썰거나 얇게 어슷썰기하여 준비합니다.",
      "식초 2큰술, 매실액(또는 올리고당) 1큰술, 간장 0.5큰술, 다진마늘 0.3큰술을 섞어 상큼한 새콤 소스를 만듭니다.",
      "볼에 오이와 미역을 담고 소스를 부어 가볍게 버무린 뒤 얼음 두 조각과 통깨를 띄워 시원하게 즐깁니다."
    ]
  }
];

/* 2. APP STATE MANAGEMENT */
const AppState = {
  selectedSeason: "all",
  selectedIngredients: new Set(),
  maxCookingTime: 25,
  matchedCandidates: [],
  currentCandidateIndex: 0
};

/* Helper function to check ingredient synonym matching */
function normalizeWord(word) {
  return word.trim().toLowerCase().replace(/\s+/g, "");
}

function matchesIngredient(needle, target) {
  const n = normalizeWord(needle);
  const t = normalizeWord(target);
  return t.includes(n) || n.includes(t);
}

/* 3. DOM ELEMENTS */
// Screens
const screenIntro = document.getElementById("screen-intro");
const screenInput = document.getElementById("screen-input");
const screenResult = document.getElementById("screen-result");

// Screen 1 controls
const btnStart = document.getElementById("btn-start");

// Screen 2 controls
const btnBackToIntro = document.getElementById("btn-back-to-intro");
const btnResetInput = document.getElementById("btn-reset-input");
const seasonTabs = document.querySelectorAll(".season-tab");
const customIngredientInput = document.getElementById("custom-ingredient-input");
const btnAddIngredient = document.getElementById("btn-add-ingredient");
const selectedTagsContainer = document.getElementById("selected-tags-container");
const tagCountLabel = document.getElementById("tag-count-label");
const quickPillButtons = document.querySelectorAll(".pill-btn");
const cookingTimeSlider = document.getElementById("cooking-time-slider");
const sliderTimeDisplay = document.getElementById("slider-time-display");
const timePresetBtns = document.querySelectorAll(".preset-btn");
const btnSubmitRecommend = document.getElementById("btn-submit-recommend");

// Screen 3 controls
const btnBackToInput = document.getElementById("btn-back-to-input");
const btnShareRecipe = document.getElementById("btn-share-recipe");
const btnRetryDifferent = document.getElementById("btn-retry-different");
const btnReEditIngredients = document.getElementById("btn-re-edit-ingredients");
const candidateCountText = document.getElementById("candidate-count-text");

// Result display fields
const resSeasonText = document.getElementById("res-season-text");
const resMatchRate = document.getElementById("res-match-rate");
const resDishName = document.getElementById("res-dish-name");
const resCookTime = document.getElementById("res-cook-time");
const resCalories = document.getElementById("res-calories");
const resDifficulty = document.getElementById("res-difficulty");
const resReasonText = document.getElementById("res-reason-text");
const resNutriCal = document.getElementById("res-nutri-cal");
const resNutriProtein = document.getElementById("res-nutri-protein");
const resNutriFiber = document.getElementById("res-nutri-fiber");
const resNutriKey = document.getElementById("res-nutri-key");
const resNutritionDesc = document.getElementById("res-nutrition-desc");
const resMatchedIngredients = document.getElementById("res-matched-ingredients");
const resExtraIngredients = document.getElementById("res-extra-ingredients");
const resRecipeSteps = document.getElementById("res-recipe-steps");

// Toast
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toast-message");

/* 4. NAVIGATION LOGIC */
function switchScreen(screenToShow) {
  [screenIntro, screenInput, screenResult].forEach(s => s.classList.remove("active"));
  screenToShow.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(msg) {
  toastMessage.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

/* 5. INGREDIENT & TAG MANAGEMENT */
function addIngredient(ingr) {
  const trimmed = ingr.trim();
  if (!trimmed) return;
  if (AppState.selectedIngredients.has(trimmed)) {
    showToast(`'${trimmed}'(은)는 이미 추가된 재료입니다.`);
    return;
  }
  AppState.selectedIngredients.add(trimmed);
  renderTags();
  syncQuickPills();
}

function removeIngredient(ingr) {
  AppState.selectedIngredients.delete(ingr);
  renderTags();
  syncQuickPills();
}

function renderTags() {
  selectedTagsContainer.innerHTML = "";
  const list = Array.from(AppState.selectedIngredients);

  if (list.length === 0) {
    selectedTagsContainer.innerHTML = '<span class="empty-tags-hint">냉장고 속 재료를 입력하거나 아래 추천 재료를 터치하세요.</span>';
    tagCountLabel.textContent = "0개 선택됨";
    tagCountLabel.style.color = "var(--text-muted)";
    return;
  }

  tagCountLabel.textContent = `${list.length}개 선택됨`;
  tagCountLabel.style.color = "var(--primary)";

  list.forEach(ingr => {
    const chip = document.createElement("span");
    chip.className = "tag-chip";
    chip.innerHTML = `
      <span>${ingr}</span>
      <button class="remove-btn" type="button" aria-label="${ingr} 삭제">×</button>
    `;
    chip.querySelector(".remove-btn").addEventListener("click", () => {
      removeIngredient(ingr);
    });
    selectedTagsContainer.appendChild(chip);
  });
}

function syncQuickPills() {
  quickPillButtons.forEach(btn => {
    const ingr = btn.getAttribute("data-ingredient");
    if (AppState.selectedIngredients.has(ingr)) {
      btn.classList.add("selected");
    } else {
      btn.classList.remove("selected");
    }
  });
}

/* 6. SLIDER & FILTER LOGIC */
function updateSliderDisplay(val) {
  AppState.maxCookingTime = parseInt(val, 10);
  let label = `최대 ${val}분 이내`;
  if (val <= 15) {
    label = `최대 15분 (초간단 초스피드)`;
  } else if (val >= 40) {
    label = `최대 ${val}분 (정성 가득 요리)`;
  }
  sliderTimeDisplay.textContent = label;

  // sync preset buttons
  timePresetBtns.forEach(btn => {
    if (parseInt(btn.getAttribute("data-time"), 10) === AppState.maxCookingTime) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

/* 7. RECOMMENDATION ALGORITHM */
function calculateRecommendations() {
  const userIngredients = Array.from(AppState.selectedIngredients);
  const season = AppState.selectedSeason;
  const maxTime = AppState.maxCookingTime;

  const scored = RECIPES.map(recipe => {
    let score = 0;
    let matchedList = [];

    // 1. Calculate Ingredient Match
    if (userIngredients.length > 0) {
      userIngredients.forEach(uIngr => {
        const isMatched = recipe.keyIngredients.some(rIngr => matchesIngredient(uIngr, rIngr));
        if (isMatched) {
          score += 25;
          matchedList.push(uIngr);
        }
      });
    } else {
      score += 10;
    }

    // 2. Season Match Bonus
    if (season === "all" || recipe.season.includes(season) || recipe.season.includes("사계절")) {
      score += 15;
    }

    // 3. Cooking Time Score
    if (recipe.time <= maxTime) {
      score += 10;
    } else {
      score -= (recipe.time - maxTime) * 1.5;
    }

    // Match rate percentage calculation
    let matchRate = 0;
    if (userIngredients.length > 0) {
      matchRate = Math.min(100, Math.round((matchedList.length / Math.max(1, recipe.keyIngredients.length)) * 100));
      if (matchedList.length > 0 && matchRate < 40) matchRate = 50;
    } else {
      matchRate = 100;
    }

    return {
      recipe,
      score,
      matchedList,
      matchRate
    };
  });

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  AppState.matchedCandidates = scored;
  AppState.currentCandidateIndex = 0;
}

/* 8. DISPLAY RESULT */
function renderCurrentRecipe() {
  if (!AppState.matchedCandidates || AppState.matchedCandidates.length === 0) {
    calculateRecommendations();
  }

  const total = AppState.matchedCandidates.length;
  const current = AppState.matchedCandidates[AppState.currentCandidateIndex];
  const item = current.recipe;
  const matched = current.matchedList;

  // Header counter
  candidateCountText.textContent = `추천 메뉴 ${AppState.currentCandidateIndex + 1} / ${total} (터치하여 다른 메뉴 확인 가능)`;

  // Season badge
  resSeasonText.textContent = item.season.join('·') + " 제철 채식";

  // Match rate display
  if (AppState.selectedIngredients.size > 0) {
    if (matched.length > 0) {
      resMatchRate.textContent = `재료 일치율 ${current.matchRate}%`;
      resMatchRate.style.background = "#FFE082";
      resMatchRate.style.color = "#5D4037";
    } else {
      resMatchRate.textContent = "제철 추천 베스트";
      resMatchRate.style.background = "#C8E6C9";
      resMatchRate.style.color = "#1B5E20";
    }
  } else {
    resMatchRate.textContent = "제철 건강식";
    resMatchRate.style.background = "#C8E6C9";
    resMatchRate.style.color = "#1B5E20";
  }

  // Dish Hero Info
  resDishName.textContent = item.name;
  resCookTime.textContent = `조리 약 ${item.time}분`;
  resCalories.textContent = `약 ${item.calories} kcal`;
  resDifficulty.textContent = `난이도 ${item.difficulty}`;

  // Reason Text
  let dynamicReason = item.reason;
  if (matched.length > 0) {
    dynamicReason = `입력하신 [${matched.join(', ')}]을(를) 활용하기에 가장 안성맞춤인 요리입니다. ${item.reason}`;
  }
  resReasonText.textContent = dynamicReason;

  // Nutrition values
  resNutriCal.textContent = item.nutrition.calories;
  resNutriProtein.textContent = item.nutrition.protein;
  resNutriFiber.textContent = item.nutrition.fiber;
  resNutriKey.textContent = item.nutrition.key;

  // Nutrition bullet description
  resNutritionDesc.innerHTML = item.nutrition.description
    .map(desc => `• ${desc}`)
    .join('<br>');

  // Matched vs Extra Ingredients
  resMatchedIngredients.innerHTML = "";
  if (matched.length > 0) {
    matched.forEach(ingr => {
      const span = document.createElement("span");
      span.className = "ingr-item-chip matched";
      span.textContent = `✓ ${ingr}`;
      resMatchedIngredients.appendChild(span);
    });
  } else {
    const span = document.createElement("span");
    span.className = "ingr-item-chip extra";
    span.textContent = "선택된 재료 외 추천 식재료 사용";
    resMatchedIngredients.appendChild(span);
  }

  resExtraIngredients.innerHTML = "";
  // Display remaining recipe ingredients
  item.keyIngredients.forEach(kIngr => {
    if (!matched.some(m => matchesIngredient(m, kIngr))) {
      const span = document.createElement("span");
      span.className = "ingr-item-chip extra";
      span.textContent = `+ ${kIngr}`;
      resExtraIngredients.appendChild(span);
    }
  });
  item.extraIngredients.forEach(extra => {
    const span = document.createElement("span");
    span.className = "ingr-item-chip extra";
    span.textContent = extra;
    resExtraIngredients.appendChild(span);
  });

  // Step-by-step recipe steps
  resRecipeSteps.innerHTML = "";
  item.steps.forEach((step, idx) => {
    const stepDiv = document.createElement("div");
    stepDiv.className = "step-item";
    stepDiv.innerHTML = `
      <div class="step-num">${idx + 1}</div>
      <div class="step-text">${step}</div>
    `;
    resRecipeSteps.appendChild(stepDiv);
  });
}

/* 9. EVENT LISTENERS */
// Screen 1: Start
btnStart.addEventListener("click", () => {
  switchScreen(screenInput);
});

// Screen 2: Navigation & Reset
btnBackToIntro.addEventListener("click", () => {
  switchScreen(screenIntro);
});

btnResetInput.addEventListener("click", () => {
  AppState.selectedIngredients.clear();
  AppState.selectedSeason = "all";
  seasonTabs.forEach(tab => {
    tab.classList.toggle("active", tab.getAttribute("data-season") === "all");
  });
  updateSliderDisplay(25);
  cookingTimeSlider.value = 25;
  renderTags();
  syncQuickPills();
  showToast("입력 조건이 초기화되었습니다.");
});

// Season Tabs
seasonTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    seasonTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    AppState.selectedSeason = tab.getAttribute("data-season");
  });
});

// Add custom ingredient input
function handleAddCustom() {
  const val = customIngredientInput.value;
  if (val.trim()) {
    addIngredient(val);
    customIngredientInput.value = "";
    customIngredientInput.focus();
  }
}

btnAddIngredient.addEventListener("click", handleAddCustom);
customIngredientInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    handleAddCustom();
  }
});

// Quick pill clicks
quickPillButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const ingr = btn.getAttribute("data-ingredient");
    if (AppState.selectedIngredients.has(ingr)) {
      removeIngredient(ingr);
    } else {
      addIngredient(ingr);
    }
  });
});

// Slider change
cookingTimeSlider.addEventListener("input", (e) => {
  updateSliderDisplay(e.target.value);
});

// Preset buttons
timePresetBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const val = btn.getAttribute("data-time");
    cookingTimeSlider.value = val;
    updateSliderDisplay(val);
  });
});

// Submit / Show Result
btnSubmitRecommend.addEventListener("click", () => {
  calculateRecommendations();
  renderCurrentRecipe();
  switchScreen(screenResult);
});

// Screen 3: "다시 고르기" (Pick another recipe)
btnRetryDifferent.addEventListener("click", () => {
  if (AppState.matchedCandidates.length <= 1) {
    showToast("더 이상 추천 가능한 다른 메뉴가 없습니다.");
    return;
  }
  AppState.currentCandidateIndex = (AppState.currentCandidateIndex + 1) % AppState.matchedCandidates.length;
  renderCurrentRecipe();
  window.scrollTo({ top: 0, behavior: "smooth" });
  showToast("새로운 추천 메뉴를 불러왔습니다! 🌿");
});

// Return to editing ingredients
btnBackToInput.addEventListener("click", () => {
  switchScreen(screenInput);
});
btnReEditIngredients.addEventListener("click", () => {
  switchScreen(screenInput);
});

// Share / Copy Recipe
btnShareRecipe.addEventListener("click", () => {
  const current = AppState.matchedCandidates[AppState.currentCandidateIndex]?.recipe;
  if (!current) return;

  const textToCopy = `[채식요리추천] ${current.name}\n- 조리시간: ${current.time}분 (${current.calories} kcal)\n- 추천 이유: ${current.reason}\n- 재료: ${current.keyIngredients.join(', ')}\n- 조리법:\n${current.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast("레시피 내용이 클립보드에 복사되었습니다! 📋");
    }).catch(() => {
      showToast("클립보드 접근이 제한되어 있습니다.");
    });
  } else {
    showToast("레시피가 복사되었습니다!");
  }
});

// Initial initialization
updateSliderDisplay(25);
renderTags();
syncQuickPills();
