import React from 'react';
import './in-progress.css';
import OrderComponent from '../../../../components/main/order-component/OrderComponent';
const InProgress = () => {
    return (
        <div className='in-progress'>            
            <OrderComponent content={[]}/>        
            <OrderComponent />    
            <OrderComponent />    
        </div> 
    );
}

export default InProgress;
