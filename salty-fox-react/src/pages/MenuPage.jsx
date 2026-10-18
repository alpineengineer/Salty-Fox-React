import { useState } from 'react';
import menuData from '../data/menuData.js';
import MenuFilter from '../components/MenuFilter.jsx';
import MenuItemCard from '../components/MenuItemCard.jsx';
export default function MenuPage({cart,onAdd}) {
 const [category,setCategory]=useState('All');
 const [message,setMessage]=useState('');
 const filteredMenu=menuData.filter(item=>category==='All'||item.category===category);
 const add=(item,quantity)=>{
  const inCart=cart.find(entry=>entry.id===item.id)?.quantity??0;
  const added=Math.min(quantity,5-inCart);
  if(added<=0)return;
  onAdd(item,added);
  setMessage(`${added} × ${item.name} added to cart.`);
 };
 return <main className="container page-content"><h1 className="page-title">The Salty Fox Menu</h1><p className="text-center">Fresh New England favorites, served with a warm welcome.</p><MenuFilter category={category} setCategory={setCategory}/>
 {message&&<p className="feedback" role="status">{message}</p>}
 <section className="menu-grid" aria-label="Menu items">{filteredMenu.map(item=><MenuItemCard key={item.id} item={item} inCart={cart.find(c=>c.id===item.id)?.quantity??0} onAdd={add}/>)}</section>
 {filteredMenu.length===0&&<p>No items in this category.</p>}</main>;
}
