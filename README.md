# 🎓 University Dynamic Multi-Page Web Application

## 📌 Project Overview

This project is a **dynamic university website** developed using **HTML, CSS, JavaScript, Node.js, Express, and MySQL**.  
It includes multiple pages such as **Home, About, Departments, Admissions, and Contact**, along with a fully **dynamic Admission Management System** connected to a MySQL database.

The system allows users to:
- Start an admission application
- Enter section-wise admission information
- Add, edit, and delete data dynamically
- Store and retrieve data from a MySQL database in real time

---

## 🚀 Features & Functionality

### 🌐 Frontend Features
- Multi-page university website
- Clean and responsive user interface
- JavaScript-based dynamic interaction
- Section-wise admission data entry
- Logout functionality to end user session

### 🗄️ Backend Features
- RESTful APIs using Node.js and Express
- MySQL database integration
- Environment variable configuration using `.env`
- Secure database connectivity
- Full CRUD functionality

### 📋 Admission Management System
- Create a new admission application
- Automatically generate a unique `admission_id`
- Store data under multiple sections:
  - Student Information
  - Academic Background
  - Admission Requirements
  - Program Information
  - Application Status
  - Documents
  - Communication
- Edit and delete stored records
- Fetch data dynamically without page reload

---

## 🛠️ Technologies Used

### Frontend
- HTML5  
- CSS3  
- JavaScript (Vanilla)

### Backend
- Node.js  
- Express.js  
- MySQL  
- mysql2  
- dotenv  
- cors  

### Tools
- VS Code  
- MySQL Workbench  
- Git & GitHub  

---

## 🗃️ Database Structure

### `admissions` Table

| Column | Type |
|------|------|
| id | INT (Primary Key, Auto Increment) |
| applicant_name | VARCHAR |
| created_at | TIMESTAMP |

### `admission_details` Table

| Column | Type |
|------|------|
| id | INT (Primary Key, Auto Increment) |
| admission_id | INT (Foreign Key) |
| section | VARCHAR |
| attribute | TEXT |
| created_at | TIMESTAMP |

---

## 📂 Project Folder Structure

```
university dynamic multi-page web/
│
├── server/
│   ├── index.js
│   ├── .env
│   ├── node_modules/
│   └── package.json
│
├── public/
│   ├── index.html
│   ├── about.html
│   ├── department.html
│   ├── admission.html
│   ├── contact.html
│   └── style.css
│
├── .gitignore
└── README.md
```

---

## ⚙️ How to Run the Project

### 1️⃣ Clone the Repository
```
git clone <repository-url>
cd university-dynamic-multi-page-web
```

### 2️⃣ Install Backend Dependencies
```
cd server
npm install
```

### 3️⃣ Create `.env` File

Location: `server/.env`

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=university_site
PORT=5000
```

### 4️⃣ Start MySQL Server
- Open MySQL Workbench
- Ensure MySQL service is running
- Create database and tables if not already created

### 5️⃣ Run Backend Server
```
node index.js
```

Expected output:
```
Server running at http://localhost:5000
```

### 6️⃣ Open Frontend
- Open `index.html` using VS Code Live Server  
  OR  
- Open directly in a web browser

---

## 🔄 Application Flow

1. User opens the university homepage  
2. Navigates to the Admission page  
3. Starts a new admission application  
4. System generates a unique admission ID  
5. User adds section-wise information  
6. Data is stored in MySQL database  
7. User can edit or delete data  
8. Logout ends the session  

---

## 🔐 Security & Best Practices

- Database credentials stored securely in `.env`
- `.env` and `node_modules` excluded using `.gitignore`
- Backend validates input before database operations
- RESTful API design followed

---

## 📝 Conclusion

This project demonstrates how a **static website** can be transformed into a **fully dynamic, database-driven web application**.  
It is suitable for **academic submission**, learning purposes, and future enhancement.

---

