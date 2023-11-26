import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const Navigate = useNavigate();

  const onChangeUserName = (e) => {
    setUsername(e.target.value);
    setError("");
    setSuccess("");
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setError("");
    setSuccess("");
  };

  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const bodyPayload = {
      username: username,
      password: password,
    };

    axios
      .post("https://api.mudoapi.tech/login", bodyPayload)
      .then((res) => {
        console.log(res);
        const token = res.data.data.token;
        localStorage.setItem("accesstoken", token);

        //Simpan Token di Local storage
        setSuccess(res.data.message);
        setLoading(false);

        //Navigasi / pindah halaman ketika berihasil login
        Navigate("/");
      })
      .catch((err) => {
        console.log(err.response);
        setError(err.response.data.message);
        setLoading(false);
      });
  };
  console.log(loading);

  return (
    <>
      <Navbar />
      {error.length ? (
        <h1 className="text-2xl text-center">
          {error} <br />
          <span className="text-red-500 text-base">
            Why did you forget your account?
          </span>
        </h1>
      ) : null}
      {success.length ? (
        <h1 className="text-2xl text-center">
          {success} <br />
          <span className="text-green-400 text-base">GG Bro</span>
        </h1>
      ) : null}
      <div className="login-wrapper flex justify-center mt-28">
        <div className="login w-72 px-4 py-4 bg-blue-600 rounded-md">
          <div className="email mb-5">
            <label htmlFor="">Username : </label>
            <input
              onChange={onChangeUserName}
              className="text-black rounded-md mt-2"
              type="email"
            />
          </div>
          <div className="password mb-5">
            <label htmlFor="">Password : </label>
            <input
              onChange={onChangePassword}
              className="text-black rounded-md mt-2"
              type="password"
            />
          </div>
          <button
            disabled={loading ? true : false}
            onClick={onSubmit}
            className="bg-[#3A4D39] py-2 px-4 rounded">
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
}
