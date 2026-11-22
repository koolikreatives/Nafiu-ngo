// import SignUp from "./Pages/SignUp"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./Pages/Landingpage"
import Signup from "./Pages/SignUp"
import Login from "./Pages/Login"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}