const Footer = () : JSX.Element => {
    return (
        <footer className="footer hide-mobile">
            <div className="item">
                <span>Author: Vincent Yang</span>
                <p className="footer-links">
                    <a href="https://vincent-yang.com">Personal Website</a>
                    <span> | </span>
                    <a href="https://github.com/Yangv19">Github</a>
                </p>
            </div>
            <div className="item">    
                <div>
                    <i className="fa fa-phone"></i>
                    <span> 647-636-3461</span>
                </div>
                <div>
                    <i className="fa fa-envelope"></i>
                    <span> v6yang@uwaterloo.ca</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
