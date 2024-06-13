import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users', formData);
            setMessage(response.data.message); // Ustaw komunikat z odpowiedzi serwera
            setError(''); // Wyczyść ewentualny poprzedni błąd
            setFormData({ username: '', password: '' }); // Wyczyść formularz
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message); // Ustaw komunikat błędu z odpowiedzi serwera
            } else {
                // Jeśli wystąpił inny błąd (np. problem z połączeniem)
                setError('Wystąpił problem podczas rejestracji. Spróbuj ponownie później.');
            }
            setMessage(''); // Wyczyść ewentualny poprzedni komunikat
        }
    };

    return (
        <div className="content">
            <h2>Rejestracja</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Login:    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Hasło:    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Zarejestruj</button>
            </form>
            {message && <p>{message}</p>} {/* Wyświetl komunikat o rejestracji, jeśli jest dostępny */}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Wyświetl komunikat błędu, jeśli jest dostępny */}
            <p>
                Już posiadasz konto?{' '}
                <span
                className="loginLink"
                onClick={() => navigate('/login')}
                >
                Zaloguj się
                </span>
            </p>
        </div>
    );
};

export default RegisterForm;