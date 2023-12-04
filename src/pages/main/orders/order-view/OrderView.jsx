import React from 'react';
import './orderview.css';
import { IoMdDownload } from "react-icons/io";
import Chat from '../../../../components/main/chat/Chat';
import { MdModeEdit } from "react-icons/md";
import { useParams } from 'react-router-dom';
import { useOrderContext } from '../../../../providers/OrderProvider';
import { timeAgo } from '../../../../utils/helpers/TimeAgo';
import { MdAdd } from "react-icons/md";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import { useRef } from 'react';

const OrderView = () => {

    const navigate = useNavigate();

    const [refresh, setRefresh] = useState(false);

    const fileInputRef = useRef(null);
    
    const iconSize = 17;

    const {orderId} = useParams();
    const { getOrder, updateInstructions, completeOrder, getAllOrders, uploadAttachment } = useOrderContext();
    const [order, setOrder] = useState();
    // const order = orders.find(order => order.id === orderId);    

    const uploadedAt = timeAgo(order?.solution?.created);

    const [editInstructions, setEditInstructions] = useState(false);
    const [editedInstructions, setEditedInstructions] = useState(order?.instructions);

    const toggleInstructionMode =  () => {
        setEditedInstructions(order?.instructions);
        setEditInstructions(!editInstructions);
    }

    const handleInstructionChange = (e) => {
        setEditedInstructions(e.target.value);
    }

    const updateNewInstructions = () => {        
        updateInstructions(editedInstructions, orderId)        
        .then((status)=>{
            if (status===200){
                order.instructions = editedInstructions
                console.log("Updated order instructions")
            }
        })

        getAllOrders()
        .then(res=>{
            setRefresh(!refresh)
        })

        setEditInstructions(false);
        // setOrder(getOrder(orderId)); 
        
        // useCallback(()=>{
        //     setRefresh((prev)=>prev+1);
        // },[])
    }

    const changeOrderStatus = () => {
        completeOrder(orderId)
        .then((status)=>{
            if (status===200){
                console.log("Order completed")
            }
        })
        getAllOrders()
        .then(res=>{
            setRefresh(!refresh)
        })
    }

    const openFileDialog = () => {
        console.log("Open")
        if(fileInputRef.current){
            fileInputRef.current.click();
        }
    }


    const uploadAttachmentFile = (e) => {
        const attachment = e.target.files[0];
        console.log("Submitted");
        if (attachment) {
            if (attachment.size <= 20 *1024 *1024){
                uploadAttachment(attachment, orderId)
                .then((status)=>{
                    if (status===200){
                        console.log("Attachment updated");
                    }
                })
            }
            else {
                console.log("Select lower size file");
            }
        } else {
            console.log("Select correct file format");
        }
    }

    const downloadFile = () => {
        const link = document.getElementById('solution-file');
        link.download = (order?.solution.solution)
            .substring(order?.solution.solution.lastIndexOf('/')+1);
        link.click();
    }

    useEffect(()=>{
        const order = getOrder(orderId);
        setOrder(order);      
    }, [refresh])

    return (
        <div className='order-view' key={refresh}>
            <div className='order-details'>
                <strong>{order?.title}</strong>            
                <div className='order-elements'>
                    <article>{order?.category}</article>
                    <strong>${order?.amount}</strong>
                    <article className='status'>{order?.status}</article>
                    {
                        order?.status === 'In Progress' && 
                        <button onClick={changeOrderStatus} className='complete-order'>Complete Order</button>
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
                                        <a href={`${order?.solution?.solution}`} id='solution-file' >
                                            {
                                                (order?.solution.solution)
                                                .substring(order?.solution.solution.lastIndexOf('/')+1)                                            
                                            }
                                        </a>
                                        <article>{order?.solution._type}</article>
                                        <IoMdDownload onClick={downloadFile} style={{cursor:'pointer'}} size={iconSize}/>
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
                            order?.status ==='In Progress'?
                            (order?.instructions ? 'Instructions':  ('Add Instructions')):
                            order?.status ==='Completed' && 'Instructions'
                        } 
                        {                        
                        order?.status === 'In Progress' &&  
                        (
                            editInstructions &&(order?.instructions != editedInstructions)?
                            <button onClick={updateNewInstructions}>Submit</button>:
                            <MdModeEdit style={{cursor:'pointer'}} size={iconSize} onClick={toggleInstructionMode}/>
                        )
                        }
                    </strong>
                    {                                                
                        (
                            editInstructions?
                            <div style={{width:'100%'}}>
                                <textarea name="instructions" id="instructions" value={editedInstructions} 
                                    style={{
                                        width:'inherit',
                                        padding:'0.5rem 0', 
                                        outline:'none', 
                                        border:'none'
                                    }}  
                                    rows="10" readOnly={false}  
                                    onChange={handleInstructionChange}                                  
                                />                                
                            </div>:                            
                            (
                                order?.instructions &&
                                <div>                            
                                    <article>                                    
                                        {order?.instructions}
                                    </article>                                                        
                                </div>
                            )
                        )
                    }
                </div>
                <div className='attachments'>
                    <strong>
                        {
                            order?.attachment?'Attachments':'Attachments'
                        }
                        {order?.status ==='In Progress' && <MdAdd onClick={openFileDialog} style={{cursor:'pointer'}} size={20}/>}
                        <input onChange={uploadAttachmentFile} ref={fileInputRef} style={{ display: 'none' }} size={20 * 1024 * 1024} type="file" name="" id="" />
                    </strong>
                    {
                        order?.attachment &&
                        <div>
                            <a href={order?.attachment} target='_blank'>
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
