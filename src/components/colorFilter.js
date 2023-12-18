import React from "react";
import '../styles/filter.css';

function ColorFilter({ handleColorFilter }) {
  const handleClick = (color) => {
    handleColorFilter(color);
  };

  return (
    <div className="color-filter-container">
      <button className="filter-button" onClick={() => handleClick("Rosado")}>
        Rosado
      </button>
      <button className="filter-button" onClick={() => handleClick("500ml")}>
        500ml
      </button>
      {/* Agrega más botones de filtro según sea necesario */}
    </div>
  );
}
  
  export default ColorFilter;