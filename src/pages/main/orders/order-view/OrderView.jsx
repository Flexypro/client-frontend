import React from 'react';
import './orderview.css';
import { IoMdDownload } from "react-icons/io";
import Chat from '../../../../components/main/chat/Chat';

const OrderView = () => {
    
    const iconSize = 17;

    return (
        <div className='order-view'>
            <div className='order-details'>
                <strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia.</strong>            
                <div className='order-elements'>
                    <article>Programming</article>
                    <strong>$34.5</strong>
                    <article className='status'>Complete</article>
                </div>                
                <div  className='order-soln'>
                    <strong>Uploaded Work</strong>
                    <div className='solutions'>
                        <div>
                            <article>solution1.docx</article>
                            <article>Final</article>
                            <IoMdDownload size={iconSize}/>
                            <article className=''>10:34hrs</article>
                        </div>
                        <div>
                            <article>solution1.docx</article>
                            <article>Final</article>
                            <IoMdDownload size={iconSize}/>
                            <article className=''>10:34hrs</article>
                        </div>
                    </div>
                </div>
                <div className='summary'>
                    <strong>Summary</strong>
                </div>
                <div className="instructions">
                    <strong>Instructions</strong>
                    <div>
                        <article>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam harum atque in facere et dolorum deserunt ab quo beatae impedit! Tenetur nam, optio quaerat cupiditate necessitatibus, eius maxime ratione magnam ducimus nihil impedit iusto odit, sunt blanditiis rem libero? Quidem id perspiciatis earum sit provident quia esse. Earum, exercitationem. Dolor quos, quod, inventore fuga vero eveniet molestias ipsum laborum, distinctio dolore rem eum quasi cum. Eius dolor tenetur explicabo aliquid nobis, iure tempora, deserunt inventore labore laborum fugit.
                        </article>
                    </div>
                </div>
            </div>
            <Chat />
        </div>
    );
}

export default OrderView;
