import React from "react";
import OrderComponent from "../../../../components/main/order-component/OrderComponent";
import { useOrderContext } from "../../../../providers/OrderProvider";
import { useNavigate } from "react-router-dom";
import { HiMiniClipboardDocumentList } from "react-icons/hi2";
import LoadingSkeletonOrder from "../../loading/Loading";

const Available = () => {
  const { ordersAvailable, loading } = useOrderContext();

  const navigate = useNavigate();
  return loading ? (
    <LoadingSkeletonOrder />
  ) : ordersAvailable.length > 0 ? (
    ordersAvailable.map((order, index) => {
      return (
        <div className="main-available">
          <OrderComponent key={index} content={order} />
        </div>
      );
    })
  ) : (
    <div className="create-task-div">
      <div className="child">
        <article>All your orders are allocated!</article>
        <button
          className="create-task-helper"
          onClick={() => navigate("../create-task")}
        >
          Create a new task
        </button>
      </div>
    </div>
  );
};

export default Available;
