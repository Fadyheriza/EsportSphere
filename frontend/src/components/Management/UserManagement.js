import React, { useState, useEffect } from 'react';
import { updateUser, deleteUser, fetchUsers } from '../../services/userService';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const getUsers = async () => {
            const users = await fetchUsers();
            setUsers(users);
        };
        getUsers();
    }, []);

    const handleEdit = (user) => {
        setEditingUser(user);
        setUsername(user.username);
    };

    const handleUpdate = async () => {
        const updatedUser = { username, password };
        await updateUser(editingUser._id, updatedUser);
        setEditingUser(null);
        setUsername('');
        setPassword('');
        const users = await fetchUsers();
        setUsers(users);
    };

    const handleDelete = async (id) => {
        await deleteUser(id);
        const users = await fetchUsers();
        setUsers(users);
    };

    return (
        <div>
            <h2>User Management</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {user.username}
                        <button onClick={() => handleEdit(user)}>Edit</button>
                        <button onClick={() => handleDelete(user._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {editingUser && (
                <div>
                    <h3>Edit User</h3>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="New Password"
                    />
                    <button onClick={handleUpdate}>Update User</button>
                </div>
            )}
        </div>
    );
};

export default UserManagement;