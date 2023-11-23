import React from 'react';

const Cancelled = () => {
    return (
        <div className='cancelled'>
            <div className='order-content'>
                <div>
                    <article>Lorem ipsum dolor sit amet consectetur adipisicing.</article>
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

export default Cancelled;