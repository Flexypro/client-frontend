import React from 'react';
import './login.css';
import { useAuthContext } from '../../../providers/AuthProvider';
const Login = () => {
    
    const { handleLogin } = useAuthContext()
    return (
        <div className='login'>
            <form onSubmit={handleLogin} className='login-form'>
                <div>
                    <input required id='username' type="text" placeholder='username' />                    
                </div>
                <div>
                    <input required id='password' type="password" placeholder='password' />                    
                </div>
                <div>
                    <button>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
