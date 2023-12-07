import React from 'react';

function Star({ filled, half }) {
  const starPath = "M12 .587l3.688 7.462 8.312 1.207-6 5.854 1.416 8.263L12 19.897l-7.416 3.876 1.416-8.263-6-5.854 8.312-1.207Z";
  const halfStarPath = ""; // Add the SVG path for the half-filled star if available

  return (
    <svg className={`star ${filled ? 'filled' : ''} ${half ? 'half-filled' : ''}`} width="24" height="24" viewBox="0 0 24 24">
      {half ? (
        <path d={halfStarPath} fill="currentColor" />
      ) : (
        <path d={starPath} fill={filled ? "gold" : "none"} stroke="gold" />
      )}
    </svg>
  );
}

export default Star;