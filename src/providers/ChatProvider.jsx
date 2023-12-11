import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useJwt } from 'react-jwt';
import { useAuthContext } from "./AuthProvider";
import { useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = (props) => {

    const { userToken } = useAuthContext();

    const { decodedToken } = useJwt(userToken);

    const [user, setUser] = useState();

    const [socket, setSocket] = useState(null);

    const [chats, setChats] = useState();

    const [loadingChats, setLoadingChats] = useState(true);
    
    const [typing, setTyping] = useState(false);
    let typingTimer;


    const headers = {
        'Authorization':`Bearer ${userToken}`,
        'Content-Type':'application/json'
    }


    const sendChat = async(msg, orderId) => {
        const chatsUrl = `${import.meta.env.VITE_API_URL}/orders/${orderId}/chats/`
        try {
            const sendChat = await fetch(chatsUrl, {
                method:'post',
                headers,
                body: JSON.stringify({
                    'message':msg
                })
            })

            if (sendChat.ok) {
                const response = await sendChat.json();
                setChats(prev=>{
                    const updatedChats = [...prev, response]
                    setChats(updatedChats);
                    return updatedChats;
                })
                return response;
                // setChats(response);
            } else {

            }
        } catch(error) {
            console.error(error);
        } finally {

        }
    }

    const getChats = async(orderId) => {
        const chatsUrl = `${import.meta.env.VITE_API_URL}/orders/${orderId}/chats`
        try {
            const getOrderChats = await fetch(chatsUrl, {
                headers
    
            })
    
            const chats = await getOrderChats.json();
    
            if (getOrderChats.ok) {
                setChats(chats);            
            } else {
                console.error("Error fetching chats")
            }
        } catch(error){
            console.log(error);
        } finally {
            setLoadingChats(false);
        }

    }

    useEffect(()=>{
        setUser(decodedToken?.user_id)
        if (user) {
            const newSocket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${user}/`);        
            setSocket(newSocket);

            newSocket.onmessage = (event) => {
                const receivedData = JSON.parse(event.data);
                if (receivedData.type==='new_message'){
                    const newChat = receivedData.message.sent_message;
                    setChats(prev=>{
                        const updatedChats = [...prev, newChat]
                        setChats(updatedChats);
                        return updatedChats;
                    })
                } else if (receivedData.type==='typing_status'){
                    setTyping(receivedData.typing);
                    clearTimeout(typingTimer);

                    typingTimer = setTimeout(()=>{
                        setTyping(false);
                    }, 2000)
                }
            }
            setSocket(newSocket);            
        }

        return () => {
            if (socket){
                socket.close();
            }
        }
    }, [user, decodedToken])

    return (
        <ChatContext.Provider value={{loadingChats, chats, socket, typing, getChats, sendChat}}>
            {props.children}
        </ChatContext.Provider>
    )
}

export function useChatContext() {
    return useContext(ChatContext);
}