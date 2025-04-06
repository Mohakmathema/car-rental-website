// fleet.js - Functions for managing and filtering car data

// Function to get all cars
export const getCars = () => {
    // In a real application, this would fetch from API
    // For now, returning dummy data
    return [
      {
        id: 1,
        brand: "Bugatti",
        image: "https://via.placeholder.com/200",
        description: "Luxury Supercar",
        available: false,
        popularity: 95
      },
      {
        id: 2,
        brand: "BMW",
        image: "https://via.placeholder.com/200",
        description: "Premium Performance",
        available: true,
        popularity: 85
      },
      {
        id: 3,
        brand: "KIA",
        image: "https://via.placeholder.com/200",
        description: "Stylish & Reliable",
        available: true,
        popularity: 75
      },
      {
        id: 4,
        brand: "Tesla",
        image: "https://via.placeholder.com/200",
        description: "Electric Innovation",
        available: true,
        popularity: 90
      },
      {
        id: 5,
        brand: "Hyundai",
        image: "https://via.placeholder.com/200",
        description: "Modern & Efficient",
        available: true,
        popularity: 70
      },
      {
        id: 6,
        brand: "Landcruiser",
        image: "https://via.placeholder.com/200",
        description: "Ultimate Off-Road",
        available: true,
        popularity: 80
      },
    ];
  };
  
  // Function to filter cars based on search term, sort order and availability
  export const filterCars = (cars, searchTerm, sortOrder, showOnlyAvailable) => {
    // Start with all cars
    let filteredCars = [...cars];
    
    // Filter by search term if provided
    if (searchTerm && searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase().trim();
      filteredCars = filteredCars.filter(car => 
        car.brand.toLowerCase().includes(term) || 
        car.description.toLowerCase().includes(term)
      );
    }
    
    // Filter by availability if requested
    if (showOnlyAvailable) {
      filteredCars = filteredCars.filter(car => car.available);
    }
    
    // Sort by popularity
    if (sortOrder === 'most-least') {
      filteredCars.sort((a, b) => b.popularity - a.popularity);
    } else if (sortOrder === 'least-most') {
      filteredCars.sort((a, b) => a.popularity - b.popularity);
    }
    
    return filteredCars;
  };