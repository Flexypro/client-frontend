import React from "react";
import "./dashboard.css";
import { useOrderContext } from "../../../providers/OrderProvider";
import OrderComponent from "../../../components/main/order-component/OrderComponent";
import { HiMiniClipboardDocumentList } from "react-icons/hi2";
import LoadingSkeletonOrder from "../loading/Loading";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { loading, orders } = useOrderContext();
  return loading ? (
    <LoadingSkeletonOrder />
  ) : orders?.length > 0 ? (
    orders?.map((order, index) => {
      return (
        <div className="dashboard">
          <OrderComponent key={index} content={order} />
        </div>
      );
    })
  ) : (
    <div className="create-task-div">
      <div className="child">
        <article>Orders you create will appear here</article>
        <HiMiniClipboardDocumentList size={120} className="placeholder-icon" />
        <article
          className="create-task-helper"
          onClick={() => navigate("./create-task")}
        >
          Create Task
        </article>
      </div>
    </div>
  );
};

export default Dashboard;
