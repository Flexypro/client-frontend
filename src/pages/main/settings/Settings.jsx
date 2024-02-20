import React from 'react';
import './settings.css';
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa6";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { MdAppSettingsAlt } from "react-icons/md";
import { useState } from 'react';

const Settings = () => {
    const [emailToggleStates, setEmailToggleStates] = useState({
        uploadedWork: false,
        newMessages: false,
        deadline: false
    });

    const [appToggleStates, setAppToggleStates] = useState({
        uploadedWork: false,
        newMessages: false,
        deadline: false
    });

    const handleEmailToggle = (field) => {
        setEmailToggleStates(prevState => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };

    const handleAppToggle = (field) => {
        setAppToggleStates(prevState => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };
    const iconSize = 23;
    
    return (
        <div className='settings-page'>
            <div className='settings-content'>
                <div className='settings-personal'>
                    <div className='feature-1'>
                        <RiLockPasswordFill size={iconSize}/>
                        <article>Change Password</article>
                        <span>**********</span>
                    </div>
                    <div className='feature-2'>
                        <FaUser size={20}/>
                        <article>Username</article>
                        <span>@joemucia</span>
                    </div>
                    <div className='feature-3'>
                        <RiMoneyDollarCircleLine size={25}/>
                        <article>Payment Option</article>
                        <select className='payment-option'>
                            <option value="paypal">Paypal</option>
                        </select>
                    </div>
                </div>
                <div className='notifications-settings'>
                    <strong className='pref-title'>Notification Preferences</strong>
                    <div className='content'>
                        <div className='pref'>
                            <strong><MdOutlineMarkEmailRead size={iconSize} /> Email Notifications</strong>                            
                            <div>
                                <article>Uploaded Work</article>
                                <input className="input-toggle" type="radio" checked={emailToggleStates.uploadedWork} hidden={true}/>
                                <label className="label-toggle" onClick={() => handleEmailToggle('uploadedWork')}></label>
                            </div>
                            <div>
                                <article>New Messages</article>
                                <input className="input-toggle" type="radio" checked={emailToggleStates.newMessages} hidden={true}/>
                                <label className="label-toggle" onClick={() => handleEmailToggle('newMessages')}></label>
                            </div>
                            <div>
                                <article>Dealine</article>
                                <input className="input-toggle" type="radio" checked={emailToggleStates.deadline} hidden={true}/>
                                <label className="label-toggle" onClick={() => handleEmailToggle('deadline')}></label>
                            </div>
                        </div>
                        <div className='pref'>
                            <strong><MdAppSettingsAlt size={iconSize}/> In App Notifications</strong>
                            <div>
                                <article>Uploaded Work</article>
                                <input className="input-toggle" type="radio" checked={appToggleStates.uploadedWork} hidden={true}/>
                                <label className="label-toggle" onClick={() => handleAppToggle('uploadedWork')}></label>
                            </div>
                            <div>
                                <article>New Messages</article>
                                <input className="input-toggle" type="radio" checked={appToggleStates.newMessages} hidden={true}/>
                                <label className="label-toggle" onClick={() => handleAppToggle('newMessages')}></label>
                            </div>
                            <div>
                                <article>Dealine</article>
                                <input className="input-toggle" type="radio" checked={appToggleStates.deadline} hidden={true}/>
                                <label className="label-toggle" onClick={() => handleAppToggle('deadline')}></label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
