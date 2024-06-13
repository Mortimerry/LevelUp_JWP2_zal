import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DropdownMenu.css';

const DropdownMenu = ({ user, setUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('http://localhost:5000/api/logout', {
      method: 'POST',
      credentials: 'include',
    }).then(() => {
      setUser(null);
      localStorage.removeItem('user');
      navigate('/');
    });
  };


  return (
    <div className="dropdown" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button className="dropdown-toggle">&#9776;</button>
      {isOpen && (
        <div className="dropdown-menu">
          {user ? (
            <>
              <button onClick={() => navigate('/user/profile')}>Profil</button>
              <button onClick={() => navigate('/user/tasks')}>Zadania</button>
              <button onClick={() => navigate('/ranking')}>Ranking</button>
              <button onClick={handleLogout}>Wyloguj</button>
            </>
          ) : (
            <>
            <button onClick={() => navigate('/login')}>Zaloguj</button>
            <button onClick={() => navigate('/ranking')}>Ranking</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
