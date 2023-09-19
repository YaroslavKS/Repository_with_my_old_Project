import "./style.css";

const Header = () => {
    return (
    <header className="header">
        <div className="header__wrapper">
            <h1 className="header_title">
                <strong>Hello, my name is <em>Yaroslav</em></strong><br/>
                 a front-end developer 
            </h1>
            <div className="header__txt">
                <p>
                    with passion for learning and creating
                </p>
            </div>
            <a href="./cv-page.html" className="button"><span>Go to CV page</span><i></i></a>
        </div>
    </header>
    );
}
 
export default Header;