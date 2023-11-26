import React from 'react';
import './order-creation.css';

const OrderCreation = () => {
    return (
        <div className='order-creation'>
            <strong>Create a new order</strong>
            <div className='order-creation-details'>
                <div className='order-required-details'>
                    <div>
                        {/* <div> */}
                            <label htmlFor="title">Title</label>
                        {/* </div> */}
                        <input id='title' type="text" placeholder='Enter the title' />
                    </div>
                    <div>
                        {/* <div> */}
                            <label htmlFor="category">Category</label>
                        {/* </div> */}
                        <select name="category" id="category">
                            <option value="">Writing</option>
                            <option value="">Programming</option>
                        </select>
                    </div>
                    <div>
                        {/* <div> */}
                            <label htmlFor="file">Upload file</label>   
                        {/* </div> */}
                        <input type="file" />
                    </div>
                    <div>
                        {/* <div> */}
                            <label htmlFor="deadline">Deadline</label>
                        {/* </div> */}
                        <input type="date" id='deadline'/>
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
            </div>
            <div>
                <button className='create-task'>Create</button>
            </div>
        </div>
    );
}

export default OrderCreation;
