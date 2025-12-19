import React from "react";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <nav>
      <h2>Navbar</h2>
      <div>
        <Link to="/">Blogs</Link>

        {isAuthenticated ? (
          <>
            <span>Welcome , {user.username}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/signin">Signin</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
