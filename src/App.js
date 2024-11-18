// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Component/Header/Header';
import Product from './Component/Product/Product';
import Footer from './Component/Footer/Footer';
import Home from './Home';
import Thoitrangnu from './Woment/Thoitrangnu';
import Dangky from './Dangky/Dangky';
import Dangnhap from './Dangnhap/Dangnhap';
import Admin from './Admin/Admin';
import Cart from './Cart/Cart';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import './App.css';
import { CartProvider } from './context/CartContext';

function App() {
    const location = useLocation();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div>
            <Header />
            {/* Render banner only if the current route is NOT /Thoitrangnu, /Dangky, /Dangnhap, /Cart, or /Admin */}
            {location.pathname !== '/Thoitrangnu' &&
             location.pathname !== '/Dangky' &&
             location.pathname !== '/Dangnhap' &&
             location.pathname !== '/Cart' &&
             location.pathname !== '/Admin' && (
                <div className="banner">
                    <Slider {...settings}>
                        <div className="banner-item">
                            <img src="https://cf.shopee.vn/file/sg-11134258-7renf-m269s4vm9wvwb5_xxhdpi" alt="Banner 1" />
                        </div>
                        <div className="banner-item">
                            <img src="https://cf.shopee.vn/file/sg-11134258-7renk-m2241up792wn8f_xxhdpi" alt="Banner 2" />
                        </div>
                        <div className="banner-item">
                            <img src="https://cf.shopee.vn/file/sg-11134258-7reqh-m22489xosee5b0_xxhdpi" alt="Banner 3" />
                        </div>
                    </Slider>
                </div>
            )}
             
            <Routes>
                <Route path="/" element={<Product />} />
                <Route path="/home" element={<Home />} />
                <Route path="/Thoitrangnu" element={<Thoitrangnu />} />
                <Route path="/Cart" element={<Cart />} />
                <Route path="/Dangky" element={<Dangky />} />
                <Route path="/Dangnhap" element={<Dangnhap />} />
                <Route path="/Admin" element={<Admin />} />
            </Routes>

            {/* Render Footer only if the current route is NOT /Admin */}
            {location.pathname !== '/Admin' && <Footer />}
        </div>
    );
}

// Wrap the entire App with CartProvider to provide cart context to all components
export default function AppWithRouter() {
    return (
        <Router>
            <CartProvider>
                <App />
            </CartProvider>
        </Router>
    );
}
