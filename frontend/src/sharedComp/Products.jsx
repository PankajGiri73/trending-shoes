import axios from 'axios';
import React, { useEffect } from 'react';
import Banner from "../assets/banner.png";
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../redux/slices/cartSlice';
import { fetchProducts, STATUES } from '../redux/slices/productSlice';

const Products = () => {
    const dispatch = useDispatch();
    const { products, status } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleClick = (data) => {
        dispatch(add(data));
    };

    if (status === STATUES.LOADING) {
        return (
            <div className='text-3xl font-bold'>Loading...</div>
        );
    }

    return (
        <div>
            <div>
                <img src={Banner} alt="banner" />
            </div>
            <div className='grid grid-cols-3 gap-5 p-5'>
                {products?.map((item) => (
                    <div key={item.id} className='bg-white shadow rounded p-4 flex flex-col items-center'>
                        <img src={`${import.meta.env.VITE_API_URI}/${item.productImage}`} alt="" className='w-[200px] h-[200px]' />
                        <h4>{item.productName}</h4>
                        <p>{item.productPrice}</p>
                        <button onClick={() => { handleClick(item) }} className='p-2 bg-orange-500 text-white rounded shadow'>Add to cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;
