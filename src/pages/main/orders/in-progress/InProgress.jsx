import React from 'react';
import './in-progress.css';
import OrderComponent from '../../../../components/main/order-component/OrderComponent';
import { useOrderContext } from '../../../../providers/OrderProvider';
import { useNavigate } from 'react-router-dom';
import { HiMiniClipboardDocumentList } from "react-icons/hi2";
import LoadingSkeletonOrder from '../../loading/Loading';
const InProgress = () => {

    const {ordersInProgress, loading} = useOrderContext();

    const navigate = useNavigate();

    return (
        loading?
        <LoadingSkeletonOrder />:
        <div className='main-in-progress' style={{
            gridTemplateColumns: (!(ordersInProgress?.length > 0))?'repeat(1, 100%)':''
        }}>             
            {
                loading ?
                
                <div className="anim-box">
                    <div className="skeleton-box">
                        <div className="skeleton-article"></div>
                        <div className="skeleton-article"></div>
                        <div className="skeleton-article"></div>
                        <div className="skeleton-article"></div>                        
                    </div>                    
                    <div className="skeleton-box">
                        <div className="skeleton-article"></div>
                        <div className="skeleton-article"></div>
                        <div className="skeleton-article"></div>
                        <div className="skeleton-article"></div>                        
                    </div>                      
                </div>:
                (ordersInProgress.length > 0)?
                ordersInProgress.map((order, index)=>{
                    return (
                        // <div className='in-progress'>
                            <OrderComponent key={index} content={order}/>
                        // </div>                        
                    )
                }):
                <div className='create-task-div'>
                    <div className='child'>
                        <article>Orders you create will appear here</article>
                        <HiMiniClipboardDocumentList size={120} className='placeholder-icon' />
                        <article className='create-task-helper' onClick={()=>navigate('create-task')}>Create Task</article>
                    </div>
                </div>
            }
        </div>           
            
    );
}

export default InProgress;
