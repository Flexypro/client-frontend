import React from "react";
import OrderComponent from "../../../../components/main/order-component/OrderComponent";
// import { useOrderContext } from "../../../../providers/OrderProvider";
import { useNavigate } from "react-router-dom";
// import { HiMiniClipboardDocumentList } from "react-icons/hi2";
import LoadingSkeletonOrder from "../../loading/Loading";
import { useOrderContext } from "../../../../providers/OrderProvider";
import ViewMore from "../../../../components/main/more/ScrollMore";

const Available = () => {
  const { getAvailable, loadingAvailable, ordersAvailable } = useOrderContext();
  const navigate = useNavigate();

  return loadingAvailable ? (
    <LoadingSkeletonOrder />
  ) : ordersAvailable.orders.length > 0 ? (
    <>
      <div className="main-available">
        {ordersAvailable.orders.map((order, index) => {
          return <OrderComponent key={index} content={order} />;
        })}
      </div>
      {ordersAvailable.next && <ViewMore fetch={getAvailable} />}
    </>
  ) : (
    <div className="wrapper-placeholder">
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
    </div>
  );
};

export default Available;
