import React from "react";
import "./Faq.css";

function faq() {
  const faqData = [
    {
      question: "How do I book a car?",
      answer:
        "You can easily book a car by visiting our homepage, selecting your preferred vehicle, choosing your rental dates, and confirming your booking.",
    },
    {
      question: "What documents do I need to rent a car?",
      answer:
        "You will need a valid driver’s license, a government-issued ID (such as a passport), and a valid credit/debit card.",
    },
    {
      question: "Are there any mileage limits?",
      answer:
        "Most rentals include unlimited mileage. However, some luxury or specialty vehicles may have specific limits. Please check the car details during booking.",
    },
    {
      question: "Can I cancel my booking?",
      answer:
        "Yes, you can cancel your booking up to 24 hours before the rental time for a full refund. Cancellation within 24 hours may incur a fee.",
    },
    {
      question: "Do you offer insurance?",
      answer:
        "Yes, all our cars come with basic insurance. You can also purchase additional coverage during checkout for extra protection.",
    },
  ];

  return (
    <div className="faq-container">
      <section className="about-us-section">
        <h1>About Us</h1>
        <p>
          Welcome to Online Car Rental, your trusted partner for convenient and
          affordable car rentals. We are committed to providing a seamless
          rental experience with a wide range of vehicles to suit your needs,
          from compact cars to luxury SUVs. Our mission is to make travel easy,
          reliable, and enjoyable for everyone.
        </p>
        <p>
          With years of experience in the industry, we pride ourselves on
          exceptional customer service, transparent pricing, and a hassle-free
          booking process. Whether you're planning a road trip, a business trip,
          or just need a car for the day, we're here to get you on the road with
          confidence.
        </p>
      </section>
      <section className="faq-section">
        <h1>Frequently Asked Questions</h1>
        <div className="faq-list">
          {faqData.map((item, index) => (
            <div key={index} className="faq-item">
              <h3 className="faq-question">{item.question}</h3>
              <p className="faq-answer">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default faq;
