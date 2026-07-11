const STORAGE_KEY = "sahabat-kit-state-v1";
const CHECK_KEY = "sahabat-kit-checks-v1";
const PREP_KEY = "sahabat-kit-prep-v1";
const HAS_LOCAL_STATE_AT_BOOT = Boolean(localStorage.getItem(STORAGE_KEY));
const NAMEBOOK_KEY = "volunteer-kit-namebook-v1";
const SYNC_KEY = "volunteer-kit-sync-v1";
const DB_NAME = "sahabat-kit-files";
const DB_VERSION = 1;
const APP_CONFIG = window.VOLUNTEER_CONFIG || {};
const SUPABASE_URL = APP_CONFIG.SUPABASE_URL || "";
const SUPABASE_ANON_KEY = APP_CONFIG.SUPABASE_ANON_KEY || "";
const GOOGLE_MAPS_API_KEY = APP_CONFIG.GOOGLE_MAPS_API_KEY || "";
const DEFAULT_TEAM_CODE = "INDO2026";
const DEFAULT_MAP_CENTER = { lat: -7.7956, lng: 110.3695 };
const STORAGE_BUCKET = "volunteer-files";
const TEAM_STATE_FILE = "team-state.json";
const BASIC_PHRASE_PACK_VERSION = 2;

const iconPaths = {
  logoCompass: '<rect x="1.6" y="1.6" width="20.8" height="20.8" rx="5.2" fill="#ffffff" stroke="#e5edf0" stroke-width=".45"/><path d="M2 16.6c3.2-.9 5.5.5 8.5.6 3.4.1 5.8-1.7 11.3-1.1v6.1H2z" fill="#dff7f4" stroke="none"/><path d="M12 18.4C8 15.1 5.4 12.5 5.4 9.1a4 4 0 0 1 4-4c1 0 2 .4 2.7 1.2.7-.8 1.6-1.2 2.7-1.2a4 4 0 0 1 4 4c0 3.4-2.8 6.1-6.8 9.3z" fill="none" stroke="#14b8ad" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.6 14.5l1.7-4.5 4.5-1.7-1.7 4.5-4.5 1.7z" fill="#14b8ad" stroke="none"/><circle cx="12.7" cy="11.3" r=".62" fill="#ffffff" stroke="none"/><path d="M18.4 5.5l2.2-.8-.8 2.2z" fill="#ff6f61" stroke="none"/><circle cx="12" cy="3.3" r="1.05" fill="#14b8ad" stroke="none"/><circle cx="4.6" cy="12.4" r=".9" fill="#14b8ad" stroke="none"/><circle cx="19.5" cy="13.1" r=".9" fill="#14b8ad" stroke="none"/>',
  spark: '<path d="M12 2l1.4 5.1L18 9l-4.6 1.9L12 16l-1.4-5.1L6 9l4.6-1.9L12 2z"/><path d="M5 14l.8 2.8L8.5 18l-2.7 1.2L5 22l-.8-2.8L1.5 18l2.7-1.2L5 14z"/>',
  download: '<path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/>',
  upload: '<path d="M12 21V9"/><path d="M7 14l5-5 5 5"/><path d="M5 3h14"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
  wifi: '<path d="M5 13a10 10 0 0 1 14 0"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M12 20h.01"/>',
  database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
  calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  locate: '<path d="M12 2v4"/><path d="M12 18v4"/><path d="M2 12h4"/><path d="M18 12h4"/><circle cx="12" cy="12" r="4"/>',
  mapPin: '<path d="M12 21s7-5.1 7-11a7 7 0 0 0-14 0c0 5.9 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  cloud: '<path d="M17.5 19H7a5 5 0 0 1-.9-9.9A7 7 0 0 1 19 12.2 3.5 3.5 0 0 1 17.5 19z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M4.93 19.07l1.41-1.41"/><path d="M17.66 6.34l1.41-1.41"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  message: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"/>',
  helmet: '<path d="M3 18h18"/><path d="M5 18v-5a7 7 0 0 1 14 0v5"/><path d="M9 18V9"/><path d="M15 18V9"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v11h14V10"/><path d="M9 21v-7h6v7"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  x: '<path d="M18 6L6 18"/><path d="M6 6l12 12"/>',
  star: '<path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21 7 14.2 2 9.3l6.9-1L12 2z"/>',
  trash: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 15H6L5 6"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><rect x="2" y="2" width="13" height="13" rx="2"/>',
  external: '<path d="M14 3h7v7"/><path d="M10 14L21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/>'
};

const sampleState = {
  settings: {
    teamName: "Today Volunteer",
    location: "Yogyakarta, Indonesia",
    dateRange: "2026.07.12 - 07.20",
    startDate: "2026-07-12",
    endDate: "2026-07-20",
    baseAddress: "",
    leaderPhone: "",
    theme: "teal"
  },
  phrases: [
    {
      id: crypto.randomUUID(),
      category: "인사",
      ko: "안녕하세요. 우리는 한국 봉사팀입니다.",
      idn: "Halo. Kami tim relawan dari Korea.",
      pron: "Halo. Kami tim relawan dari Korea.",
      note: "현지 파트너를 처음 만날 때 사용해요.",
      tags: ["기초", "소개"],
      favorite: true
    },
    {
      id: crypto.randomUUID(),
      category: "수업",
      ko: "잘했어요. 한 번 더 해볼까요?",
      idn: "Bagus. Mau coba sekali lagi?",
      pron: "Bagus. Mau coba sekali lagi?",
      note: "아이들을 격려할 때 사용해요.",
      tags: ["수업", "아이들"],
      favorite: true
    },
    {
      id: crypto.randomUUID(),
      category: "건축",
      ko: "조심하세요. 여기는 위험해요.",
      idn: "Hati-hati. Di sini berbahaya.",
      pron: "Hati-hati. Di sini berbahaya.",
      note: "건축 현장 주변에서 사용해요.",
      tags: ["안전", "현장"],
      favorite: true
    }
  ],
  lessons: [
    {
      id: crypto.randomUUID(),
      title: "색깔 빙고",
      subject: "영어와 미술",
      age: "초등",
      duration: "25분",
      materials: "색깔 카드, 스티커",
      goal: "아이들이 간단한 게임으로 색깔 단어를 익혀요.",
      steps: ["색깔 카드 보여주기", "색깔 단어 따라 말하기", "빙고 놀이하기", "모두 칭찬하기"],
      phrases: ["Bagus!", "Warna apa ini?", "Ayo coba lagi."]
    }
  ],
  checklist: [
    { id: crypto.randomUUID(), text: "장갑, 안전화, 모자 착용 확인", category: "안전" },
    { id: crypto.randomUUID(), text: "물, 그늘, 휴식 위치 확인", category: "건강" },
    { id: crypto.randomUUID(), text: "오늘 작업 구역과 위험 지점 공유", category: "현장" }
  ],
  contacts: [
    { id: crypto.randomUUID(), name: "팀장", role: "한국 팀장", phone: "", note: "팀 설정에서 연락처를 입력하세요." },
    { id: crypto.randomUUID(), name: "숙소", role: "베이스캠프", phone: "", note: "팀 설정에서 주소를 입력하세요." }
  ],
  prepItems: [
    { id: "visa", label: "비자" },
    { id: "passport", label: "여권" },
    { id: "goods", label: "해피무브 굿즈" },
    { id: "earphones", label: "이어폰" }
  ],
  schedules: [
    { id: crypto.randomUUID(), time: "19:00", endTime: "22:00", title: "호텔 체크인", place: "호텔", type: "팀" }
  ]
};

