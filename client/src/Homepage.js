import React from 'react';
import { useNavigate } from 'react-router-dom';


const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div className="content">
      <h1>Level Up!</h1>
      <h2>Zostań bohaterem swojego życia!</h2>
      <button onClick={() => navigate('/register')}>Rozpocznij przygodę</button>
    </div>
  );
};

export default Homepage;
