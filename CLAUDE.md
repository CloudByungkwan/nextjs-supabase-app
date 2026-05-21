# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 개요

Next.js 15 (App Router) + Supabase 스타터 키트. SSR 기반 인증을 쿠키로 관리하며, shadcn/ui와 Tailwind CSS로 스타일링된 풀스택 앱입니다.

## 개발 명령어

```bash
npm run dev       # 개발 서버 실행 (localhost:3000)
npm run build     # 프로덕션 빌드
npm start         # 프로덕션 서버 실행
npm run lint      # ESLint 실행
```

## 필수 환경 변수

`.env.local` 파일에 다음을 설정:
```
NEXT_PUBLIC_SUPABASE_URL=<Supabase 프로젝트 URL>
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<Supabase 공개 키>
```

앱은 `lib/utils.ts`의 `hasEnvVars` 함수로 필수 환경 변수 유효성을 검사합니다. URL은 http/https 프로토콜로 시작해야 합니다.

## 아키텍처

### Supabase 클라이언트 (`lib/supabase/`)

- **`server.ts`**: 서버 컴포넌트/액션용 Supabase 클라이언트 생성
  - `createClient()`: 매번 호출할 때마다 새 클라이언트 생성 (Fluid compute 호환)
  - 쿠키 기반 세션 관리

- **`client.ts`**: 클라이언트 컴포넌트용 Supabase 클라이언트 생성
  - `createClient()`: 브라우저에서 사용

### 페이지 구조 (`app/`)

- **`/`**: 홈페이지 및 온보딩
  - 환경 변수 상태에 따라 설정 가이드 또는 회원가입 가이드 표시
  - `hasEnvVars`로 조건부 렌더링

- **`/auth/`**: 인증 관련 페이지
  - `/login`: 로그인 폼
  - `/sign-up`: 회원가입 폼
  - `/forgot-password`: 비밀번호 재설정
  - `/update-password`: 비밀번호 변경
  - `/confirm`: 이메일 확인 콜백 (Route Handler)

- **`/protected/`**: 인증 필요한 페이지 그룹
  - 레이아웃 공유 (네비게이션, 푸터)
  - 인증 상태 확인 로직 추가 가능

- **`/instruments/`**: 새로 추가된 기능 페이지

### 컴포넌트 (`components/`)

- **UI 컴포넌트** (`ui/`): shadcn/ui 기반
  - Button, Input, Card, Checkbox, DropdownMenu, Label, Badge 등
  - Tailwind CSS로 스타일링

- **폼 컴포넌트**:
  - `login-form.tsx`, `sign-up-form.tsx`, `forgot-password-form.tsx`, `update-password-form.tsx`
  - React Hook Form 기반

- **레이아웃 컴포넌트**:
  - `auth-button.tsx`: 사용자 인증 상태 표시 및 로그아웃
  - `hero.tsx`, `deploy-button.tsx`: 홈페이지 섹션

- **튜토리얼 컴포넌트** (`tutorial/`):
  - 온보딩 가이드 (Supabase 설정, 회원가입 안내)

### 유틸리티 (`lib/utils.ts`)

- **`cn(...inputs)`**: Tailwind CSS 클래스 병합 (clsx + tailwind-merge)
- **`hasEnvVars`**: 필수 환경 변수 유효성 확인 (boolean 상수)

## 핵심 기술 스택

- **Next.js 15**: App Router, Server Components, Route Handlers
- **React 19**: 최신 React API
- **Supabase**: 백엔드/인증 (SSR with cookies)
- **Tailwind CSS**: 유틸리티 CSS
- **shadcn/ui**: UI 컴포넌트 라이브러리
- **next-themes**: 다크 모드 지원
- **TypeScript**: 타입 안정성

## Next.js 16 Proxy 변경 사항

**주의**: Next.js 16에서는 middleware 파일명이 `proxy.ts`로 변경되고, export 함수명도 `proxy`로 변경됩니다. 자세한 내용은 메모리 참고: [[Next.js 16 proxy (구 middleware)]]

## 타입 안정성

- `tsconfig.json`에 `"strict": true` 설정
- `any` 타입 금지, 명시적 타입 정의 필수
- 경로 별칭: `@/*`로 루트부터 import 가능

## 코딩 스타일

- 들여쓰기: 2칸
- 네이밍: 변수/함수는 camelCase, 컴포넌트는 PascalCase
- 컴포넌트는 기능별로 분리하고 재사용성 고려
