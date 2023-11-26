import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function UD() {
  const [menus, setMenus] = useState({});

  const param = useParams();
  console.log(param.id);

  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = () => {
    axios
      .get(`https://api.mudoapi.tech/menu/${param.id}`)
      .then((response) => {
        setMenus(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // console.log(menus);
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl mb-10">Menu Detail</h1>
        <div className="menus flex gap-10 bg-[#3A4D39] px-3 py-3 rounded-lg">
          <img
            className="w-52 rounded-md h-40 object-cover mb-5"
            src={menus.imageUrl}
            alt=""
          />
          <div className="flex flex-col">
            <span className="text-xl text-black mb-10">{menus.name}</span>
            <p className="text-sm w-52">{menus.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
