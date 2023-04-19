import {useState} from 'react';
import { Link } from 'react-router-dom';
import {logo,menu,close} from '../assets'

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
  return (
    <div className='flex py-6 justify-between items-center navbar'>
        <img src={logo} alt='Logo' className='w-[70px] h-[70px] mx-10' />
        <span className='font-poppins font-semibold ss:text-2xl text-base text-white'>Wind Turbine Power Prediction</span>
        <ul className='list-none sm:flex hidden justify-end items-center flex-1 text-white'>
            <Link to={"/"} className='flex p-5 hover:scale-105'>Dashboard</Link>
            <Link to={"/predictlocation" }className='flex p-5 hover:scale-105'>Predict Location</Link>
            <Link to={"/predictmanual"} className='flex p-5 hover:scale-105'>Predict Manual</Link>
            <Link to={"/comparelocations"} className='flex p-5 hover:scale-105'>Compare Locations</Link>
        </ul>
        <div className='sm:hidden flex justify-center items-center'>
            <img src={toggle? close : menu} alt='menu' className='w-[28px] h-[28px] object-contain mr-8' onClick={()=>setToggle((prev)=>!prev)} />
            <div className={`${toggle ? 'left-0':'-left-full'} fixed top-0 h-screen w-2/4 bg-gradient-to-tl from-white/10 to-[#2d270e] backdrop-blur-lg z-[15] p-6 md-hidden ease-in-out duration-[400ms] object-contain`}>
                <div className='flex flex-row my-10 justify-center items-center'>
                    <img src={logo} alt='FOSS-CIT Logo' className='w-16 h-16' />
                </div>
                <ul className='list-none flex flex-col justify-center items-center flex-1 text-white'  >
                    <Link to={"/"} className='flex py-5 hover:scale-105' onClick={()=>setToggle((prev)=>!prev)}>Home</Link>
                    <Link to={"/about"} className='flex py-5 hover:scale-105' onClick={()=>setToggle((prev)=>!prev)}>About</Link>
                    <Link to={"/predictlocation" }className='flex py-5 hover:scale-105' onClick={()=>setToggle((prev)=>!prev)}>Predict Location</Link>
                    <Link to={"/predictmanual"} className='flex py-5 hover:scale-105' onClick={()=>setToggle((prev)=>!prev)}>Predict Manual</Link>
                    <Link to={"/comparelocations"} className='flex py-5 hover:scale-105' onClick={()=>setToggle((prev)=>!prev)}>Compare Locations</Link>
                </ul>
                
            </div>
        </div>
    </div>
  )
}

export default Navbar;