const basicPhrasePack = [
  { id: "basic-greeting-hello", category: "인사", ko: "안녕하세요", idn: "Halo.", pron: "하로", note: "가장 기본 인사", tags: ["기초", "인사"], favorite: false },
  { id: "basic-greeting-thanks", category: "인사", ko: "감사합니다", idn: "Terima kasih.", pron: "뜨리마 까시", note: "고마움을 표현할 때", tags: ["기초", "인사"], favorite: false },
  { id: "basic-greeting-sorry", category: "인사", ko: "죄송합니다", idn: "Maaf.", pron: "마아프", note: "사과할 때", tags: ["기초", "인사"], favorite: false },
  { id: "basic-greeting-good-morning", category: "인사", ko: "좋은 아침입니다", idn: "Selamat pagi.", pron: "슬라맛 빠기", note: "아침 인사", tags: ["기초", "인사"], favorite: false },
  { id: "basic-greeting-good-afternoon", category: "인사", ko: "좋은 오후입니다", idn: "Selamat siang.", pron: "슬라맛 시앙", note: "낮 인사", tags: ["기초", "인사"], favorite: false },
  { id: "basic-greeting-good-evening", category: "인사", ko: "좋은 저녁입니다", idn: "Selamat malam.", pron: "슬라맛 말람", note: "저녁 인사", tags: ["기초", "인사"], favorite: false },
  { id: "basic-greeting-bye", category: "인사", ko: "또 만나요", idn: "Sampai jumpa.", pron: "삼빠이 줌빠", note: "헤어질 때", tags: ["기초", "인사"], favorite: false },
  { id: "basic-greeting-name", category: "인사", ko: "제 이름은 민지입니다", idn: "Nama saya Minji.", pron: "나마 사야 민지", note: "이름을 소개할 때 이름만 바꿔 말하기", tags: ["기초", "소개"], favorite: false },

  { id: "basic-life-yes", category: "생활", ko: "네", idn: "Ya.", pron: "야", note: "긍정 대답", tags: ["기초", "생활"], favorite: false },
  { id: "basic-life-no", category: "생활", ko: "아니요", idn: "Tidak.", pron: "띠닥", note: "부정 대답", tags: ["기초", "생활"], favorite: false },
  { id: "basic-life-okay", category: "생활", ko: "괜찮아요", idn: "Tidak apa-apa.", pron: "띠닥 아빠아빠", note: "괜찮다고 말할 때", tags: ["기초", "생활"], favorite: false },
  { id: "basic-life-dont-know", category: "생활", ko: "잘 모르겠어요", idn: "Saya kurang tahu.", pron: "사야 꾸랑 따후", note: "모를 때", tags: ["기초", "생활"], favorite: false },
  { id: "basic-life-wait", category: "생활", ko: "잠시만요", idn: "Sebentar ya.", pron: "스븐따르 야", note: "잠깐 기다려 달라고 할 때", tags: ["기초", "생활"], favorite: false },
  { id: "basic-life-water", category: "생활", ko: "물 주세요", idn: "Minta air.", pron: "민따 아이르", note: "물을 요청할 때", tags: ["기초", "생활"], favorite: false },
  { id: "basic-life-restroom", category: "생활", ko: "화장실 어디예요?", idn: "Toilet di mana?", pron: "또일렛 디 마나", note: "화장실을 찾을 때", tags: ["기초", "생활"], favorite: false },
  { id: "basic-life-where-is-it", category: "생활", ko: "어디 있어요?", idn: "Di mana?", pron: "디 마나", note: "장소나 물건 위치를 물을 때", tags: ["기초", "생활", "질문"], favorite: false },
  { id: "basic-life-what-is-this", category: "생활", ko: "이거 뭐예요?", idn: "Ini apa?", pron: "이니 아빠", note: "물건이나 상황을 물을 때", tags: ["기초", "생활", "질문"], favorite: false },
  { id: "basic-life-how-much", category: "생활", ko: "얼마예요?", idn: "Berapa harganya?", pron: "브라빠 하르가냐", note: "가격을 물을 때", tags: ["기초", "생활", "질문"], favorite: false },
  { id: "basic-life-can-i-use", category: "생활", ko: "써도 돼요?", idn: "Boleh saya pakai?", pron: "볼레 사야 빠까이", note: "물건을 사용해도 되는지 물을 때", tags: ["기초", "생활", "질문"], favorite: false },
  { id: "basic-life-need-this", category: "생활", ko: "이거 필요해요", idn: "Saya perlu ini.", pron: "사야 쁘를루 이니", note: "필요한 물건을 말할 때", tags: ["기초", "생활"], favorite: false },
  { id: "basic-life-no-need", category: "생활", ko: "필요 없어요", idn: "Tidak perlu.", pron: "띠닥 쁘를루", note: "필요하지 않을 때", tags: ["기초", "생활"], favorite: false },
  { id: "basic-life-where-go", category: "생활", ko: "어디로 가요?", idn: "Ke mana?", pron: "끄 마나", note: "이동 방향을 물을 때", tags: ["기초", "생활", "질문"], favorite: false },
  { id: "basic-life-right-here", category: "생활", ko: "여기예요", idn: "Di sini.", pron: "디 시니", note: "위치를 알려줄 때", tags: ["기초", "생활"], favorite: false },
  { id: "basic-life-there", category: "생활", ko: "저기예요", idn: "Di sana.", pron: "디 사나", note: "조금 떨어진 곳을 가리킬 때", tags: ["기초", "생활"], favorite: false },
  { id: "basic-life-help", category: "생활", ko: "도와주세요", idn: "Tolong bantu.", pron: "똘롱 반뚜", note: "도움이 필요할 때", tags: ["기초", "긴급", "생활"], favorite: false },
  { id: "basic-life-slow", category: "생활", ko: "천천히 말해주세요", idn: "Tolong bicara pelan-pelan.", pron: "똘롱 비짜라 쁠란쁠란", note: "말이 빠를 때", tags: ["기초", "생활"], favorite: false },
  { id: "basic-life-repeat", category: "생활", ko: "다시 말해주세요", idn: "Tolong ulangi.", pron: "똘롱 울랑이", note: "다시 듣고 싶을 때", tags: ["기초", "생활"], favorite: false },
  { id: "basic-life-delicious", category: "생활", ko: "맛있어요", idn: "Enak.", pron: "에낙", note: "음식 칭찬", tags: ["기초", "생활"], favorite: false },

  { id: "basic-class-listen", category: "수업", ko: "잘 들어주세요", idn: "Tolong dengarkan.", pron: "똘롱 등아르깐", note: "수업 시작 전", tags: ["수업", "아이들"], favorite: false },
  { id: "basic-class-look", category: "수업", ko: "여기를 봐주세요", idn: "Lihat ke sini.", pron: "리핫 끄 시니", note: "시범을 보여줄 때", tags: ["수업", "아이들"], favorite: false },
  { id: "basic-class-repeat", category: "수업", ko: "따라 해보세요", idn: "Ikuti saya.", pron: "이꾸띠 사야", note: "따라 말하기/동작", tags: ["수업", "아이들"], favorite: false },
  { id: "basic-class-say-together", category: "수업", ko: "같이 말해요", idn: "Kita ucapkan bersama.", pron: "끼따 우짭깐 버르사마", note: "다 같이 말할 때", tags: ["수업", "아이들"], favorite: false },
  { id: "basic-class-one-more", category: "수업", ko: "한 번 더 해요", idn: "Sekali lagi.", pron: "스깔리 라기", note: "반복 활동", tags: ["수업", "아이들"], favorite: false },
  { id: "basic-class-good", category: "수업", ko: "잘했어요", idn: "Bagus.", pron: "바구스", note: "아이들 칭찬", tags: ["수업", "아이들", "칭찬"], favorite: false },
  { id: "basic-class-very-good", category: "수업", ko: "정말 잘했어요", idn: "Bagus sekali.", pron: "바구스 스깔리", note: "강하게 칭찬", tags: ["수업", "아이들", "칭찬"], favorite: false },
  { id: "basic-class-its-okay", category: "수업", ko: "괜찮아요", idn: "Tidak apa-apa.", pron: "띠닥 아빠아빠", note: "실수한 아이를 안심시킬 때", tags: ["수업", "아이들"], favorite: false },
  { id: "basic-class-try", category: "수업", ko: "해볼까요?", idn: "Mau coba?", pron: "마우 초바", note: "참여를 유도할 때", tags: ["수업", "아이들"], favorite: false },
  { id: "basic-class-your-turn", category: "수업", ko: "네 차례예요", idn: "Giliran kamu.", pron: "길리란 까무", note: "순서 안내", tags: ["수업", "아이들"], favorite: false },
  { id: "basic-class-sit", category: "수업", ko: "앉아주세요", idn: "Silakan duduk.", pron: "실라깐 두둑", note: "교실 정리", tags: ["수업", "아이들"], favorite: false },
  { id: "basic-class-stand", category: "수업", ko: "일어나주세요", idn: "Silakan berdiri.", pron: "실라깐 버르디리", note: "활동 시작", tags: ["수업", "아이들"], favorite: false },
  { id: "basic-class-quiet", category: "수업", ko: "조용히 해주세요", idn: "Tolong tenang.", pron: "똘롱 뜨낭", note: "수업 분위기 정리", tags: ["수업", "아이들"], favorite: false },
  { id: "basic-class-draw", category: "수업", ko: "그려보세요", idn: "Coba gambar.", pron: "초바 감바르", note: "미술 수업", tags: ["수업", "아이들", "미술"], favorite: false },
  { id: "basic-class-color", category: "수업", ko: "색칠해보세요", idn: "Coba warnai.", pron: "초바 와르나이", note: "미술 활동", tags: ["수업", "아이들", "미술"], favorite: false },
  { id: "basic-class-finish", category: "수업", ko: "끝났어요", idn: "Sudah selesai.", pron: "수다 슬르사이", note: "활동 종료", tags: ["수업", "아이들"], favorite: false }
];

let state = loadState();
let filesCache = [];
let activeRoute = "home";
let itemMode = "phrase";
let editingItemId = null;
let deferredInstallPrompt = null;
let timerSeconds = 300;
let timerRemaining = 300;
let timerId = null;
let currentPosition = null;
let currentPlaceLabel = "";
let syncSession = loadSyncSession();
let syncTimerId = null;
let remoteWriteInProgress = false;
let googleMap = null;
let googleMapMarker = null;
let googleMapsLoading = null;
let nameNotes = loadNameNotes();

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function init() {
  renderIcons();
  currentPosition = null;
  if (googleMap) {
    googleMap.setCenter(DEFAULT_MAP_CENTER);
    googleMap.setZoom(11);
    if (googleMapMarker) googleMapMarker.setPosition(DEFAULT_MAP_CENTER);
  }
  applyTheme();
  bindEvents();
  hydrateSettingsForm();
  hydrateSyncForm();
  openDatabase().then(loadFiles).then(render).catch(() => render());
  updateOfflineStatus();
  registerServiceWorker();
  connectSupabaseTeam({ silent: true });
  initGoogleMap();
}

