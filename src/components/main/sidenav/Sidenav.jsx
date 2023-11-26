import React from 'react';
import './sidenav.css';
import { IoMdNotificationsOutline, IoMdSettings } from "react-icons/io";
import { MdAdd, MdHelpOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Sidenav = () => {
    
    const iconSize = 25;

    const navigate = useNavigate();

    return (
        <div>
            <div className='top-nav'>
                <h1 style={{cursor:'pointer'}}  onClick={()=>navigate('./')}>Flexypro</h1>
                <div className='search-nav'>
                    <input type="text" placeholder='Search my orders' />
                </div>                
                <div className='add-task' onClick={()=>navigate('./create-task')}>
                    <MdAdd size={iconSize}/>
                    <article>Create a new task</article>
                </div>                
                <div className='profile'>
                <div className="help">
                        <MdHelpOutline size={iconSize}/>
                    </div>
                    <div className='notif-bell' style={{cursor:'pointer'}} onClick={()=>navigate('./notifications')} >
                        <IoMdNotificationsOutline  size={iconSize}/>
                        <div>
                            <article>2</article>
                        </div>
                    </div>                    
                    <div className='settings'>
                        <IoMdSettings onClick={()=>navigate('./settings')} style={{cursor:'pointer'}} size={iconSize}/>
                    </div>
                    <div className='profile-info' onClick={()=>navigate('./profile')}>
                        <article>Mucia Joe</article>
                        <img src="https://imgs.search.brave.com/dfllJJpXVV-lm16dI5Uco-HqoZssP1PWLkghlZIMMNQ/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/bWVyY3VyeW5ld3Mu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE5LzA2L0dldHR5/SW1hZ2VzLTExNTg4/NjEyNjIuanBnP3c9/NjIw" alt="profile cover" />
                    </div>
                </div>
            </div>        
        </div>
    );
}

export default Sidenav;
