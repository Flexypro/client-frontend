import React from 'react';
import './register.css';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { FiUser } from "react-icons/fi";
import { MdLock } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { useAuthContext } from '../../../providers/AuthProvider';
import PulseLoader from "react-spinners/PulseLoader";
// import
const Register = () => {
    const iconSize = 30;
    const passwordRef1 = useRef();
    const passwordRef2 = useRef();

    const { loadingReg, handleRegister, successRegister, registerError} = useAuthContext();

    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [visible, setVisible] = useState(false);

    
    const togglePassword = ()=> {
        setVisible(!visible);
    }    

    return (
        <div className='register'>
            <div className='register-info'>
                <h1>Register with us</h1>
                <img src="https://img.freepik.com/free-vector/studying-concept-illustration_114360-1301.jpg?w=740&t=st=1699562478~exp=1699563078~hmac=f7e370e5ddf75e11e9d7d411932c595f3642961775fad204b6be5a17ed4f9dbe" alt="" />
            </div>
            <div className='register-box'>
                <form onSubmit={handleRegister} className='register-form'>   
                    {

                        registerError && registerError.map((error)=>{ 
                            console.log(error)                               
                            return error.map((e)=>{
                                return <li style={{
                                    color:'orange'
                                }}>
                                    {e}
                                </li>
                            })                                
                        })
                    }                 
                    <div className='register-content'>
                        <FiUser className='username-icon' size={iconSize}/>
                        <input required id='username' type="text" placeholder='Username' />                    
                    </div>
                    <div className='register-content'>
                        <MdOutlineMail className='username-icon' size={iconSize}/>
                        <input required id='email' type="email" placeholder='email' />                    
                    </div>
                    <div className='register-content'>
                        <MdLock className='password-icon' size={iconSize}/>
                        <input required id='password1' ref={passwordRef1} value={password1} onChange={(e)=>setPassword1(e.target.value)} type={visible?"text":"password" } placeholder='Password' />                                                  
                    </div>
                    <div className='register-content'>
                        <MdLock className='password-icon' size={iconSize}/>
                        <input required id='password2' ref={passwordRef2} value={password2} onChange={(e)=>setPassword2(e.target.value)} type={visible?"text":"password" } placeholder='Confirm password' />                                                  
                        {
                            visible?
                            <IoEye onClick={togglePassword} className='password-icon-eye' size={20} />:
                            <IoEyeOff onClick={togglePassword} className='password-icon-eye' size={20} />                                              
                        }
                    </div>
                    <div className='submit-credentials'>                        
                        <button>                            
                             {
                                loadingReg?
                                <PulseLoader color='#fff' size={10}  />:
                                'R E G I S T E R'
                             }                            
                        </button>
                        {/* <button>
                            G O O G L E
                        </button> */}
                    </div>
                    <div className='register-prompt'>
                        <article>Already have an account? 
                            <span>
                                <Link to='/login'> Login</Link>
                            </span>
                        </article>                        
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
