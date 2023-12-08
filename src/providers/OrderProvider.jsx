import { useContext } from "react";
import { createContext } from "react";
import { useAuthContext } from "./AuthProvider";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export const OrderContext = createContext();

export const OrderProvider = (props) => {

    const navigate = useNavigate();

    const ordersUrl = `${import.meta.env.VITE_API_URL}/orders/`

    const { userToken } = useAuthContext();
    const [orders, setOrders] = useState([]);
    const [ordersInProgress, setOrdersInProgress] = useState([]);
    const [ordersCompleted, setOrdersCompleted] = useState([]);

    const [loadingAttachemnt, setLoadingAttachment] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);

    const headersContent = {
        'Content-Type':'application/json',
        'Authorization':`Bearer ${userToken}`                
    }

    const getAllOrders = async() => {
        const ordersUrl = `${import.meta.env.VITE_API_URL}/orders`
        console.log("Getting orders...")
        try {
            const getOrders = await fetch(ordersUrl, {
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${userToken}`
                }
            })

            const orders = await getOrders.json();
            const inProgress = orders.filter(order=>order.status==='In Progress');
            const completed = orders.filter(order=>order.status==='Completed');

            setOrdersInProgress(inProgress);
            setOrdersCompleted(completed);
            setOrders(orders);

            return orders
        } catch (errors) {
            console.error(errors);
        } finally {
            setLoading(false);
        }        
    }
    
    const createOrder = async(e) => {
        try {
            setSubmitLoading(true);
            e.preventDefault();
            const title = e.target.title.value;
            const category = e.target.category.value;
            const deadline = new Date(e.target.deadline.value);
            const instructions = e.target.instructions.value;
            const amount = e.target.amount.value;

            const headers = {            
                'Authorization': `Bearer ${userToken}`,                                        
            }

            let bodyData;

            if (e.target.attachment.files.length > 0) {
                const attachment = e.target.attachment.files[0];
                const data = new FormData();
                data.append('title', title);
                data.append('category', category);
                data.append('attachment', attachment);
                data.append('deadline', deadline.toISOString());
                data.append('instructions', instructions);
                data.append('amount', amount);

                bodyData = data;
            } else {
                const jsonPayload = {
                    title,
                    category,
                    deadline: deadline.toISOString(),
                    instructions,
                    amount
                }

                bodyData = JSON.stringify(jsonPayload);
                headers['Content-Type'] = 'application/json'
            }

            const createOrder = await fetch(ordersUrl, {
                method:'post',
                headers,
                body: bodyData
            })

            const status = createOrder.status;

            console.log(status)
            
            if (status===201){
                console.log('navigation')
                getAllOrders()
                .then(()=>{
                    navigate('./app')
                })            
                setSubmitLoading(false)
            }
        } catch(error){
            console.error(error);
        } finally {
            setSubmitLoading(false);
        }
    }

    const updateInstructions = async(instructions, orderId) => {
        try {
            const updateOrder = await fetch(`${ordersUrl}${orderId}/`, {
                method:'put',
                headers:headersContent,
                body: JSON.stringify({
                    "instructions":instructions
                })
            })
    
            const data = updateOrder.json();        
    
            return data;
        } catch (error) {
            console.log(error);
        } finally {}
    }

    const uploadAttachment = async(file, orderId) => {
        setLoadingAttachment(true);
        try {
            const data = new FormData();
            data.append('attachment', file);
            const response = await fetch(`${ordersUrl}${orderId}/`, {
                method:'put',
                headers:{
                    'Authorization':`Bearer ${userToken}`
                },
                body:data
            })

            const status = response.status;

            const dataRes = await response.json();

            return (dataRes)
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingAttachment(false);
        }
    }

    const completeOrder = async(orderId) => {
        try {
            const completeOrderStatus = await fetch(`${ordersUrl}${orderId}/`, {
                method:'put',
                headers:headersContent,
                body: JSON.stringify({
                    "status":'Completed'
                })
            })
    
            // const status = completeOrderStatus.status;
    
            const data = await completeOrderStatus.json();
            return data;
        } catch (error) {
            console.log(error)
        } finally {}
    }

    // const [orderDetails, setOrderDetails] = useState();

    useEffect(()=>{
        userToken && getAllOrders();
    },[userToken]);

    return <OrderContext.Provider value={{
        orders, 
        ordersInProgress, 
        ordersCompleted, 
        loading,
        submitLoading,
        loadingAttachemnt,
        // getOrder,
        createOrder,
        updateInstructions,
        completeOrder,
        getAllOrders,
        uploadAttachment,      
    }}>
        {props.children}
    </OrderContext.Provider>
}

export function useOrderContext() {
    return useContext(OrderContext);
}