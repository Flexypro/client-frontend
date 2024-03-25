import "./support.css";
import { useState, useEffect, useRef } from "react";
import gigitise from "../../../assets/logo/gigitise.svg";
import { timeFormater } from "../../../utils/helpers/TimeFormater";
import { IoSend } from "react-icons/io5";
import { useLayoutEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useOrderContext } from "../../../providers/OrderProvider";

const Support = () => {
  const messageRef = useRef();

  const { closeHelp, help } = useOrderContext();

  const [msg, setMsg] = useState();

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const chatBoxRef = useRef();

  const checkMsg = () => {
    setMsg(messageRef.current.value);

    // const data = JSON.stringify({
    //   message: "typing",
    //   orderId: orderId,
    //   receiver: getReceiver(),
    // });
    // if (socket.OPEN) {
    //   socket.send(data);
    // }
  };
  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  const [isMobile, setIsMobile] = useState(false);

  const submitMessage = (e) => {
    e.preventDefault();
    if (msg) {
      setShowQuickMessages(false);
      //   sendChat(msg, orderId, getReceiver()).then(() => {
      //     setMsg("");
      //   });
    }
  };
  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      setIsKeyboardVisible(true);
    };

    const handleBlur = () => {
      setIsKeyboardVisible(false);
    };

    window.addEventListener("focus", handleFocus, true);
    window.addEventListener("blur", handleBlur, true);

    return () => {
      window.removeEventListener("focus", handleFocus, true);
      window.removeEventListener("blur", handleBlur, true);
    };
  }, []);

  useLayoutEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight * 2;
    }
  }, []);

  const supportChats = [];
  const [showQuickMessages, setShowQuickMessages] = useState(
    !supportChats?.length
  );

  const sendQuickMessage = () => {
    setShowQuickMessages(false);
  };

  return (
    <div
      className={`support ${
        isKeyboardVisible && isMobile ? "minimize" : "maximize"
      } ${isMobile && !help && "close-support"} `}
    >
      <div className="chat-header">
        <div className="left">
          <div className="support-profile">
            <div className="pic">
              <img src={gigitise} alt="Gigitise Logo" />
            </div>
          </div>
          <strong>Gigitise Support Team</strong>
        </div>
        <div>
          <IoCloseOutline
            size={25}
            style={{ cursor: "pointer" }}
            title="Close support chat"
            onClick={closeHelp}
          />
        </div>
      </div>
      <div className="messages-box" id="msg" ref={chatBoxRef}>
        {showQuickMessages && (
          <div className="quick">
            <button
              onClick={sendQuickMessage}
              id="payment"
              className="quick-btn"
            >
              Payment enquiries
            </button>
            <button
              onClick={sendQuickMessage}
              className="quick-btn"
              id="freelancers"
            >
              Hiring freelancers
            </button>
            <button
              onClick={sendQuickMessage}
              className="quick-btn"
              id="general"
            >
              General order enquiries
            </button>
          </div>
        )}
        <div className={true !== true ? "send-message" : "received-message"}>
          <article>This is sample message received</article>
          <div className="time">
            <small className="sent-at">12:45AM</small>
          </div>
        </div>
        <div className={true === true ? "send-message" : "received-message"}>
          <article>This is sample message sent</article>
          <div className="time">
            <small className="sent-at">12:55AM</small>
          </div>
        </div>
      </div>
      <form className="message-reply-box" onSubmit={submitMessage}>
        <textarea
          rows="1"
          id="chat-input"
          required
          type="text"
          value={msg}
          ref={messageRef}
          onChange={checkMsg}
          placeholder="Type your message"
        />
        <IoSend
          title={!msg && "Type a message"}
          size={25}
          type="button"
          className={msg ? "submit-message active" : "submit-message inactive"}
          onClick={submitMessage}
        />
      </form>
    </div>
  );
};

export default Support;
