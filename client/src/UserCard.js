import React from 'react';

const UserCard = ({ user }) => {
    return (
        <li>
            <div>
                <strong>Nazwa Użytownika:</strong> {user.username}
            </div>
        </li>
    );
};

export default UserCard;