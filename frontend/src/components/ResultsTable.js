import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom'; 


const ResultsTable = ({ results }) => {
  const navigate = useNavigate();
  const { setCartItems } = useCart();

  const handleAddToCart = (item) => {
    setCartItems(prev => {
      const itemExists = prev.some(cartItem =>
        cartItem.partNumber === item.partNumber && cartItem.dataProvider === item.dataProvider
      );
      if (!itemExists) {
        return [...prev, item];
      }
      return prev;
    });
  
    navigate('/cart'); 
  };
  
  if (!results || results.length === 0) {
    return <p>No data found</p>;
  }
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Part Number</th>
          <th>Manufacturer</th>
          <th> Data Provider</th>
          <th>Volume</th>
          <th>Unit Price (INR)</th>
          <th>Total Price (INR)</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result, index) => (
          <tr key={index}>
            <td>{result.partNumber}</td>
            <td>{result.manufacturer}</td>
            <td>{result.dataProvider }</td>
            <td>{result.volume}</td>
            <td>{result.unitPrice ? result.unitPrice.toFixed(2) : '0.00'}</td>
            <td>{result.totalPrice ? result.totalPrice.toFixed(2) : '0.00'}</td>
            <td>
              {index === 0 ? (
                <button className="btn btn-primary" onClick={() => handleAddToCart(result)}>
                  Add to Cart
                </button>
              ) : (
                <span>—</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;
