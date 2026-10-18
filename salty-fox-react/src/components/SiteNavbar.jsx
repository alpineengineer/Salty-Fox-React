import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, Nav, NavItem } from 'reactstrap';
export default function SiteNavbar({cartCount}) {
  const [open,setOpen] = useState(false);
  return <Navbar dark expand="md" className="px-3 px-md-5" role="navigation">
    <NavbarBrand tag={Link} to="/" onClick={()=>setOpen(false)}>The Salty Fox</NavbarBrand>
    <NavbarToggler onClick={()=>setOpen(v=>!v)} aria-label="Toggle navigation" aria-expanded={open} />
    <Collapse isOpen={open} navbar><Nav className="ms-auto align-items-md-center gap-md-3" navbar>
      {[['/','Home'],['/menu','Menu'],['/reservations','Reservations'],['/cart',`Cart (${cartCount})`]].map(([to,label])=><NavItem key={to}><NavLink to={to} end={to==='/'} onClick={()=>setOpen(false)} className={({isActive})=>`nav-link ${isActive?'active':''}`}>{label}</NavLink></NavItem>)}
    </Nav></Collapse>
  </Navbar>;
}
