import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Home() {
  const [menus, setMenus] = useState([]);
  const [paging, setPaging] = useState({
    currentPage: 1,
    previousPage: 0,
    nextPage: 2,
  });

  useEffect(() => {
    getMenus();
  }, [paging.currentPage]);

  const getMenus = () => {
    axios
      .get(
        `https://api.mudoapi.tech/menus?name=&type=&perPage=10&page=${paging.currentPage}`
      )
      .then((response) => {
        setMenus(response.data.data.Data);
        console.log(response.data.data.Data);
        setPaging({
          currentPage: response.data.data.currentPage,
          previousPage: response.data.data.previousPage,
          nextPage: response.data.data.nextPage,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("accesstoken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`https://api.mudoapi.tech/menu/${id}`, config)
      .then((res) => {
        console.log(res);
        getMenus();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBack = () => {
    setPaging({
      ...paging,
      currentPage: paging.currentPage - 1,
    });
  };

  const handleNext = () => {
    setPaging({
      ...paging,
      currentPage: paging.currentPage + 1,
    });
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center px-5">
        <div className="flex flex-col">
          <h1 className="text-4xl mb-10 text-center">Home</h1>
          <Link to={"/new-menu"} className="mb-10">
            Create Menu
          </Link>
          <h1>Paging {paging.currentPage}</h1>
          <div className="flex gap-4 m-5">
            <button
              className="bg-[#3A4D39] text-white py-2 px-4 rounded disabled:text-black"
              onClick={handleBack}
              disabled={!paging.previousPage}>
              Back
            </button>
            <button
              className="bg-[#3A4D39] text-white py-2 px-4 rounded disabled:text-black"
              onClick={handleNext}
              disabled={!paging.nextPage}>
              Next
            </button>
          </div>
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
                    <button className="bg-[#3A4D39] text-white py-2 px-4 rounded">
                      Detail
                    </button>
                  </Link>
                  <button
                    className="bg-[#3A4D39] text-white py-2 px-4 rounded ml-2"
                    onClick={() => handleDelete(menu.id)}>
                    delete
                  </button>
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
