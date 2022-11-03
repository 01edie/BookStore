import React from 'react'
import Navbar from './components/NavBar'
import DataViewDemo from './components/DataViewDemo'
import { useSelector } from 'react-redux'
import CartComponent from './components/CartComponent'


const App = () => {
  const {cartPage} = useSelector((store)=>store.cartPage);
  return (
    <>
    <Navbar/>
    {cartPage?(<DataViewDemo></DataViewDemo>):(<CartComponent/>)}
    
    <footer className='flex align-items-center justify-content-center'><h3>“So many books, so little time.” - Frank Zappa</h3></footer>
    </>
    
  )
}

export default App