import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Table, Button, Input } from 'reactstrap';
import CartSummary from '../components/CartSummary.jsx';
import ConfirmModal from '../components/ConfirmModal.jsx';
export default function CartPage({cart,onUpdate,onRemove,onClear}){
 const navigate=useNavigate();const [modal,setModal]=useState(null);
 const subtotal=cart.reduce((sum,item)=>sum+item.price*item.quantity,0);
 const tax=Math.round(subtotal*0.0825*100)/100;const total=Math.round((subtotal+tax)*100)/100;
 const finish=()=>{setModal(null);navigate('/menu');};
 const cancel=()=>{onClear();setModal('thanks-cancel');};
 const submit=()=>{onClear();setModal('thanks-submit');};
 return <main className="container page-content"><h1 className="page-title">Your Cart</h1><Card className="cart-panel"><CardBody>
 {cart.length===0?<p>Your cart is empty.</p>:<><div className="table-responsive"><Table className="cart-table" striped aria-label="Items in your cart"><thead><tr><th scope="col">Item</th><th scope="col">Price</th><th scope="col">Qty</th><th scope="col" className="text-end">Line Total</th><th scope="col">Remove</th></tr></thead><tbody>{cart.map(item=><tr key={item.id}><th scope="row">{item.name}</th><td>${item.price.toFixed(2)}</td><td><Input type="select" bsSize="sm" value={item.quantity} aria-label={`Quantity for ${item.name}`} onChange={e=>onUpdate(item.id,Number(e.target.value))} style={{width:72}}>{[1,2,3,4,5].map(n=><option key={n} value={n}>{n}</option>)}</Input></td><td className="text-end">${(item.price*item.quantity).toFixed(2)}</td><td><Button size="sm" color="danger" outline onClick={()=>onRemove(item.id)} aria-label={`Remove ${item.name}`}>Remove</Button></td></tr>)}</tbody></Table></div><CartSummary subtotal={subtotal} tax={tax} total={total}/><div className="cart-actions"><Button color="danger" outline onClick={()=>setModal('cancel')}>Cancel Order</Button><Button color="primary" onClick={()=>setModal('submit')}>Submit Order</Button></div></>}
 </CardBody></Card>
 <ConfirmModal isOpen={modal==='cancel'} title="Cancel Order" message="Are you sure you want to cancel your order?" onClose={()=>setModal(null)} onConfirm={cancel} confirmText="Yes, Cancel Order"/>
 <ConfirmModal isOpen={modal==='submit'} title="Submit Order" message={`Your total is $${total.toFixed(2)}. Ready to submit your order?`} onClose={()=>setModal(null)} onConfirm={submit} confirmText="Submit Order"/>
 <ConfirmModal isOpen={modal==='thanks-cancel'||modal==='thanks-submit'} title="Thank You!" message={modal==='thanks-cancel'?'Your order has been canceled. Thank you for visiting The Salty Fox!':'Your order has been submitted. Thank you for choosing The Salty Fox!'} onClose={finish} onConfirm={finish} confirmText="Back to Menu" showCancel={false}/>
 </main>;
}
