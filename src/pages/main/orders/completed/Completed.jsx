import React from "react";
import "./completed.css";
import OrderComponent from "../../../../components/main/order-component/OrderComponent";
import { useOrderContext } from "../../../../providers/OrderProvider";
import { HiMiniClipboardDocumentList } from "react-icons/hi2";
import LoadingSkeletonOrder from "../../loading/Loading";
import { useNavigate } from "react-router-dom";

const Completed = () => {
  const navigate = useNavigate();

  const { ordersCompleted, loading } = useOrderContext();

  return loading ? (
    <LoadingSkeletonOrder />
  ) : ordersCompleted.length > 0 ? (
    ordersCompleted.map((order, index) => {
      return (
        <div className="completed">
          <OrderComponent content={order} key={index} />
        </div>
      );
    })
  ) : (
    <div className="wrapper-placeholder">
      <div className="create-task-div">
        <div className="child">
          <article>Find orders you complete here</article>
          <HiMiniClipboardDocumentList size={120} className="placeholder-icon" />
          <button className="go-to-order" onClick={() => navigate("/app")}>
            Go to Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default Completed;
