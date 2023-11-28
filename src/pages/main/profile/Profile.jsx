import React from 'react';
import './profile.css';
import { MdTaskAlt } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { MdOutlineAddTask } from "react-icons/md";

const Profile = () => {
    const iconSize = 25;
    return (
        <div className='profile-main'>
            <div className='profile-info' onClick={()=>navigate('./profile')}>
                <img className='pic' src="https://imgs.search.brave.com/dfllJJpXVV-lm16dI5Uco-HqoZssP1PWLkghlZIMMNQ/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/bWVyY3VyeW5ld3Mu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE5LzA2L0dldHR5/SW1hZ2VzLTExNTg4/NjEyNjIuanBnP3c9/NjIw" alt="profile cover" />
                <div>
                    <article>Mucia Joe</article>
                    <article>muciajoe@gmail.com</article>
                </div>
            </div>
            <div className='prof-summary'>
                <div>
                    <div>
                        <MdTaskAlt size={iconSize}/>
                        <article>Total Tasks</article>
                    </div>
                    <span>45</span>
                </div>
                <div>
                    <div>
                        <MdPendingActions size={iconSize} />
                        <article>Pending Tasks</article>
                    </div>
                    <span>3</span>                   
                </div>
                <div>
                    <div>
                        <MdOutlineAddTask  size={iconSize}/>
                        <article>Completed Tasks</article>
                    </div>
                    <span>42</span>
                </div>
                <div>
                    <div>
                        <MdAccessTime size={iconSize}/>
                        <article>Last Login</article>
                    </div>
                    <article className='last-login'>12:45 PM</article>
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
                    <strong>Bio</strong>
                    <article>Lorem ipsum isicing elit. Suscipit, sunt aspernatur. Necessitatibus non debitis veritatis consequuntur laboriosam quaerat esse voluptatum, nihil repellendus amet voluptatem? Neque, eum iusto.</article>
                </div>
            </div>
            <button>Save</button>
        </div>
    );
}

export default Profile;
