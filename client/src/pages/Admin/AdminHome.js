import React from 'react'
import { useSelector } from "react-redux";
function AdminHome() {
  const { user } = useSelector((state) => state.users);
  return (
    <div>
      <h1>Welcome {user?.name}</h1>
    </div>
  )
}

export default AdminHome