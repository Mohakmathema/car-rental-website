import React, { useState, useEffect } from "react";
import "./AdminFleet.css";

const EditFleet = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    basePrice: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/categories"
      );
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/categories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: JSON.stringify(newCategory),
        }
      );
      if (response.ok) {
        fetchCategories();
        setNewCategory({ name: "", description: "", basePrice: "" });
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div className="fleet-management">
      <div className="fleet-form-section">
        <h2>Add New Category</h2>
        <form onSubmit={handleSubmit} className="fleet-form">
          <input
            type="text"
            placeholder="Category Name"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
          />
          <textarea
            placeholder="Description"
            value={newCategory.description}
            onChange={(e) =>
              setNewCategory({ ...newCategory, description: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Base Price"
            value={newCategory.basePrice}
            onChange={(e) =>
              setNewCategory({ ...newCategory, basePrice: e.target.value })
            }
          />
          <button type="submit">Add Category</button>
        </form>
      </div>

      <div className="fleet-list-section">
        <h2>Current Categories</h2>
        <div className="category-grid">
          {categories.map((category) => (
            <div key={category._id} className="category-card">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <p>Base Price: ${category.basePrice}</p>
              <div className="category-actions">
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditFleet;
