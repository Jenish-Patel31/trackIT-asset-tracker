# 📦 TrackIT – Asset Tracker
![trackIT](https://github.com/user-attachments/assets/87434c99-3cf0-4d11-9ef6-56b22cb6edcf)

**TrackIT** is a modern full-stack **Asset Tracking Web App** that helps organizations seamlessly register, monitor, and manage physical assets using barcode scanning. Built using the **MERN stack** with real-time Google Sheets integration (optional), this project demonstrates practical software engineering skills including authentication, CRUD operations, and deployment.

---

## 🌐 Live Demo

- **Frontend**: [trackit-asset-tracker.vercel.app](https://trackit-asset-tracker.vercel.app)
- **Backend API**: [trackit-asset-tracker.onrender.com](https://trackit-asset-tracker.onrender.com)

---

## 🚀 Features

- 📥 **Barcode-based Asset Registration**
- 🔍 **Real-time Search** by Barcode
- 📊 **Dashboard View** using DataTables
- 🔒 **JWT-based Authentication** (Login/Register)
- ☁️ **MongoDB Atlas** for cloud database
- 🖼️ Clean & responsive **UI with Tailwind CSS**
- 🌍 Fully deployed on **Render** and **Vercel**

---

## 🛠️ Tech Stack

| Frontend        | Backend         | Database         | Tools & Deployment     |
|----------------|----------------|------------------|------------------------|
| React.js       | Node.js + Express | MongoDB Atlas     | Vercel (Frontend)      |
| Axios          | JWT Auth        | Mongoose ORM      | Render (Backend API)   |
| DataTables.js  | CORS, dotenv    |                  | GitHub + CI/CD         |

---

## 📸 Screenshots

> _Add real images for bonus points with UI & dashboard view_

---

## 🧠 Architecture

             ┌─────────────────────────────┐
             │        React.js (UI)        │
             │   Hosted on Vercel (CDN)    │
             └────────────┬────────────────┘
                          │
                          ▼
             ┌─────────────────────────────┐
             │      Axios HTTP Client      │
             └────────────┬────────────────┘
                          │
                          ▼
             ┌─────────────────────────────┐
             │  Node.js + Express Backend  │
             │  Hosted on Render Platform  │
             └────────────┬────────────────┘
                          │
                          ▼
             ┌─────────────────────────────┐
             │     MongoDB Atlas (DB)      │
             │   Mongoose ODM Integration  │
             └─────────────────────────────┘



## Authentication
- User Registration/Login
- JWT Token-based session management
- Protected routes (for sensitive actions)

## Project Structure

```
asset-tracker/
├── frontend/           # React App
│   └── src/
│       └── components/
├── backend/            # Express API
│   └── routes/
│   └── controllers/
│   └── models/
└── .env        # Environment variables
```
## Setup Locally


### Clone the repo
```
git clone https://github.com/yourusername/trackit-asset-tracker.git
cd trackit-asset-tracker
```

### Backend setup
```
cd backend
npm install
touch .env   # Add Mongo URI & JWT_SECRET
node server.js
```

### Frontend setup
```
cd ../frontend
npm install
npm run dev

```

##  Environment Variables (.env)

### Backend/.env
```
MONGO_URI=your_mongo_atlas_uri
JWT_SECRET=your_secret
```

## Future Improvements
- Role-based Admin Panel
- Export to CSV/PDF
- Notifications & Logs
- Email alerts for assigned devices


## 👨‍💻 Author

**Jenish Patel**

- 🔗 [LinkedIn](www.linkedin.com/in/jenish-patel-31k)
- 🐙 [GitHub](https://github.com/Jenish-Patel31)
- 📧 jenishkp07@gmail.com
