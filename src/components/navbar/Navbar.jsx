import React from 'react';
import './navbar.css';

const Navbar = () => {
    return (
        <nav>
            <div>
                <h1>Flexypro</h1>
            </div>
            <div className='nav-content'>
                <li>Solved Essays</li>
                <li>Create your Own</li>
                {/* <li></li> */}
            </div>    
            <div className='nav-actions'>
                <button>Sign Up</button>
                <button>Login</button>
            </div>    
        </nav>
    );
}

export default Navbar;
