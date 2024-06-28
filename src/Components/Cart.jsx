
import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
function Cart({ItemsNoInCart}) {
  return (
    <div className='relative  lg:ml-0 '>
        <span className=' absolute w-6 left-3 bottom-5 bg-orange-600 rounded-[50%] text-sm text-white'>{ItemsNoInCart}</span>
        <ShoppingCartIcon fontSize='large'/>
    </div>
  )
}

export default Cart