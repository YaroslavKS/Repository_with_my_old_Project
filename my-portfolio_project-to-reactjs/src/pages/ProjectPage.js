import BtnGitHub from "../components/btnGitHub/BtnGitHub";
import { useParams } from "react-router-dom";
import {projects} from "../components/helpers/projectList";

const ProjectPage1 = () => {
    const {id} = useParams();
    const project = projects[id];

    return (
    <main className="section">
        <div className="container">
            <div className="project-details">

            <h1 className="title-1">{project.title}</h1>

            <img src={project.imgBig} alt={project.title} className="project-details__cover"/>

            <div className="project-details__desc">
                <p>Skills: {project.skills}</p>
            </div>

            {project.gitHubLink && (<BtnGitHub link="#!"/>)}
        
        </div>
    </div>
    </main>);
}
 
export default ProjectPage1;