# Bloodio

Aplikasi ini merupakan aplikasi yang dibuat merupakan aplikasi berbasis web yang membantu masyarakat dalam mencari pendonor darah. Aplikasi ini berfungsi sebagai layanan penghubung antara orang yang membutuhkan pendonor darah dengan orang yang bersedia mendonorkan darahnya. Tujuan dari aplikasi ini yaitu menyediakan akses bagi masyarakat sehingga mendapatkan kemudahan dalam memperoleh kebutuhan darah yang dibutuhkan.

## Members of Kelompok 1

- [Muhammad Raihan - 19/439817/TK/48547](https://www.github.com/mraihannn)
- [Tengku Rafi Nugroho Maghribi - 19/439823/TK/48553](https://www.github.com/rafinm)
- [Hafizha Ulinnuha Ahmad - 20/456365/TK/50495](https://www.github.com/hafizhaua)
- [Auletta Khansa Pradiviasari - 20/456359/TK/50489](https://github.com/Auletta-Khansa)
- [Maura Yufi Septania Putri - 20/463607/TK/51599](https://github.com/MauraYufi)

## Run Locally

Clone the project

```bash
  git clone https://github.com/hafizhaua/PAW_Kelompok1.git
```

Go to the project directory

```bash
  cd PAW_Kelompok1
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

## API Reference

#### --- Get all donor request items

```http
GET /donorRequest/?sort=&city=&bloodType=
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `sort`    | `string` | date sorting, either `newest` or `oldest` |
| `city`    | `string` | filtering based on city |
| `bloodType`    | `string` | filtering based on blood type |

#### --- Get a donor request item

```http
GET /donorRequest/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### --- Post a donor request item

```http
POST /donorRequest/
```

RAW JSON Body
```json
{
    "recipient": "Sandi Andi",
    "bloodType": "A+",
    "bagQuantity": 3,
    "donorType": "WB",
    "city": "Jakarta",
    "hospital": "RSUP Fatmawati",
    "cpName": "Syahrima Andini",
    "cpPhoneNum": "+628123112233"
}
```

#### --- Update a donor request item

```http
PATCH /donorRequest/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to update |

RAW JSON Body
```json
{
    "bagQuantity": 2,
    "city": "Yogyakarta"
}
```

#### --- Delete a donor request item

```http
DELETE /donorRequest/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to delete |

## Documentation

- [Project Presentation Video - Backend & API](https://bit.ly/VideoPresentasiAPI_Kelompok1)
- [Project Presentation Slide - Backend & API](https://bit.ly/SlidePresentasiAPI_Kelompok1)


