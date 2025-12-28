import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./Components/Pages/Landing";
import Register from "./Components/Pages/Register";
import Login from "./Components/Pages/Login";
import Layout from "./Components/Layout/Layout";
import Upcoming from "./Components/Pages/Upcoming";
import Completed from "./Components/Pages/Complete";
import Settings from "./Components/Pages/Setting";
import { Dashboard } from "./Components/Pages/Dashboard";
import Overdue from "./Components/Pages/Overdue";

import { AuthProvider } from "./Context/AuthContext";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* ✅ Toaster must be inside the component */}
        <ToastContainer position="top-right" reverseOrder={false} />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Dashboard layout (persistent SideNav) */}
            <Route element={<Layout />}>
              <Route path="Dashboard" element={<Dashboard />} />
              <Route path="Upcoming" element={<Upcoming />} />
              <Route path="Completed" element={<Completed />} />
              <Route path="Overdue" element={<Overdue />} />
              <Route path="Settings" element={<Settings />} />
            </Route>
         
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
