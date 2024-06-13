import React, { useEffect, useState } from 'react'

import UserCard from './UserCard'
import RegisterForm from "./RegisterForm";

function UserList() {
  // Stan przechowujący listę użytkowników
  const [users, setUsers] = useState([])
  const [error, setError] = useState('');

  useEffect(() => {
    async function getUsers() {
      const response = await fetch('http://localhost:5000/api/users')
      if (response.ok) {
        const userData = await response.json()
        setUsers(userData)
      } else {
        const errorData = await response.json()
        setError(errorData.message)
      }
    }
    getUsers()
  }, [])

  const mappedUsers = users.map(user => <UserCard key={user.id} user={user} />)

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {/* Wyświetlenie komponentów UserCard dla każdego użytkownika */}
        {mappedUsers}
      </ul>
    </div>
  )
}

export default UserList;