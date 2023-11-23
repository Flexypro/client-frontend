import React from 'react';
import './dashboard.css';
import InProgress from '../orders/in-progress/InProgress';
import Completed from '../orders/completed/Completed';
import Solved from '../solved/Solved';

import { useState } from 'react';

const Dashboard = () => {
    const [currentPage, setCurrentPage] = useState(0);

    return (
        <div className='dashboard'>
            <div className='actions'>
                <button className={`${(currentPage == 0)?'active-button':''}`} onClick={()=>setCurrentPage(0)}>In Progress</button>
                <button className={`${(currentPage == 1)?'active-button':''}`} onClick={()=>setCurrentPage(1)}>Completed</button>
                <button className={`${(currentPage == 2)?'active-button':''}`} onClick={()=>setCurrentPage(2)}>Solved</button>
            </div>
            <div className='dashboard-content'>
                {(currentPage === 0) && <InProgress />}
                {(currentPage === 1) && <Completed />}
                {(currentPage === 2) && <Solved />}
            </div>
        </div>
    );
}

export default Dashboard;
