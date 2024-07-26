import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext'; // Ensure this path is correct
import { updateCartPrice } from '../services/apiService';

const CartPage = () => {
  const { cartItems, setCartItems } = useCart(); // Use the context
  const [localCartData, setLocalCartData] = useState(cartItems || []);

  useEffect(() => {
    setLocalCartData(cartItems || []);
  }, [cartItems]);

  const handleVolumeChange = (partNumber, newVolume) => {
    setLocalCartData(localCartData.map(item =>
      item && item.partNumber === partNumber ? { ...item, volume: newVolume } : item
    ));
  };

  const handleUpdate = async (partNumber, volume, dataProvider) => {
    try {
      const updatedData = await updateCartPrice(partNumber, volume, dataProvider);
      setCartItems(cartItems.map(item =>
        item && item.partNumber === partNumber && item.dataProvider === dataProvider
          ? updatedData
          : item
      ));
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const handleDelete = (partNumber, dataProvider) => {
    setCartItems(cartItems.filter(item => item && !(item.partNumber === partNumber && item.dataProvider === dataProvider)));
  };

  return (
    <div>
      <h1>My Cart</h1>
      {localCartData.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Part Number</th>
              <th>Manufacturer</th>
              <th>Data Provider</th>
              <th>Volume</th>
              <th>Unit Price (INR)</th>
              <th>Total Price (INR)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {localCartData.map((item) => (
              item ? (
                <tr key={`${item.partNumber}-${item.dataProvider}`}>
                  <td>{item.partNumber}</td>
                  <td>{item.manufacturer}</td>
                  <td>{item.dataProvider}</td>
                  <td>
                    <input 
                      style={{ marginRight: '2px' }}
                      type="number"
                      value={item.volume}
                      onChange={(e) => handleVolumeChange(item.partNumber, e.target.value)}
                    />

                    <button
                      onClick={() => handleUpdate(item.partNumber, item.volume, item.dataProvider)}
                    >
                      Update
                    </button>
                  </td>
                  <td>{item.unitPrice.toFixed(2)}</td>
                  <td>{item.totalPrice.toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(item.partNumber, item.dataProvider)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ) : null
            ))}
          </tbody>
        </table>
      ) : (
        <p>No items in cart.</p>
      )}
    </div>
  );
};

export default CartPage;
