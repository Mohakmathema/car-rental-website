// import React, { useState, useEffect } from "react";
// import "./DriverBookings.css";

// const DriverBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [actionLoading, setActionLoading] = useState(null);

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       const driverInfo = JSON.parse(localStorage.getItem("driverInfo"));
//       if (!driverInfo) {
//         throw new Error("No driver information found");
//       }

//       const response = await fetch(
//         `http://localhost:5000/api/bookings/driver/${driverInfo._id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${driverInfo.token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch bookings");
//       }

//       const data = await response.json();
//       setBookings(data);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBookingAction = async (bookingId, status) => {
//     try {
//       setActionLoading(bookingId);
//       const driverInfo = JSON.parse(localStorage.getItem("driverInfo"));

//       const response = await fetch(
//         `http://localhost:5000/api/bookings/${bookingId}/status`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${driverInfo.token}`,
//           },
//           body: JSON.stringify({ status }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to update booking status");
//       }
//       // Update the local state
//       setBookings(
//         bookings.map((booking) =>
//           booking._id === bookingId ? { ...booking, status } : booking
//         )
//       );
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const getStatusClass = (status) => {
//     switch (status) {
//       case "pending":
//         return "status-pending";
//       case "confirmed":
//         return "status-confirmed";
//       case "completed":
//         return "status-completed";
//       case "cancelled":
//         return "status-cancelled";
//       default:
//         return "";
//     }
//   };

//   if (loading) return <div className="loading">Loading bookings...</div>;
//   if (error) return <div className="error-message">{error}</div>;
//   if (bookings.length === 0)
//     return <div className="no-bookings">No bookings found</div>;

//   return (
//     <div className="driver-bookings">
//       <h1>My Bookings</h1>
//       <div className="bookings-grid">
//         {bookings.map((booking) => (
//           <div key={booking._id} className="booking-card">
//             <div className="booking-header">
//               <h3>Booking #{booking._id.slice(-6)}</h3>
//               <span className={`status ${getStatusClass(booking.status)}`}>
//                 {booking.status}
//               </span>
//             </div>

//             <div className="booking-details">
//               <div className="detail-row">
//                 <span className="label">Customer:</span>
//                 <span className="value">{booking.userId.fullName}</span>
//               </div>
//               <div className="detail-row">
//                 <span className="label">Vehicle:</span>
//                 <span className="value">
//                   {booking.vehicleId.brand} {booking.vehicleId.model}
//                 </span>
//               </div>
//               <div className="detail-row">
//                 <span className="label">License Plate:</span>
//                 <span className="value">{booking.vehicleId.licensePlate}</span>
//               </div>
//               <div className="detail-row">
//                 <span className="label">Start Date:</span>
//                 <span className="value">{formatDate(booking.startDate)}</span>
//               </div>
//               <div className="detail-row">
//                 <span className="label">End Date:</span>
//                 <span className="value">{formatDate(booking.endDate)}</span>
//               </div>
//               {booking.requireDriver && (
//                 <div className="driver-required">Driver Required</div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DriverBookings;

import React, { useState, useEffect } from "react";
import "./DriverBookings.css";

const DriverBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const driverInfo = JSON.parse(localStorage.getItem("driverInfo"));
      if (!driverInfo) {
        throw new Error("No driver information found");
      }

      const response = await fetch(
        `http://localhost:5000/api/bookings/driver/${driverInfo._id}`,
        {
          headers: {
            Authorization: `Bearer ${driverInfo.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();
      setBookings(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingAction = async (bookingId, status) => {
    try {
      setActionLoading(bookingId);
      const driverInfo = JSON.parse(localStorage.getItem("driverInfo"));

      const response = await fetch(
        `http://localhost:5000/api/bookings/${bookingId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${driverInfo.token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update booking status");
      }

      // Update the local state
      setBookings(
        bookings.map((booking) =>
          booking._id === bookingId ? { ...booking, status } : booking
        )
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) return <div className="loading">Loading bookings...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (bookings.length === 0)
    return <div className="no-bookings">No bookings found</div>;

  return (
    <div className="driver-bookings">
      <h1>My Bookings</h1>
      <div className="bookings-grid">
        {bookings.map((booking) => (
          <div key={booking._id} className="booking-card">
            <div className="booking-header">
              <h3>Booking #{booking._id.slice(-6)}</h3>
              <span className={`status status-${booking.status}`}>
                {booking.status}
              </span>
            </div>

            <div className="booking-details">
              <div className="detail-row">
                <span className="label">Customer:</span>
                <span className="value">{booking.userId.fullName}</span>
              </div>
              <div className="detail-row">
                <span className="label">Vehicle:</span>
                <span className="value">
                  {booking.vehicleId.brand} {booking.vehicleId.model}
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Start Date:</span>
                <span className="value">{formatDate(booking.startDate)}</span>
              </div>
              <div className="detail-row">
                <span className="label">End Date:</span>
                <span className="value">{formatDate(booking.endDate)}</span>
              </div>

              {booking.status === "pending" && (
                <div className="booking-actions">
                  <button
                    className="accept-btn"
                    onClick={() =>
                      handleBookingAction(booking._id, "confirmed")
                    }
                    disabled={actionLoading === booking._id}
                  >
                    {actionLoading === booking._id ? "Processing..." : "Accept"}
                  </button>
                  <button
                    className="decline-btn"
                    onClick={() =>
                      handleBookingAction(booking._id, "cancelled")
                    }
                    disabled={actionLoading === booking._id}
                  >
                    {actionLoading === booking._id
                      ? "Processing..."
                      : "Decline"}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverBookings;
