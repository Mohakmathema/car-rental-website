// import React, { useState, useEffect } from "react";
// import "./UserBookings.css";

// const UserBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchUserBookings();
//   }, []);

//   const fetchUserBookings = async () => {
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       if (!userInfo) {
//         throw new Error("No user information found");
//       }

//       const response = await fetch(
//         `http://localhost:5000/api/bookings/user/${userInfo._id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${userInfo.token}`,
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
//       case "cancelled":
//         return "status-cancelled";
//       case "completed":
//         return "status-completed";
//       default:
//         return "";
//     }
//   };

//   if (loading) return <div className="loading">Loading your bookings...</div>;
//   if (error) return <div className="error-message">{error}</div>;
//   if (bookings.length === 0)
//     return <div className="no-bookings">No bookings found</div>;

//   return (
//     <div className="user-bookings">
//       <h2>Your Bookings</h2>
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
//                 <div className="driver-info">Driver Service Requested</div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserBookings;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserBookings.css";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const fetchUserBookings = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/bookings/user/${userInfo._id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) return <div className="loading">Loading your bookings...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="user-bookings-container">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <div className="no-bookings">You haven't made any bookings yet.</div>
      ) : (
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
                {booking.requireDriver && (
                  <div className="driver-required">
                    Driver Service Requested
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <button onClick={() => navigate("/profile")} className="back-button">
        Back to Profile
      </button>
    </div>
  );
};

export default UserBookings;
