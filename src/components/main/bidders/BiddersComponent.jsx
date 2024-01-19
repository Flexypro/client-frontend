import React from 'react';
import './freelancer.css';
import { timeAgo } from '../../../utils/helpers/TimeAgo';
import { useState } from 'react';
import Chat from '../chat/Chat';
import { toast } from 'react-toastify';
import { IoIosChatbubbles, IoIosPerson } from "react-icons/io";

const BiddersComponent = ({orderId, client, bidders, getOrder}) => {
    const [bidder, setBidder] = useState();

    const checkParam = () => {
        const bidderParam = new URLSearchParams(location.search).get('bid');
        if (bidderParam) {
            const bid = bidders?.filter(bid=> bid.id === bidderParam);
            setBidder(bid[0]?.freelancer); 
        } else {
            setBidder();
        }
    }
    useState(()=>{
        checkParam()
        const handlePopState = () => {
            checkParam();
          };
          window.addEventListener('popstate', handlePopState);
      
          return () => {
            window.removeEventListener('popstate', handlePopState);
          };
    }, []);

    const hireFreelancer = async(bidId) => {
        const hireFreelancerUrl = `${import.meta.env.VITE_API_URL}/hire/`
        try {
            const hireFreelancer = await fetch(hireFreelancerUrl, {
                method:'post',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    'bidId':bidId
                })
            })

            if (hireFreelancer.ok) {
                toast.success('Your order was allocated');
                getOrder(orderId)
            } else {
                toast.error('Order not allocated. Try again!')
            }
        } catch (error){
            toast.error('Error occurred, try again')

        } finally {

        }
    }

    const startChat = (bidId) => {
        window.history.pushState({path:`/app/order/${orderId}?bid=${bidId}`}, '', `/app/order/${orderId}?bid=${bidId}`)
        checkParam()
    }

    const iconSize = 25;

    return (
        !bidder ?
        <div className="bid-container">
            <h1 title='Freelancers bidding on your order'>Bidders 
                {
                    bidders.length > 0 &&
                    <span> &nbsp;-&nbsp;
                        {bidders.length}
                    </span>
                }
            </h1>
            <div className='freelancer-container'>
                {
                    bidders.length > 0 ?
                    
                    bidders?.map((bid, key)=>{
                        return (
                            <div>
                                <div className="freelancer">
                                    <IoIosPerson size={80} />
                                    <div className='freelancer-container-left'>
                                        <div className='freelancer-elements'>
                                            <article>{bid.freelancer.user.username}</article>
                                            <article>Bid {timeAgo(bid.created_at)}</article>
                                        </div>
                                        <div className="bid-actions">                                        
                                            <IoIosChatbubbles className='chat-icon' size={iconSize} title='Start chat' onClick={()=>startChat(bid.id)} />
                                            <article>$ {bid.amount}</article>
                                            <button onClick={()=>hireFreelancer(bid.id)}>Hire</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }):
                    <div>
                        <article style={{color:'orange', padding:'1rem 0'}}>No bids placed yet</article>
                    </div>                        
                }
            </div>
        </div>:
        // 'ii'
        <Chat orderId={orderId} client={client} freelancer={bidder} />

    );
}

export default BiddersComponent;
