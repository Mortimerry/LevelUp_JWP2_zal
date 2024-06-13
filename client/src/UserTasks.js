import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserTasks.css';

const UserTasks = ({ userId }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`http://localhost:5000/api/tasks/${userId}`);
      const data = await response.json();
      setTasks(data);
    };
    fetchTasks();
  }, [userId]);


const handleComplete = async (taskId) => {
    const response = await fetch(`http://localhost:5000/api/tasks/complete/${taskId}`, {
      method: 'POST',
    });
    if (response.ok) {
      alert('Misja zakończona sukcesem!');
      // Refresh tasks after completion
      setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: true } : task));
    } else {
      alert('Nie udało się zakończyć misji');
    }
  };

const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'not_completed') return !task.completed;
    return true;
  });

 const formatDeadline = (deadline) => {
    const formattedDate = new Date(deadline).toLocaleString('pl-PL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    return formattedDate;
  };

  return (
    <div className="parchment-container">
      <h2>Twoje Misje</h2>
      <button onClick={() => navigate('/user/create-task')}>Dodaj Nową Misję</button>
      <div className="filter-container">
        <label>
          <input
            type="radio"
            value="all"
            checked={filter === 'all'}
            onChange={() => setFilter('all')}
          />
          Wszystkie
        </label>
        <label>
          <input
            type="radio"
            value="completed"
            checked={filter === 'completed'}
            onChange={() => setFilter('completed')}
          />
          Ukończone
        </label>
        <label>
          <input
            type="radio"
            value="not_completed"
            checked={filter === 'not_completed'}
            onChange={() => setFilter('not_completed')}
          />
          Nie Ukończone
        </label>
      </div>
      <table className="tasks-table">
        <thead>
          <tr>
            <th>Misja</th>
            <th>Punkty Doświadczenia</th>
            <th>Poziom Trudności</th>
            <th>Termin Wykonania</th>
            <th>Ukończono?</th>
          </tr>
        </thead>
        <tbody>
        {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.description}</td>
              <td>{task.exp_points}</td>
              <td>{task.difficulty}</td>
              <td>{formatDeadline(task.deadline)}</td>
              <td>{task.completed ? 'Ukończono!' : <button onClick={() => handleComplete(task.id)}>Zakończ zadanie</button>}</td>
            </tr>
          ))}
        </tbody>
        </table>
    </div>
  );
};

export default UserTasks;
