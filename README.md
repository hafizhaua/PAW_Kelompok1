# Bloodio

Aplikasi ini merupakan aplikasi yang dibuat merupakan aplikasi berbasis web yang membantu masyarakat dalam mencari pendonor darah. Aplikasi ini berfungsi sebagai layanan penghubung antara orang yang membutuhkan pendonor darah dengan orang yang bersedia mendonorkan darahnya. Tujuan dari aplikasi ini yaitu menyediakan akses bagi masyarakat sehingga mendapatkan kemudahan dalam memperoleh kebutuhan darah yang dibutuhkan.

Akses demonya melalui [https://bloodio.vercel.app/](https://bloodio.vercel.app/)

## Members of Kelompok 1

- [Muhammad Raihan - 19/439817/TK/48547](https://www.github.com/mraihannn)
- [Tengku Rafi Nugroho Maghribi - 19/439823/TK/48553](https://www.github.com/rafinm)
- [Hafizha Ulinnuha Ahmad - 20/456365/TK/50495](https://www.github.com/hafizhaua)
- [Auletta Khansa Pradiviasari - 20/456359/TK/50489](https://github.com/Auletta-Khansa)
- [Maura Yufi Septania Putri - 20/463607/TK/51599](https://github.com/MauraYufi)

## Demo

| Side | URL     | Deployed Repository  |
| :-------- | :------- | :------------------------- |
| Backend | [https://bloodio-api.vercel.app/](https://bloodio-api.vercel.app/) | [PAW_Kelompok1](https://github.com/hafizhaua/PAW_Kelompok1/) (repository utama berisi dokumentasi pengerjaan BE & FE) |
| Frontend | [https://bloodio.vercel.app/](https://bloodio.vercel.app/) | [Bloodio-FE](https://github.com/hafizhaua/Bloodio-FE) (repository yang dibuat hanya untuk keperluan deployment FE)|

## Documentation

- [Project Presentation Video - Backend & API](https://bit.ly/VideoPresentasiAPI_Kelompok1)
- [Project Presentation Slide - Backend & API](https://bit.ly/SlidePresentasiAPI_Kelompok1)
- [Project Presentation Slide - Frontend & Final Integration](https://bit.ly/SlidePresentasi_Kelompok1)

## Role-based Auth Demo

<img src="https://user-images.githubusercontent.com/72615421/206965970-792d9fd2-bb86-47d1-a3c5-c29718367773.png" width="500" />

Pengunjung pada laman dapat dibedakan berdasarkan *role*-nya menjadi:

### Public
- Dapat [melihat](https://bloodio.vercel.app/search) semua permintaan donor darah yang terdaftar

### User
- Dapat membuat permintaan donor darah
- Dapat memerbarui dan menghapus permintaan donor khusus yang dibuat oleh akun itu sendiri
- Demo dapat dilakukan dengan [mendaftar](https://bloodio.vercel.app/signup) dan [login](https://bloodio.vercel.app/login) secara langsung pada web

### Admin
- Dapat memerbarui permintaan donor darah yang ada pada sistem
- Dapat menghapus permintaan donor darah yang ada pada sistem
- Memiliki *priviledge* *role* user
- Demo dapat dilakukan dengan [login](https://bloodio.vercel.app/login) dengan username `admin` dan password `Admin123`

### Moderator**
- Dapat melihat semua akun yang terdaftar pada sistem
- Dapat memberikan *role/priviledge* pada akun kecuali akunnya sendiri
- Dapat menghapus akun yang terdaftar pada sistem kecuali akunnya sendiri
- Memiliki *priviledge* *role* user
- Umumnya/idealnya juga memiliki *role* admin (tetapi bisa juga tidak)
- Demo dapat dilakukan dengan [login](https://bloodio.vercel.app/login) dengan username `moderator` dan password `Moderator123`

## Run Locally

Clone the project

```bash
  git clone https://github.com/hafizhaua/PAW_Kelompok1.git
```

Go to the project directory

```bash
  cd PAW_Kelompok1
```

### Backend

Go to the backend project directory

```bash
  cd backend
```

Create .env file and fill the variables needed

```
  PORT =
  DB_URL =
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

### Frontend

Go to the frontend project directory

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```

Run the app in development mode

```bash
  npm start
```
