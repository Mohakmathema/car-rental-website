import React, { useState, useEffect } from "react";
import "./fleet.css";

const Fleet = () => {
  const [fleets, setFleets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFleets = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/fleets");

        if (!response.ok) {
          throw new Error("Failed to fetch fleets");
        }

        const data = await response.json();
        setFleets(data);
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Error fetching fleets: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFleets();
  }, []);

  if (loading) return <div className="loading">Loading fleets...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="fleet-container">
      <h2>Our Fleets</h2>
      <div className="fleet-grid">
        {fleets.map((fleet) => (
          <div key={fleet._id} className="fleet-card">
            <img src={fleet.logoUrl} alt={fleet.name} className="fleet-logo" />
            <p className="fleet-name">{fleet.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fleet;
