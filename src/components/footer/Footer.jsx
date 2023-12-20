import './footer.css';

const Footer = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    return (
        <footer className='footer'>            
            <h2>Flexipro</h2>
            <ul>
                <li>
                    <a href="#contacts-page">Contacts</a>
                </li>
                <li>
                    <a href="#help-page">Help</a>
                </li>
                <li>
                    <a href="#Ts&Cs">Terms and Conditions</a>
                </li>
            </ul>
            <p>FlexyPro-<span>{currentYear}</span></p>
        </footer>
    );
}

export default Footer;
