// src/Cart/Cart.js
import React, { useContext } from "react";
import { CartContext } from '../context/CartContext'; // Corrected import
import "./Cart.css";

function Cart() {
  const { cartItems } = useContext(CartContext); // Get cartItems from context

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopee Giỏ Hàng</h1>
        <input type="text" placeholder="Phí Ship 0₫" className="search-bar" />
      </div>
      
      <table className="cart-table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Sản Phẩm</th>
            <th>Đơn Giá</th>
            <th>Số Lượng</th>
            <th>Số Tiền</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td><input type="checkbox" /></td>
              <td>
                <div className="product-info">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p>{item.name}</p>
                    <span>{item.describe}</span>
                  </div>
                </div>
              </td>
              <td>₫{item.price}</td>
              <td>
                <div className="quantity">
                  <button>-</button>
                  <input type="number" value={item.quantity} readOnly />
                  <button>+</button>
                </div>
              </td>
              <td>₫{item.price * item.quantity}</td>
              <td>
                <button className="delete-button">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="cart-footer">
        <input type="checkbox" /> Chọn Tất Cả ({cartItems.length})
        <button className="save-button">Lưu vào mục Đã thích</button>
        <div className="checkout-section">
          <p>Tổng thanh toán ({cartItems.length} Sản phẩm): ₫{
            cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
          }</p>
          <button className="checkout-button">Mua Hàng</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
