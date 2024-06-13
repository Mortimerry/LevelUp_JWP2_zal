import React, { useState, useEffect } from 'react';
import './UserTasks.css';

const UserRanking = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:5000/api/users/ranking');
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);


  return (
    <div className="parchment-container">
      <h1>Ranking Bohaterów</h1>
      <table className="tasks-table">
        <thead>
          <tr>
            <th>Nazwa użytkownika</th>
            <th>Poziom</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserRanking;
