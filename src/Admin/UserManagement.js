import React, { useEffect, useState } from 'react';
import './UserManagement.css';

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
        email: '',
        role: '',
    });
    const [isAdding, setIsAdding] = useState(false);

    // Fetch user list from the API
    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await fetch('http://localhost:9000/user-api/getUserLists');
                if (!res.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await res.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    // Handle delete user
    async function handleDelete(id) {
        try {
            const res = await fetch('http://localhost:9000/user-api/deleteUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: id }),  // Use _id instead of id
            });
            const result = await res.json();
            if (result.status === 1) {
                setUsers(users.filter(user => user._id !== id));
                alert('User deleted successfully!');
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    // Handle add user
    async function handleAddUser(event) {
        event.preventDefault();
        try {
            const res = await fetch('http://localhost:9000/user-api/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });
            const result = await res.json();
            if (result.status === 1) {
                setUsers([...users, result.data]); // Adjusted to use `result.data` for the new user
                setFormValues({ username: '', password: '', email: '', role: '' });
                setIsAdding(false);
                alert('User added successfully!');
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    }

    // Handle form input change
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }

    return (
        <div className="user-management">
            <h2>Quản lý người dùng</h2>

            <button className="add-user-btn" onClick={() => setIsAdding(true)}>
                Add New User
            </button>

            {loading && <p>Loading users...</p>}
            {error && <p>Error: {error}</p>}

            <table className="user-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(user._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isAdding && (
                <div className="add-user-form">
                    <h3>Add New User</h3>
                    <form onSubmit={handleAddUser}>
                        <label>
                            Username:
                            <input
                                type="text"
                                name="username"
                                value={formValues.username}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label>
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={formValues.password}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={formValues.email}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label>
                            Role:
                            <input
                                type="text"
                                name="role"
                                value={formValues.role}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <button type="submit" className="submit-btn">
                            Add User
                        </button>
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => setIsAdding(false)}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