function renderIcons() {
  $$("[data-icon]").forEach((node) => {
    const name = node.dataset.icon;
    node.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || ""}</svg>`;
  });
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      const initial = structuredClone(sampleState);
      initial.phrases = appendMissingPhrases(initial.phrases, basicPhrasePack);
      initial.basicPhrasePackVersion = BASIC_PHRASE_PACK_VERSION;
      return initial;
    }
    const parsed = JSON.parse(saved);
    const savedList = (key) => (Array.isArray(parsed[key]) ? parsed[key] : sampleState[key]);
    const loaded = {
      ...structuredClone(sampleState),
      ...parsed,
      settings: { ...sampleState.settings, ...(parsed.settings || {}) },
      phrases: savedList("phrases"),
      lessons: savedList("lessons"),
      checklist: savedList("checklist"),
      contacts: savedList("contacts"),
      prepItems: savedList("prepItems"),
      schedules: savedList("schedules")
    };
    if (["Sahabat Kit", "Volunteer Kit", "Indonesia Volunteer Team"].includes(loaded.settings.teamName)) {
      loaded.settings.teamName = "Today Volunteer";
    }
    const normalizedLegacyText = normalizeLegacyKoreanText(loaded);
    loaded.settings.startDate = formatDateInput(parseStartDate(loaded.settings.dateRange)) || loaded.settings.startDate || "";
    loaded.settings.endDate = formatDateInput(parseEndDate(loaded.settings.dateRange)) || loaded.settings.endDate || "";
    if ((loaded.basicPhrasePackVersion || 0) < BASIC_PHRASE_PACK_VERSION) {
      loaded.phrases = appendMissingPhrases(loaded.phrases, basicPhrasePack);
      loaded.basicPhrasePackVersion = BASIC_PHRASE_PACK_VERSION;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loaded));
    } else if (normalizedLegacyText) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loaded));
    }
    return loaded;
  } catch {
    const fallback = structuredClone(sampleState);
    fallback.phrases = appendMissingPhrases(fallback.phrases, basicPhrasePack);
    fallback.basicPhrasePackVersion = BASIC_PHRASE_PACK_VERSION;
    return fallback;
  }
}

function normalizeLegacyKoreanText(loaded) {
  let changed = false;
  const textMap = {
    "Greeting": "인사",
    "Class": "수업",
    "Safety": "건축",
    "Health": "건강",
    "Field": "현장",
    "Build": "건축",
    "Team": "팀",
    "Hello. We are volunteers from Korea.": "안녕하세요. 우리는 한국 봉사팀입니다.",
    "Use when meeting local partners.": "현지 파트너를 처음 만날 때 사용해요.",
    "Good job. Do you want to try again?": "잘했어요. 한 번 더 해볼까요?",
    "Encouragement for children.": "아이들을 격려할 때 사용해요.",
    "Be careful. This place is dangerous.": "조심하세요. 여기는 위험해요.",
    "Use around construction areas.": "건축 현장 주변에서 사용해요.",
    "Color bingo": "색깔 빙고",
    "English and art": "영어와 미술",
    "Elementary": "초등",
    "25 min": "25분",
    "Color cards, stickers": "색깔 카드, 스티커",
    "Children practice color words through a simple game.": "아이들이 간단한 게임으로 색깔 단어를 익혀요.",
    "Show color cards": "색깔 카드 보여주기",
    "Repeat color words": "색깔 단어 따라 말하기",
    "Play bingo": "빙고 놀이하기",
    "Praise everyone": "모두 칭찬하기",
    "Wear helmet, gloves, and safety shoes": "장갑, 안전화, 모자 착용 확인",
    "Check water, shade, and rest area": "물, 그늘, 휴식 위치 확인",
    "Share today's work zone and danger points": "오늘 작업 구역과 위험 지점 공유",
    "Team leader": "팀장",
    "Korea team leader": "한국 팀장",
    "Set phone number in team settings.": "팀 설정에서 연락처를 입력하세요.",
    "Base camp": "숙소",
    "Set address in team settings.": "팀 설정에서 주소를 입력하세요.",
    "Personal water bottle": "개인 물통",
    "Class materials": "수업 자료",
    "Gloves and hat": "장갑·모자",
    "Power bank": "보조배터리",
    "Construction safety briefing": "건축 현장 안전 브리핑",
    "Kids English and art class": "아이들 영어·미술 수업",
    "Team debrief and tomorrow prep": "팀 회고와 내일 준비"
  };
  const normalizeValue = (value) => {
    if (Array.isArray(value)) return value.map(normalizeValue);
    if (typeof value !== "string") return value;
    return textMap[value] || value;
  };
  ["phrases", "lessons", "checklist", "contacts", "prepItems", "schedules"].forEach((key) => {
    if (!Array.isArray(loaded[key])) return;
    loaded[key] = loaded[key].map((item) => {
      const next = { ...item };
      Object.keys(next).forEach((field) => {
        const normalized = normalizeValue(next[field]);
        if (JSON.stringify(normalized) !== JSON.stringify(next[field])) changed = true;
        next[field] = normalized;
      });
      return next;
    });
  });
  return changed;
}

function appendMissingPhrases(existing, additions) {
  const list = Array.isArray(existing) ? [...existing] : [];
  const existingKeys = new Set(
    list.map((item) => item.id || `${item.ko || ""}|${item.idn || ""}`)
  );
  additions.forEach((item) => {
    const key = item.id || `${item.ko || ""}|${item.idn || ""}`;
    if (!existingKeys.has(key)) {
      list.push({ ...item });
      existingKeys.add(key);
    }
  });
  return list;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  render();
}

function loadSyncSession() {
  try {
    return {
      teamCode: DEFAULT_TEAM_CODE,
      memberName: "",
      teamId: "",
      teamName: "",
      connected: false,
      lastSyncAt: "",
      ...(JSON.parse(localStorage.getItem(SYNC_KEY)) || {})
    };
  } catch {
    return {
      teamCode: DEFAULT_TEAM_CODE,
      memberName: "",
      teamId: "",
      teamName: "",
      connected: false,
      lastSyncAt: ""
    };
  }
}

function saveSyncSession() {
  localStorage.setItem(SYNC_KEY, JSON.stringify(syncSession));
}

function render() {
  renderHeader();
  renderHome();
  renderPhrases();
  renderLessons();
  renderNameNotes();
  renderField();
  renderSafety();
  renderLibrary();
  renderQrPreview();
  renderSyncStatus();
  renderIcons();
}

function renderHeader() {
  $("[data-team-title]").textContent = state.settings.teamName || "Today Volunteer";
  const dateSummary = $("[data-date-summary]");
  if (dateSummary) dateSummary.textContent = state.settings.dateRange || sampleState.settings.dateRange || "Not set";
  const count =
    state.phrases.length +
    state.lessons.length +
    state.checklist.length +
    state.contacts.length +
    state.prepItems.length +
    state.schedules.length +
    filesCache.length;
  const contentCount = $("[data-content-count]");
  if (contentCount) contentCount.textContent = `${count}개 콘텐츠`;
}

function renderSyncStatus() {
  const title = $("[data-sync-title]");
  const status = $("[data-sync-status]");
  const modalStatus = $("[data-sync-modal-status]");
  if (!title || !status) return;
  if (syncSession.connected && syncSession.teamId) {
    title.textContent = "팀 클라우드 연결됨";
    status.textContent = syncSession.lastSyncAt
      ? `마지막 동기화 ${formatSyncTime(syncSession.lastSyncAt)}`
      : "Supabase 팀 공간에 연결됐어요.";
    if (modalStatus) modalStatus.textContent = "팀 공간에 연결됐어요.";
    return;
  }
  title.textContent = "팀 클라우드 연결";
  status.textContent = "팀 데이터를 동기화할 수 있어요.";
  if (modalStatus) modalStatus.textContent = "아직 연결되지 않았어요.";
}

function renderHome() {
  renderVolunteerDay();
  renderLocation();
  renderPrepList();
  renderAgenda();
}

function renderVolunteerDay() {
  const dayNode = $("[data-volunteer-day]");
  if (!dayNode) return;
  const start = parseStartDate(state.settings.dateRange) || parseDateOnly(state.settings.startDate);
  const leftNode = $("[data-days-left]");
  if (!start) {
    dayNode.textContent = "DAY ?";
    if (leftNode) leftNode.textContent = "-";
    return;
  }
  const today = parseDateOnly(localDateString());
  const diff = Math.floor((today - start) / 86400000) + 1;
  dayNode.textContent = diff > 0 ? `DAY ${diff}` : `D-${Math.abs(diff) + 1}`;
  if (leftNode) {
    const end = state.settings.endDate ? parseDateOnly(state.settings.endDate) : parseEndDate(state.settings.dateRange);
    if (!end) {
      leftNode.textContent = "-";
    } else {
      const left = Math.max(0, Math.ceil((end - today) / 86400000));
      leftNode.textContent = `${left}일`;
    }
  }
}

function renderLocation() {
  const label = $("[data-location-label]");
  const kicker = $("[data-location-kicker]");
  if (!label || !kicker) return;
  if (currentPosition) {
    label.textContent =
      currentPlaceLabel || `${currentPosition.latitude.toFixed(3)}, ${currentPosition.longitude.toFixed(3)}`;
    kicker.textContent = "현재 GPS 위치";
    return;
  }
  label.textContent = state.settings.location || "Indonesia";
  kicker.textContent = "팀 설정 기준 위치";
}

function initGoogleMap() {
  const canvas = $("[data-google-map]");
  const status = $("[data-map-status]");
  if (!canvas) return;
  renderEmbedMap();
  if (!GOOGLE_MAPS_API_KEY) return;
  loadGoogleMaps()
    .then(() => {
      if (status) status.textContent = "";
    })
    .catch(() => {
      if (status) status.textContent = "";
    });
}

function renderEmbedMap() {
  const canvas = $("[data-google-map]");
  if (!canvas) return;
  const lat = currentPosition?.latitude ?? DEFAULT_MAP_CENTER.lat;
  const lng = currentPosition?.longitude ?? DEFAULT_MAP_CENTER.lng;
  const delta = currentPosition ? 0.018 : 0.09;
  const bbox = [lng - delta, lat - delta, lng + delta, lat + delta].join(",");
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
    bbox
  )}&layer=mapnik&marker=${encodeURIComponent(`${lat},${lng}`)}`;
  canvas.classList.add("google-map-ready");
  canvas.classList.remove("google-map-failed");
  canvas.innerHTML = `<iframe class="embed-map-frame" title="현재 위치 지도" src="${src}" loading="lazy"></iframe>`;
}

function loadGoogleMaps() {
  if (window.google?.maps) return Promise.resolve();
  if (googleMapsLoading) return googleMapsLoading;
  googleMapsLoading = new Promise((resolve, reject) => {
    const callbackName = `initVolunteerGoogleMap_${Date.now()}`;
    window.gm_authFailure = () => reject(new Error("Google Maps auth failed"));
    window[callbackName] = () => {
      delete window[callbackName];
      resolve();
    };
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=${callbackName}`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      delete window[callbackName];
      reject(new Error("Google Maps load failed"));
    };
    document.head.appendChild(script);
  });
  return googleMapsLoading;
}

function hasGoogleMapError(canvas) {
  const text = canvas.textContent || "";
  return Boolean(canvas.querySelector(".gm-err-container") || text.includes("문제가 발생") || text.includes("Oops"));
}

function setGoogleMapFailed(canvas, status) {
  canvas.classList.remove("google-map-ready");
  canvas.classList.add("google-map-failed");
  if (status) status.textContent = "지도를 불러오지 못했어요";
}

function updateGoogleMapPosition() {
  renderEmbedMap();
}

function updateCurrentPlaceName() {
  if (!currentPosition) return;
  if (!window.google?.maps?.Geocoder) {
    renderLocation();
    return;
  }
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode(
    { location: { lat: currentPosition.latitude, lng: currentPosition.longitude } },
    (results, status) => {
      if (status !== "OK" || !results?.length) {
        currentPlaceLabel = `${currentPosition.latitude.toFixed(3)}, ${currentPosition.longitude.toFixed(3)}`;
        renderLocation();
        return;
      }
      const preferred =
        results.find((item) => item.types?.includes("locality")) ||
        results.find((item) => item.types?.includes("administrative_area_level_2")) ||
        results.find((item) => item.types?.includes("administrative_area_level_1")) ||
        results[0];
      currentPlaceLabel = compactPlaceName(preferred);
      renderLocation();
    }
  );
}

function compactPlaceName(result) {
  const parts = result?.address_components || [];
  const pick = (...types) =>
    parts.find((part) => types.some((type) => part.types?.includes(type)))?.long_name;
  const area =
    pick("sublocality_level_1", "sublocality", "locality") ||
    pick("administrative_area_level_2") ||
    pick("administrative_area_level_1");
  const city =
    pick("locality") ||
    pick("administrative_area_level_2") ||
    pick("administrative_area_level_1");
  if (area && city && area !== city) return `${city} ${area}`;
  return area || city || result?.formatted_address || "현재 위치";
}

function renderPrepList() {
  const list = $("[data-prep-list]");
  if (!list) return;
  const prepState = loadPrepChecks();
  list.classList.toggle("dense", state.prepItems.length > 4);
  list.innerHTML = state.prepItems
    .map(
      (item) => `
      <label class="prep-item ${prepState[item.id] ? "complete" : ""}">
        <input type="checkbox" data-prep-id="${item.id}" ${prepState[item.id] ? "checked" : ""} />
        <span>${escapeHtml(item.label)}</span>
      </label>
    `
    )
    .join("") || `<div class="prep-empty">준비물을 추가해 주세요.</div>`;
}

function renderAgenda() {
  const list = $("[data-agenda-list]");
  if (!list) return;
  const schedules = state.schedules
    .map((item) => ({ ...item, minutes: timeToMinutes(item.time) }))
    .sort((a, b) => (a.minutes ?? 9999) - (b.minutes ?? 9999));
  list.classList.toggle("dense", schedules.length > 3);

  if (!schedules.length) {
    list.innerHTML = `
      <article class="agenda-card complete">
        <div class="agenda-time">--:--</div>
        <div>
          <strong>등록된 일정이 없어요</strong>
          <small>일정 설정에서 오늘 일정을 추가해 주세요.</small>
        </div>
      </article>
    `;
    return;
  }

  list.innerHTML = schedules
    .map(
      (item) => `
      <article class="agenda-card">
        ${agendaTimeBlock(item)}
        <div>
          <strong>${escapeHtml(item.title)}</strong>
          <small>${escapeHtml(agendaMeta(item))}</small>
        </div>
        <span class="agenda-type">${escapeHtml(item.type || "일정")}</span>
      </article>
    `
    )
    .join("");
}

function agendaTimeBlock(item) {
  return `
    <div class="agenda-time">
      <span>${escapeHtml(item.time || "--:--")}</span>
      ${item.endTime ? `<small>${escapeHtml(item.endTime)}</small>` : ""}
    </div>
  `;
}

function agendaMeta(item) {
  const timeRange = item.endTime && item.time ? `${item.time}-${item.endTime}` : "";
  return [item.place, timeRange].filter(Boolean).join(" · ") || item.type || "";
}

function parseDateOnly(value) {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function parseStartDate(value) {
  if (!value) return null;
  const match = value.match(/(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})/);
  return match ? parseDateOnly(`${match[1]}-${match[2].padStart(2, "0")}-${match[3].padStart(2, "0")}`) : null;
}

function localDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseEndDate(value) {
  if (!value) return null;
  const match = value.match(/(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2}).*?(\d{1,2})[.\-/](\d{1,2})|(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})\s*[-~]\s*(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})/);
  if (match?.[9]) return parseDateOnly(`${match[9]}-${match[10].padStart(2, "0")}-${match[11].padStart(2, "0")}`);
  if (match?.[4]) return parseDateOnly(`${match[1]}-${match[4].padStart(2, "0")}-${match[5].padStart(2, "0")}`);
  const dates = [...value.matchAll(/(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})/g)];
  const last = dates.at(-1);
  return last ? parseDateOnly(`${last[1]}-${last[2].padStart(2, "0")}-${last[3].padStart(2, "0")}`) : null;
}

function formatDateInput(date) {
  if (!date || Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDateRange(startValue, endValue) {
  const start = parseDateOnly(startValue);
  const end = parseDateOnly(endValue);
  if (!start || !end) return "";
  const startYear = start.getFullYear();
  const endYear = end.getFullYear();
  const startMonth = String(start.getMonth() + 1).padStart(2, "0");
  const startDay = String(start.getDate()).padStart(2, "0");
  const endMonth = String(end.getMonth() + 1).padStart(2, "0");
  const endDay = String(end.getDate()).padStart(2, "0");
  if (startYear === endYear) return `${startYear}.${startMonth}.${startDay} - ${endMonth}.${endDay}`;
  return `${startYear}.${startMonth}.${startDay} - ${endYear}.${endMonth}.${endDay}`;
}

function formatSyncTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "just now";
  return date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function timeToMinutes(value) {
  if (!value) return null;
  const [hours, minutes] = value.split(":").map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;
  return hours * 60 + minutes;
}

function renderPhrases() {
  renderCategoryFilters();
  const query = ($('[data-search="phrases"]')?.value || "").trim().toLowerCase();
  const activeCategory = $(".filter-chip.active")?.dataset.filter || "전체";
  const list = $("[data-phrase-list]");
  const filtered = state.phrases.filter((item) => {
    const haystack = [item.category, item.ko, item.idn, item.pron, item.note, ...(item.tags || [])]
      .join(" ")
      .toLowerCase();
    return haystack.includes(query) && (activeCategory === "전체" || item.category === activeCategory);
  });

  list.innerHTML = filtered.length
    ? filtered.map((item) => phraseCard(item)).join("")
    : emptyState("검색 결과가 없어요", "다른 단어로 검색하거나 회화를 추가해 주세요.");
  renderIcons();
}

function phraseCard(item) {
  return `
    <article class="phrase-card" data-id="${item.id}">
      <div class="phrase-top">
        <div>
          <p class="phrase-korean">${escapeHtml(item.ko)}</p>
          <p class="phrase-meta">${escapeHtml(item.category)}</p>
        </div>
        <div class="card-actions">
          <button class="mini-button ${item.favorite ? "active" : ""}" type="button" data-toggle-favorite="${item.id}" aria-label="즐겨찾기">
            <span class="icon" data-icon="star"></span>
          </button>
          <button class="mini-button" type="button" data-copy-text="${escapeAttr(item.idn)}" aria-label="복사">
            <span class="icon" data-icon="copy"></span>
          </button>
          <button class="mini-button" type="button" data-edit-item="phrase" data-id="${item.id}" aria-label="수정">
            <span class="icon" data-icon="edit"></span>
          </button>
          <button class="mini-button" type="button" data-delete-item="phrase" data-id="${item.id}" aria-label="삭제">
            <span class="icon" data-icon="trash"></span>
          </button>
        </div>
      </div>
      <p class="phrase-indo">${escapeHtml(item.idn)}</p>
      ${item.pron ? `<p class="pronunciation">${escapeHtml(item.pron)}</p>` : ""}
      ${item.note ? `<small>${escapeHtml(item.note)}</small>` : ""}
      ${tagRow(item.tags)}
    </article>
  `;
}

function renderCategoryFilters() {
  const row = $('[data-category-filter="phrases"]');
  const current = $(".filter-chip.active")?.dataset.filter || "전체";
  const categories = ["전체", ...new Set(state.phrases.map((item) => item.category).filter(Boolean))];
  row.innerHTML = categories
    .map(
      (category) =>
        `<button class="filter-chip ${category === current ? "active" : ""}" type="button" data-filter="${escapeAttr(
          category
        )}">${escapeHtml(category)}</button>`
    )
    .join("");
}

