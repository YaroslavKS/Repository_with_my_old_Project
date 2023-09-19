import "./style.css";
import imgSmallGitHubIcon from "./GH-small.svg"; 

const BtnGitHub = ({link}) => {
    return (

    <a href={link} target="_blank" rel="noreferrer" className="button__outline">

        <img src={imgSmallGitHubIcon} alt=""/>
                    GitHub repo 
        </a>

);
}
 
export default BtnGitHub;