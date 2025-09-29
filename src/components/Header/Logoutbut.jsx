import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
function Logoutbtn() {
    const dispatch =useDispatch()
    const handlelogout =()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
    
    }
    return ( <>
  <button
  onClick={handlelogout}
  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
>
  Logout
</button>

    
    </> );
}

export default Logoutbtn;