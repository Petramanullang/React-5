import React from "react";
import { Link, Navigate } from "react-router-dom";

export default function Navbar() {
  const accessToken = localStorage.getItem("accesstoken");
  console.log("token", accessToken);

  const handleLogout = () => {
    localStorage.removeItem("accesstoken");
    Navigate("/login");
  }

  return (
    <div className="navbar flex justify-between bg-[#3A4D39] h-10 px-10">
      <span className="text-2xl">Logo</span>
      <div className="link flex gap-10">
        <Link to={"/"}>
          <p className="text-xl">Home</p>
        </Link>
        {accessToken ? (
          <a onClick={handleLogout} href="" className="text-xl">Logout</a>
        ) : (
          <Link to={"/login"}>
            <p className="text-xl">Login</p>
          </Link>
        )}
      </div>
    </div>
  );
}
