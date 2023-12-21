//Este componente representa una estrella y puede dibujar tanto una estrella llena como una mitad de estrella, dependiendo de las propiedades filled y half que recibe como parámetros
import React from 'react';

function Star({ filled, half }) {
  // Path para la estrella completa y la mitad de estrella
  const starPath = "M12 .587l3.688 7.462 8.312 1.207-6 5.854 1.416 8.263L12 19.897l-7.416 3.876 1.416-8.263-6-5.854 8.312-1.207Z";
  const halfStarPath = "M9.5 14.25l-5.584 2.936 1.066-6.218L.465 6.564l6.243-.907L9.5 0l2.792"; 

  return (
    // SVG para representar la estrella o la mitad de la estrella
    <svg width="24" height="24" viewBox="0 0 24 24">
      {half ? (
        // Si half es verdadero, se muestra la mitad de la estrella
        <path d={halfStarPath} fill="currentColor" />
      ) : (
        // Si half es falso, se muestra la estrella completa o vacía dependiendo de filled
        <path d={starPath} fill={filled ? "gold" : "none"} stroke="gold" />
      )}
    </svg>
  );
}

export default Star;