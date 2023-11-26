import React from 'react';
import './order-creation.css';
import { IoMdArrowForward } from "react-icons/io";

const OrderCreation = () => {
    return (
        <div className='order-creation'>
            <strong>Create a new order</strong>
            <form className='order-creation-details' onSubmit={()=>console.log('Submited')}>
                <div className='order-required-details'>
                    <div>
                        {/* <div> */}
                            <label htmlFor="title">Title</label>
                        {/* </div> */}
                        <input required id='title' type="text" placeholder='Enter the title' />
                    </div>
                    <div>
                        {/* <div> */}
                            <label htmlFor="category">Category</label>
                        {/* </div> */}
                        <select required name="category" id="category">
                            <option value="">Writing</option>
                            <option value="">Programming</option>
                        </select>
                    </div>
                    <div>
                        {/* <div> */}
                            <label htmlFor="file">Upload file</label>   
                        {/* </div> */}
                        <input type="file" accept='' />
                    </div>
                    <div>
                        {/* <div> */}
                            <label htmlFor="deadline">Deadline</label>
                        {/* </div> */}
                        <input required type="datetime-local" id='deadline'/>
                    </div>
                </div>                
                <div className='instructions-box'>
                    <div>
                        <label htmlFor="instructions">Instructions</label>
                    </div>
                    <textarea rows={4} type="text" id='instructions' placeholder='Tell us more about your task'/>
                </div>
                <div className='amount-box'>
                    <div>
                        <label htmlFor="amount">Amount ($)</label>
                    </div>
                    <input type="number" id='amount' placeholder='$' min={1}/>                    
                </div>
                <div>
                    <button type='submit' className='create-task'>Create <IoMdArrowForward size={20}/></button>                    
                </div>                                              
            </form>            
        </div>
    );
}

export default OrderCreation;
