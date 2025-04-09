# 🚀 GPCV Backend - Government Polytechnic College, Vanavasi

This is the **backend server** of the official web application for **Government Polytechnic College, Vanavasi (GPCV)**.  
It powers APIs for student services like the Anti-Ragging Complaint Portal, Gallery, Authentication, and more.

> 🔐 Built with **Node.js**, **Express.js**, **MongoDB**, and follows secure API best practices.

---

## 📦 Project Structure

```bash
GPCV-Backend/
│
├── config/          # Database and environment config
├── controllers/     # Route controllers
├── middleware/      # Custom middlewares like auth, error handler
├── models/          # Mongoose schemas and models
├── routes/          # Route definitions
├── services/        # Service layer logic (e.g. email)
├── utils/           # Utility functions
├── .env             # Environment variables
├── server.js        # Entry point
└── README.md        # Project documentation
```

## 🌐 Live URL

🌍 API Hosted at: [https://gpcv-backend.onrender.com](https://gpcv-backend.onrender.com)

---

## 📌 Key Features

- 🔐 Secure RESTful APIs for frontend integration
- ✉️ Email sending with EmailJS/Nodemailer
- 📝 Anti-Ragging Complaint submission with anonymous support
- 🖼️ Dynamic photo gallery route
- 📁 Modular code structure with MVC pattern
- 🔄 CORS configured for production frontend domain
- 📄 Error handling and validation

---

## 🛠️ Tech Stack

| Technology        | Purpose                               |
| ----------------- | ------------------------------------- |
| Node.js           | Backend runtime                       |
| Express.js        | Web framework                         |
| MongoDB           | NoSQL database                        |
| Mongoose          | ODM for MongoDB                       |
| Nodemailer        | Email delivery                        |
| dotenv            | Environment variable management       |
| CORS              | Cross-Origin Resource Sharing support |
| Express Validator | Input validation                      |
| Helmet            | Security middleware                   |
| Morgan            | Logging                               |

---

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas or Local MongoDB
- Email credentials (for EmailJS/Nodemailer if enabled)


## 👨‍💻 Developer

**Harish R**  
Frontend Developer | MERN Stack Enthusiast  
📧 Email: [mernharish@gmail.com](mailto:mernharish@gmail.com)  
🌐 Portfolio: [https://it-harish.netlify.app](https://it-harish.netlify.app)  
🔗 GitHub: [IT-HARISH-R](https://github.com/IT-HARISH-R)  
📍 Location: Mettur, Salem District, Tamil Nadu

---

## 🤝 Contributions

This is a solo project built for learning and academic contribution.  
Feel free to **fork**, **star ⭐**, and **suggest improvements** through issues or pull requests!


---


### 📥 Installation

```bash
git clone https://github.com/IT-HARISH-R/GPCV-Backend.git
cd GPCV-Backend
npm install
```