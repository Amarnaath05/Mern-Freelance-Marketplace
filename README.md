# 🧑‍💻 MERN Freelance Marketplace

A full-featured Freelance Marketplace web application built with the **MERN Stack** — allowing clients to hire freelancers, post jobs, bid on services, manage profiles, and much more.

> 🌟 Modern, responsive, and built with role-based access: Client 👤 | Freelancer 💼 | Admin 🛡️

---

## 🚀 Tech Stack

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node-dot-js&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## 📸 Screenshots

| Landing Page | Freelancer Profile | Job Listings |
|--------------|--------------------|---------------|
| ![Landing](assets/screenshots/home.png) | ![Freelancer](assets/screenshots/freelancer.png) | ![Jobs](assets/screenshots/jobs.png) |

> 💡 You can add your own screenshots inside a folder like `assets/screenshots/`.

---

## 🧰 Features

- 🔐 Role-based login (Client, Freelancer, Admin)
- 📝 Post & browse jobs
- 💬 Bid on jobs
- 👤 Create and manage freelancer profiles
- 📂 Upload portfolios / services
- 📊 Admin dashboard to manage listings
- 🎯 Category filters, search, pagination, and more!

---

## ⚙️ Getting Started

### 1️⃣ Clone the repo

```bash
git clone https://github.com/Amarnaath05/Mern-Freelance-Marketplace.git
cd Mern-Freelance-Marketplace
```

### 2️⃣ Install dependencies

- Frontend:

```bash
cd freelancerfrontend
npm install
```

- Backend:

```bash
cd ../freelancerbackend
npm install
```

### 3️⃣ Setup `.env` for backend

Create a `.env` file inside `freelancerbackend/`:

```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 4️⃣ Run the app

- Backend:

```bash
npm run dev
```

- Frontend (in a new terminal):

```bash
cd freelancerfrontend
npm run dev
```

---

## 📁 Folder Structure

```
Mern-Freelance-Marketplace/
├── freelancerbackend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── middleware/
├── freelancerfrontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── RoleContext.jsx
└── README.md
```

---

## 🧑‍💻 Author

**Amarnaath K**  
📧 [Email](mailto:youremail@example.com)  
🔗 [LinkedIn](https://linkedin.com/in/your-profile)  
💻 [Portfolio](https://your-portfolio-link.com)

---

## 🤝 Contributing

Contributions are welcome! Fork the repo, make changes, and open a PR.

---

## 📄 License

This project is licensed under the **MIT License**.  
See `LICENSE` for more details.
