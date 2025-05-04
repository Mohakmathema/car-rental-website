import React from 'react';
import Sidebar from './Sidebar';
    

const CarsPage = ({ cars }) => {
  return (
    <div className="flex">
      <Sidebar />

      {/* Offset all content by the sidebar width */}
      <main className="ml-64 flex-1 p-6 overflow-auto">
        {cars.map(car => (
          <CarCard key={car._id} car={car} />
        ))}
      </main>
    </div>
  );
};

export default CarsPage;
