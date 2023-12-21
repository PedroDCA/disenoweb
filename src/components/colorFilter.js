import React from "react";
import '../styles/filter.css';
// Definición del componente ColorFilter
function ColorFilter({ handleColorFilter }) {
  // Función para manejar el clic en los botones de filtro de colores
  const handleClick = (color) => {
    handleColorFilter(color); // Llama a la función handleColorFilter con el color seleccionado
  };

  // Renderizado del componente ColorFilter
  return (
    <div className="color-filter-container">
      {/* Botones para filtrar por color */}
      <button className="filter-button" onClick={() => handleClick("Rosado")}>
        Rosado
      </button>
      <button className="filter-button" onClick={() => handleClick("500ml")}>
        500ml
      </button>
      {/* Se pueden agregar más botones de filtro para otros colores o tamaños */}
    </div>
  );
}

export default ColorFilter; // Exporta el componente ColorFilter