function renderLessons() {
  const list = $("[data-lesson-list]");
  list.innerHTML = state.lessons.length
    ? state.lessons
        .map(
          (lesson) => `
          <article class="lesson-card" data-id="${lesson.id}">
            <div class="lesson-top">
              <div>
                <h3 class="lesson-title">${escapeHtml(lesson.title)}</h3>
                <p class="lesson-meta">
                  <span>${escapeHtml(lesson.subject || "수업")}</span>
                  <span>${escapeHtml(lesson.age || "대상 미정")}</span>
                  <span>${escapeHtml(lesson.duration || "시간 미정")}</span>
                </p>
              </div>
              <div class="card-actions">
                <button class="mini-button" type="button" data-edit-item="lesson" data-id="${lesson.id}" aria-label="수정">
                  <span class="icon" data-icon="edit"></span>
                </button>
                <button class="mini-button" type="button" data-delete-item="lesson" data-id="${lesson.id}" aria-label="삭제">
                  <span class="icon" data-icon="trash"></span>
                </button>
              </div>
            </div>
            <p>${escapeHtml(lesson.goal || "")}</p>
            <ol class="lesson-steps">${(lesson.steps || []).map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
            ${tagRow(lesson.phrases || [])}
          </article>
        `
        )
        .join("")
    : emptyState("수업 카드가 없어요", "팀에 필요한 첫 수업 카드를 추가해 주세요.");
  renderIcons();
}

function renderField() {
  const checked = loadChecks();
  const checklist = $("[data-check-list]");
  checklist.innerHTML = state.checklist.length
    ? state.checklist
        .map(
          (item) => `
          <div class="check-item ${checked[item.id] ? "complete" : ""}">
            <input type="checkbox" data-check-id="${item.id}" ${checked[item.id] ? "checked" : ""} />
            <span>${escapeHtml(item.text)}</span>
            <small>${escapeHtml(item.category || "")}</small>
            <button class="mini-button" type="button" data-delete-item="checklist" data-id="${item.id}" aria-label="삭제">
              <span class="icon" data-icon="trash"></span>
            </button>
          </div>
        `
        )
        .join("")
    : emptyState("체크리스트가 없어요", "현장 체크리스트를 추가해 주세요.");

  const fieldWords = state.phrases.filter(
    (item) => item.category === "건축" || item.category === "Build" || item.tags?.includes("현장") || item.tags?.includes("field")
  );
  $("[data-field-words]").innerHTML = fieldWords.length
    ? fieldWords
        .map(
          (item) => `
          <article class="word-card">
            <strong>${escapeHtml(item.idn)}</strong>
            <small>${escapeHtml(item.ko)}</small>
          </article>
        `
        )
        .join("")
    : emptyState("현장 표현이 없어요", "건축 또는 현장 회화를 추가해 주세요.");
  renderIcons();
}

function renderSafety() {
  const contacts = $("[data-contact-list]");
  contacts.innerHTML = state.contacts.length
    ? state.contacts
        .map(
          (contact) => `
          <article class="contact-card" data-id="${contact.id}">
            <div class="contact-top">
              <div>
                <strong>${escapeHtml(contact.name)}</strong>
                <small>${escapeHtml(contact.role || "")}</small>
              </div>
              <button class="mini-button" type="button" data-edit-item="contact" data-id="${contact.id}" aria-label="수정">
                <span class="icon" data-icon="edit"></span>
              </button>
              <button class="mini-button" type="button" data-delete-item="contact" data-id="${contact.id}" aria-label="삭제">
                <span class="icon" data-icon="trash"></span>
              </button>
            </div>
            ${contact.phone ? `<a href="tel:${escapeAttr(contact.phone)}">${escapeHtml(contact.phone)}</a>` : ""}
            <p>${escapeHtml(contact.note || "")}</p>
          </article>
        `
        )
        .join("")
    : emptyState("연락처가 없어요", "팀장, 숙소, 현지 담당자 연락처를 추가해 주세요.");

  const safety = state.phrases.filter(
    (item) => item.category === "긴급" || item.category === "Emergency" || item.tags?.includes("긴급") || item.tags?.includes("emergency")
  );
  $("[data-safety-phrases]").innerHTML = safety.length
    ? safety.map((item) => phraseCard(item)).join("")
    : emptyState("긴급 회화가 없어요", "긴급 상황에 쓸 문장을 추가해 주세요.");
  renderIcons();
}

function renderLibrary() {
  const list = $("[data-file-list]");
  if (!filesCache.length) {
    list.innerHTML = emptyState("아직 업로드된 파일이 없어요", "일정표, 안내문, 이미지, PDF를 자료실에 넣어보세요.");
    return;
  }
  list.innerHTML = filesCache
    .map((file) => {
      const preview = file.type.startsWith("image/")
        ? `<div class="file-preview"><img src="${file.dataUrl}" alt="${escapeAttr(file.name)}" /></div>`
        : file.type.startsWith("text/") || file.name.endsWith(".txt") || file.name.endsWith(".csv")
          ? `<div class="file-preview"><pre>${escapeHtml(decodeDataUrl(file.dataUrl).slice(0, 1200))}</pre></div>`
          : "";
      return `
        <article class="file-card" data-id="${file.id}">
          <div class="file-top">
            <div>
              <strong>${escapeHtml(file.name)}</strong>
              <small>${formatBytes(file.size)} · ${new Date(file.createdAt).toLocaleDateString("ko-KR")}${file.remote ? " · 팀 클라우드" : ""}</small>
            </div>
            <div class="card-actions">
              <button class="mini-button" type="button" data-open-file="${file.id}" aria-label="열기">
                <span class="icon" data-icon="external"></span>
              </button>
              <button class="mini-button" type="button" data-delete-file="${file.id}" aria-label="삭제">
                <span class="icon" data-icon="trash"></span>
              </button>
            </div>
          </div>
          ${preview}
        </article>
      `;
    })
    .join("");
  renderIcons();
}

function tagRow(tags = []) {
  const normalized = tags.map((tag) => String(tag).trim()).filter(Boolean);
  return normalized.length
    ? `<div class="tag-row">${normalized.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>`
    : "";
}

function emptyState(title, message) {
  return `
    <article class="daily-item">
      <p>${escapeHtml(title)}</p>
      <strong>${escapeHtml(message)}</strong>
    </article>
  `;
}

function bindEvents() {
  document.addEventListener("click", handleDocumentClick);
  document.addEventListener("change", handleDocumentChange);
  $('[data-search="phrases"]').addEventListener("input", renderPhrases);
  $("[data-item-form]").addEventListener("submit", saveDynamicItem);
  $("[data-save-settings]").addEventListener("click", saveSettings);
  $("[data-file-input]").addEventListener("change", (event) => handleFiles(event.target.files));
  bindDropTarget();
  bindTimer();
  bindGroups();

  window.addEventListener("online", updateOfflineStatus);
  window.addEventListener("offline", updateOfflineStatus);
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    toast("설치 준비가 되었어요. 상단 설치 버튼을 눌러보세요.");
  });
}

