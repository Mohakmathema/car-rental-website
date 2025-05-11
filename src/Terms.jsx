import React from "react";
import "./Terms.css";

function Terms() {
  const termsData = [
    {
      title: "Booking and Payment",
      description:
        "All bookings must be paid in full at the time of reservation. We accept major credit/debit cards. No refunds will be issued for early returns.",
    },
    {
      title: "Driver Requirements",
      description:
        "Drivers must be at least 21 years old and possess a valid driver’s license held for at least one year. Additional fees may apply for drivers under 25.",
    },
    {
      title: "Vehicle Usage",
      description:
        "Vehicles may not be used for illegal activities, off-road driving, or towing. Smoking and pets are prohibited unless explicitly allowed.",
    },
    {
      title: "Liability and Damages",
      description:
        "The renter is responsible for any damage to the vehicle during the rental period. Basic insurance is included, but additional coverage is recommended.",
    },
    {
      title: "Cancellation Policy",
      description:
        "Cancellations made more than 24 hours before the rental start time are eligible for a full refund. Late cancellations may incur a fee.",
    },
  ];

  return (
    <div className="faq-container">
      <section className="terms-section">
        <h1>Terms and Conditions</h1>
        <div className="terms-list">
          {termsData.map((item, index) => (
            <div key={index} className="terms-item">
              <h3 className="terms-title">{item.title}</h3>
              <p className="terms-description">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Terms;
