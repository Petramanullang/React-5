import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NewMenu() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "beverage",
    imageUrl: "",
    price: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    //ubah tipe data price dari string ke number
    form.price = Number(form.price);

    //buat config untuk authorization yang isinya token
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    };

    //request post ke API
    axios
      .post("https://api.mudoapi.tech/menu", form, config)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  console.log("form", form);

  return (
    <div>
      <Navbar />
      <h1 className="text-3xl flex justify-center mt-10">Create Menu</h1>
      <div className="container flex justify-center mt-10">
        <div className="input flex-col flex gap-2 w-1/2 justify-center">
          <input
            onChange={handleChange}
            name="name"
            type="text"
            placeholder="name"
            className="rounded-sm text-black"
          />
          <input
            onChange={handleChange}
            name="description"
            type="text"
            placeholder="description"
            className="rounded-sm text-black"
          />
          <select
            onChange={handleChange}
            name="type"
            id=""
            className="text-[#9ca3af] rounded-sm">
            <option value="beverage">beverage</option>
            <option value="main-dish">main-dish</option>
          </select>
          <input
            onChange={handleChange}
            name="imageUrl"
            type="url"
            placeholder="image url"
            className="rounded-sm text-black"
          />
          <input
            onChange={handleChange}
            name="price"
            type="number"
            placeholder="harga"
            className="rounded-sm text-black"
          />
          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-[#3A4D39] w-1/2 md:w-1/4 mx-auto rounded-md p-2 text-white">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