function handleDocumentClick(event) {
  const routeButton = event.target.closest("[data-nav], [data-route]");
  if (routeButton) {
    if (routeButton.dataset.routeCategory) {
      route(routeButton.dataset.nav || routeButton.dataset.route);
      setPhraseFilter(routeButton.dataset.routeCategory);
      return;
    }
    route(routeButton.dataset.nav || routeButton.dataset.route);
    return;
  }

  if (event.target.closest("[data-open-settings]")) openSettings();
  if (event.target.closest("[data-open-schedule]")) openScheduleSettings();
  if (event.target.closest("[data-open-sync]")) openSyncSettings();
  if (event.target.closest("[data-open-install]")) openModal("install");
  if (event.target.closest("[data-open-uploader]")) openModal("uploader");
  if (event.target.closest("[data-locate-me]")) requestCurrentLocation();

  if (event.target.closest("[data-connect-sync]")) connectSupabaseTeam();
  if (event.target.closest("[data-save-trip-dates]")) saveTripDates();
  if (event.target.closest("[data-add-schedule]")) addScheduleFromForm();
  if (event.target.closest("[data-open-prep-settings]")) openPrepSettings();
  if (event.target.closest("[data-add-prep-item]")) addPrepItemFromForm();
  if (event.target.closest("[data-save-prep-items]")) savePrepItemsFromForm();
  if (event.target.closest("[data-add-name-note]")) addNameNote();

  const scheduleDeleteButton = event.target.closest("[data-delete-schedule]");
  if (scheduleDeleteButton) deleteSchedule(scheduleDeleteButton.dataset.deleteSchedule);

  const prepDeleteButton = event.target.closest("[data-delete-prep-item]");
  if (prepDeleteButton) deletePrepItem(prepDeleteButton.dataset.deletePrepItem);

  const addButton = event.target.closest("[data-open-item-form]");
  if (addButton) openItemForm(addButton.dataset.openItemForm);

  const editButton = event.target.closest("[data-edit-item]");
  if (editButton) openItemForm(editButton.dataset.editItem, editButton.dataset.id);

  const deleteButton = event.target.closest("[data-delete-item]");
  if (deleteButton) deleteItem(deleteButton.dataset.deleteItem, deleteButton.dataset.id);

  const filterButton = event.target.closest("[data-filter]");
  if (filterButton) {
    $$(".filter-chip").forEach((button) => button.classList.toggle("active", button === filterButton));
    renderPhrases();
  }

  const favoriteButton = event.target.closest("[data-toggle-favorite]");
  if (favoriteButton) {
    const phrase = state.phrases.find((item) => item.id === favoriteButton.dataset.toggleFavorite);
    if (phrase) phrase.favorite = !phrase.favorite;
    saveState();
  }

  const copyButton = event.target.closest("[data-copy-text]");
  if (copyButton) copyText(copyButton.dataset.copyText);

  const modeButton = event.target.closest("[data-lesson-mode]");
  if (modeButton) setLessonMode(modeButton.dataset.lessonMode);

  if (event.target.closest("[data-reset-checks]")) {
    localStorage.removeItem(CHECK_KEY);
    renderField();
    toast("체크리스트를 초기화했어요.");
  }

  if (event.target.closest("[data-export-kit]")) exportKit();
  if (event.target.closest("[data-copy-link]")) copyText(location.href);
  if (event.target.closest("[data-install-app]")) installApp();

  const openFileButton = event.target.closest("[data-open-file]");
  if (openFileButton) openStoredFile(openFileButton.dataset.openFile);

  const deleteFileButton = event.target.closest("[data-delete-file]");
  if (deleteFileButton) deleteStoredFile(deleteFileButton.dataset.deleteFile);

  const deleteNameButton = event.target.closest("[data-delete-name-note]");
  if (deleteNameButton) deleteNameNote(deleteNameButton.dataset.deleteNameNote);
}

function handleDocumentChange(event) {
  const check = event.target.closest("[data-check-id]");
  if (check) {
    const checked = loadChecks();
    checked[check.dataset.checkId] = check.checked;
    localStorage.setItem(CHECK_KEY, JSON.stringify(checked));
    renderField();
  }

  const prep = event.target.closest("[data-prep-id]");
  if (prep) {
    const prepState = loadPrepChecks();
    prepState[prep.dataset.prepId] = prep.checked;
    localStorage.setItem(PREP_KEY, JSON.stringify(prepState));
    renderPrepList();
  }
}

function route(nextRoute) {
  activeRoute = nextRoute;
  $$(".view").forEach((view) => view.classList.toggle("active", view.dataset.view === nextRoute));
  $$("[data-nav]").forEach((button) => button.classList.toggle("active", button.dataset.nav === nextRoute));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setPhraseFilter(category) {
  const search = $('[data-search="phrases"]');
  if (search) search.value = "";
  $$(".filter-chip").forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === category);
  });
  renderPhrases();
}

function openModal(name) {
  const modal = $(`[data-modal="${name}"]`);
  if (modal && !modal.open) modal.showModal();
}

function closeModal(name) {
  const modal = $(`[data-modal="${name}"]`);
  if (modal?.open) modal.close();
}

function openSettings() {
  hydrateSettingsForm();
  openModal("settings");
}

function openSyncSettings() {
  hydrateSyncForm();
  renderSyncStatus();
  openModal("sync");
}

function hydrateSyncForm() {
  const codeInput = $("[data-sync-code]");
  const nameInput = $("[data-sync-name]");
  if (codeInput) codeInput.value = syncSession.teamCode || DEFAULT_TEAM_CODE;
  if (nameInput) nameInput.value = syncSession.memberName || "";
}

function openScheduleSettings() {
  hydrateScheduleForm();
  renderScheduleList();
  openModal("schedule");
}

function openPrepSettings() {
  renderPrepEditor();
  openModal("prep");
}

function renderPrepEditor() {
  const list = $("[data-prep-edit-list]");
  if (!list) return;
  list.innerHTML = state.prepItems.length
    ? state.prepItems
        .map(
          (item) => `
          <div class="prep-edit-row" data-prep-edit-row="${escapeAttr(item.id)}">
            <input data-prep-label value="${escapeAttr(item.label)}" aria-label="준비물 이름" />
            <button class="mini-button danger-mini" type="button" data-delete-prep-item="${escapeAttr(item.id)}" aria-label="준비물 삭제">
              <span class="icon" data-icon="trash"></span>
            </button>
          </div>
        `
        )
        .join("")
    : `<div class="schedule-empty">아직 준비물이 없어요.</div>`;
  renderIcons();
}

async function addPrepItemFromForm() {
  const input = $("[data-prep-new-label]");
  const label = input?.value.trim() || "";
  if (!label) {
    toast("추가할 준비물을 입력해 주세요.");
    return;
  }
  const item = { id: crypto.randomUUID(), label };
  const nextItems = [...state.prepItems, item];
  state.prepItems = nextItems;
  if (input) input.value = "";
  saveState();
  queueRemotePrepItemsSync(nextItems);
  renderPrepEditor();
  toast("준비물이 추가됐어요.");
}

async function savePrepItemsFromForm() {
  const previousIds = new Set(state.prepItems.map((item) => item.id));
  const nextItems = $$("[data-prep-edit-row]")
    .map((row) => ({
      id: row.dataset.prepEditRow,
      label: row.querySelector("[data-prep-label]")?.value.trim() || ""
    }))
    .filter((item) => item.label);
  const newLabel = $("[data-prep-new-label]")?.value.trim() || "";
  if (newLabel) {
    nextItems.push({
      id: crypto.randomUUID(),
      label: newLabel
    });
  }
  const nextIds = new Set(nextItems.map((item) => item.id));
  const deletedIds = [...previousIds].filter((id) => !nextIds.has(id));

  const prepState = loadPrepChecks();
  const validIds = new Set(nextItems.map((item) => item.id));
  Object.keys(prepState).forEach((id) => {
    if (!validIds.has(id)) delete prepState[id];
  });
  state.prepItems = nextItems;
  localStorage.setItem(PREP_KEY, JSON.stringify(prepState));
  const newInput = $("[data-prep-new-label]");
  if (newInput) newInput.value = "";
  saveState();
  queueRemotePrepItemsSync(nextItems, deletedIds);
  renderPrepEditor();
  closeModal("prep");
  toast("준비물 목록을 저장했어요.");
}

async function deletePrepItem(id) {
  const nextItems = state.prepItems.filter((item) => item.id !== id);
  state.prepItems = nextItems;
  const prepState = loadPrepChecks();
  delete prepState[id];
  localStorage.setItem(PREP_KEY, JSON.stringify(prepState));
  saveState();
  queueRemotePrepItemsSync(nextItems, [id]);
  renderPrepEditor();
}

async function connectSupabaseTeam(options = {}) {
  const silent = Boolean(options.silent);
  const codeInput = $("[data-sync-code]");
  const nameInput = $("[data-sync-name]");
  const teamCode = (codeInput?.value || syncSession.teamCode || DEFAULT_TEAM_CODE).trim().toUpperCase();
  const memberName = (nameInput?.value || syncSession.memberName || "").trim();

  if (!teamCode) {
    toast("팀 코드를 입력해 주세요.");
    return;
  }
  if (!navigator.onLine) {
    if (!silent) toast("오프라인 상태에서는 팀 공간에 연결할 수 없어요.");
    return;
  }

  try {
    setSyncBusy(true);
    const teams = await supabaseRequest(
      `/rest/v1/teams?invite_code=eq.${encodeURIComponent(teamCode)}&select=*`
    );
    const team = teams?.[0];
    if (!team) {
      if (!silent) toast("해당 팀 코드를 찾지 못했어요.");
      syncSession = { ...syncSession, teamCode, memberName, connected: false };
      saveSyncSession();
      renderSyncStatus();
      return;
    }

    syncSession = {
      ...syncSession,
      teamCode,
      memberName,
      teamId: team.id,
      teamName: team.name,
      connected: true,
      lastSyncAt: new Date().toISOString()
    };
    applyRemoteTeam(team);
    await loadRemoteTeamData();
    saveSyncSession();
    saveState();
    startSyncPolling();
    closeModal("sync");
    if (!silent) toast(`${teamCode} 팀 공간에 연결됐어요.`);
  } catch (error) {
    syncSession = { ...syncSession, connected: false };
    saveSyncSession();
    renderSyncStatus();
    if (!silent) toast(`Supabase 연결 실패: ${error.message}`);
  } finally {
    setSyncBusy(false);
  }
}

async function loadRemoteTeamData() {
  if (!syncSession.teamId) return;
  const teamId = encodeURIComponent(syncSession.teamId);
  const [snapshot, remoteFiles] = await Promise.all([
    loadRemoteTeamSnapshot(),
    loadRemoteFiles()
  ]);
  if (snapshot) {
    state.schedules = !HAS_LOCAL_STATE_AT_BOOT && Array.isArray(snapshot.schedules) ? snapshot.schedules : state.schedules;
    state.prepItems = !HAS_LOCAL_STATE_AT_BOOT && Array.isArray(snapshot.prepItems) ? snapshot.prepItems : state.prepItems;
  } else {
    const [schedules, prepItems] = await Promise.all([
      supabaseRequest(`/rest/v1/schedules?team_id=eq.${teamId}&select=*&order=start_time.asc`),
      supabaseRequest(`/rest/v1/prep_items?team_id=eq.${teamId}&select=*&order=sort_order.asc`)
    ]);
    if (!HAS_LOCAL_STATE_AT_BOOT) {
      state.schedules = schedules.map(remoteScheduleToState);
      state.prepItems = prepItems.map(remotePrepItemToState);
    }
    bootstrapRemoteTeamSnapshot();
  }
  mergeRemoteFiles(remoteFiles);
  syncSession.lastSyncAt = new Date().toISOString();
  saveSyncSession();
}

function applyRemoteTeam(team) {
  state.settings.teamName = team.name || state.settings.teamName;
  state.settings.location = team.location || state.settings.location;
  state.settings.startDate = team.start_date || state.settings.startDate;
  state.settings.endDate = team.end_date || state.settings.endDate;
  if (team.start_date && team.end_date) state.settings.dateRange = formatDateRange(team.start_date, team.end_date);
}

async function refreshRemoteData(options = {}) {
  if (!syncSession.connected || !syncSession.teamId || remoteWriteInProgress || !navigator.onLine) return;
  try {
    await loadRemoteTeamData();
    saveState();
    render();
    if (!options.silent) toast("팀 데이터를 새로 불러왔어요.");
  } catch {
    syncSession.connected = false;
    saveSyncSession();
    renderSyncStatus();
  }
}

function startSyncPolling() {
  clearInterval(syncTimerId);
  if (!syncSession.connected) return;
  syncTimerId = setInterval(() => refreshRemoteData({ silent: true }), 20000);
}

function setSyncBusy(isBusy) {
  const button = $("[data-connect-sync]");
  if (!button) return;
  button.disabled = isBusy;
  button.textContent = isBusy ? "연결 중..." : "연결하기";
}

async function supabaseRequest(path, options = {}) {
  assertSupabaseConfig();
  const response = await fetch(`${SUPABASE_URL}${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(options.headers || {})
    }
  });
  const text = await response.text();
  const data = parseSupabaseResponse(text, response);
  if (!response.ok) {
    throw new Error(data?.message || data?.hint || response.statusText || "요청 실패");
  }
  return data;
}

async function supabaseStorageRequest(path, options = {}) {
  assertSupabaseConfig();
  const response = await fetch(`${SUPABASE_URL}${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      ...(options.headers || {})
    }
  });
  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json") ? await response.json() : await response.text();
  if (!response.ok) {
    throw new Error(data?.message || data?.error || response.statusText || "Storage 요청 실패");
  }
  return data;
}

