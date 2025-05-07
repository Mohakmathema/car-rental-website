import { useNavigate, useParams } from "react-router-dom";
import "./BookingPage.css";

function BookingPage({ car }) {
  const { carId } = useParams();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rawPickupDate = document.getElementById("pickup-date").value;
    const rawReturnDate = document.getElementById("return-date").value;
    const pickupDate = rawPickupDate ? new Date(rawPickupDate).toISOString().split("T")[0] : "";
    const returnDate = rawReturnDate ? new Date(rawReturnDate).toISOString().split("T")[0] : "";

    const formData = new FormData();
    formData.append("carModel", car.model);
    formData.append("user", document.getElementById("name").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("phone", document.getElementById("phone").value);
    formData.append("pickupDate", pickupDate);
    formData.append("returnDate", returnDate);
    formData.append("address", document.getElementById("address").value);
    formData.append("driverPreference", document.getElementById("driver-preference").value.toLowerCase());

    const documents = document.getElementById("documents").files;
    for (let i = 0; i < documents.length; i++) {
      formData.append("documents", documents[i]);
    }

    try {
      const response = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Booking submitted successfully!");
        navigate("/model-details", { state: { car } });
      } else {
        alert(`Error submitting booking: ${result.error || "Unknown error"}`);
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
      const response = await fetch(`http://localhost:5000/bookings/cancel/${carId}`, {
        method: "PUT",
      });

      const result = await response.json();
      if (response.ok) {
        alert("Booking cancelled successfully!");
        navigate("/");
      } else {
        alert(`Failed to cancel booking: ${result.error}`);
      }
    } catch (err) {
      console.error("Cancel error:", err);
      alert("An error occurred while cancelling the booking.");
    }
  };

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
            src={car.image || "/placeholder.svg"}
            alt={car.model}
            className="car-thumbnail"
          />
          <div className="car-summary-details">
            <h3>{car.model}</h3>
            <p>Number: {car.number}</p>
            <p>Price: {car.price} per day</p>
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
              <span>{car.price} per day</span>
            </div>
            <div className="payment-row total">
              <span>Total:</span>
              <span>{car.price} (for 1 day)</span>
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

          <div className="form-group">
            <label htmlFor="documents">Attach Your Documents</label>
            <small>Your license and citizenship</small>
            <input type="file" id="documents" accept=".pdf,.jpg,.png" multiple required />
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