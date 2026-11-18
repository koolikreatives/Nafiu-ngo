// import SignUp from "./Pages/SignUp"
import { BrowserRouter } from "react-router-dom"
import LandingPage from "./Pages/Landingpage"

export default function App() {
  return (
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>
  )
}