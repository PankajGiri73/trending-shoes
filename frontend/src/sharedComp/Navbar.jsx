import React, { useEffect } from 'react';
import { IoMdSearch } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/Logo.png";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const { auth, role } = useSelector((state) => state.auth);

  const handleLogOut = () => {
    localStorage.clear();
    dispatch(logout());
  };

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [auth, navigate]);

  return (
    <div className="bg-white flex justify-between items-center p-2 py-4">
      <div>
        {/* Set height and width here */}
        <img 
          src={Logo} 
          alt="Logo" 
          className="rounded-s-xl" 
          style={{ height: '70px', width: '70px' }} 
        />
      </div>
      <div className="flex items-center bg-slate-50 rounded shadow">
        <input 
          type="text" 
          placeholder="Search here..." 
          className="outline-none bg-transparent py-1 px-2 text-sm w-[25vw]" 
        />
        <div className="h-full p-2 px-3 bg-slate-300 rounded-e">
          <IoMdSearch className="text-2xl" />
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <div>
          <IconButton aria-label="cart" onClick={() => navigate("/cart")}>
            <StyledBadge badgeContent={cartItems.length} color="secondary">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
        </div>
        {auth ? (
          role === "user" ? (
            <div className="flex items-center gap-2">
              <Link to="/myorder">My Order</Link>
              <div onClick={handleLogOut} className="cursor-pointer">Log out</div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/adminuser">User</Link>
              <Link to="/adminproduct">Product</Link>
              <Link to="/adminorder">Order</Link>
              <div onClick={handleLogOut} className="cursor-pointer">Log out</div>
            </div>
          )
        ) : (
          <Link to="/login">
            Login/Signup
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
