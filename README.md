# [onbloc FE 과제] Gno.land Simple Dapp 구현

## 개요

Gno.land 블록체인과 Adena 지갑을 연동하여 기본적인 지갑 기능을 구현한 웹 애플리케이션입니다.

## 프로젝트

### 실행

```
git clone https://github.com/sejin5/Simple-Dapp.git
cd Simple-Dapp
npm install
npm run dev
```

### 환경
- react: 19.2.0
- vite: 7.3.1
- tailwindcss: 4.2.1
- zustand: 5.0.11

### 프로젝트 구조
```
simple-dapp/
├── public/
└── src/
    ├── components/
    ├── stores/
    ├── types/
    ├── utils/
    ├── App.tsx
    ├── index.css
    └── main.tsx
```

### 기능
#### 1. Adena Wallet 연동
- Adena 익스텐션 미 설치시 [설치페이지](https://www.adena.app/)로 이동
- Connect 버튼 클릭 시, 이미 연동되어 있다면 연결상태로 인식

#### 2. 계정 정보 조회
  - Gno.land Address 조회
  - Balance 조회
    
#### 3. GNOT 전송 기능
  - GNOT 전송
  - 트랜잭션 결과 Toast 알림으로 결과 확인
  - 전송 단위를 GNOT | ugnot 선택 가능

#### 4. 기타 공통 사항
 - 조회, 전송 버튼 클릭 시 response 대기 동안 button disabled 적용
 - Wallet Locked 상태에서 버튼 클릭 시, Toast 알림과 동시에 팝업창으로 Lock 해제 유도.

<img width="975" height="541" alt="Image" src="https://github.com/user-attachments/assets/1cf4460f-eb29-4d10-bc73-c019ce86f305" />