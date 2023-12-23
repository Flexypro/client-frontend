import React from 'react';
import { useNavigate } from 'react-router-dom'
import gigitise from "../../../../public/gigitise.svg"

const BadToken = () => {
    const navigate = useNavigate();
    return (
        <div className='bad-token'>
            <div className='token-box'>
                <h1>Bad Link</h1>  
                <img className='logo-token' src={gigitise} alt="" />              
                <article>
                    The link you provided does not work
                </article>
                <button className='regenerate-link' onClick={()=>navigate('/reset-password')}>
                    Generate a new link
                </button>
            </div>
        </div>
    );
}

export default BadToken;
