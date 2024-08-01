import React, { useState, useEffect } from 'react';


const ShootingStar = ({ id, top, left }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById(`shooting-star-${id}`)?.remove();
    }, 3000);

    return () => clearTimeout(timer);
  }, [id]);

  return (
    <div
      id={`shooting-star-${id}`}
      className="shooting-star"
      style={{ top: `${top}%`, left: `${left}%` }}
    />
  );
};

const ShootingStars = () => {
  const [shootingStars, setShootingStars] = useState([]);
  const shootingStarInterval = 8000; // Interval between shooting stars in milliseconds

  useEffect(() => {
    const createShootingStar = () => {
      const id = Date.now();
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      setShootingStars((prevStars) => [...prevStars, { id, top, left }]);
    };

    const interval = Math.random() * shootingStarInterval;
    const shootingStarIntervalId = setInterval(() => {
      createShootingStar();
    }, interval);

    return () => clearInterval(shootingStarIntervalId);
  }, []);

  return (
    <div id="shooting-stars-container">
      {shootingStars.map((star) => (
        <ShootingStar key={star.id} id={star.id} top={star.top} left={star.left} />
      ))}
    </div>
  );
};

export default ShootingStars;
