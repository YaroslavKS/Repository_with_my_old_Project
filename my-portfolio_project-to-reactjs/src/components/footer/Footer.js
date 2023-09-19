import "./style.css"

import gh from "./../../img/project/icons/GH.svg"
import fb from "./../../img/project/icons/FB.svg"
import li from "./../../img/project/icons/LI.svg"

const Footer = () => {
    return (<footer className="footer">
    <div className="container">
            <div className="footer__wrapper">
                <ul className="social">
                    <li className="social__item"><a href="https://www.facebook.com/jarik.kuchenko"><img src={fb} alt="Link"/></a></li>
                    <li className="social__item"><a href="https://github.com/YaroslavKS"><img src={gh} alt="Link"/></a></li>
                    <li className="social__item"><a href="https://www.linkedin.com/in/%D1%8F%D1%80%D0%BE%D1%81%D0%BB%D0%B0%D0%B2-%D0%BA%D1%83%D1%87%D0%B5%D0%BD%D0%BA%D0%BE-49b496264/"><img src={li} alt="Link"/></a></li>
                </ul>
                <div className="copyright">
                    <p>20♥Front-End♥23.com</p>
                </div>
            </div>
    </div>

            </footer>);
}
 
export default Footer;