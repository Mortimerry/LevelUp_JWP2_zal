import React, { useEffect, useState } from 'react';
import './UserProfile.css';
const UserProfile = ({ user }) => {
  const [userData, setUserData] = useState(user);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          const errorData = await response.json();
          alert(`Failed to fetch user data: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Pobierz dane
    fetchUserData();

    // Odświeżanie cykliczne
    const interval = setInterval(fetchUserData, 60000); // Fetch every 60 seconds

    // Wyczyść interwał
    return () => clearInterval(interval);
  }, [user.id]);

  return (
    <div className="parchment-container">
      <h1>Profil użytkownika</h1>
      <p>Nazwa użytkownika: {userData.username}</p>
      <p>Poziom: {userData.level}</p>
      <p>Punkty doświadczenia do kolejnego poziomu: {1000 - userData.exp_points}</p>
    </div>
  );
};

export default UserProfile;

