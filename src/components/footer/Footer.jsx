import React from 'react';
import './footer.css';

const Footer = () => {
    return (
        <div className='footer'>            
            <div>
                <h2>Flexipro</h2>
            </div>
            <div>
                <article>About us</article>
                <article>Contacts</article>
                <article>Help</article>
                <article>Terms & Conditions</article>
            </div>
            <div>
                <article>&copy; Flexipro-2023</article>
            </div>
        </div>
    );
}

export default Footer;
