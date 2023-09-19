import "./styles/main.css";

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Main from "./pages/Main";
import Skills from "./pages/Skills";
import Contacts from "./pages/Contacts";
import ProjectPage from "./pages/ProjectPage";
import ScrollToTop from "./utils/scrollToTop";


function App() {
  return (
    <div className="App">

      <Router>

        <Navbar/>
        <ScrollToTop/>
        <Routes>
          <Route path="/Main" element={<Main/>}/>
          <Route path="/project/:id" element={<ProjectPage/>}/>
          <Route path="/Skills" element={<Skills/>}/>
          <Route path="/Contacts" element={<Contacts/>}/>
        </Routes>

        <Footer/>

      </Router>


    </div>
  );
}

export default App;
