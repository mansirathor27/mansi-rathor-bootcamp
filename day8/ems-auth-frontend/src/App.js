import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <nav className="flex justify-between items-center px-6 py-4 bg-slate-800 text-white shadow">
        <h1 className="text-xl font-bold">EMS</h1>

        <div className="space-x-4">
          <Link to="/register" className="hover:text-blue-400">Register</Link>
          <Link to="/login" className="hover:text-blue-400">Login</Link>
          <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;