function assertSupabaseConfig() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Supabase URL 또는 API 키가 비어 있어요. Vercel 환경변수와 로컬 config.js를 확인해 주세요.");
  }
  if (!SUPABASE_URL.startsWith("https://") || !SUPABASE_URL.includes(".supabase.co")) {
    throw new Error("Supabase URL 형식이 올바르지 않아요. https://프로젝트ID.supabase.co 형태여야 해요.");
  }
}

function parseSupabaseResponse(text, response) {
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("text/html") || text.trim().startsWith("<")) {
      throw new Error("Supabase가 JSON 대신 HTML을 반환했어요. Supabase URL 환경변수가 잘못됐을 가능성이 커요.");
    }
    throw new Error("Supabase 응답을 읽지 못했어요.");
  }
}

function remoteScheduleToState(item) {
  return {
    id: item.id,
    time: normalizeRemoteTime(item.start_time),
    endTime: normalizeRemoteTime(item.end_time),
    title: item.title || "",
    place: item.place || "",
    type: item.type || ""
  };
}

function remotePrepItemToState(item) {
  return {
    id: item.id,
    label: item.label || ""
  };
}

function remoteFileToState(item) {
  const path = item.path || item.file_path || item.storage_path || "";
  return {
    id: item.id,
    name: item.name || item.file_name || "파일",
    type: item.type || item.file_type || "application/octet-stream",
    size: item.size || item.file_size || 0,
    createdAt: item.created_at ? new Date(item.created_at).getTime() : Date.now(),
    path,
    remote: true
  };
}

function mergeRemoteFiles(remoteFiles = []) {
  const localOnly = filesCache.filter((file) => !file.remote);
  const remote = remoteFiles.map(remoteFileToState);
  filesCache = [...remote, ...localOnly].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

function normalizeRemoteTime(value) {
  return value ? String(value).slice(0, 5) : "";
}

function isRemoteReady() {
  return Boolean(syncSession.connected && syncSession.teamId && navigator.onLine);
}

function remoteTeamStatePath() {
  return `${syncSession.teamId}/${TEAM_STATE_FILE}`;
}

async function loadRemoteTeamSnapshot() {
  if (!isRemoteReady()) return null;
  try {
    const text = await supabaseStorageRequest(
      `/storage/v1/object/${STORAGE_BUCKET}/${encodeStoragePath(remoteTeamStatePath())}`
    );
    const snapshot = typeof text === "string" ? JSON.parse(text) : text;
    if (!snapshot || typeof snapshot !== "object") return null;
    return snapshot;
  } catch {
    return null;
  }
}

async function saveRemoteTeamSnapshot(overrides = {}) {
  if (!isRemoteReady()) return;
  const payload = {
    updatedAt: new Date().toISOString(),
    prepItems: overrides.prepItems || state.prepItems,
    schedules: overrides.schedules || state.schedules,
    ...overrides
  };
  await supabaseStorageRequest(`/storage/v1/object/${STORAGE_BUCKET}/${encodeStoragePath(remoteTeamStatePath())}`, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
      "x-upsert": "true"
    },
    body: JSON.stringify(payload)
  });
}

function bootstrapRemoteTeamSnapshot() {
  saveRemoteTeamSnapshot().catch((error) => {
    console.warn("Initial team snapshot save failed.", error);
  });
}

