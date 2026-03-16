import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthorsCard from "../components/AuthorsCard";

const Authors = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users", {
          withCredentials: true,
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Authors</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {users.map((user) => (
          <AuthorsCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Authors;
