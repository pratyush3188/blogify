import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {} from '../../store/authSlice'
function Logoutbtn() {
    const dispatch =useDispatch()
    const handlelogout =()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
    
    }
    return ( <>
    <button onClick={handlelogout}>Logout</button>
    
    </> );
}

export default Logoutbtn;