import React from 'react';
import { useNavigate } from 'react-router-dom'
import './token.css';
import gigitise from "../../../../public/gigitise.svg"

const ExpiredToken = () => {
    const navigate = useNavigate();
    return (
        <div className='expired-token'>
            <div className='token-box'>
                <h1>Expired Link</h1>
                <img className='logo-token' src={gigitise} alt="" />              
                <article>
                    The link you provided has been used
                </article>
                <button className='regenerate-link' onClick={()=>navigate('/reset-password')}>
                    Generate a new link
                </button>
            </div>
        </div>
    );
}

export default ExpiredToken;
