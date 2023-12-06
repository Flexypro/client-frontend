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
    const { loadingUserProfile, loadedUserProfile, submitNewBio, uploadProfilePhoto } = useAuthContext();

    const [userProfile, setUserProfile] = useState(loadedUserProfile);

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
                .then((json)=>{
                    const updateProfile = {
                        ...userProfile,
                        profile_photo: json.profile_photo
                    }

                    userProfile.profile_photo = json.profile_photo;
                    setUserProfile(updateProfile)
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
            .then((response)=>{
                const updatedProfile = {
                    ...userProfile,
                    bio: response.bio
                }
                userProfile.bio = response.bio;
                setUserProfile(updatedProfile);
            })
        }
        setEditBio(false);
    }

    const [initials, setInitials] = useState('')

    const getTwoChars = () => {
        
    }

    const iconSize = 25;

    return (
        <div className='profile-main'>
            <div className='profile-info'>
                {                    
                    userProfile?.profile_photo?
                    <img style={{
                        animation: loadingUserProfile?`skeleton-loading 1s linear infinite alternate`:''
                    }} onClick={openFileDialog} className='pic' src={userProfile?.profile_photo} alt="profile cover" />:
                    <label style={{
                        animation: loadingUserProfile?`skeleton-loading 1s linear infinite alternate`:''
                    }} htmlFor='upload-profile' className='img-placeholder-profile'>{ userProfile &&`${(userProfile?.username?.charAt(0)?.toUpperCase() + userProfile?.username.slice(1).slice(0,1))}`}</label>
                }
                <input id='upload-profile' onChange={updateProfilePhoto} ref={fileInputRef} style={{ display: 'none' }} size={5 * 1024 * 1024} accept='image/*' type="file" />
                <div className='email-username'>
                    <article className={loadingUserProfile?'username-skeleton':''} style={{fontWeight:'bold'}}>{userProfile?.username}</article>
                    <article style={{
                        animation: loadingUserProfile?`skeleton-loading 1s linear infinite alternate`:''
                    }}>{userProfile?.email}</article>
                </div>
            </div>
            <div className='prof-summary'>
                <div>
                    <div>
                        <MdTaskAlt className='react-icon' size={iconSize}/>
                        <article>Total Tasks</article>
                    </div>
                    <span>{userProfile?.orders_count}</span>
                </div>
                <div>
                    <div>
                        <MdPendingActions className='react-icon' size={iconSize} />
                        <article>Pending Tasks</article>
                    </div>
                    <span>{ordersInProgress.length}</span>                   
                </div>
                <div>
                    <div>
                        <MdOutlineAddTask className='react-icon' size={iconSize}/>
                        <article>Completed Tasks</article>
                    </div>
                    <span>{ordersCompleted?.length}</span>
                </div>
                <div>
                    <div>
                        <MdAccessTime className='react-icon' size={iconSize}/>
                        <article>Last Login</article>
                    </div>
                    <article className='last-login'>{userProfile ? timeAgo(userProfile?.last_login):'---'}</article>
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
            <button className='save' onClick={submitEditedProfile} style={{

            }}>Save</button>
        </div>
    );
}

export default Profile;
