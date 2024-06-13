import React, { useState } from 'react';
import './CreateTask.css';
const CreateTask = ({ userId }) => {
  const [description, setDescription] = useState('');
  const [expPoints, setExpPoints] = useState(0);
  const [difficulty, setDifficulty] = useState('');
  const [deadline, setDeadline] = useState('');

  const difficultyOptions = {
    prosty: 100,
    umiarkowany: 200,
    trudny: 400,
    ekstremalny: 700,
  };

  const handleDifficultyChange = (e) => {
    const selectedDifficulty = e.target.value;
    setDifficulty(selectedDifficulty);
    setExpPoints(difficultyOptions[selectedDifficulty]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        description,
        exp_points: expPoints,
        difficulty,
        deadline,
      }),
    });
    if (response.ok) {
      alert('Misja dodana pomyślnie');
    } else {
      const errorData = await response.json();
      alert(`Nie udało się dodać misji: ${errorData.message}`);
    }
  };

  return (
   <div className="create-task-container">
      <h2>Dodaj Nową Misję</h2>
    <form onSubmit={handleSubmit}>
    <div className="form-group">
        <label htmlFor="description">Opis Misji</label>
      <textarea
        type="text"
        placeholder="Opis..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      </div>
      <div className="form-group">
      <label htmlFor="difficulty">Poziom trudności</label>
      <select value={difficulty} onChange={handleDifficultyChange} required>
        <option value="">Wybierz Poziom Trudności</option>
        <option value="prosty">Prosty</option>
        <option value="umiarkowany">Umiarkowany</option>
        <option value="trudny">Trudny</option>
        <option value="ekstremalny">Ekstremalny</option>
        onChange={(e) => setDifficulty(e.target.value)}
      </select>
      </div>
      <div className="form-group">
      <label htmlFor="expPoints">Punkty doświadczenia</label>
      <input
        type="number"
        placeholder="Experience Points"
        value={expPoints}
        onChange={(e) => setExpPoints(e.target.value)}
        readOnly
      />
      </div>
      <div className="form-group">
      <label htmlFor="deadline">Termin wykonania</label>
      <input
        type="datetime-local"
        placeholder="Deadline"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
      />
      </div>
      <button type="submit">Create Task</button>
    </form>
   </div>
  );
};

export default CreateTask;
