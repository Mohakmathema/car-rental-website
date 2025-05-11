import React, { useState, useEffect } from "react";
import "./AdminFleet.css";

const EditFleet = () => {
  const [fleets, setFleets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [formData, setFormData] = useState({
    name: "",
    logoUrl: "",
  });

  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const maxWidth = 800;
      const maxHeight = 800;
      const maxSizeMB = 1;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // Start with high quality
          let quality = 0.9;
          let compressed = canvas.toDataURL("image/jpeg", quality);

          // Reduce quality until file size is under maxSizeMB
          while (compressed.length > maxSizeMB * 1024 * 1024 && quality > 0.1) {
            quality -= 0.1;
            compressed = canvas.toDataURL("image/jpeg", quality);
          }

          resolve(compressed);
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.match(/image\/(jpeg|jpg|png|gif)/)) {
        showMessage(
          "error",
          "Please select a valid image file (JPEG, PNG, or GIF)"
        );
        return;
      }

      // Check initial file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showMessage("error", "Image size should be less than 5MB");
        return;
      }

      try {
        showMessage("info", "Processing image...");
        const compressedImage = await compressImage(file);
        setFormData((prev) => ({ ...prev, logoUrl: compressedImage }));
        showMessage("success", "Image processed successfully");
      } catch (error) {
        showMessage("error", "Error processing image");
        console.error("Image compression error:", error);
      }
    }
  };

  useEffect(() => {
    fetchFleets();
  }, []);

  const fetchFleets = async () => {
    try {
      const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
      const response = await fetch("http://localhost:5000/api/admin/fleets", {
        headers: {
          Authorization: `Bearer ${adminInfo?.token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setFleets(data);
      }
    } catch (error) {
      showMessage("error", "Failed to fetch fleets");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setFormData((prev) => ({ ...prev, logoUrl: reader.result }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
      const response = await fetch("http://localhost:5000/api/admin/fleets", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminInfo?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      //   if (response.ok) {
      //     const newFleet = await response.json();
      //     setFleets([...fleets, newFleet]);
      //     setFormData({ name: "", logoUrl: "" });
      //     setShowForm(false);
      //     showMessage("success", "Fleet added successfully");
      //   } else {
      //     throw new Error("Failed to add fleet");
      //   }
      // } catch (error) {
      //   showMessage("error", error.message);
      // } finally {
      //   setLoading(false);
      // }
      if (!response.ok) {
        throw new Error("Failed to create fleet");
      }

      const newFleet = await response.json();
      setFleets([...fleets, newFleet]);
      setFormData({ name: "", logoUrl: "" });
      setShowForm(false);
      showMessage("success", "Fleet added successfully");
    } catch (error) {
      showMessage("error", "Failed to create fleet: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (fleetId) => {
    if (!window.confirm("Are you sure you want to delete this fleet?")) return;

    try {
      const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
      const response = await fetch(
        `http://localhost:5000/api/admin/fleets/${fleetId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${adminInfo?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setFleets(fleets.filter((fleet) => fleet._id !== fleetId));
        showMessage("success", "Fleet deleted successfully");
      } else {
        throw new Error("Failed to delete fleet");
      }
    } catch (error) {
      showMessage("error", error.message);
    }
  };

  return (
    <div className="fleet-management">
      <div className="fleet-header">
        <h2>Manage Fleets</h2>
        <button className="add-fleet-btn" onClick={() => setShowForm(true)}>
          Add New Fleet
        </button>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}

      {showForm && (
        <div className="fleet-form-overlay">
          <div className="fleet-form-container">
            <h3>Add New Fleet</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Fleet Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Fleet Logo:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
                {formData.logoUrl && (
                  <img
                    src={formData.logoUrl}
                    alt="Logo preview"
                    className="logo-preview"
                    style={{ width: "100px", marginTop: "10px" }}
                  />
                )}
              </div>
              <div className="form-actions">
                <button type="submit" disabled={loading}>
                  {loading ? "Adding..." : "Add Fleet"}
                </button>
                <button type="button" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="fleets-grid">
        {fleets.map((fleet) => (
          <div key={fleet._id} className="fleet-card">
            <img src={fleet.logoUrl} alt={fleet.name} className="fleet-logo" />
            <h3>{fleet.name}</h3>
            <div className="fleet-actions">
              <button
                className="delete-btn"
                onClick={() => handleDelete(fleet._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditFleet;
