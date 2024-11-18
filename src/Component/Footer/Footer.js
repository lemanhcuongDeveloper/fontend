// src/Component/Footer.js
import React from 'react';
import './footer.css'; // Nhập file CSS

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-links">
                <a href="#">CHÍNH SÁCH BẢO MẬT</a>
                <a href="#">QUY CHẾ HOẠT ĐỘNG</a>
                <a href="#">CHÍNH SÁCH VẬN CHUYỂN</a>
                <a href="#">CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN</a>
            </div>
            <div className="footer-info">
                <p>Công ty TNHH Shopee</p>
                <p>Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn</p>
                <p>Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015</p>
                <p>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</p>
            </div>
        </footer>
    );
};

export default Footer; // Xuất mặc định
