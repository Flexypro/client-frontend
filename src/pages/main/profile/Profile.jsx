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
import { useState } from 'react';
import { useRef } from 'react';

const Profile = () => {
    const { userProfile, submitNewBio, uploadProfilePhoto } = useAuthContext();

    const fileInputRef = useRef(null);

    const { ordersCompleted, ordersInProgress, } = useOrderContext();

    const [editBio, setEditBio] = useState(false);
    const [editedBio, setEditedBio] = useState(userProfile?.bio);

    const toggleEditBio = () => {
        setEditBio(userProfile?.bio);
        setEditBio(!editBio);
    }

    const openFileDialog = () => {
        console.log("Open")
        if(fileInputRef.current){
            fileInputRef.current.click();
        }
    }

    const updateProfilePhoto = (e) => {
        const profilePhoto = e.target.files[0];
        console.log("Submitted");
        
        if (profilePhoto) {
            if (profilePhoto.size <= 5 *1024 *1024){
                uploadProfilePhoto(profilePhoto, userProfile?.id)
                .then((status)=>{
                    if (status===200){
                        console.log("Profile photo updated");
                    }
                })
            }
            else {
                console.log("Select lower resolution image")
            }
        } else {
            console.log("Select correct img format")
        }
    }

    const submitEditedProfile = () => {
        if(userProfile.bio != editedBio){
            submitNewBio(editedBio, (userProfile?.id))
            .then((status)=>{
                if (status === 200){
                    console.log("Profile edited")
                }
            })
        }
        setEditBio(false);
    }

    const iconSize = 25;

    return (
        <div className='profile-main'>
            <div className='profile-info'>
                <img onClick={openFileDialog} className='pic' src={(userProfile?.profile_photo)?userProfile?.profile_photo:"https://imgs.search.brave.com/dfllJJpXVV-lm16dI5Uco-HqoZssP1PWLkghlZIMMNQ/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/bWVyY3VyeW5ld3Mu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE5LzA2L0dldHR5/SW1hZ2VzLTExNTg4/NjEyNjIuanBnP3c9/NjIw"} alt="profile cover" />
                <input onChange={updateProfilePhoto} ref={fileInputRef} style={{ display: 'none' }} size={5 * 1024 * 1024} accept='image/*' type="file" name="" id="" />
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
                            (                                
                                <MdModeEdit onClick={toggleEditBio} style={{cursor:'pointer'}} size={20}/>
                            )
                        }
                    </strong>
                    {
                        editBio ?
                        <textarea name="" id="" rows="4" value={editedBio} onChange={(e)=>setEditedBio(e.target.value)}/>:
                        (
                            userProfile?.bio?
                            <article>
                                {userProfile?.bio}
                            </article>
                            :
                            <article style={{color:'orange', display:'flex', gap:'1rem'}}>Set your bio
                            {
                                <MdAdd onClick={toggleEditBio} style={{cursor:'pointer'}} size={iconSize}/>
                            }
                            </article>  
                        )                      
                    }
                </div>
            </div>
            <button onClick={submitEditedProfile} style={{

            }}>Save</button>
        </div>
    );
}

export default Profile;
