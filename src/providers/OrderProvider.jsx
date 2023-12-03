import { useContext } from "react";
import { createContext } from "react";
import { useAuthContext } from "./AuthProvider";
import { useState } from "react";
import { useEffect } from "react";

export const OrderContext = createContext();

export const OrderProvider = (props) => {

    const { userToken } = useAuthContext();
    const [orders, setOrders] = useState([]);
    const [ordersInProgress, setOrdersInProgress] = useState([]);
    const [ordersCompleted, setOrdersCompleted] = useState([]);

    const getAllOrders = async() => {
        const ordersUrl = `${import.meta.env.VITE_API_URL}/orders`
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
    }

    const createOrder = async(e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const category = e.target.category.value;
        const attachment = e.target.attachment.files[0];
        const deadline = new Date(e.target.deadline.value);
        const instructions = e.target.instructions.value;
        const amount = e.target.amount.value;

        const data = new FormData();

        data.append('title', title);
        data.append('category', category);
        data.append('attachment', attachment);
        data.append('deadline', deadline.toISOString());
        data.append('instructions', instructions);
        data.append('amount', amount);

        const ordersUrl = `${import.meta.env.VITE_API_URL}/orders/`
        const createOrder = await fetch(ordersUrl, {
            method:'post',
            headers:{
                'Authorization': `Bearer ${userToken}`
            },
            body: data
        })

        const status = createOrder.status;
        
        if (status===200){
            // navigate('/app')
        }

    }

    useEffect(()=>{
        userToken && getAllOrders()
    },[userToken])

    return <OrderContext.Provider value={{orders, ordersInProgress, ordersCompleted, createOrder}}>
        {props.children}
    </OrderContext.Provider>
}

export function useOrderContext() {
    return useContext(OrderContext);
}