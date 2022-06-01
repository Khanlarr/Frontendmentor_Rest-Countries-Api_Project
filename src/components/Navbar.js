import React from 'react';
import '../App.css';
export default function Navbar() {
  const getBody=()=>{
    document.body.classList.toggle("dark");
    document.querySelectorAll(".countries").forEach((e=>{
      e.classList.toggle("dark");
    })) 
    document.querySelectorAll(".link").forEach((e=>{
      e.classList.toggle("dark");
    })) 
    document.querySelector(".navbar").classList.toggle("dark");
    document.querySelector(".input").classList.toggle("dark");
    document.querySelector("select").classList.toggle("dark");
    document.querySelector("input").classList.toggle("dark");
    document.querySelector(".loading").classList.toggle("dark");
  
  }
  return (
    <div className='navbar'>
      <h2>Where in the world?</h2>
      <div onClick={getBody}>
      <i className="fa-solid fa-moon"></i>
          <p>Dark Mode</p>
      </div>
    </div>
  );
}
