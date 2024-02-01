import React from "react";
import "./navbar.css";
import { IoMdNotificationsOutline, IoMdSettings } from "react-icons/io";
import { MdHelpOutline } from "react-icons/md";
import { useAuthContext } from "../../../providers/AuthProvider";
import { useState } from "react";
import { useOrderContext } from "../../../providers/OrderProvider";
import { useNotificationContext } from "../../../providers/NotificationProvider";
import { useNavigate } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { RiArrowRightSLine } from "react-icons/ri";

const Navbar = () => {
  const navigate = useNavigate();

  const { loadingUserProfile, loadedUserProfile, handleLogOut } =
    useAuthContext();

  const [userProfile, setUserProfile] = useState(loadedUserProfile);

  const { unreadNotif } = useNotificationContext();

  const { orders } = useOrderContext();

  const iconSize = 25;

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const searchOrdersFromQuery = (input) => {
    setSearchQuery(input);

    const filteredSuggestions = orders.filter((order) => {
      return order.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setSuggestions(filteredSuggestions.slice(0, 5));

    // console.log(suggestions)
  };

  const goToOrder = (id) => {
    setSearchQuery("");
    setSuggestions([]);
    navigate(`./order/${id}`);
  };

  return (
    <div className="top-nav">
      <div className="icons">
        <div className="toggle-side">
          <RiArrowRightSLine size={iconSize} />
        </div>
        <div className="search-icon">
          <IoSearchOutline size={iconSize} />
        </div>
      </div>
      <div className="search-nav">
        <input
          value={searchQuery}
          onChange={(e) => searchOrdersFromQuery(e.target.value)}
          type="text"
          placeholder="Search my orders"
        />
        {suggestions.length > 0 && searchQuery && (
          <div className="suggestions">
            {suggestions?.map((suggestedOrder, index) => {
              return (
                <div
                  className="suggested"
                  key={index}
                  onClick={() => goToOrder(suggestedOrder.id)}
                >
                  <article>{suggestedOrder.title}</article>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="profile">
        <article className="logout" onClick={() => handleLogOut()}>
          Logout
        </article>
        <div className="help">
          <MdHelpOutline className="" size={iconSize} />
        </div>
        <div
          className="notif-bell"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("./notifications")}
        >
          <IoMdNotificationsOutline className="notif-icon" size={iconSize} />
          {unreadNotif.length > 0 && (
            <div>
              <article>
                {unreadNotif.length > 9 ? "9+" : unreadNotif.length}
              </article>
            </div>
          )}
        </div>
        <div className="settings">
          <IoMdSettings
            onClick={() => navigate("./settings")}
            style={{ cursor: "pointer" }}
            size={iconSize}
          />
        </div>
        <div className="profile-info" onClick={() => navigate("./profile")}>
          <article
            className={loadingUserProfile ? "username-skeleton" : ""}
            style={{ width: loadingUserProfile ? "3rem" : "" }}
          >
            {userProfile?.username}
          </article>
          {userProfile?.profile_photo ? (
            <img
              style={{
                animation: loadingUserProfile
                  ? `skeleton-loading 1s linear infinite alternate`
                  : "",
              }}
              src={userProfile?.profile_photo}
              alt="profile cover"
            />
          ) : (
            <article
              style={{
                animation: loadingUserProfile
                  ? `skeleton-loading 1s linear infinite alternate`
                  : "",
              }}
              className="img-placeholder"
            >
              {userProfile &&
                `${
                  userProfile?.username?.charAt(0)?.toUpperCase() +
                  userProfile?.username.slice(1).slice(0, 1)
                }`}
            </article>
          )}
        </div>
        <div className="menu-icon">
          <MdOutlineMenu size={iconSize} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
