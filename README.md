# Volunteer Kit

인도네시아 해외봉사팀을 위한 오프라인 지원 PWA입니다.

## 주요 기능

- 홈 화면에 추가해서 앱처럼 사용
- 팀 클라우드 연결을 통한 일정, 준비물, 파일 공유
- 회화·사전, 수업 카드, 활동 타이머, 조 나누기, 이름 수첩
- 건축 현장 체크리스트와 현장 표현
- 자료실 PDF, 이미지, TXT 업로드 및 Supabase Storage 공유
- 오프라인 캐시와 로컬 저장 지원

## 로컬 실행

```powershell
node server.mjs 4180
```

브라우저에서 `http://127.0.0.1:4180`으로 접속하면 됩니다.

## 배포

Vercel 같은 정적 웹 배포 플랫폼에 올린 뒤, 배포 URL을 QR로 만들어 팀원에게 공유하면 됩니다.

Vercel 환경변수에는 아래 값을 등록해야 팀 클라우드와 지도가 동작합니다.

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `GOOGLE_MAPS_API_KEY`

로컬에서 테스트할 때는 `config.example.js`를 참고해 `config.js`를 만들면 됩니다.