async function updateRemoteTeamSettings() {
  if (!isRemoteReady()) return;
  await withRemoteWrite(async () => {
    await supabaseRequest(`/rest/v1/teams?id=eq.${encodeURIComponent(syncSession.teamId)}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: state.settings.teamName || syncSession.teamName || "봉사팀",
        start_date: state.settings.startDate || null,
        end_date: state.settings.endDate || null,
        location: state.settings.location || null
      })
    });
  }, "팀 기간을 서버에 저장하지 못했어요.");
}

async function insertRemoteSchedule(schedule) {
  if (!isRemoteReady()) return;
  await withRemoteWrite(async () => {
    await supabaseRequest("/rest/v1/schedules", {
      method: "POST",
      body: JSON.stringify({
        id: schedule.id,
        team_id: syncSession.teamId,
        start_time: schedule.time,
        end_time: schedule.endTime || null,
        title: schedule.title,
        place: schedule.place || null,
        type: schedule.type || null
      })
    });
  }, "일정을 서버에 저장하지 못했어요.");
}

async function deleteRemoteSchedule(id) {
  if (!isRemoteReady()) return;
  await withRemoteWrite(async () => {
    await supabaseRequest(`/rest/v1/schedules?id=eq.${encodeURIComponent(id)}`, {
      method: "DELETE"
    });
  }, "일정을 서버에서 삭제하지 못했어요.");
}

async function syncRemoteSchedules(schedules) {
  if (!isRemoteReady()) return;
  await withRemoteWrite(async () => {
    await saveRemoteTeamSnapshot({ schedules });
    await assertRemoteSchedulesMatch(schedules);
  }, "일정 목록을 서버에 저장하지 못했어요.");
}

async function insertRemotePrepItem(item, sortOrder) {
  if (!isRemoteReady()) return;
  await withRemoteWrite(async () => {
    await supabaseRequest("/rest/v1/prep_items", {
      method: "POST",
      body: JSON.stringify({
        id: item.id,
        team_id: syncSession.teamId,
        label: item.label,
        sort_order: sortOrder
      })
    });
  }, "준비물을 서버에 저장하지 못했어요.");
}

async function syncRemotePrepItems(items, deletedIds = []) {
  if (!isRemoteReady()) return;
  await withRemoteWrite(async () => {
    await saveRemoteTeamSnapshot({ prepItems: items });
    await assertRemotePrepItemsMatch(items);
  }, "준비물 목록을 서버에 저장하지 못했어요.");
}

function queueRemotePrepItemsSync(items, deletedIds = []) {
  if (!isRemoteReady()) return;
  remoteWriteInProgress = true;
  saveRemoteTeamSnapshot({ prepItems: items })
    .then(() => {
      syncSession.lastSyncAt = new Date().toISOString();
      syncSession.connected = true;
      saveSyncSession();
      renderSyncStatus();
    })
    .catch((error) => {
      console.warn("Prep item cloud sync failed.", error, deletedIds);
    })
    .finally(() => {
      remoteWriteInProgress = false;
    });
}

async function assertRemoteSchedulesMatch(expected) {
  if (!isRemoteReady()) return;
  const snapshot = await loadRemoteTeamSnapshot();
  const remote = snapshot?.schedules || [];
  const normalize = (items) =>
    items
      .map((item) => ({
        time: item.time || "",
        endTime: item.endTime || "",
        title: item.title || "",
        place: item.place || "",
        type: item.type || ""
      }))
      .sort((a, b) => (timeToMinutes(a.time) ?? 9999) - (timeToMinutes(b.time) ?? 9999));
  if (JSON.stringify(normalize(expected)) !== JSON.stringify(normalize(remote))) {
    throw new Error("서버에 저장된 일정 목록이 방금 수정한 내용과 달라요.");
  }
}

async function assertRemotePrepItemsMatch(expected) {
  if (!isRemoteReady()) return;
  const snapshot = await loadRemoteTeamSnapshot();
  const remote = snapshot?.prepItems || [];
  const normalize = (items) => items.map((item) => item.label || "").filter(Boolean);
  if (JSON.stringify(normalize(expected)) !== JSON.stringify(normalize(remote))) {
    throw new Error("서버에 저장된 준비물 목록이 방금 수정한 내용과 달라요.");
  }
}

async function deleteRemotePrepItem(id) {
  if (!isRemoteReady()) return;
  await withRemoteWrite(async () => {
    await deleteRemotePrepItemDirect(id);
  }, "준비물을 서버에서 삭제하지 못했어요.");
}

async function deleteRemotePrepItemDirect(id) {
  await supabaseRequest(`/rest/v1/prep_items?id=eq.${encodeURIComponent(id)}&team_id=eq.${encodeURIComponent(syncSession.teamId)}`, {
    method: "DELETE"
  });
}

async function withRemoteWrite(action, failureMessage) {
  if (!isRemoteReady()) return;
  try {
    remoteWriteInProgress = true;
    await action();
    syncSession.lastSyncAt = new Date().toISOString();
    syncSession.connected = true;
    saveSyncSession();
    renderSyncStatus();
  } catch (error) {
    toast(`${failureMessage} ${error.message}`);
    throw error;
  } finally {
    remoteWriteInProgress = false;
  }
}

function hydrateScheduleForm() {
  const startInput = $("[data-schedule-start-date]");
  const endInput = $("[data-schedule-end-date]");
  const startDate = parseStartDate(state.settings.dateRange) || parseDateOnly(state.settings.startDate);
  const endDate = state.settings.endDate
    ? parseDateOnly(state.settings.endDate)
    : parseEndDate(state.settings.dateRange);
  if (startInput) startInput.value = formatDateInput(startDate);
  if (endInput) endInput.value = formatDateInput(endDate);
}

async function saveTripDates() {
  const startValue = $("[data-schedule-start-date]")?.value || "";
  const endValue = $("[data-schedule-end-date]")?.value || "";
  const startDate = parseDateOnly(startValue);
  const endDate = parseDateOnly(endValue);

  if (!startDate || !endDate) {
    toast("봉사 시작일과 종료일을 모두 선택해 주세요.");
    return;
  }
  if (startDate > endDate) {
    toast("종료일은 시작일보다 뒤여야 해요.");
    return;
  }

  state.settings.startDate = startValue;
  state.settings.endDate = endValue;
  state.settings.dateRange = formatDateRange(startValue, endValue);
  hydrateSettingsForm();
  saveState();
  await updateRemoteTeamSettings();
  hydrateScheduleForm();
  toast("봉사 기간을 저장했어요.");
}

async function addScheduleFromForm() {
  const time = $("[data-schedule-time-start]")?.value || "";
  const endTime = $("[data-schedule-time-end]")?.value || "";
  const title = $("[data-schedule-title]")?.value.trim() || "";
  const place = $("[data-schedule-place]")?.value.trim() || "";
  const type = $("[data-schedule-type]")?.value.trim() || "";

  if (!time || !title) {
    toast("시작 시간과 일정 내용을 입력해 주세요.");
    return;
  }
  if (endTime && timeToMinutes(endTime) < timeToMinutes(time)) {
    toast("종료 시간은 시작 시간보다 뒤여야 해요.");
    return;
  }

  const schedule = {
    id: crypto.randomUUID(),
    time,
    endTime,
    title,
    place,
    type
  };
  const nextSchedules = [...state.schedules, schedule].sort(
    (a, b) => (timeToMinutes(a.time) ?? 9999) - (timeToMinutes(b.time) ?? 9999)
  );
  await syncRemoteSchedules(nextSchedules);
  state.schedules = nextSchedules;
  clearScheduleForm();
  saveState();
  renderScheduleList();
  toast("일정이 추가됐어요.");
}

function clearScheduleForm() {
  ["time-start", "time-end", "title", "place", "type"].forEach((key) => {
    const input = $(`[data-schedule-${key}]`);
    if (input) input.value = "";
  });
}

async function deleteSchedule(id) {
  const item = state.schedules.find((schedule) => schedule.id === id);
  if (!item) return;
  if (!window.confirm(`"${item.title}" 일정을 삭제할까요?`)) return;
  const nextSchedules = state.schedules.filter((schedule) => schedule.id !== id);
  await syncRemoteSchedules(nextSchedules);
  state.schedules = nextSchedules;
  saveState();
  renderScheduleList();
  toast("일정이 삭제됐어요.");
}

function renderScheduleList() {
  const list = $("[data-schedule-list]");
  if (!list) return;
  const schedules = [...state.schedules].sort(
    (a, b) => (timeToMinutes(a.time) ?? 9999) - (timeToMinutes(b.time) ?? 9999)
  );
  list.innerHTML = schedules.length
    ? schedules
        .map(
          (item) => `
          <article class="schedule-row">
            <div class="schedule-row-time">
              <strong>${escapeHtml(item.time || "--:--")}</strong>
              ${item.endTime ? `<small>${escapeHtml(item.endTime)}</small>` : ""}
            </div>
            <div>
              <strong>${escapeHtml(item.title)}</strong>
              <small>${escapeHtml([item.place, item.type].filter(Boolean).join(" · ") || "추가 정보 없음")}</small>
            </div>
            <button class="mini-button danger-mini" type="button" data-delete-schedule="${escapeAttr(item.id)}" aria-label="일정 삭제">
              <span class="icon" data-icon="trash"></span>
            </button>
          </article>
        `
        )
        .join("")
    : `<div class="schedule-empty">아직 등록된 일정이 없어요.</div>`;
  renderIcons();
}

function hydrateSettingsForm() {
  $$("[data-setting]").forEach((input) => {
    input.value = state.settings[input.dataset.setting] || "";
  });
}

async function saveSettings() {
  $$("[data-setting]").forEach((input) => {
    state.settings[input.dataset.setting] = input.value.trim();
  });
  state.settings.startDate = formatDateInput(parseStartDate(state.settings.dateRange)) || state.settings.startDate || "";
  state.settings.endDate = formatDateInput(parseEndDate(state.settings.dateRange)) || state.settings.endDate || "";
  if (state.settings.leaderPhone) {
    const leader = state.contacts.find((item) => item.role === "Korea team leader" || item.name === "Team leader");
    if (leader) leader.phone = state.settings.leaderPhone;
  }
  if (state.settings.baseAddress) {
    const base = state.contacts.find((item) => item.role === "Base camp" || item.name === "Base camp");
    if (base) base.note = state.settings.baseAddress;
  }
  applyTheme();
  saveState();
  await updateRemoteTeamSettings();
  closeModal("settings");
  toast("팀 설정을 저장했어요.");
}

function applyTheme() {
  document.body.classList.remove("theme-coral", "theme-indigo", "theme-lime");
  if (state.settings.theme && state.settings.theme !== "teal") {
    document.body.classList.add(`theme-${state.settings.theme}`);
  }
}

function openItemForm(mode, id = null) {
  itemMode = mode;
  editingItemId = id;
  const config = itemConfig(mode);
  $("[data-item-eyebrow]").textContent = config.eyebrow;
  $("[data-item-title]").textContent = `${config.title} ${id ? "수정" : "추가"}`;
  const item = id ? findItem(mode, id) : {};
  $("[data-dynamic-fields]").innerHTML = config.fields
    .map((field) => fieldTemplate(field, item?.[field.key] ?? field.default ?? ""))
    .join("");
  openModal("item");
}

function itemConfig(mode) {
  const configs = {
    phrase: {
      title: "회화",
      eyebrow: "회화 항목",
      collection: "phrases",
      fields: [
        { key: "category", label: "분류", placeholder: "인사, 수업, 건축, 생활" },
        { key: "ko", label: "한국어", placeholder: "말하고 싶은 문장" },
        { key: "idn", label: "인도네시아어", placeholder: "Bahasa Indonesia" },
        { key: "pron", label: "발음", placeholder: "읽는 법", optional: true },
        { key: "note", label: "메모", type: "textarea", className: "span-2", optional: true },
        { key: "tags", label: "태그", placeholder: "쉼표로 구분", className: "span-2", optional: true }
      ]
    },
    lesson: {
      title: "수업",
      eyebrow: "수업 항목",
      collection: "lessons",
      fields: [
        { key: "title", label: "수업 제목", placeholder: "색깔 빙고" },
        { key: "subject", label: "과목", placeholder: "미술과 영어" },
        { key: "age", label: "대상", placeholder: "초등" },
        { key: "duration", label: "시간", placeholder: "25분" },
        { key: "materials", label: "준비물", placeholder: "색깔 카드, 스티커", className: "span-2" },
        { key: "goal", label: "목표", type: "textarea", className: "span-2" },
        { key: "steps", label: "진행 순서", type: "textarea", placeholder: "한 줄에 하나씩 입력", className: "span-2" },
        { key: "phrases", label: "사용 표현", type: "textarea", placeholder: "한 줄에 하나씩 입력", className: "span-2" }
      ]
    },
    checklist: {
      title: "체크리스트",
      eyebrow: "현장 체크",
      collection: "checklist",
      fields: [
        { key: "category", label: "분류", placeholder: "안전" },
        { key: "text", label: "체크 항목", placeholder: "작업 전 장갑 착용 확인", className: "span-2" }
      ]
    },
    contact: {
      title: "연락처",
      eyebrow: "연락처",
      collection: "contacts",
      fields: [
        { key: "name", label: "이름", placeholder: "현지 담당자" },
        { key: "role", label: "역할", placeholder: "현지 코디네이터" },
        { key: "phone", label: "전화번호", placeholder: "+62 ..." },
        { key: "note", label: "메모", type: "textarea", className: "span-2" }
      ]
    }
  };
  return configs[mode];
}

function fieldTemplate(field, value) {
  const valueString = Array.isArray(value) ? value.join("\n") : value;
  const input =
    field.type === "textarea"
      ? `<textarea data-field="${field.key}" placeholder="${escapeAttr(field.placeholder || "")}">${escapeHtml(
          valueString
        )}</textarea>`
      : `<input data-field="${field.key}" value="${escapeAttr(valueString)}" placeholder="${escapeAttr(
          field.placeholder || ""
        )}" />`;
  return `<label class="${field.className || ""}">${escapeHtml(field.label)} ${input}</label>`;
}

function saveDynamicItem(event) {
  event.preventDefault();
  const config = itemConfig(itemMode);
  const item = editingItemId ? findItem(itemMode, editingItemId) : { id: crypto.randomUUID() };
  config.fields.forEach((field) => {
    const raw = $(`[data-field="${field.key}"]`).value.trim();
    item[field.key] =
      field.key === "tags" || field.key === "steps" || field.key === "phrases"
        ? raw
            .split(/\n|,/)
            .map((value) => value.trim())
            .filter(Boolean)
        : raw;
  });
  if (itemMode === "phrase" && typeof item.favorite !== "boolean") item.favorite = false;
  if (!editingItemId) state[config.collection].unshift(item);
  saveState();
  closeModal("item");
  toast("저장했어요.");
}

function findItem(mode, id) {
  return state[itemConfig(mode).collection].find((item) => item.id === id);
}

function setLessonMode(mode) {
  $$("[data-lesson-mode]").forEach((button) => button.classList.toggle("active", button.dataset.lessonMode === mode));
  $$("[data-lesson-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.lessonPanel === mode));
}

function bindTimer() {
  $$("[data-timer-set]").forEach((button) => {
    button.addEventListener("click", () => {
      timerSeconds = Number(button.dataset.timerSet);
      timerRemaining = timerSeconds;
      stopTimer();
      renderTimer();
    });
  });
  $("[data-timer-toggle]").addEventListener("click", () => {
    if (timerId) {
      stopTimer();
      return;
    }
    timerId = setInterval(() => {
      timerRemaining = Math.max(0, timerRemaining - 1);
      renderTimer();
      if (timerRemaining === 0) {
        stopTimer();
        toast("타이머가 끝났어요.");
      }
    }, 1000);
    $("[data-timer-toggle]").textContent = "정지";
  });
  renderTimer();
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
  $("[data-timer-toggle]").textContent = "시작";
}

function renderTimer() {
  const minutes = String(Math.floor(timerRemaining / 60)).padStart(2, "0");
  const seconds = String(timerRemaining % 60).padStart(2, "0");
  $("[data-timer-display]").textContent = `${minutes}:${seconds}`;
}

function bindGroups() {
  $("[data-make-groups]").addEventListener("click", () => {
    const names = $("[data-group-names]").value.split("\n").map((name) => name.trim()).filter(Boolean);
    const count = Math.max(2, Number($("[data-group-count]").value) || 2);
    const shuffled = names.sort(() => Math.random() - 0.5);
    const groups = Array.from({ length: count }, () => []);
    shuffled.forEach((name, index) => groups[index % count].push(name));
    $("[data-group-result]").innerHTML = groups
      .map(
        (group, index) => `
        <article class="group-card">
              <strong>${index + 1}조</strong>
          <span>${group.map(escapeHtml).join(", ") || "비어 있음"}</span>
        </article>
      `
      )
      .join("");
  });
}

function bindDropTarget() {
  const dropTarget = $("[data-drop-target]");
  ["dragenter", "dragover"].forEach((name) => {
    dropTarget.addEventListener(name, (event) => {
      event.preventDefault();
      dropTarget.classList.add("dragging");
    });
  });
  ["dragleave", "drop"].forEach((name) => {
    dropTarget.addEventListener(name, (event) => {
      event.preventDefault();
      dropTarget.classList.remove("dragging");
    });
  });
  dropTarget.addEventListener("drop", (event) => handleFiles(event.dataTransfer.files));
}

async function handleFiles(fileList) {
  const files = [...fileList];
  for (const file of files) {
    if (file.name.endsWith(".json")) {
      const text = await file.text();
      await importJson(text);
      continue;
    }
    if (file.name.endsWith(".csv")) {
      const text = await file.text();
      if (looksLikePhraseCsv(text)) {
        importPhraseCsv(text);
      } else {
        await storeFile(file);
      }
      continue;
    }
    await storeFile(file);
  }
  await loadFiles();
  if (isRemoteReady()) mergeRemoteFiles(await loadRemoteFiles());
  render();
  closeModal("uploader");
  $("[data-file-input]").value = "";
  toast(isRemoteReady() ? "자료를 팀 클라우드에 올렸어요." : "자료를 가져왔어요.");
}

async function importJson(text) {
  try {
    const imported = JSON.parse(text);
    if (!imported.settings && !imported.phrases && !imported.lessons) throw new Error("Unknown kit");
    state = {
      ...state,
      ...imported,
      settings: { ...state.settings, ...(imported.settings || {}) },
      phrases: mergeById(state.phrases, imported.phrases || []),
      lessons: mergeById(state.lessons, imported.lessons || []),
      checklist: mergeById(state.checklist, imported.checklist || []),
      contacts: mergeById(state.contacts, imported.contacts || []),
      prepItems: mergeById(state.prepItems, imported.prepItems || []),
      schedules: mergeById(state.schedules, imported.schedules || [])
    };
    if (Array.isArray(imported.files)) {
      for (const file of imported.files) {
        if (file.name && file.dataUrl) await storeFileRecord(file);
      }
    }
    applyTheme();
    saveState();
  } catch {
    toast("JSON 형식을 확인해 주세요.");
  }
}

function looksLikePhraseCsv(text) {
  const header = text.split(/\r?\n/)[0]?.toLowerCase() || "";
  return header.includes("ko") || header.includes("korean");
}

function importPhraseCsv(text) {
  const [headerLine, ...rows] = text.split(/\r?\n/).filter(Boolean);
  const headers = parseCsvLine(headerLine).map((value) => value.trim().toLowerCase());
  const get = (row, keys) => {
    const values = parseCsvLine(row);
    const index = keys.map((key) => headers.indexOf(key)).find((value) => value >= 0);
    return index >= 0 ? values[index]?.trim() || "" : "";
  };
  const imported = rows
    .map((row) => ({
      id: crypto.randomUUID(),
      category: get(row, ["category"]) || "Imported",
      ko: get(row, ["ko", "korean"]),
      idn: get(row, ["idn", "indonesian", "bahasa"]),
      pron: get(row, ["pron", "pronunciation"]),
      note: get(row, ["note", "memo"]),
      tags: get(row, ["tags"]).split("|").filter(Boolean),
      favorite: false
    }))
    .filter((item) => item.ko || item.idn);
  state.phrases = [...imported, ...state.phrases];
  saveState();
}

function parseCsvLine(line) {
  const result = [];
  let current = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"' && line[index + 1] === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

function mergeById(existing, incoming) {
  const map = new Map(existing.map((item) => [item.id, item]));
  incoming.forEach((item) => {
    const id = item.id || crypto.randomUUID();
    map.set(id, { ...item, id });
  });
  return [...map.values()];
}

async function exportKit() {
  const payload = {
    exportedAt: new Date().toISOString(),
    app: "Volunteer Kit",
    settings: state.settings,
    phrases: state.phrases,
    lessons: state.lessons,
    checklist: state.checklist,
    contacts: state.contacts,
    prepItems: state.prepItems,
    schedules: state.schedules,
    files: filesCache.map(({ id, name, type, size, createdAt, dataUrl }) => ({
      id,
      name,
      type,
      size,
      createdAt,
      dataUrl
    }))
  };
  downloadBlob(
    new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }),
    `${slugify(state.settings.teamName || "volunteer-kit")}-backup.json`
  );
  toast("키트 백업 파일을 만들었어요.");
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

async function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      request.result.createObjectStore("files", { keyPath: "id" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getStore(mode = "readonly") {
  const db = await openDatabase();
  return db.transaction("files", mode).objectStore("files");
}

async function storeFile(file) {
  const dataUrl = await readAsDataUrl(file);
  const record = await storeFileRecord({
    id: crypto.randomUUID(),
    name: file.name,
    type: file.type || "application/octet-stream",
    size: file.size,
    createdAt: Date.now(),
    dataUrl
  });
  await uploadRemoteFile(file, record);
  return record;
}

async function storeFileRecord(record) {
  const normalized = {
    id: record.id || crypto.randomUUID(),
    name: record.name,
    type: record.type || "application/octet-stream",
    size: record.size || 0,
    createdAt: record.createdAt || Date.now(),
    dataUrl: record.dataUrl
  };
  const store = await getStore("readwrite");
  return new Promise((resolve, reject) => {
    const request = store.put(normalized);
    request.onsuccess = resolve;
    request.onerror = () => reject(request.error);
  });
}

async function uploadRemoteFile(file, record) {
  if (!isRemoteReady()) return;
  const safeName = sanitizeFileName(record.name);
  const storagePath = `${syncSession.teamId}/${record.id}-${safeName}`;
  await withRemoteWrite(async () => {
    await supabaseStorageRequest(`/storage/v1/object/${STORAGE_BUCKET}/${encodeStoragePath(storagePath)}`, {
      method: "POST",
      headers: {
        "Content-Type": record.type || file.type || "application/octet-stream",
        "x-upsert": "true"
      },
      body: file
    });
    await supabaseRequest("/rest/v1/files", {
      method: "POST",
      body: JSON.stringify({
        id: record.id,
        team_id: syncSession.teamId,
        name: record.name,
        path: storagePath,
        type: record.type,
        size: record.size
      })
    });
  }, "파일을 팀 클라우드에 올리지 못했어요.");
}

async function loadRemoteFiles() {
  if (!isRemoteReady()) return [];
  const teamId = encodeURIComponent(syncSession.teamId);
  try {
    return await supabaseRequest(`/rest/v1/files?team_id=eq.${teamId}&select=*&order=created_at.desc`);
  } catch (error) {
    toast(`팀 파일 목록을 불러오지 못했어요. ${error.message}`);
    return [];
  }
}

async function loadFiles() {
  const store = await getStore();
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => {
      const remoteFiles = filesCache.filter((file) => file.remote);
      const localFiles = request.result;
      const localIds = new Set(localFiles.map((file) => file.id));
      filesCache = [...remoteFiles.filter((file) => !localIds.has(file.id)), ...localFiles].sort(
        (a, b) => (b.createdAt || 0) - (a.createdAt || 0)
      );
      resolve(filesCache);
    };
    request.onerror = () => reject(request.error);
  });
}

async function deleteStoredFile(id) {
  const file = filesCache.find((item) => item.id === id);
  if (file?.remote) {
    await deleteRemoteFile(file);
  } else {
    const store = await getStore("readwrite");
    await new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = resolve;
      request.onerror = () => reject(request.error);
    });
  }
  await loadFiles();
  renderLibrary();
  renderIcons();
  toast("파일이 삭제됐어요.");
}

