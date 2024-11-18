// src/Dangnhap/Dangnhap.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './dangnhap.css';
import { Link } from 'react-router-dom';
function Dangnhap() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(
                `http://localhost:9000/user-api/getUserByEmailAndPass?email=${email}&password=${password}`
            );

            const { role } = response.data;

            if (role === 'admin') {
                navigate('/Admin');
            } else if (role === 'user') {
                navigate('/Home');
            } else {
                setMessage("Invalid role. Access denied.");
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "An error occurred during login.");
        }
    };

    return (
        <div className="login-container">
            <h2>Đăng nhập</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Email
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </label>
                <label>
                    Mật khẩu
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </label>
                <button type="submit">Đăng nhập</button>
            </form>
            <div className="social-login">
                <button className="facebook-button">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" style={{ width: '18px' }} />
                    Facebook
                </button>
                <button className="google-button">
                    <img src="https://th.bing.com/th/id/OIP.Din44az7iZZDfbsrD1kfGQHaHa?w=159&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Google" style={{ width: '18px' }} />
                    Google
                </button>
            </div>
            <p>
                Bạn mới biết đến Shopee? <Link to="/Dangky">Đăng kí</Link>
            </p>
        </div>
    );
}

export default Dangnhap;
