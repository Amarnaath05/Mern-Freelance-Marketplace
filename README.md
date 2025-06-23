<div align="center">

# 🧑‍💻 MERN Freelance Marketplace  
A modern freelance hiring platform built using the MERN stack.

[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](#)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](#)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](#)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens)](#)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)

</div>

---

## ✨ Overview

The **MERN Freelance Marketplace** is a full-featured web application where clients can hire freelancers, post jobs, and manage ongoing projects. Freelancers can showcase their skills, bid on jobs, and maintain a profile with a portfolio.

> 🔐 Includes role-based access for **Clients**, **Freelancers**, and **Admins**

---

## 🚩 Features

- ✅ **Secure Authentication** with JWT
- 👤 Role-based Dashboards for Client, Freelancer & Admin
- 📂 Job Posting & Application System
- 💼 Freelancer Bidding Workflow
- 🧾 Resume/Portfolio Upload & Showcase
- 📊 Admin Management Dashboard
- 🌐 Fully responsive frontend with Tailwind CSS
- 🔍 Filters, Search, and Categorized Listings

---

## 🖼️ Screenshots

> Add screenshots to `assets/screenshots/` and link them here.

| Landing Page | Freelancer Profile | Job Board |
|--------------|--------------------|------------|
| ![](assets/screenshots/home.png) | ![](assets/screenshots/freelancer.png) | ![](assets/screenshots/jobs.png) |

---

## 🛠️ Getting Started

### 📦 Clone & Install

```bash
git clone https://github.com/Amarnaath05/Mern-Freelance-Marketplace.git
cd Mern-Freelance-Marketplace
```

**Frontend Setup**

```bash
cd freelancerfrontend
npm install
npm run dev
```

**Backend Setup**

```bash
cd ../freelancerbackend
npm install
npm run dev
```

### 🔐 Environment Variables (`freelancerbackend/.env`)

```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

---

## 📁 Project Structure

```
Mern-Freelance-Marketplace/
├── freelancerfrontend/
│   └── src/components, pages, context/
├── freelancerbackend/
│   └── routes, controllers, models, middleware/
└── README.md
```

---

## 🙋 Author

**Amarnaath K**  
📧 Email: [youremail@example.com](mailto:youremail@example.com)  
🔗 LinkedIn: [linkedin.com/in/your-profile](https://linkedin.com/in/your-profile)  
🌐 Portfolio: [your-portfolio.com](https://your-portfolio.com)

---

## 🤝 Contributing

We welcome contributions! Feel free to fork the repo, make changes, and create a pull request.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
