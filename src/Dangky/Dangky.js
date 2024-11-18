import React, { useState } from 'react';
import { registerUser } from './fetchUser';
import './dangky.css';
import { Link } from 'react-router-dom';
function Dangky() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');  // Add username
  // const [role, setRole] = useState('user');  // Add role (defaulting to 'user')
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);  // Username handler
  // const handleRoleChange = (e) => setRole(e.target.value);  // Role handler

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      username,
      // role
    };

    try {
      const response = await registerUser(newUser);

      if (response.message === 'User registered successfully!') {
        setUsers([...users, newUser]);
        setMessage('User registered successfully!');
        setEmail('');
        setPassword('');
        setUsername('');  // Clear username
        // setRole('user');  // Reset role to default
      } else {
        setMessage(response.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setMessage(error.message || 'An error occurred during registration.');
    }
  };

  return (
    <div className="register-container">
      <h2>Đăng ký</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" value={email} onChange={handleEmailChange} required />
        </label>
        <label>
          Mật khẩu
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </label>
        <label>
          Username
          <input type="text" value={username} onChange={handleUsernameChange} required />
        </label>
        {/* <label>
          Role
          <input type="text" value={role} onChange={handleRoleChange} required />
        </label> */}
        <button type="submit">Đăng ký</button>
      </form>
      <div className="social-register">
        <button className="facebook-button">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" style={{ width: '18px' }} />
          Facebook
        </button>
        <button className="google-button">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="18px" height="18px">
        <path fill="#4285F4" d="M23 10.22c1.49-.9 3.27-1.45 5.21-1.45 4.07 0 7.4 2.18 9.14 5.33l4.75-4.8C38.65 4.65 31.8 1 24 1c-7.36 0-13.94 3.21-18.13 8.36l5.74 4.7C14.48 10.37 18.5 8.01 23 10.22z"/>
        <path fill="#34A853" d="M7.7 12.62C5.3 16.37 4 20.99 4 26c0 5.22 1.41 9.9 3.9 13.58L14 34.77C12.47 32.46 11.4 29.43 11.4 26c0-3.28 1.02-6.32 2.8-8.88L7.7 12.62z"/>
        <path fill="#FBBC05" d="M24 39.5c-4.25 0-7.79-1.56-10.3-4.07l-5.4 5.3C13.6 44.69 18.54 47 24 47c7.78 0 14.65-3.71 18.9-9.57l-5.9-4.63C33.47 36.87 29.08 39.5 24 39.5z"/>
        <path fill="#EA4335" d="M44 24H24v6.5h12.9c-1.04 3.18-4.06 5.5-8.9 5.5-5.54 0-10-4.46-10-10 0-5.54 4.46-10 10-10 2.76 0 5.14 1.1 7 2.83l4.97-4.7C32.57 6.74 28.5 4 24 4c-7.36 0-13.94 3.2-18.13 8.35l5.73 4.69C14.48 10.38 18.5 8 23 10.2c1.58 1.15 3 2.61 3 5.9v8h18c.02-.33.04-.67.04-1C44 25.08 43.03 24 44 24z"/>
    </svg>
    Google
</button>
      </div>
      <p>
        Đã có tài khoản?  <Link to="/Dangnhap">Đăng nhập</Link>
      </p>
    </div>
  );
}

export default Dangky;
