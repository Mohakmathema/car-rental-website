import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Add Link for navigation
import "./fleet.css";

const Fleet = () => {
  const [fleets, setFleets] = useState([]);
  const [filteredFleets, setFilteredFleets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchFleets = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/fleets");

        if (!response.ok) {
          throw new Error(`Failed to fetch fleets: ${response.statusText}`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received: Expected an array");
        }

        setFleets(data);
        setFilteredFleets(data);
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Error fetching fleets: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFleets();
  }, []);

  useEffect(() => {
    try {
      let updatedFleets = [...fleets];

      if (searchTerm.trim()) {
        updatedFleets = updatedFleets.filter((fleet) => {
          const name = fleet?.name || "";
          return typeof name === "string" && name.toLowerCase().includes(searchTerm.toLowerCase().trim());
        });
      }

      setFilteredFleets(updatedFleets);
    } catch (error) {
      console.error("Search error:", error);
      setError("Error processing search: " + error.message);
    }
  }, [searchTerm, fleets]);

  if (loading) return <div className="loading">Loading fleets...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="car-panel-container">
      <div className="main-content">
        <h2>Our Fleets</h2>
        <div className="search-sort-container">
          <input
            type="text"
            placeholder="Search fleets by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
        </div>
        <div className="brand-grid">
          {filteredFleets.length > 0 ? (
            filteredFleets.map((fleet) => (
              <Link key={fleet._id} to={`/fleet/${fleet._id}`} className="brand-container">
                <div className="brand-item">
                  <img
                    src={fleet.logoUrl || "/placeholder.png"}
                    alt={fleet.name || "Unknown"}
                    className="brand-image"
                  />
                </div>
                <p className="brand-name">{fleet.name || "Unnamed Fleet"}</p>
              </Link>
            ))
          ) : (
            <p className="no-results">No fleets found matching your search.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Fleet;