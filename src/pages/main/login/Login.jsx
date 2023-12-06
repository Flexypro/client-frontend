import React  from 'react';
import './login.css';
import { useAuthContext } from '../../../providers/AuthProvider';
import { IoLogoIonic } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { MdLock } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useState } from 'react';
import PulseLoader from "react-spinners/PulseLoader";

// import { IoMdEye } from "react-icons/md";
// import { IoMdEyeOff } from "react-icons/md";


const Login = () => {
    const iconSize = 30;
    const { handleLogin, loading } = useAuthContext();
    const [visible, setVisible] = useState(false);
    const style = {
        height:'1rem'
    }
    const togglePassword = ()=> {
        setVisible(!visible);
    }

    return (
        <div className='login'>
            <div className='login-box'>
                <IoLogoIonic size={120}/>
                <h1>Flexypro</h1>
                <article>Welcome back!</article>
                <form onSubmit={handleLogin} className='login-form'>                    
                    <div className='login-content'>
                        <FiUser className='username-icon' size={iconSize}/>
                        <input required id='username' type="text" placeholder='Username' />                    
                    </div>
                    <div className='login-content'>
                        <MdLock className='password-icon' size={iconSize}/>
                        <input required id='password' type={visible?"text":"password" } placeholder='Password' />  
                        {
                            visible?
                            <IoEye onClick={togglePassword} className='password-icon-eye' size={20} />:
                            <IoEyeOff onClick={togglePassword} className='password-icon-eye' size={20} />                                              
                        }
                    </div>
                    <div className='submit-credentials'>                        
                        <button>
                            {
                                loading?
                                <PulseLoader color='#fff' size={10}  />:
                                'ENTER'
                            }
                            
                        </button>
                    </div>
                    <div className='register-prompt'>
                        <article>Do not have an account? <span>Register</span></article>
                    </div>
                </form>
            </div>            
        </div>
    );
}

export default Login;
