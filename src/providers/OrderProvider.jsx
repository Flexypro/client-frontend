import { useContext } from "react";
import { createContext } from "react";
import { useAuthContext } from "./AuthProvider";

export const OrderContext = createContext();

export const OrderProvider = (props) => {

    const { userToken } = useAuthContext();

    const getAllOrders = async() => {
        const ordersUrl = `${import.meta.env.VITE_API_URL}/orders`
        const getOrders = await fetch(ordersUrl, {
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        })

        const orders = await getOrders.json();
        console.log(orders)
    }

    return <OrderContext.Provider value={{getAllOrders}}>
        {props.children}
    </OrderContext.Provider>
}

export function useOrderContext() {
    return useContext(OrderContext);
}