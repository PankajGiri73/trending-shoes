import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrdersByUserId, deleteOrderById } from '../redux/slices/orderSlice'; 

const MyOrder = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchOrdersByUserId(user._id));
    }
  }, [dispatch, user]);

  const handleCancelOrder = (orderId) => {
    dispatch(deleteOrderById(orderId));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && orders?.length === 0 && <p>No orders found.</p>}
      {status === 'succeeded' && orders?.length > 0 && (
        <div>
          {orders.map((order) => (
            <div key={order._id} className="border p-4 mb-4 rounded shadow-md">
              <h3 className="font-bold mb-2">Order ID: {order._id}</h3>
              <p>Customer Name: {order.customerName}</p>
              <p>Contact Number: {order.customerContactNumber}</p>
              <p>Address: {order.address}</p>
              <p>Pin Code: {order.pinCode}</p>
              <div>
                {order.product.map((product, index) => (
                  <div key={index} className="border-t pt-2 mt-2">
                    <p>Product Name: {product.productName}</p>
                    <p>Product Price: {product.productPrice}</p>
                    <p>Product Description: {product.ProductDesc}</p>
                    <p>Product Category: {product.ProductCategory}</p>
                  </div>
                ))}
              </div>
              <p>Transaction ID: {order.transactionId}</p>
              <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <button
                onClick={() => handleCancelOrder(order._id)}
                className="bg-red-500 text-white py-2 px-4 rounded mt-4 hover:bg-red-600"
              >
                Cancel Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrder;
