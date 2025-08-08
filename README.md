# 🛒 MERN E-Commerce

A full-stack e-commerce web application built with **MongoDB**, **Express.js**, **React**, and **Node.js** (MERN Stack).  
The platform includes product management, user authentication, cart functionality, order processing, VNPay online payments, and an admin dashboard.

## 🚀 Features

### 👤 User Features

-   User registration and login with **JWT authentication**
-   Secure password storage with **bcrypt**
-   Browse products with categories and search
-   Product detail page with images and descriptions
-   Shopping cart management
-   Checkout with **VNPay** integration
-   Order history and tracking
-   Responsive design for mobile & desktop

### 🛠 Admin Features

-   Manage products (add, update, delete)
-   Manage orders (view, update status)
-   Export orders to Excel (`xlsx`)
-   Dashboard with sales statistics (**Recharts**)
-   Email notifications for orders (**Nodemailer**)

### 🔒 Security

-   JWT-based authentication
-   CORS protection
-   Environment variables with `.env`
-   Secure file uploads with **Multer**

---

## 🛠 Tech Stack

### Backend

-   **Node.js** & **Express.js** - REST API
-   **MongoDB** & **Mongoose** - Database
-   **JWT** - Authentication
-   **Multer** - File uploads
-   **Nodemailer** - Email notifications
-   **VNPay** - Payment gateway integration
-   **dotenv** - Environment variables

### Frontend

-   **React** - UI
-   **Redux Toolkit** - State management
-   **React Router DOM** - Routing
-   **Axios** - API calls
-   **React Query** - Data fetching
-   **TailwindCSS** - Styling
-   **Recharts** - Charts & analytics
-   **xlsx** - Export data
-   **React Slick / Slick Carousel** - Product sliders
-   **React Spinners** - Loading animations
-   **React Icons** - Icon set

---

## 📂 Project Structure

```
ecommerce-mern/
├── ecommerce-backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── middlewares/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── services/
│ │ └── index.js
│ ├── .env
│ ├── package.json
│ └── ...
├── ecommerce-frontend/ # React frontend
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── pages/
│ │ ├── redux/
│ │ ├── routes/
│ │ ├── services/
│ │ ├── App.js
│ │ ├── axiosInterceptor.js
│ │ ├── contain.js
│ │ ├── index.css
│ │ ├── index.js
│ │ └── util.js
│ ├── package.json
│ └── ...
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone repository

git clone https://github.com/truong93540/MERN-ecommerce.git
cd MERN-ecommerce

2️⃣ Backend setup:

```
cd ecommerce-backend
npm install
```

Create a .env file in ecommerce-backend/:

```
MONGO_DB=your_mongodb_connection_string
PORT=3002
URL_BACKEND=http://localhost:3002
REFRESH_TOKEN=refresh_token_secret
ACCESS_TOKEN=access_token_secret
URL_FRONTEND=http://localhost:3000
TMNCODE=your_vnpay_tmncode
SECURESECRET=your_vnpay_secure_secret
MAIL_PASSWORD=your_mail_password
MAIL_ACCOUNT=your_email
```

Run backend: npm start

3️⃣ Frontend setup

```
cd commerce-frontend
npm install
```

Create a .env file in ecommerce-frontend/:

```
REACT_APP_API_URL_BACKEND=http://localhost:3002/api
REACT_APP_FB_ID=your_facebook_app_id
REACT_APP_IS_LOCAL=true
REACT_APP_LINK_MESSAGE_PAGE=https://m.me/your_page_id
```

Run frontend: npm start

---

💳 Payment Integration
VNPay: Integrated for local Vietnam payment gateway

---

📜 License
This project is licensed under the MIT License - you are free to use, modify, and distribute it with proper attribution.

👨‍💻 Author: Nguyễn Văn Trường
Contact Email: truong93540@gmail.com
