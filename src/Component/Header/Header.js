// Header.js
import React from 'react';
import './header.css'; // Nhập file CSS
import { Link } from 'react-router-dom';
function Header() {
    return (
        <div className="header">
            <div className="header-content">
                <div className="logo">Urban Elegance</div>
                <div className="search-bar">
                    <input type="text" placeholder="Shopee bao ship 0đ - Đăng ký ngay!" />
                    <button className="search-button">Search</button>
                </div>
                <div className="nav-links">
                <Link to="/">Trang Chủ</Link>
                <Link to="/Cart">Giỏ Hàng</Link>
                    
                    <Link to="/Thoitrangnu">Thời Trang Nữ</Link>
                    
                </div>
                <div className="user-actions">
                <Link to="/Dangky">Đăng kí</Link>
                <Link to="/Dangnhap">Đăng nhập</Link>
                </div>
            </div>
        </div>
    );
}

export default Header;
