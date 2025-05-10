import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainFleet.css';

const brands = ['BMW', 'Tesla', 'Mercedes', 'Toyota', 'Honda', 'Ford', 'Nissan', 'Kia', 'Hyundai'];

// Mapping of brands to their logo URLs
const brandLogos = {
  BMW: 'https://blog.logomaster.ai/hs-fs/hubfs/bmw-logo-1963.jpg?width=672&height=454&name=bmw-logo-1963.jpg',
  Tesla: 'https://fabrikbrands.com/wp-content/uploads/Tesla-Logo-1.png',
  Mercedes: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYy-qVX0MPrpJgDyy6NDqE5qAqRsMnzMWGMQ&s',
  Toyota: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTelGCnYjK82q60j4ybXi3aMIaecVBUIbUPjw&s',
  Honda: 'https://www.freeiconspng.com/thumbs/honda-logo-png/honda-logo-transparent-background-0.jpg',
  Ford: 'https://images.seeklogo.com/logo-png/5/2/ford-logo-png_seeklogo-56577.png',
  Nissan: 'https://hips.hearstapps.com/hmg-prod/images/nissan-brand-logo-1200x938-1594842787.jpg',
  Kia: 'https://miro.medium.com/v2/resize:fit:1400/1*Yq5Wh8kxb89iB0ErJNFN4A.jpeg',
  Hyundai: 'https://cdn.mos.cms.futurecdn.net/b4VFMLdjLx3TudR9xCMeDT.jpg',
};

// Mapping of brands to their hypothetical price values (in thousands)
const brandValues = {
  BMW: 80,
  Tesla: 100,
  Mercedes: 90,
  Toyota: 27,
  Honda: 28,
  Ford: 26,
  Nissan: 25,
  Kia: 29,
  Hyundai: 18,
};

const MainFleet = () => {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const navigate = useNavigate();

  const handleBrandClick = (brand) => {
    navigate(`/fleet/${brand.toLowerCase()}`);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const filteredBrands = brands
    .filter((brand) => brand.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const valueA = brandValues[a] || 0;
      const valueB = brandValues[b] || 0;
      if (sortOrder === 'asc') return valueA - valueB; // Ascending order
      if (sortOrder === 'desc') return valueB - valueA; // Descending order
      return 0; // No sorting when sortOrder is empty
    });

  return (
    <div className="car-panel-container">
      <div className="main-content">
        <h2>Pick your Brand</h2>

        <div className="search-sort-container">
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select id="sortDropdown" onChange={handleSortChange} value={sortOrder}>
            <option value="">All</option>
            <option value="asc">Least-Most Expensive</option>
            <option value="desc">Most-Least Expensive</option>
          </select>
        </div>

        <div className="brand-grid">
          {filteredBrands.map((brand, index) => (
            <div key={index} className="brand-container">
              <div className="brand-item" onClick={() => handleBrandClick(brand)}>
                <img
                  src={brandLogos[brand] || 'https://via.placeholder.com/150?text=' + brand}
                  alt={brand}
                  className="brand-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const placeholder = e.target.nextSibling;
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                  onLoad={(e) => {
                    e.target.style.display = 'block';
                    const placeholder = e.target.nextSibling;
                    if (placeholder) placeholder.style.display = 'none';
                  }}
                />
                <div className="brand-placeholder">{brand}</div>
              </div>
              <div className="brand-name">{brand}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainFleet;