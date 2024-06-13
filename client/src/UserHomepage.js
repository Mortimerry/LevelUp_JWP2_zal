import React from 'react';

const UserHomepage = ({ user }) => {
  if (!user) {
    return <p>Ładowanie...</p>;
  }

  return (
    <div className="content">
      <h1>Witaj {user.username}!</h1>
      <p>Poziom twojego bohatera to {user.level}. Do kolejnego poziomu brakuje ci tylko {1000 - user.exp_points} punktów doświadczenia!</p>
    </div>
  );
};

export default UserHomepage;
