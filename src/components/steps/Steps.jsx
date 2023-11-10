import React from 'react';
import './steps.css';

const Steps = () => {
    return (
        <div className='steps'>
            <div>
                <strong>Identify your service</strong>
                <article>
                    Create a task with your custom specification
                </article>
            </div>
            <div>
                <strong>Hire us to work on it</strong>
                <article>
                    Submit your task to our competent freelancer workers
                </article>
            </div>
            <div>
                <strong>Pay when you are happy</strong>
                <article>
                    Release your payment when the work is completed and you're satisfied
                </article>
            </div>            
        </div>
    );
}

export default Steps;
