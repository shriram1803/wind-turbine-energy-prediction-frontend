import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { PredictLocation, PredictManual, CompareLocations, Navbar } from './pages';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="flex flex-col overflow-hidden">
      <div className='w-full z-[10] bg-header'>
        <Navbar/>
      </div>
      
      <div className='flex'>
        <Routes>
          <Route path='/' element={<Dashboard/>} />
          <Route path='/predictlocation' element={<PredictLocation/>}/> 
          <Route path='/predictmanual' element={<PredictManual/>}/> 
          <Route path='/comparelocations' element={<CompareLocations/>}/>           
        </Routes>
      </div>

    </div>
  )
}

export default App
