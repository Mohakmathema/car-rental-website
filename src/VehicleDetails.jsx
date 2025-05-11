// // import React, { useState, useEffect } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import "./VehicleDetails.css";

// // const VehicleDetails = () => {
// //   const [vehicle, setVehicle] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [bookingData, setBookingData] = useState({
// //     startDate: "",
// //     endDate: "",
// //     requireDriver: false,
// //   });
// //   const { id } = useParams();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchVehicleDetails = async () => {
// //       try {
// //         const response = await fetch(
// //           `http://localhost:5000/api/vehicles/${id}`
// //         );
// //         if (!response.ok) {
// //           throw new Error("Failed to fetch vehicle details");
// //         }
// //         const data = await response.json();
// //         setVehicle(data);
// //       } catch (error) {
// //         setError(error.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchVehicleDetails();
// //   }, [id]);

// //   const handleRentClick = () => {
// //     navigate(`/book/${id}`);
// //   };

// //   if (loading) return <div className="loading">Loading details...</div>;
// //   if (error) return <div className="error-message">{error}</div>;
// //   if (!vehicle) return <div className="error-message">Vehicle not found</div>;

// //   return (
// //     <div className="vehicle-details-container">
// //       <div className="vehicle-images">
// //         {vehicle.images.map((image, index) => (
// //           <img
// //             key={index}
// //             src={image}
// //             alt={`${vehicle.brand} ${vehicle.model}`}
// //           />
// //         ))}
// //       </div>
// //       <div className="vehicle-info-detailed">
// //         <h2>
// //           {vehicle.brand} {vehicle.model}
// //         </h2>
// //         <p className="description">{vehicle.description}</p>
// //         <div className="info-grid">
// //           <div className="info-item">
// //             <label>License Plate:</label>
// //             <span>{vehicle.licensePlate}</span>
// //           </div>
// //           <div className="info-item">
// //             <label>Brand:</label>
// //             <span>{vehicle.brand}</span>
// //           </div>
// //           <div className="info-item">
// //             <label>Status:</label>
// //             <span className={`status ${vehicle.status}`}>{vehicle.status}</span>
// //           </div>
// //         </div>
// //         <button className="rent-btn" onClick={handleRentClick}>
// //           RENT NOW
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default VehicleDetails;

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "./VehicleDetails.css";

// const VehicleDetails = () => {
//   const [vehicle, setVehicle] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [bookingData, setBookingData] = useState({
//     startDate: "",
//     endDate: "",
//     requireDriver: false,
//   });
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchVehicleDetails = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:5000/api/vehicles/${id}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch vehicle details");
//         }
//         const data = await response.json();
//         setVehicle(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVehicleDetails();
//   }, [id]);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setBookingData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleBooking = async () => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     if (!userInfo) {
//       navigate("/login");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/api/bookings", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//         body: JSON.stringify({
//           vehicleId: vehicle._id,
//           ...bookingData,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to create booking");
//       }

//       const booking = await response.json();
//       navigate("/profile"); // or to a booking confirmation page
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   if (loading) return <div className="loading">Loading details...</div>;
//   if (error) return <div className="error-message">{error}</div>;
//   if (!vehicle) return <div className="error-message">Vehicle not found</div>;

//   return (
//     <div className="vehicle-details-container">
//       <div className="vehicle-images">
//         {vehicle.images.map((image, index) => (
//           <img
//             key={index}
//             src={image}
//             alt={`${vehicle.brand} ${vehicle.model} view ${index + 1}`}
//           />
//         ))}
//       </div>

//       <div className="vehicle-info-detailed">
//         <h2>
//           {vehicle.brand} {vehicle.model}
//         </h2>
//         <p className="description">{vehicle.description}</p>

//         <div className="info-grid">
//           <div className="info-item">
//             <label>License Plate</label>
//             <span>{vehicle.licensePlate}</span>
//           </div>
//           <div className="info-item">
//             <label>Brand</label>
//             <span>{vehicle.brand}</span>
//           </div>
//           <div className="info-item">
//             <label>Status</label>
//             <span className={`status ${vehicle.status}`}>{vehicle.status}</span>
//           </div>
//         </div>

//         <div className="booking-section">
//           <h3>Book This Vehicle</h3>
//           <form
//             className="booking-form"
//             onSubmit={(e) => {
//               e.preventDefault();
//               handleBooking();
//             }}
//           >
//             <div className="form-group">
//               <label>Start Date</label>
//               <input
//                 type="date"
//                 name="startDate"
//                 value={bookingData.startDate}
//                 onChange={handleInputChange}
//                 min={new Date().toISOString().split("T")[0]}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label>End Date</label>
//               <input
//                 type="date"
//                 name="endDate"
//                 value={bookingData.endDate}
//                 onChange={handleInputChange}
//                 min={bookingData.startDate}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label>
//                 <input
//                   type="checkbox"
//                   name="requireDriver"
//                   checked={bookingData.requireDriver}
//                   onChange={handleInputChange}
//                 />{" "}
//                 Require a Driver
//               </label>
//             </div>

//             <button type="submit" className="rent-btn">
//               Book Now
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VehicleDetails;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./VehicleDetails.css";

const VehicleDetails = () => {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingData, setBookingData] = useState({
    startDate: "",
    endDate: "",
    requireDriver: false,
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
    const { name, value, type, checked } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBooking = async (e) => {
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
          requireDriver: bookingData.requireDriver,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      // Show success message and disable form
      setBookingSuccess(true);

      // Refresh vehicle data to show updated status
      const updatedVehicleResponse = await fetch(
        `http://localhost:5000/api/vehicles/${id}`
      );
      const updatedVehicle = await updatedVehicleResponse.json();
      setVehicle(updatedVehicle);

      // Show success message for 3 seconds before redirecting
      setTimeout(() => {
        navigate("/book-now");
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div className="loading">Loading details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!vehicle) return <div className="error-message">Vehicle not found</div>;

  return (
    <div className="vehicle-details-container">
      {bookingSuccess && (
        <div className="success-message">
          Booking successful! Redirecting to available vehicles...
        </div>
      )}

      <div className="vehicle-images">
        {vehicle.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${vehicle.brand} ${vehicle.model} view ${index + 1}`}
          />
        ))}
      </div>

      <div className="vehicle-info-detailed">
        <h2>
          {vehicle.brand} {vehicle.model}
        </h2>
        <p className="description">{vehicle.description}</p>

        <div className="info-grid">
          <div className="info-item">
            <label>License Plate</label>
            <span>{vehicle.licensePlate}</span>
          </div>
          <div className="info-item">
            <label>Brand</label>
            <span>{vehicle.brand}</span>
          </div>
          <div className="info-item">
            <label>Status</label>
            <span className={`status ${vehicle.status}`}>{vehicle.status}</span>
          </div>
        </div>

        {!bookingSuccess && vehicle.status === "available" && (
          <form className="booking-form" onSubmit={handleBooking}>
            <h3>Book This Vehicle</h3>
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
            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  name="requireDriver"
                  checked={bookingData.requireDriver}
                  onChange={handleInputChange}
                />
                Require a Driver
              </label>
            </div>
            <button type="submit" className="book-btn">
              Book Now
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default VehicleDetails;
