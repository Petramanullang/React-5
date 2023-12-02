import Home from "./pages/Home";
import MenuDetail from "./pages/MD";
import Login from "./pages/Login";
import CreateMenu from "./pages/new-menu";
import ProtectedRoute from "./hoc/ProtectedRoute";

export const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/menu/:id",
    element: (
      <ProtectedRoute>
        <MenuDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/new-menu",
    element: (
      <ProtectedRoute>
        <CreateMenu />
      </ProtectedRoute>
    ),
  },
];
