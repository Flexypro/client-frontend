import React from 'react';
import './profile.css';
import { MdTaskAlt } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";
import { MdAccessTime, MdModeEdit } from "react-icons/md";
import { MdOutlineAddTask } from "react-icons/md";
import { useAuthContext } from '../../../providers/AuthProvider';
import { timeAgo } from '../../../utils/helpers/TimeAgo';
import { useOrderContext } from '../../../providers/OrderProvider';
import { MdAdd } from "react-icons/md";

const Profile = () => {
    const { userProfile } = useAuthContext();

    const { ordersCompleted, ordersInProgress } = useOrderContext();

    const iconSize = 25;

    return (
        <div className='profile-main'>
            <div className='profile-info' onClick={()=>navigate('./profile')}>
                <img className='pic' src="https://imgs.search.brave.com/dfllJJpXVV-lm16dI5Uco-HqoZssP1PWLkghlZIMMNQ/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/bWVyY3VyeW5ld3Mu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE5LzA2L0dldHR5/SW1hZ2VzLTExNTg4/NjEyNjIuanBnP3c9/NjIw" alt="profile cover" />
                <div>
                    <article>{userProfile?.username}</article>
                    <article>{userProfile?.email}</article>
                </div>
            </div>
            <div className='prof-summary'>
                <div>
                    <div>
                        <MdTaskAlt size={iconSize}/>
                        <article>Total Tasks</article>
                    </div>
                    <span>{userProfile?.orders_count}</span>
                </div>
                <div>
                    <div>
                        <MdPendingActions size={iconSize} />
                        <article>Pending Tasks</article>
                    </div>
                    <span>{ordersInProgress.length}</span>                   
                </div>
                <div>
                    <div>
                        <MdOutlineAddTask  size={iconSize}/>
                        <article>Completed Tasks</article>
                    </div>
                    <span>{ordersCompleted?.length}</span>
                </div>
                <div>
                    <div>
                        <MdAccessTime size={iconSize}/>
                        <article>Last Login</article>
                    </div>
                    <article className='last-login'>{timeAgo(userProfile?.last_login)}</article>
                </div>
            </div>
            <div className='profile-view'>                
                <div className='helper-info'>
                    <strong>Manage your personal information</strong>
                    <article>
                        This is your Flexypro account
                        <br />
                        To learn more, check the Terms and Conditions or Privacy Policy
                    </article>
                </div>                
                <div className='bio'>
                    <strong style={{display:'flex', gap:'1rem'}}>Bio
                        {
                            userProfile?.bio &&
                            <MdModeEdit style={{cursor:'pointer'}} size={20}/>
                        }
                    </strong>
                    {
                        userProfile?.bio?
                        <article>
                            {userProfile?.bio}
                        </article>:
                        <article style={{color:'orange', display:'flex', gap:'1rem'}}>Set your bio
                        {
                            <MdAdd style={{cursor:'pointer'}} size={iconSize}/>
                        }
                        </article>                        
                    }
                </div>
            </div>
            <button>Save</button>
        </div>
    );
}

export default Profile;
