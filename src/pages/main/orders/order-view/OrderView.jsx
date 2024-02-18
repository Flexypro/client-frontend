import "./orderview.css";
import { IoMdDownload } from "react-icons/io";
import Chat from "../../../../components/main/chat/Chat";
import { MdModeEdit } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useOrderContext } from "../../../../providers/OrderProvider";
import { timeAgo } from "../../../../utils/helpers/TimeAgo";
import { MdAdd } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";
import { VscFile } from "react-icons/vsc";
import OrderSkeletonLoading from "../../loading/OrderSkeletonLoading";
import PulseLoader from "react-spinners/PulseLoader";
import { useAuthContext } from "../../../../providers/AuthProvider";
import { formatDeadline } from "../../../../utils/helpers/DeadlineFormat";
import { checkDeadline } from "../../../../utils/helpers/DeadlineFormat";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Payment from "../../payment/Payment";
import BiddersComponent from "../../../../components/main/bidders/BiddersComponent";
import { Routes, Route } from "react-router-dom";
import Rating from "../../../../components/main/rating/Rating";
import { MdDelete } from "react-icons/md";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { useAddRating } from "../../../../components/main/modal/Ratings-modal/addRating";
import { useDeleteModal } from "../../../../components/main/modal/Ratings-modal/cancelRating";

