# Expense Tracker — Fullstack (React • Node • Express • MongoDB • JWT)

A simple, secure expense tracker web app built with a React frontend and a Node/Express + MongoDB backend.

> Includes: auth (signup/login), protected routes, expense & income management, file uploads (receipts), and a clean componentized React UI.

---

## Table of contents

* Demo / Screenshots
* Features
* Tech stack
* Repository structure
* Requirements
* Installation
  * Backend
  * Frontend
* Environment variables
* Start / Development
* API overview](#api-overview)
* Authentication flow
* Future improvements
* Contributing
  
---

## Demo / Screenshots

### Login Page

<img width="1918" height="971" alt="image" src="https://github.com/user-attachments/assets/30c93649-112c-4ae0-ad44-63804c0a37f3" />

### Dashboard Page

<img width="1896" height="910" alt="image" src="https://github.com/user-attachments/assets/e3ed19bd-dab4-4e2a-88cd-9a396b109d65" />

### Income Page

<img width="1896" height="970" alt="image" src="https://github.com/user-attachments/assets/189ed3b9-0855-4800-a27b-1072807d57b9" />

### Expense Page

<img width="1897" height="971" alt="image" src="https://github.com/user-attachments/assets/1b59df53-bb9b-4808-a584-4f093e99e953" />

---

## Features

* User registration & login (JWT-based)
* Protected API endpoints (authenticated user only)
* Create / Read / Update / Delete expenses & income
* Categorization, amount, date, description for each entry
* File upload support (receipt images)
* React componentized UI (Cards, Charts, Layouts, Modal, Alerts)
* MongoDB as the datastore
* Error handling and validation on backend

---

## Tech stack

* **Frontend:** React Vite, React Router, Context/hooks
* **Backend:** Node.js, Express
* **Database:** MongoDB Atlas
* **Auth:** JWT (`jsonwebtoken`)
* **File uploads:** `multer`
* **Dev tools:** `nodemon`

---

## Repository structure (based on screenshot)

```
expense-tracker/
├─ backend/
│  ├─ middleware/
│  ├─ models/
│  ├─ routes/
│  ├─ uploads/
│  ├─ .env
│  ├─ package.json
│  └─ server.js
├─ frontend/
│  ├─ public/
│  ├─ src/
│  │  ├─ assets/
│  │  ├─ components/
│  │  │  ├─ Cards/
│  │  │  ├─ Charts/
│  │  │  ├─ Dashboard/
│  │  │  ├─ Expense/
│  │  │  ├─ Income/
│  │  │  ├─ input/
│  │  │  └─ layout/
│  │  │     ├─ DeleteAlert.jsx
│  │  │     ├─ EmojiPickerPopup.jsx
│  │  │     └─ Modal.jsx
│  │  ├─ context/
│  │  ├─ hooks/
│  │  ├─ pages/
│  │  ├─ utils/
│  │  ├─ App.css
│  │  |__ App.jsx
|  |  ├─ index.css
|  |  ├─ main.css
│  │  └─ index.html
│  ├─ package.json
└─ README.md
```

---

## Requirements

* Node.js (LTS recommended)
* npm
* MongoDB Atlas

---

## Installation

### Backend

1. Open terminal and go to `backend/`
2. Install dependencies:

```bash
cd backend
npm install
```

3. Create `.env` in `backend/` (see [Environment variables](#environment-variables))
4. Run server:

```bash
# development with nodemon (if configured)
npm run dev

```

Typical backend scripts in `package.json`:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

### Frontend

1. Open another terminal and go to `frontend/`
2. Install dependencies:

```bash
cd frontend
npm install
```

3. Create any required frontend `.env` (if needed)
4. Run:

```bash
npm run dev
```

---

## Environment variables

Example `.env` for backend (replace placeholder values):

```
PORT=8000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/expense-tracker?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key

```

**Security note:** Never commit `.env` to git. Add to `.gitignore`.

---

## Start / Development

Run backend and frontend concurrently (optional):

```bash
# from project root, you can use concurrently in package.json to start both
npm run dev:all
```

`dev:all` example in root `package.json` could be:

```json
"scripts": {
  "dev:all": "concurrently \"cd backend && npm run dev\" \"cd frontend && npm start\""
}
```

---

## API overview (example endpoints)

> All protected endpoints require header `Authorization: Bearer <token>`

### Auth

* `POST /api/auth/register` — register a new user
  body: `{ "name": "...", "email": "...", "password": "..." }`
  response: `{ user, token }`

* `POST /api/auth/login` — login
  body: `{ "email": "...", "password": "..." }`
  response: `{ user, token }`

### Expenses

* `GET /api/expenses` — list user’s expenses
* `POST /api/expenses` — create expense
  body: `{ "title", "amount", "category", "date", "notes" }`
* `GET /api/expenses/:id` — get single expense
* `PUT /api/expenses/:id` — update expense
* `DELETE /api/expenses/:id` — delete expense

### Income

* `GET /api/income` — list user’s income records
* `POST /api/income` — create income record
* `PUT /api/income/:id` — update
* `DELETE /api/income/:id` — delete

### Uploads (receipts)

* `POST /api/uploads` — upload receipt image (multipart/form-data, use multer)

  * returns stored file URL or path

---

## Authentication flow

1. User registers — server creates user record and returns JWT token.
2. Frontend stores token (recommended: `httpOnly` cookie or localStorage — note XSS/CSRF tradeoffs).
3. For requests to protected routes, frontend sends `Authorization: Bearer <token>`.
4. Server middleware verifies token, sets `req.user`, and forwards request.

---

## Example requests (curl)

Register:

```bash
curl -X POST http://localhost:5000/api/auth/register \
 -H "Content-Type: application/json" \
 -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

Create expense (authenticated):

```bash
curl -X POST http://localhost:5000/api/expenses \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer <TOKEN>" \
 -d '{"title":"Coffee","amount":3.5,"category":"Food","date":"2025-09-21"}'
```
---


## Security best practices

* Keep `JWT_SECRET` safe, rotate periodically.
* Prefer httpOnly cookies + CSRF protections for auth if you can — otherwise carefully protect against XSS when using localStorage.
* Validate and sanitize input on the server.
* Restrict upload file types and sizes; store uploads outside web root or use cloud storage.

---

## Future improvements

* Recurring expenses
* CSV import/export
* Charts & analytics by category & period
* Mobile-responsive improvements
* Role-based access (multi-user/teams)
* Monthly budget and notifications
* Unit & integration tests

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit changes: `git commit -m "feat: add ..."`
4. Push and open a PR

Add clear issues and describe the feature or bug, include screenshots where helpful.

---

## Troubleshooting

* `MONGO_URI` connection errors → check credentials and IP whitelist (Atlas).
* `CORS` issues → configure `cors()` in Express and ensure frontend origin is allowed.
* `File upload` 413 errors → check multer limits and server body parser limits.

---

## Contact & Credits

Created by — Vishvak, LinkedIn : https://www.linkedin.com/in/vishvak-r/

---
