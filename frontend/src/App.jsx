import BlogList from "./pages/BlogList";
import { Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { loginSuccess } from "./store/authSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateBlog from "./pages/blogpages/CreateBlog";
import BlogDetail from "./pages/blogpages/BlogDetail";
import EditBlog from "./pages/blogpages/EditBlog";
import MyProfile from "./pages/MyProfile";
import Authors from "./pages/Authors";
import NotFoundPage from "./pages/blogpages/NotFoundPage";
import AuthorsDetail from "./pages/AuthorsDetail";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users/me", {
          withCredentials: true,
        });
        dispatch(loginSuccess(res.data.user));
      } catch (error) {}
    };

    fetchMe();
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<BlogList />}></Route>
        <Route path="/authors" element={<Authors />}></Route>
        <Route path="/authors/:id" element={<AuthorsDetail />}></Route>
        <Route path="/:id" element={<BlogDetail />}></Route>
        <Route path="/edit-blog/:id" element={<EditBlog />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route
          path="/create-blog"
          element={
            <ProtectedRoute>
              <CreateBlog />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/my-profile"
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
