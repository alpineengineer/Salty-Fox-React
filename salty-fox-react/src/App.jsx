import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SiteNavbar from './components/SiteNavbar.jsx';
import HomePage from './pages/HomePage.jsx';
import MenuPage from './pages/MenuPage.jsx';
import ReservationsPage from './pages/ReservationsPage.jsx';
import CartPage from './pages/CartPage.jsx';
export default function App(){
 const [cart,setCart]=useState([]);
 const add=(item,quantity)=>setCart(prev=>{
  const existing=prev.find(c=>c.id===item.id);
  if(existing)return prev.map(c=>c.id===item.id?{...c,quantity:Math.min(5,c.quantity+quantity)}:c);
  return [...prev,{id:item.id,name:item.name,price:item.price,quantity:Math.min(5,quantity)}];
 });
 const update=(id,quantity)=>setCart(prev=>prev.map(c=>c.id===id?{...c,quantity:Math.max(1,Math.min(5,quantity))}:c));
 const remove=id=>setCart(prev=>prev.filter(c=>c.id!==id));
 const clear=()=>setCart([]);
 const cartCount=cart.reduce((sum,c)=>sum+c.quantity,0);
 return <BrowserRouter><SiteNavbar cartCount={cartCount}/><Routes>
  <Route path="/" element={<HomePage/>}/>
  <Route path="/menu" element={<MenuPage cart={cart} onAdd={add}/>}/>
  <Route path="/reservations" element={<ReservationsPage/>}/>
  <Route path="/cart" element={<CartPage cart={cart} onUpdate={update} onRemove={remove} onClear={clear}/>}/>
  <Route path="*" element={<Navigate to="/" replace/>}/>
 </Routes><footer className="site-footer">The Salty Fox · Good Times Since 1773</footer></BrowserRouter>;
}
