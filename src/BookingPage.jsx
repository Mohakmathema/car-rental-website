import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./BookingPage.css";

function BookingPage() {
  const { brand, carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const token = localStorage.getItem("driverInfo")
          ? JSON.parse(localStorage.getItem("driverInfo")).token
          : localStorage.getItem("token");

        if (!token) throw new Error("No token found. Please log in.");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`http://localhost:5000/api/vehicles/${carId}`, config);
        console.log("Vehicle API response:", response.data);
        let carData = response.data;

        if (response.data.status === "success" && response.data.data) {
          carData = response.data.data;
        } else if (response.data.vehicle) {
          carData = response.data.vehicle;
        } else if (!carData.brand || !carData.model) {
          throw new Error("Invalid vehicle data format");
        }

        setCar(carData);
        setLoading(false);
      } catch (err) {
        setError(
          err.response
            ? `Failed to fetch vehicle: ${err.response.status} - ${err.response.data.message || err.message}`
            : `Cannot connect to the server: ${err.message}`
        );
        setLoading(false);
      }
    };

    fetchCar();
  }, [carId]);

  const handleGoBack = () => {
    navigate(`/fleet/${brand}/${carId}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rawPickupDate = document.getElementById("pickup-date").value;
    const rawReturnDate = document.getElementById("return-date").value;
    const pickupDate = rawPickupDate ? new Date(rawPickupDate).toISOString().split("T")[0] : "";
    const returnDate = rawReturnDate ? new Date(rawReturnDate).toISOString().split("T")[0] : "";

    const bookingData = {
      carModel: car.model,
      user: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      pickupDate,
      returnDate,
      address: document.getElementById("address").value,
      driverPreference: document.getElementById("driver-preference").value.toLowerCase(),
      carId,
    };

    try {
      console.log("Submitting booking to: http://localhost:5000/api/bookings");
      const token = localStorage.getItem("driverInfo")
        ? JSON.parse(localStorage.getItem("driverInfo")).token
        : localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers.get("content-type"));
      const text = await response.text();
      console.log("Raw response:", text);

      if (response.headers.get("content-type")?.includes("application/json")) {
        const result = JSON.parse(text);
        if (response.ok) {
          alert("Booking submitted successfully!");
          navigate(`/fleet/${brand}/${carId}`);
        } else {
          alert(`Error submitting booking: ${result.error || "Unknown error"}`);
        }
      } else {
        alert(`Error submitting booking: Server returned non-JSON response (status: ${response.status})`);
      }
    } catch (err) {
      console.error("Network error:", err);
      alert(`Error submitting booking: Network error - ${err.message}`);
    }
  };

  const handleCancelBooking = async () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel the booking?");
    if (!confirmCancel) return;

    try {
      console.log("Cancelling booking at: http://localhost:5000/api/bookings/cancel/${carId}");
      const token = localStorage.getItem("driverInfo")
        ? JSON.parse(localStorage.getItem("driverInfo")).token
        : localStorage.getItem("token");

      const response = await fetch(`http://localhost:5000/api/bookings/cancel/${carId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Cancel response status:", response.status);
      console.log("Cancel response headers:", response.headers.get("content-type"));
      const text = await response.text();
      console.log("Cancel raw response:", text);

      if (response.headers.get("content-type")?.includes("application/json")) {
        const result = JSON.parse(text);
        if (response.ok) {
          alert("Booking cancelled successfully!");
          navigate(`/fleet/${brand}/${carId}`);
        } else {
          alert(`Error cancelling booking: ${result.error || "Unknown error"}`);
        }
      } else {
        alert(`Error cancelling booking: Server returned non-JSON response (status: ${response.status})`);
      }
    } catch (err) {
      console.error("Network error:", err);
      alert(`Error cancelling booking: Network error - ${err.message}`);
    }
  };

  if (loading) return <div className="booking-page-container"><div>Loading vehicle details...</div></div>;
  if (error) return (
    <div className="booking-page-container">
      <div>{error}</div>
      <button onClick={handleGoBack}>Back to Car Details</button>
    </div>
  );
  if (!car) return <div className="booking-page-container"><div>No vehicle found for ID: {carId}</div></div>;

  return (
    <div className="booking-page-container">
      <div className="booking-card">
        <div className="booking-header">
          <button className="back-button" onClick={handleGoBack}>
            ←
          </button>
          <h2>Book Your Car</h2>
        </div>

        <div className="car-summary">
          <img
            src={car.images && car.images.length > 0 ? car.images[0] : "/placeholder.svg"}
            alt={car.model}
            className="car-thumbnail"
          />
          <div className="car-summary-details">
            <h3>{car.brand} {car.model}</h3>
            <p>Number: {car.licensePlate}</p>
            <p>Price: {car.price || "8000"} per day</p>
          </div>
        </div>

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="pickup-date">Pickup Date</label>
              <input type="date" id="pickup-date" required />
            </div>
            <div className="form-group">
              <label htmlFor="return-date">Return Date</label>
              <input type="date" id="return-date" required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">Pickup Address</label>
            <textarea id="address" rows="3" required></textarea>
          </div>

          <div className="payment-summary">
            <h4>Payment Summary</h4>
            <div className="payment-row">
              <span>Daily Rate:</span>
              <span>{car.price || "8000"} per day</span>
            </div>
            <div className="payment-row total">
              <span>Total:</span>
              <span>{car.price || "8000"} (for 1 day)</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="driver-preference">Driver Preference</label>
            <select id="driver-preference" required>
              <option value="">Select</option>
              <option value="self">Self Drive</option>
              <option value="with-driver">With Driver</option>
            </select>
          </div>

          <div className="form-buttons">
            <button type="submit" className="confirm-booking-button">
              Confirm Booking
            </button>
            <button type="button" className="cancel-booking-button" onClick={handleCancelBooking}>
              Cancel Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingPage;