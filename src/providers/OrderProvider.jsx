import { useContext } from "react";
import { createContext } from "react";
import { useAuthContext } from "./AuthProvider";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";

export const OrderContext = createContext();

export const OrderProvider = (props) => {
  const navigate = useNavigate();

  const ordersUrl = `${import.meta.env.VITE_API_URL}/orders/`;

  const { userToken } = useAuthContext();
  const { decodedToken } = useJwt(userToken);

  const [orders, setOrders] = useState([]);
  const [ordersAvailable, setOrdersAvailable] = useState({
    orders: [],
    count: 0,
    next: null,
  });
  const [ordersInProgress, setOrdersInProgress] = useState({
    orders: [],
    count: 0,
    next: null,
  });
  const [ordersCompleted, setOrdersCompleted] = useState({
    orders: [],
    count: 0,
    next: null,
  });
  const [loadingAvailable, setLoadingAvailable] = useState(true);

  const [loadingAttachemnt, setLoadingAttachment] = useState(false);

  const [loadingInProgress, setLoadingInProgress] = useState(true);
  const [loadingCompleted, setLoadingCompleted] = useState(true);

  const [submitLoading, setSubmitLoading] = useState(false);

  const [user, setUser] = useState();
  const [socket, setSocket] = useState(null);

  const headersContent = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userToken}`,
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userToken}`,
  };

  const getAvailable = async (page_number) => {
    try {
      const getAvaialable = await fetch(
        `${ordersUrl}?status=available&page=${page_number}`,
        {
          headers,
        }
      );
      const available = await getAvaialable.json();

      setOrdersAvailable((prev) => ({
        orders: prev.orders.concat(available.results),
        count: available.count,
        next: available.next,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingAvailable(false);
    }
  };

  const getInProgress = async (page_number) => {
    try {
      const getInProgress = await fetch(
        `${ordersUrl}?status=in_progress&page=${page_number}`,
        {
          headers,
        }
      );
      const inProgress = await getInProgress.json();
      setOrdersInProgress((prev) => ({
        orders: prev.orders.concat(inProgress.results),
        count: inProgress.count,
        next: inProgress.next,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingInProgress(false);
    }
  };

  const getCompleted = async (page_number) => {
    try {
      const getCompleted = await fetch(
        `${ordersUrl}?status=completed&page=${page_number}`,
        {
          headers,
        }
      );
      const completed = await getCompleted.json();
      setOrdersCompleted((prev) => ({
        orders: prev.orders.concat(completed.results),
        count: completed.count,
        next: completed.next,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCompleted(false);
    }
  };

  const getAllOrders = async (page_number) => {
    // setLoading(false);
  };

  const createOrder = async (e) => {
    try {
      setSubmitLoading(true);
      e.preventDefault();
      const title = e.target.title?.value;
      const category = e.target.category?.value;
      const deadline = new Date(e.target.deadline?.value);
      const instructions = e.target.instructions?.value;
      const subCategory = e.target.subCategory?.value;
      const milestones = e.target.milestones?.value;
      const pages = e.target.pages?.value;
      const amount = e.target.amount?.value;

      console.log();

      const headers = {
        Authorization: `Bearer ${userToken}`,
      };

      let bodyData;

      if (e.target.attachment.files.length > 0) {
        const attachment = e.target.attachment.files[0];
        const data = new FormData();
        data.append("title", title);
        data.append("category", category);
        data.append("attachment", attachment);
        data.append("deadline", deadline.toISOString());
        data.append("instructions", instructions);
        data.append("subCategory", subCategory);
        data.append("milestones", milestones);
        data.append("pages", pages);
        data.append("amount", amount);

        bodyData = data;
      } else {
        const jsonPayload = {
          title,
          category,
          deadline: deadline.toISOString(),
          instructions,
          amount,
          subcategory: subCategory,
          milestones: milestones,
          page_count: pages,
        };

        bodyData = JSON.stringify(jsonPayload);
        headers["Content-Type"] = "application/json";
      }

      const createOrder = await fetch(ordersUrl, {
        method: "post",
        headers,
        body: bodyData,
      });

      const status = createOrder.status;

      if (status === 201) {
        console.log("navigation");
        getAllOrders().then(() => {
          navigate("./");
        });
        setSubmitLoading(false);
      } else if (status === 401) {
        navigate("/login?redirect=create-task");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const updateInstructions = async (instructions, orderId) => {
    try {
      const updateOrder = await fetch(`${ordersUrl}${orderId}/`, {
        method: "put",
        headers: headersContent,
        body: JSON.stringify({
          instructions: instructions,
        }),
      });

      if (updateOrder.ok) {
        const data = updateOrder.json();
        return data;
      } else {
        const status = updateOrder.status;
        if (status === 401) {
          navigate(`../login?order=${orderId}`);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const uploadAttachment = async (file, orderId) => {
    setLoadingAttachment(true);
    try {
      const data = new FormData();
      data.append("attachment", file);
      const response = await fetch(`${ordersUrl}${orderId}/`, {
        method: "put",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        body: data,
      });

      if (response.ok) {
        const dataRes = await response.json();
        return dataRes;
      } else {
        const status = response.status;
        if (status === 401) {
          console.log("NOT ALLOWED");
          navigate(`../login?order=${orderId}`);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAttachment(false);
    }
  };

  const completeOrder = async (orderId) => {
    try {
      const completeOrderStatus = await fetch(`${ordersUrl}${orderId}/`, {
        method: "put",
        headers: headersContent,
        body: JSON.stringify({
          status: "Completed",
        }),
      });

      if (completeOrderStatus.ok) {
        const data = await completeOrderStatus.json();
        return data;
      } else {
        const status = completeOrderStatus.status;
        if (status === 401) {
          navigate(`../login?order=${orderId}`);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    setUser(decodedToken?.user_id);
    if (user) {
      const newSocket = new WebSocket(`ws://127.0.0.1:8000/ws/order/${user}/`);
      setSocket(newSocket);
      newSocket.onmessage = (event) => {
        const receivedData = JSON.parse(event.data);
        const newOrder = receivedData.message.order;
        setOrders((prev) => {
          const updatedOrders = [newOrder, ...prev];
          const inProgress = updatedOrders.filter(
            (order) => order.status === "In Progress"
          );
          setOrdersInProgress(inProgress);
          return updatedOrders;
        });
      };
      setSocket(newSocket);
    } else {
      socket?.close();
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [decodedToken, user]);

  // const [orderDetails, setOrderDetails] = useState();

  useEffect(() => {
    userToken && getAllOrders();
    if (userToken) {
      getAvailable(1);
      getInProgress(1);
      getCompleted(1);
    }
  }, [userToken]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        ordersAvailable,
        ordersInProgress,
        ordersCompleted,
        loadingAvailable,
        loadingInProgress,
        loadingCompleted,
        submitLoading,
        loadingAttachemnt,
        // getOrder,
        createOrder,
        updateInstructions,
        completeOrder,
        getAvailable,
        getInProgress,
        getCompleted,
        uploadAttachment,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export function useOrderContext() {
  return useContext(OrderContext);
}
