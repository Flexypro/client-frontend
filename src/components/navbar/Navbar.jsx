import './navbar.css';

const Navbar = () => {
    return (
        <nav>
            <div>
                <h1>Flexypro</h1>
            </div>
            <div className='nav-content'>
                <p>
                    Welcome to Flexypro, your ultimate solution hub for assignments across diverse fields like essays, programming, engineering, accounting, dissertations, and more.
                </p>
            </div>    
            <div className='nav-actions'>
                <button>Sign Up</button>
                <button>Login</button>
            </div>    
        </nav>
    );
}

export default Navbar;
