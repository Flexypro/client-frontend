import React from 'react';  
import './body.css';
import Steps from '../../../components/steps/Steps';
import Faq from '../../../components/faq/Faq';

const Body = () => {
    return (
        <div className='body'>
            <div className="search-content">
                <input type="text" placeholder='Search solved essays from our archive...'/>
            </div>
            <div className='common-services'>
                <h2>Common services</h2>
                <div className='common-services-content'>
                    <article>General Writing</article>
                    <article>Programming</article>
                    <article>Accounting</article>
                    <article>Desertetion</article>
                    <article>Essays</article>
                </div>
            </div>
            <div className='body-elements'>
                <div className='body-slogan'>
                    <h1>Get Quality Writing</h1>
                    <article>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. At facilis autem provident?
                    </article>
                    <button className='hire-us'>Hire Us</button>
                </div>
                <img src="https://img.freepik.com/free-vector/studying-concept-illustration_114360-1301.jpg?w=740&t=st=1699562478~exp=1699563078~hmac=f7e370e5ddf75e11e9d7d411932c595f3642961775fad204b6be5a17ed4f9dbe" alt="" />
            </div>
            <h2>Creating your first order?</h2>
            <Steps />
            <div className='promo'>
                <h2>Get a complete paper from as low as <span>$10.00</span></h2>
                <button>Order Now</button>
            </div>
            <div className='call-to-action'>
                <div>
                    <h2>With Flexypro, all your assignments are now doable! <br />
                        Join us for top grades!
                    </h2>
                </div>
                <button>Reach out</button>
            </div> 
            <Faq />

            <br />
            <br />
        </div>
    );
}

export default Body;