const OrderView = () => {
  const ordersUrl = `${import.meta.env.VITE_API_URL}/orders/`;

  const { userToken } = useAuthContext();

  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const iconSize = 20;

  const { orderId } = useParams();

  const {
    loadingAttachemnt,
    updateInstructions,
    getAllOrders,
    completeOrder,
    uploadAttachment,
  } = useOrderContext();

  const {AddRating, setShowAddRatingModal} = useAddRating()
  const {DeleteModal,setShowDeleteModal} = useDeleteModal()

  const [orderContent, setOrderContent] = useState();

  const [loading, setLoading] = useState(true);

  const uploadedAt = timeAgo(orderContent?.solution?.created);

  const deadline = formatDeadline(orderContent?.deadline);

  const deadlinePassed = checkDeadline(orderContent?.deadline);

  const [showBidders, setShowBidders] = useState(false);

  const [editInstructions, setEditInstructions] = useState(false);
  const [editedInstructions, setEditedInstructions] = useState(
    orderContent?.instructions
  );

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const bidderParam = new URLSearchParams(location.search).get("bid");

  const checkChatParam = (bidderParam) => {
    if (bidderParam) {
      return true;
    } else {
      return false;
    }
  };
  const [showChat, setShowChat] = useState(checkChatParam(bidderParam));

  const toggleInstructionMode = () => {
    setEditedInstructions(orderContent?.instructions);
    setEditInstructions(!editInstructions);
  };

  const handleInstructionChange = (e) => {
    setEditedInstructions(e.target.value);
  };

  const updateNewInstructions = () => {
    updateInstructions(editedInstructions, orderId).then((data) => {
      if (data) {
        const updatedOrder = {
          ...orderContent,
          instructions: data.instructions,
        };
        updatedOrder.instructions = data.instructions;
        setOrderContent(updatedOrder);
      }
    });
    setEditInstructions(false);
    // setOrder(getOrder(orderId));

    // useCallback(()=>{
    //     setRefresh((prev)=>prev+1);
    // },[])
  };

  const changeOrderStatus = () => {
    if (orderContent?.solution) {
      // check not paid
      if (!orderContent.paid) {
        setShowPaymentModal(true);
      } else if (orderContent.paid) {
        completeOrder(orderId).then((data) => {
          const updatedOrder = {
            ...orderContent,
            status: data.status,
          };
          orderContent.status = data.status;
          setOrderContent(updatedOrder);
        });
        getAllOrders();
      }
    } else {
      toast.error("The order has no solution");
    }
  };

  const openFileDialog = () => {
    console.log("Opening file dialog");
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const uploadAttachmentFile = (e) => {
    const attachment = e.target.files[0];
    console.log("Submitted");
    if (attachment) {
      if (attachment.size <= 20 * 1024 * 1024) {
        uploadAttachment(attachment, orderId).then((res) => {
          console.log(res);
          const attachmentUrl = res?.attachment;

          const updatedOrder = {
            ...orderContent,
            attachment: attachmentUrl,
          };

          orderContent.attachment = attachmentUrl;

          setOrderContent(updatedOrder);
        });
      } else {
        console.log("Select lower size file");
      }
    } else {
      console.log("Select correct file format");
    }
  };

  const downloadFile = () => {
    const link = document.getElementById("solution-file");
    link.download = (orderContent?.solution.solution).substring(
      orderContent?.solution.solution.lastIndexOf("/") + 1
    );
    link.click();
  };

  const getOrder = async (orderId) => {
    try {
      const getOrderById = await fetch(`${ordersUrl}${orderId}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (getOrderById.ok) {
        const orderDetails = await getOrderById.json();
        setOrderContent(orderDetails);
      } else {
        const status = getOrderById.status;
        if (status === 401) {
          navigate(`/login?order=${orderId}`);
        }
      }
      // return orderDetails;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (orderID) => {
    try {
      const performDelete = await fetch(`${ordersUrl}${orderID}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (performDelete.ok) {
        toast.success("Order deleted successfully");
        getAllOrders();
        navigate("../available");
      } else {
        toast.error("Failed to delete order");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
    }
  };

  useEffect(() => {
    orderId && getOrder(orderId);
  }, [orderId]);

  return (
    <div className="order-view">
      {loading ? (
        <OrderSkeletonLoading />
      ) : (
        orderContent && (
          <>
            <div className="order-details">
            <AddRating />
              <strong style={{ fontWeight: "bold" }}>
                {orderContent?.title}
              </strong>
              <div className="order-elements">
                <article>{orderContent?.category}</article>
                <strong>{!loading && "$" + orderContent?.amount}</strong>
                <article className="status">{orderContent?.status}</article>
                {orderContent.status == "Available" && (
                  <MdDelete
                    title="Delete order"
                    onClick={() => deleteOrder(orderId)}
                    size={iconSize}
                    color="red"
                    style={{ cursor: "pointer" }}
                  />
                )}
                {orderContent?.status === "In Progress" && (
                  <button
                    style={{
                      cursor: !orderContent?.solution && "not-allowed",
                    }}
                    title={
                      !orderContent?.solution &&
                      "Cannot complete order without solution"
                    }
                    onClick={changeOrderStatus}
                    className="complete-order"
                  >
                    Complete Order
                  </button>
                )}
                {!showChat && (bidderParam || orderContent?.freelancer) && (
                  <div
                    title="Click to view chats"
                    className="chat-toggle"
                    onClick={() => setShowChat(true)}
                    style={{
                      padding: "4px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IoChatbubbleEllipsesOutline size={25} />
                  </div>
                )}
                {!bidderParam && orderContent?.status === "Available" && (
                  <div className="bidders-toggle" title="Show bidders">
                    <button
                      className="bidders"
                      onClick={() => setShowBidders(true)}
                    >
                      Bidders
                    </button>
                  </div>
                )}
              </div>
              {orderContent?.status != "Completed" && (
                <div>
                  {deadlinePassed && (
                    <article
                      style={{
                        color: "red",
                      }}
                    >
                      {deadline}
                      <span className="ml-2"> overdue</span>
                    </article>
                  )}
                  {!deadlinePassed && (
                    <article style={{ color: "green" }}>
                      {deadline} Remain
                    </article>
                  )}
                </div>
              )}
              {orderContent?.status === "Completed" &&
                (orderContent?.rating ? (
                  <div className="rating">
                    {
                      <>
                        <article>{orderContent.rating.message}</article>
                        <Rating stars={orderContent?.rating.stars} />
                      </>
                    }
                  </div>
                ) : (
                  <button onClick={() => setShowAddRatingModal(true)} className="rating-btn">Add Rating</button>
                  
                ))}

              {(orderContent.status === "Completed" ||
                orderContent.status === "In Progress") && (
                <div className="order-soln">
                  {orderContent?.solution ? (
                    <>
                      {showPaymentModal && (
                        <>
                          <Payment
                            show={setShowPaymentModal}
                            orderId={orderId}
                            getOrder={getOrder}
                          />
                          <hr
                            style={{
                              width: "100%",
                            }}
                          />
                        </>
                      )}
                      <strong>Uploaded solution</strong>
                      <div className="solutions">
                        {
                          <div>
                            <a
                              href={`${orderContent?.solution?.solution}`}
                              id="solution-file"
                            >
                              {(orderContent?.solution.solution).substring(
                                orderContent?.solution.solution.lastIndexOf(
                                  "/"
                                ) + 1
                              )}
                            </a>
                            <article>{orderContent?.solution._type}</article>
                            <>
                              <IoMdDownload
                                className="download-icon"
                                onClick={downloadFile}
                                style={{ cursor: "pointer" }}
                                size={iconSize}
                              />
                            </>
                            <article className="">{uploadedAt}</article>
                          </div>
                        }
                      </div>
                    </>
                  ) : (
                    <strong style={{ color: "orange" }}>
                      Solution will be uploaded soon
                    </strong>
                  )}
                </div>
              )}
              <div className="instructions">
                <strong>
                  {orderContent?.status === "In Progress" ||
                  orderContent.status === "Available"
                    ? orderContent?.instructions
                      ? "Instructions"
                      : "Add Instructions"
                    : orderContent?.status === "Completed" && "Instructions"}
                  {(orderContent?.status === "In Progress" ||
                    orderContent.status === "Available") &&
                    (editInstructions &&
                    orderContent?.instructions != editedInstructions ? (
                      <button
                        className="submit-instructions"
                        onClick={updateNewInstructions}
                      >
                        Submit
                      </button>
                    ) : (
                      <MdModeEdit
                        className="edit-icon"
                        style={{ cursor: "pointer" }}
                        size={iconSize}
                        onClick={toggleInstructionMode}
                      />
                    ))}
                </strong>
                {editInstructions ? (
                  <div style={{ width: "100%" }}>
                    <textarea
                      placeholder="Tell us about your order!"
                      name="instructions"
                      id="instructions"
                      value={editedInstructions}
                      style={{
                        width: "100%",
                        padding: "0.5rem 0",
                        outline: "none",
                        border: "none",
                        resize: "none",
                        borderRadius: "4px",
                        padding: "0 4px",
                      }}
                      rows={5}
                      readOnly={false}
                      onChange={handleInstructionChange}
                    />
                  </div>
                ) : (
                  orderContent?.instructions && (
                    <div>
                      <article>{orderContent?.instructions}</article>
                    </div>
                  )
                )}
              </div>
              {orderContent?.status === "Completed" &&
              !orderContent?.attachment ? null : (
                <div className="attachments">
                  {orderContent?.attachment && loadingAttachemnt ? (
                    <div style={{ height: "1.5rem" }}>
                      <PulseLoader size={10} color="#7fc2f5" />
                    </div>
                  ) : (
                    <strong style={{ height: "1.5rem" }}>
                      {orderContent?.attachment ? "Attachments" : "Attachments"}
                      {(orderContent?.status === "In Progress" ||
                        orderContent.status === "Available") && (
                        <MdAdd
                          onClick={openFileDialog}
                          style={{ cursor: "pointer" }}
                          size={20}
                        />
                      )}
                      <input
                        onChange={uploadAttachmentFile}
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        size={20 * 1024 * 1024}
                        type="file"
                        name=""
                        id=""
                      />
                    </strong>
                  )}
                  {!orderContent?.attachment &&
                    (orderContent?.status === "In Progress" ||
                      orderContent.status === "Available") && (
                      <div className="upload-div">
                        <article onClick={openFileDialog}>
                          <VscFile className="file-icon" size={iconSize} />
                          Upload an attachment
                          <input
                            onChange={uploadAttachmentFile}
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            size={20 * 1024 * 1024}
                            type="file"
                            name=""
                            id=""
                          />
                        </article>
                      </div>
                    )}
                  {orderContent?.attachment && (
                    <div>
                      <a href={orderContent?.attachment} target="_blank">
                        {(orderContent?.attachment).substring(
                          orderContent?.attachment.lastIndexOf("/") + 1
                        )}
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
            <Routes>
              <Route to="bidders" element={<BiddersComponent />} />
              <Route to="chats" element={<Chat />} />
            </Routes>
            {orderContent.status === "Available" ? (
              <BiddersComponent
                orderId={orderId}
                client={orderContent.client}
                bidders={orderContent.bidders}
                getOrder={getOrder}
                setShowBidders={setShowBidders}
                showBidders={showBidders}
                showChat={showChat}
                setShowChat={setShowChat}
              />
            ) : (
              <Chat
                orderId={orderId}
                client={orderContent.client}
                freelancer={orderContent.freelancer}
                showChat={showChat}
                setShowChat={setShowChat}
              />
            )}
            {/* <Chat orderId={orderId} client={orderContent.client} freelancer={orderContent.freelancer} /> */}
          </>
        )
      )}
    </div>
  );
};

export default OrderView;
