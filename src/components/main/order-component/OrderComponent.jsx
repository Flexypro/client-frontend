import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderComponent = ({ content }) => {
    const navigate = useNavigate();
    return (
        <div className='order-content' onClick={()=>navigate('./order/ID')}>
            <div className='title-box'>
                <article>Lorem ipsum dolor sit amet cosectetur adipisicing.</article>
            </div>
            <div className='bottom-box'>
                <div className='fx-start'>
                    <article>Design</article>    
                    <article>$34.5</article>
                </div>
                <div className='fx-end'>
                    <article className='deadline'>2 Days</article>
                </div>
            </div>                
        </div> 
    );
}

export default OrderComponent;
