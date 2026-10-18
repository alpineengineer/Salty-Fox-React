import { useState } from 'react';
import { Card, CardBody, CardTitle, CardText, Button, Input, Label } from 'reactstrap';
export default function MenuItemCard({item,inCart=0,onAdd}) {
  const [quantity,setQuantity]=useState(1);
  const room=5-inCart;
  const available=Math.min(5,room);
  return <Card><CardBody>
    <CardTitle tag="h2" className="h4">{item.name}</CardTitle>
    <CardText className="fw-bold mb-1">${item.price.toFixed(2)}</CardText>
    <CardText>{item.description}</CardText>
    <CardText className="small text-muted">{item.category}</CardText>
    <div className="item-actions"><Label for={`qty-${item.id}`}>Quantity</Label>
    <Input id={`qty-${item.id}`} type="select" value={Math.min(quantity,Math.max(1,available))} disabled={room===0} onChange={e=>setQuantity(Number(e.target.value))}>
      {Array.from({length:Math.max(1,available)},(_,i)=>i+1).map(n=><option key={n} value={n}>{n}</option>)}
    </Input>
    <Button color="primary" className="w-100 mt-2" disabled={room===0} onClick={()=>{onAdd(item,Math.min(quantity,available));setQuantity(1);}}>{room===0?'Maximum 5 in cart':'Add to Cart'}</Button>
    {inCart>0&&<div className="small mt-2">In cart: {inCart} / 5</div>}</div>
  </CardBody></Card>;
}
