import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Protected({element}) {

    const auth=useSelector(state=>state.auth.isAdmin)
    console.log(auth)
    const navigate=useNavigate();
    if(auth ===true)
        {
             return element
        }
        else
        {
           navigate('')
           return null;
        }
        
}

export default Protected