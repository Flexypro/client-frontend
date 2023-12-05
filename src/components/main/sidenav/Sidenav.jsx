import React from 'react';
import './sidenav.css';
import { IoMdNotificationsOutline, IoMdSettings } from "react-icons/io";
import { MdAdd, MdHelpOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../../../providers/AuthProvider';
import { useState } from 'react';
import { useOrderContext } from '../../../providers/OrderProvider';

const Sidenav = () => {

    const { userProfile, handleLogOut } = useAuthContext();

    const { orders } = useOrderContext();

    const iconSize = 25;

    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const searchOrdersFromQuery = (input) => {
        setSearchQuery(input);

        const filteredSuggestions = orders.filter((order)=>{
            return order.title.toLowerCase().includes(searchQuery.toLowerCase())
        })

        setSuggestions(filteredSuggestions.slice(0,5));

        // console.log(suggestions)
    }

    const goToOrder = (id) => {
        setSearchQuery('');
        setSuggestions([]);
        navigate(`./order/${id}`);
    }

    return (
        <div>
            <div className='top-nav'>
                <h1 style={{cursor:'pointer'}}  onClick={()=>navigate('./')}>Flexypro</h1>
                <div className='search-nav'>
                    <input value={searchQuery} onChange={(e)=>searchOrdersFromQuery(e.target.value)} type="text" placeholder='Search my orders' />
                    {
                        (suggestions.length > 0 && searchQuery) && 
                        <div className='suggestions'>
                            {
                                suggestions?.map((suggestedOrder, index)=>{
                                    return(
                                        <div className='suggested' key={index} onClick={()=>goToOrder(suggestedOrder.id)}>
                                            <article>{suggestedOrder.title}</article>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                </div>                
                <div className='add-task' onClick={()=>navigate('./create-task')}>
                    <MdAdd size={iconSize}/>
                    <article>Create a new task</article>
                </div>                               
                <div className='profile'>
                    <article className='logout' onClick={()=>handleLogOut()}>
                        Logout
                    </article> 
                    <div className="help">
                        <MdHelpOutline className='' size={iconSize}/>
                    </div>
                    <div className='notif-bell' style={{cursor:'pointer'}} onClick={()=>navigate('./notifications')} >
                        <IoMdNotificationsOutline className='notif-icon'  size={iconSize}/>
                        {
                            userProfile?.unread_notifications > 0 &&
                            <div>
                                <article>{userProfile?.unread_notifications}</article>
                            </div>
                        }
                    </div>                    
                    <div className='settings'>
                        <IoMdSettings onClick={()=>navigate('./settings')} style={{cursor:'pointer'}} size={iconSize}/>
                    </div>
                    <div className='profile-info' onClick={()=>navigate('./profile')}>
                        <article>{userProfile?.username}</article>
                        <img src="https://imgs.search.brave.com/dfllJJpXVV-lm16dI5Uco-HqoZssP1PWLkghlZIMMNQ/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/bWVyY3VyeW5ld3Mu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE5LzA2L0dldHR5/SW1hZ2VzLTExNTg4/NjEyNjIuanBnP3c9/NjIw" alt="profile cover" />
                    </div>
                </div>
            </div>        
        </div>
    );
}

export default Sidenav;
