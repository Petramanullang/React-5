import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MenuDetail from "./pages/MD";
import Login from "./pages/Login";
import CreateMenu from "./pages/new-menu";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu/:id" element={<MenuDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new-menu" element={<CreateMenu />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
