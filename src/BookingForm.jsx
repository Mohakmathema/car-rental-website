import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BookingForm.css";

const BookingForm = () => {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingData, setBookingData] = useState({
    startDate: "",
    endDate: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/vehicles/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch vehicle details");
        }
        const data = await response.json();
        setVehicle(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //   if (!userInfo) {
  //     navigate("/login");
  //     return;
  //   }

  //   try {
  //     const response = await fetch("http://localhost:5000/api/bookings", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${userInfo.token}`,
  //       },
  //       body: JSON.stringify({
  //         vehicleId: vehicle._id,
  //         startDate: bookingData.startDate,
  //         endDate: bookingData.endDate,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to create booking");
  //     }

  //     navigate("/profile"); // Navigate to booking confirmation or profile
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({
          vehicleId: vehicle._id,
          startDate: bookingData.startDate,
          endDate: bookingData.endDate,
          requireDriver: false, // or add a checkbox in the form for this
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create booking");
      }

      const data = await response.json();
      showMessage("success", "Booking created successfully!");
      setTimeout(() => {
        navigate("/profile"); // or wherever you want to redirect after successful booking
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!vehicle) return <div className="error-message">Vehicle not found</div>;

  return (
    <div className="booking-form-container">
      <h2>Book Vehicle</h2>
      <div className="vehicle-summary">
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.brand} ${vehicle.model}`}
        />
        <div className="vehicle-basic-info">
          <h3>
            {vehicle.brand} {vehicle.model}
          </h3>
          <p>License Plate: {vehicle.licensePlate}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            value={bookingData.startDate}
            onChange={handleInputChange}
            min={new Date().toISOString().split("T")[0]}
            required
          />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            name="endDate"
            value={bookingData.endDate}
            onChange={handleInputChange}
            min={bookingData.startDate}
            required
          />
        </div>
        <button type="submit" className="confirm-btn">
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
