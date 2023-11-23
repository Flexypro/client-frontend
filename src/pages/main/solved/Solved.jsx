import React from 'react';
import './solved.css';

const Solved = () => {
    return (
        <div className='solved'>
            <div className='order-content'>
                <div>
                    <article>Lorem ipsumt consecttur adipisicing.</article>
                </div>
                <div className='bottom-box'>
                    <div>
                        <article>Design</article>    
                        <span>|</span>         
                        <article>$34.5</article>
                    </div>
                    <div>
                        <article className='deadline'>2 Days</article>
                    </div>
                </div>                
            </div>
            <div className='order-content'>
                <div>
                    <article>Lorem ipst consectetur adipisicing. Lorem, ipsum.</article>
                </div>
                <div className='bottom-box'>
                    <div>
                        <article>Design</article>    
                        <span>|</span>         
                        <article>$34.5</article>
                    </div>
                    <div>
                        <article className='deadline'>2 Days</article>
                    </div>
                </div>                
            </div>
        </div>
    );
}

export default Solved;
