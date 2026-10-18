import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Card, CardBody, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
const schema=yup.object({
 name:yup.string().trim().required('Name is required').max(20,'Maximum 20 characters'),
 email:yup.string().trim().required('Email is required').email('Enter a valid email address'),
 partySize:yup.number().transform((v,o)=>o===''?undefined:v).typeError('Select a party size').required('Party size is required').integer().min(1).max(8),
 date:yup.string().required('Date is required').test('not-past','Choose today or a future date',v=>!v || v>=new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,10)),
 time:yup.string().required('Time is required'),
 seating:yup.string().required('Choose a seating preference'),
 dietaryNotes:yup.string().max(30,'Maximum 30 characters'),
 newsletter:yup.boolean(),
}).required();
const defaults={name:'',email:'',partySize:'',date:'',time:'',seating:'',dietaryNotes:'',newsletter:false};
export default function ReservationsPage(){
 const [success,setSuccess]=useState('');
 const {register,handleSubmit,reset,formState:{errors}}=useForm({resolver:yupResolver(schema),defaultValues:defaults,mode:'onSubmit'});
 const submit=data=>{setSuccess(`Thank you, ${data.name}! Your reservation request has been received. Reservations are not guaranteed until confirmed.`);reset(defaults);};
 const field=(name,label,type='text',extras={})=><FormGroup key={name}><Label for={name}>{label}</Label><Input id={name} type={type} invalid={!!errors[name]} aria-invalid={!!errors[name]} aria-describedby={errors[name]?`${name}-error`:undefined} {...register(name)} {...extras}/>{errors[name]&&<FormFeedback id={`${name}-error`}>{errors[name].message}</FormFeedback>}</FormGroup>;
 return <main className="container page-content"><div className="row reservation-layout g-4"><section className="col-lg-5 reservation-intro"><h1>Reservations</h1><p>Reservations can be requested but are not guaranteed until confirmed.</p><img className="reservation-image img-fluid" src="/images/fox.png" alt="The Salty Fox mascot"/></section><section className="col-lg-7"><Card className="reservation-form-card"><CardBody><h2 className="h4">Request a table</h2>{success&&<p role="status" className="feedback">{success}</p>}<Form noValidate onSubmit={handleSubmit(submit)} onChange={()=>success&&setSuccess('')}>
 {field('name','Name')}{field('email','Email','email')}
 <FormGroup><Label for="partySize">Party Size</Label><Input type="select" id="partySize" invalid={!!errors.partySize} {...register('partySize')} defaultValue=""><option value="">Select party size</option>{[1,2,3,4,5,6,7,8].map(n=><option value={n} key={n}>{n}</option>)}</Input>{errors.partySize&&<FormFeedback>{errors.partySize.message}</FormFeedback>}</FormGroup>
 {field('date','Date','date',{min:new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,10)})}{field('time','Time','time')}
 <fieldset><legend className="fs-6">Seating Preference</legend>{['Dining Room','Patio','Bar'].map(option=><Label key={option} for={`seat-${option}`}><Input id={`seat-${option}`} type="radio" value={option} {...register('seating')}/>{option}</Label>)}{errors.seating&&<span id="seating-error" role="alert" className="field-error">{errors.seating.message}</span>}</fieldset>
 <FormGroup><Label for="dietaryNotes">Dietary Notes (optional)</Label><Input id="dietaryNotes" type="textarea" rows={2} maxLength={30} invalid={!!errors.dietaryNotes} {...register('dietaryNotes')}/>{errors.dietaryNotes&&<FormFeedback>{errors.dietaryNotes.message}</FormFeedback>}</FormGroup>
 <FormGroup check className="mt-3"><Input id="newsletter" type="checkbox" {...register('newsletter')}/><Label check for="newsletter">Email me restaurant news (optional)</Label></FormGroup>
 <Button color="primary" type="submit" className="mt-3">Request Reservation</Button>
 </Form></CardBody></Card></section></div></main>;
}
