import React from 'react';
import './orderview.css';
import { IoMdDownload } from "react-icons/io";
import Chat from '../../../../components/main/chat/Chat';
import { MdModeEdit } from "react-icons/md";
import { useParams } from 'react-router-dom';
import { useOrderContext } from '../../../../providers/OrderProvider';
import { timeAgo } from '../../../../utils/helpers/TimeAgo';
import { MdAdd } from "react-icons/md";

const OrderView = () => {
    
    const iconSize = 17;

    const {orderId} = useParams();
    const { orders } = useOrderContext();

    const order = orders.find(order => order.id === orderId);

    const uploadedAt = timeAgo(order?.solution?.created);

    return (
        <div className='order-view'>
            <div className='order-details'>
                <strong>{order?.title}</strong>            
                <div className='order-elements'>
                    <article>{order?.category}</article>
                    <strong>${order?.amount}</strong>
                    <article className='status'>{order?.status}</article>
                    {
                        order.status === 'In Progress' && 
                        <article className='complete-order'>Complete Order</article>
                    }                    
                </div>                                                  
                    <div  className='order-soln'>
                        {
                        order?.solution?
                        <>
                            <strong>Uploaded Work</strong>
                            <div className='solutions'>
                                {                            
                                    <div>
                                        <a href={`${order?.solution.solution}`}>
                                            {
                                                (order?.solution.solution)
                                                .substring(order?.solution.solution.lastIndexOf('/')+1)                                            
                                            }
                                        </a>
                                        <article>{order?.solution._type}</article>
                                        <IoMdDownload style={{cursor:'pointer'}} size={iconSize}/>
                                        <article className=''>{uploadedAt}</article>
                                    </div>
                                }                        
                            </div>
                        </>:
                            <strong style={{color:'orange'}}>Solution will be uploaded soon</strong>            
                        }
                    </div>                
                {/* <div className='summary'>
                    <strong>Summary</strong>
                </div> */}
                <div className="instructions">
                    <strong>
                        {
                            order?.instructions ? 'Instructions': 'Add Instructions'
                        } 
                        {                        
                        order?.status === 'In Progress' &&  <MdModeEdit style={{cursor:'pointer'}} size={iconSize}/>
                        }
                    </strong>
                    {
                        order?.instructions &&
                        <div>
                            <article>
                                {order?.instructions}
                            </article>
                        </div>
                    }
                </div>
                <div className='attachments'>
                    <strong>
                        {
                            order?.attachment?'Attachments':'Upload Attachments'
                        }
                        <MdAdd style={{cursor:'pointer'}} size={20}/>
                    </strong>
                    {
                        order?.attachment &&
                        <div>
                            <a href={order?.attachment}>
                                {
                                    (order?.attachment)
                                    .substring(order?.attachment.lastIndexOf('/')+1)  
                                }  
                            </a>                          
                        </div>
                    }
                </div>
            </div>
            <Chat />
        </div>
    );
}

export default OrderView;
