import React from "react";
import "./solved.css";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { toast } from "react-toastify";
// import OrderComponent from '../../../components/main/order-component/OrderComponent';
const Solved = () => {
  const addToWaitList = () => {
    toast.success("We added you to the wait list");
  };
  return (
    <div className="solved">
      <div className="coming-soon">
        <article>Coming soon</article>
        <div>
          <div>
            <IoCloudDownloadOutline size={60} />
          </div>
          <article>
            You will be able to download custom solved essays & assignments
            published by our expert freelancers
          </article>
        </div>
        <button onClick={() => addToWaitList()}>Join Wait List</button>
      </div>
    </div>
  );
};

export default Solved;
