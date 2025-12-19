1. Clone repository

```bash
git clone https://github.com/vedianbnka/GLI_TechnicalTest.git
cd GLI_TechnicalTest
```

2. Buat database MySQL dengan nama:
```bash
gli_technical_test
```

4. Jalankan backend
```bash
cd backend
cp .env.example .env
go mod tidy
go run main.go
```

4. Buka tab terminal baru di folder GLI_TechnicalTest dan jalankan frontend
```bash
cd frontend
npm i
npm run dev
```
