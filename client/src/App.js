import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import UserHomepage from './UserHomepage';
import Homepage from './Homepage';
import DropdownMenu from './DropdownMenu';
import UserProfile from './UserProfile';
import UserTasks from './UserTasks';
import CreateTask from './CreateTask';
import HomepageButton from './HomepageButton'
import UsersRanking from "./UsersRanking";
import { getUserSession, saveUserSession, clearUserSession } from './sessionHelper';
import './App.css';


function App() {
  const [user, setUser] = useState(getUserSession());


  useEffect(() => {
    if (user) {
      saveUserSession(user);
    } else {
      clearUserSession();
    }
  }, [user]);

  return (
  <div className="scroll-container">
    <div className="animated-background">
      <div className="foreground">
        <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="none" strokeWidth="2">
            <path fill="#001f3f" opacity="0.5" d="M0 0L800 0L800 600L0 600Z"></path>
            <path fill="#007bff" opacity="0.4" d="M0 100L800 200L800 600L0 500Z"></path>
            <path fill="#28a745" opacity="0.3" d="M0 200L800 300L800 600L0 600Z"></path>
            <path fill="#6f42c1" opacity="0.2" d="M0 300L800 400L800 600L0 700Z"></path>
          </g>
        </svg>
      </div>
      <Router>
        <HomepageButton/>
        <DropdownMenu user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<RegisterForm setUser={setUser} />} />
          <Route path="/login" element={<LoginForm setUser={setUser} />} />
          <Route path="/ranking" element={<UsersRanking />} />
          {user && (
            <>
              <Route path="/user" element={<UserHomepage user={user} />} />
              <Route path="/user/profile" element={<UserProfile user={user} />} />
              <Route path="/user/create-task" element={<CreateTask userId={user.id} />} />
              <Route path="/user/tasks" element={<UserTasks userId={user.id} />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  </div>
  );
}

export default App;