async function openStoredFile(id) {
  const file = filesCache.find((item) => item.id === id);
  if (!file) return;
  if (file.remote) {
    await openRemoteFile(file);
    return;
  }
  const win = window.open();
  if (!win) {
    toast("팝업 차단을 해제하고 다시 시도해 주세요.");
    return;
  }
  win.document.write(`<iframe src="${file.dataUrl}" title="${escapeAttr(file.name)}" style="border:0;width:100vw;height:100vh"></iframe>`);
}

async function openRemoteFile(file) {
  try {
    const signed = await supabaseStorageRequest(
      `/storage/v1/object/sign/${STORAGE_BUCKET}/${encodeStoragePath(file.path)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expiresIn: 60 * 10 })
      }
    );
    const url = signed?.signedURL || signed?.signedUrl || signed?.url;
    if (!url) throw new Error("다운로드 링크를 만들지 못했어요.");
    window.open(`${SUPABASE_URL}${url}`, "_blank", "noopener");
  } catch (error) {
    toast(`파일을 열지 못했어요. ${error.message}`);
  }
}

async function deleteRemoteFile(file) {
  if (!isRemoteReady()) return;
  await withRemoteWrite(async () => {
    await supabaseRequest(`/rest/v1/files?id=eq.${encodeURIComponent(file.id)}`, {
      method: "DELETE"
    });
    if (file.path) {
      await supabaseStorageRequest(`/storage/v1/object/${STORAGE_BUCKET}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prefixes: [file.path] })
      });
    }
    filesCache = filesCache.filter((item) => item.id !== file.id);
  }, "팀 클라우드 파일을 삭제하지 못했어요.");
}

function readAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function decodeDataUrl(dataUrl) {
  try {
    const [, encoded] = dataUrl.split(",");
    return decodeURIComponent(
      atob(encoded)
        .split("")
        .map((char) => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );
  } catch {
    return "";
  }
}

function loadChecks() {
  try {
    return JSON.parse(localStorage.getItem(CHECK_KEY)) || {};
  } catch {
    return {};
  }
}

function loadPrepChecks() {
  try {
    return JSON.parse(localStorage.getItem(PREP_KEY)) || {};
  } catch {
    return {};
  }
}

function loadNameNotes() {
  try {
    return JSON.parse(localStorage.getItem(NAMEBOOK_KEY)) || [];
  } catch {
    return [];
  }
}

function saveNameNotes() {
  localStorage.setItem(NAMEBOOK_KEY, JSON.stringify(nameNotes));
}

function renderNameNotes() {
  const list = $("[data-namebook-list]");
  if (!list) return;
  list.innerHTML = nameNotes.length
    ? nameNotes
        .map(
          (item) => `
          <article class="name-note-card">
            <div>
              <strong>${escapeHtml(item.name)}</strong>
              <small>${escapeHtml(item.note || "특징 없음")}</small>
            </div>
            <button class="mini-button danger-mini" type="button" data-delete-name-note="${escapeAttr(item.id)}" aria-label="이름 삭제">
              <span class="icon" data-icon="trash"></span>
            </button>
          </article>
        `
        )
        .join("")
    : emptyState("아직 이름이 없어요", "현지 아이들이나 사람들의 이름과 특징을 추가해 주세요.");
  renderIcons();
}

function addNameNote() {
  const nameInput = $("[data-namebook-name]");
  const noteInput = $("[data-namebook-note]");
  const name = nameInput?.value.trim() || "";
  const note = noteInput?.value.trim() || "";
  if (!name) {
    toast("이름을 입력해 주세요.");
    return;
  }
  nameNotes.unshift({
    id: crypto.randomUUID(),
    name,
    note,
    createdAt: Date.now()
  });
  if (nameInput) nameInput.value = "";
  if (noteInput) noteInput.value = "";
  saveNameNotes();
  renderNameNotes();
  toast("이름 수첩에 추가했어요.");
}

function deleteNameNote(id) {
  nameNotes = nameNotes.filter((item) => item.id !== id);
  saveNameNotes();
  renderNameNotes();
  toast("이름을 삭제했어요.");
}

function deleteItem(mode, id) {
  const config = itemConfig(mode);
  if (!config || !id) return;
  const collection = state[config.collection];
  const item = collection.find((entry) => entry.id === id);
  if (!item) return;
  const label = item.title || item.ko || item.text || item.name || "항목";
  if (!window.confirm(`"${label}" 항목을 삭제할까요?`)) return;
  state[config.collection] = collection.filter((entry) => entry.id !== id);
  saveState();
  toast("삭제됐어요.");
}

function renderQrPreview() {
  const node = $("[data-qr-preview]");
  if (!node) return;
  if (navigator.onLine && location.protocol.startsWith("http")) {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=12&data=${encodeURIComponent(
      location.href
    )}`;
    node.innerHTML = `<img src="${qrUrl}" alt="배포 링크 QR 코드" />`;
    return;
  }
  node.innerHTML = "<span>LINK</span>";
}

function updateOfflineStatus() {
  const isOnline = navigator.onLine;
  const label = $("[data-offline-label]");
  if (label) label.textContent = isOnline ? "온라인 준비됨" : "오프라인 모드";
  renderQrPreview();
}

function requestCurrentLocation() {
  if (!("geolocation" in navigator)) {
    toast("이 기기에서는 GPS를 사용할 수 없어요.");
    return;
  }
  toast("현재 위치를 확인하고 있어요...");
  navigator.geolocation.getCurrentPosition(
    (position) => {
      currentPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      currentPlaceLabel = "";
      renderLocation();
      updateGoogleMapPosition();
      loadGoogleMaps().then(updateCurrentPlaceName).catch(renderLocation);
      toast("GPS 위치를 적용했어요.");
    },
    () => {
      toast("위치 권한이 허용되지 않았어요.");
    },
    {
      enableHighAccuracy: false,
      maximumAge: 1000 * 60 * 20,
      timeout: 8000
    }
  );
}

async function installApp() {
  if (!deferredInstallPrompt) {
    toast("Use your browser menu to add this app to the home screen.");
    return;
  }
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast("복사됐어요.");
  } catch {
    toast("복사 권한을 확인해 주세요.");
  }
}

function toast(message) {
  const node = $("[data-toast]");
  node.textContent = message;
  node.classList.add("show");
  clearTimeout(node.timer);
  node.timer = setTimeout(() => node.classList.remove("show"), 2400);
}

function formatBytes(bytes) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** index).toFixed(index ? 1 : 0)} ${units[index]}`;
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "");
}

function sanitizeFileName(value = "file") {
  const fallback = "file";
  return String(value)
    .replace(/[\\/:*?"<>|#%{}^~[\]`]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120) || fallback;
}

function encodeStoragePath(path = "") {
  return path
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(value = "") {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  if (window.__VOLUNTEER_KIT_DEV__ || location.hostname === "127.0.0.1" || location.hostname === "localhost") {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map((registration) => registration.unregister()));
    if ("caches" in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    }
    return;
  }
  try {
    await navigator.serviceWorker.register("sw.js");
  } catch {
    toast("오프라인 캐시 등록은 로컬 서버에서 확인할 수 있어요.");
  }
}

init();
