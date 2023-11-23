import React from 'react';
import './dashboard.css';
import InProgress from '../orders/in-progress/InProgress';
const Dashboard = () => {
    return (
        <div className='dashboard'>
            <div className='actions'>
                <button>In Progress</button>
                <button>Completed</button>
                <button>Cancelled</button>
            </div>
            <div className='dashboard-content'>
                <InProgress />               
            </div>
        </div>
    );
}

export default Dashboard;
