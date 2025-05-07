import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import BookingPage from "./BookingPage/BookingPage";
import AddCar from "./components/AddCar";
import CarDetails from "./components/carDetails";
import ModelDetails from "./components/Modeldetails";
   

function App() {
  const carData = {
    id: 1,
    model: "BMW Series 3",
    number: "BA 3256",
    price: 8000,
    rating: 5,
    uploadDate: "2024/4/5",
    image: "/src/Assets/bmw.png",
  }

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<CarDetails car={carData} />} />
          <Route path="/booking/:carId" element={<BookingPage car={carData} />} />
          <Route path="/model-details" element={<ModelDetails />} />
          <Route path="/add-car" element={<AddCar />} />
          <Route path="/rent" element={<carFilter />} />



        </Routes>
      </div>
    </Router>
  )
}

export default App
