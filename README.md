# 📝 MERN Blog App

A professional, full-stack blog application designed to showcase advanced proficiency in the MERN stack (MongoDB, Express, React, Node.js). This project demonstrates a complete development lifecycle, from secure backend architecture and database management to a high-performance, responsive frontend.

🚀 **Live Demo:** [https://blog-app-prudhvi.netlify.app/](https://blog-app-prudhvi.netlify.app/)

---

## 🏆 Key Skills Demonstrated

- **Full-Stack Architecture**: Implementation of a clean separation of concerns between client and server.
- **Secure Authentication**: Robust user session management using **JWT (JSON Web Tokens)** stored in HTTP-only cookies to prevent XSS attacks.
- **Database Design**: Optimized NoSQL schema design with **Mongoose** for complex data relationships (Users ↔ Blogs).
- **State Management**: Efficient global state handling using **Redux Toolkit** for consistent user experience across the app.
- **Media Optimization**: Integration with **Cloudinary API** for dynamic image resizing, optimization, and cloud storage.
- **RESTful API Development**: Scalable backend endpoints with proper error handling, status codes, and middleware implementation.
- **Frontend Performance**: Built with **Vite** for lightning-fast builds and optimized production bundles.
- **Clean UI/UX**: Professional design implemented with **Tailwind CSS** and **Styled Components**, focusing on accessibility and responsiveness.

---

## ✨ Features

- 🔐 **User Authentication**: Secure signup and signin using JWT and HTTP-only cookies.
- ✍️ **Blog Management**: Full CRUD operations for blog posts.
- 🖼️ **Image Uploads**: Integrated with **Cloudinary** for high-quality image storage and hosting.
- 🔍 **Advanced Search & Filter**: Search blogs by title/description and filter by 21+ categories (Tags).
- 📄 **Pagination**: Smooth navigation through blog posts with server-side pagination.
- 👤 **Author Profiles**: Dedicated pages for authors showing their biographical info and authored posts.
- 📱 **Responsive Design**: Fully responsive UI built with modern CSS and styled-components.
- 🔔 **Toast Notifications**: Interactive feedback for user actions using React-Toastify.

---

## 🛠️ Tech Stack

### Frontend
- **React 19** (Vite)
- **Redux Toolkit** (State Management)
- **React Router 7** (Routing)
- **Axios** (API Requests)
- **Material UI Icons & React Icons**
- **Tailwind CSS & Styled Components**

### Backend
- **Node.js & Express 5**
- **MongoDB & Mongoose** (Database)
- **JSON Web Token (JWT)** (Authentication)
- **Cloudinary** (Image Management)
- **Multer** (File Upload Handling)
- **BcryptJS** (Password Hashing)

---

## ⚙️ Installation & Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/mern-blog.git
cd mern-blog
```

### 2. Backend Setup
1. Navigate to the backend folder: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file and add the following:
   ```env
   MONGO_URL=your_mongodb_connection_string
   PORT=3000
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```
4. Start the server: `npm run backend`

### 3. Frontend Setup
1. Navigate to the frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Create a `.env` file (Optional - if using custom API URL):
   ```env
   VITE_API_URL=http://localhost:3000
   ```
4. Start the development server: `npm run dev`

---

## 📁 Project Structure

```text
mern-blog/
├── backend/
│   ├── config/         # DB & Cloudinary config
│   ├── controllers/    # Route controllers
│   ├── middlewares/    # Auth & Upload middlewares
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express routes
│   └── server.js       # Entry point
└── frontend/
    ├── src/
    │   ├── components/ # Reusable components
    │   ├── config/     # API & Tag configurations
    │   ├── pages/      # Page components
    │   ├── store/      # Redux slices
    │   └── App.jsx     # Main routes
```

---

## 🛡️ API Endpoints

### Auth
- `POST /api/users` - Register User
- `POST /api/users/login` - Login User
- `POST /api/users/logout` - Logout User
- `GET /api/users/me` - Get current user profile

### Blogs
- `GET /api/blogs` - Fetch all blogs (with search, tags, pagination)
- `GET /api/blogs/:id` - Get single blog details
- `POST /api/blogs` - Create blog (Protected)
- `PUT /api/blogs/:id` - Update blog (Protected/Author only)
- `DELETE /api/blogs/:id` - Delete blog (Protected/Author only)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

---

Made with ❤️ by [Prudhvishwar](https://github.com/eshwarprudhvi)
