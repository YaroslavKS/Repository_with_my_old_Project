
import Project from "../components/project/Project";
import Header from "./../components/header/Header";
import "./../styles/main.css";
import {projects} from "./../components/helpers/projectList.js";


const Main = () => {
    
    return (
    <>
    <Header/>
    <main className="section">
    <div className="container">
        <h2 className="title-1">Projects</h2>
        <ul className="projects">
            {projects.map((project, index)=>{
                return (
                  <Project 
                      key={index} // індекс не дуже правильно бо він не постійний ідентифікатор елемента в масиві ( якщо видалиш один з елементів то індекс поміняється, краще прописувати окремі id).
                      title={project.title} 
                      img={project.img}
                      index={index}/>    
                );               
            })}
        </ul>
    </div>
</main>
    </>);

}
 
export default Main;