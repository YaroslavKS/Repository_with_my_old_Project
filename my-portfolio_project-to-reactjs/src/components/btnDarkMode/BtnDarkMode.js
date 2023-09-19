import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./style.css";
import day from "./day.svg";
import night from "./night.svg";
// import { useLocalStorage } from "./../../utils/useLocalStorage";
import detectedDarkMode from "../../utils/detectedDarkMode";


const BtnDarkMode = () => {

     const [darkMode, setDarkMode] = useState ({detectedDarkMode});

    //  const [darkMode, setDarkMode] = useLocalStorage("darkMode", "detectedDarkMode");
    
    const btnRef = useRef (null)

    useEffect(()=>{
        if (darkMode === "dark"){
            document.body.classList.add("dark")
            btnRef.current.classList.add("dark-mode-btn--active")
        }   else {
            document.body.classList.remove("dark")
            btnRef.current.classList.remove("dark-mode-btn--active")
        }
    }, [darkMode]);

    useEffect(()=>{
    window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", (event) => {
            const newColorScheme = event.matches ? "dark" : "light";
            setDarkMode (newColorScheme);
        });
    },[])

    const toggleDarkMode = () => {
        setDarkMode((currentValue) => {
            return currentValue === "light" ? "dark" : "light";
        });
    };

    return (
        <button ref={btnRef} className="dark-mode-btn" onClick={toggleDarkMode}>
        <img src={day} alt="light mode" className="dark-mode-btn_icon"/>
        <img src={night} alt="dark mode" className="dark-mode-btn_icon"/>
        </button>  
    );
}
 
export default BtnDarkMode;