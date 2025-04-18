import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Fleet from "../pages/fleet"

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Fleet />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
