import React from 'react';
import './body.css';

const Body = () => {
    return (
        <div className='body'>
            <div className="search-content">
                <input type="text" placeholder='Search solved essays from our archive...'/>
            </div>
            <div className='body-elements'>
                <div className='body-slogan'>
                    <h1>Get Quality Writing</h1>
                    <article>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. At facilis autem provident?
                    </article>
                </div>
                <div className='anchor-image'>
                    <img src="https://img.freepik.com/free-vector/studying-concept-illustration_114360-1301.jpg?w=740&t=st=1699562478~exp=1699563078~hmac=f7e370e5ddf75e11e9d7d411932c595f3642961775fad204b6be5a17ed4f9dbe" alt="" />
                </div>
            </div>
        </div>
    );
}

export default Body;
