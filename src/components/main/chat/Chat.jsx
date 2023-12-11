import React from 'react';
import './chat.css';
import { IoSend } from "react-icons/io5";
import { useEffect } from 'react';
import { useChatContext } from '../../../providers/ChatProvider';
import { useAuthContext } from '../../../providers/AuthProvider';
import { timeFormater } from '../../../utils/helpers/TimeFormater';
import { IoChatbubblesSharp } from "react-icons/io5";
import { useRef } from 'react';
import { useState } from 'react';
import { useLayoutEffect } from 'react';

const Chat = ({orderId}) => {

    const { loadedUserProfile } = useAuthContext();
    const { loadingChats, chats, getChats, sendChat, socket, typing } = useChatContext();


    const messageRef = useRef();     
    const [msg, setMsg] = useState();

    const chatBoxRef = useRef();

    const checkMsg = () =>{
        setMsg(messageRef.current.value);
        const data = JSON.stringify({
            'message':'typing',
            'receiver': chats[0].sender.username === loadedUserProfile.username ? chats[0].receiver.username:chats[0].sender.username
        });
        if (socket.OPEN){
            socket.send(data);
        }
    }

    useLayoutEffect(()=>{
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight*2;
        } 
    }, [chats])

    const submitMessage = (e) => {
        e.preventDefault();
        sendChat(msg, orderId)
        .then(()=>{
            setMsg('');                                   
        })
    }    

    useEffect(()=>{
        orderId && getChats(orderId)
    }, [orderId, loadedUserProfile])

    return (
        <div className='chat'>
            <div className="chat-header">
                <div className="receiver-profile">
                    {/* <img src="" alt="profile cover" /> */}
                    <article>Julie Anna</article>      
                    {
                        typing && <article>&nbsp; Typing...</article>
                    }              
                </div>                                
            </div>
            {
                (chats?.length > 0)?
                <div className="messages-box" id='msg' ref={chatBoxRef}>
                    {
                        chats?.map((msg, index)=>{
                            return (
                                <>
                                    <div key={index} className= {                            
                                            msg.sender?.username === loadedUserProfile?.username ? 'send-message': "received-message"}
                                        >
                                        <article>
                                            {msg.message}                           
                                        </article>
                                        <div className='time'>
                                            <small className='sent-at'>
                                                {timeFormater(msg.timestamp)}
                                            </small>
                                        </div>
                                    </div>                                
                                </>
                            )
                        })
                    }                                               
                </div>:
                <div className='empty-inbox'>
                    <IoChatbubblesSharp className='chat-icon' size={50}/>
                    <article>Start chat</article>
                </div>
            }            
            <form className='message-reply-box' onSubmit={submitMessage}>
                <input required type="text" value={msg} ref={messageRef} onChange={checkMsg} placeholder='Type your message' />                
                <IoSend size={25} type='submit' className={ msg?'submit-message active':'submit-message inactive' }/>
            </form>
        </div>
    );
}

export default Chat;
