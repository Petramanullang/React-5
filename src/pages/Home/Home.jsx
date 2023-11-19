import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../assets/Navbar/Navbar";

export default function Home() {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = () => {
    axios
      .get("https://api.mudoapi.tech/menus")
      .then((response) => {
        setMenus(response.data.data.Data);
        console.log(response.data.data.Data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
    <Navbar />
    <div className="flex justify-center px-5">
      <div className="flex flex-col">
        <h1 className="text-4xl mb-10 text-center">Home</h1>
        <div className="grid grid-cols-3 gap-10">
          {menus.length > 0 ? (
            menus.map((menu) => (
              <div className="menus">
                <span className="text-lg">{menu.name}</span>
                <img
                  className="w-52 rounded-md h-40 object-cover mb-5"
                  src={menu.imageUrl}
                  alt=""
                />
                <Link to={`/menu/${menu.id}`}>
                  <button className="bg-[#3A4D39] text-white py-2 px-4 rounded">Detail</button>
                </Link>
              </div>
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
