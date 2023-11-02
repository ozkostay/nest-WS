import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const url = "http://localhost:3000/books";
  const navigate = useNavigate();


  //======================================
  function hendlerCreatBook() {
    const newBook = {
      title: title,
      description: desc,
    }
    console.log('newBook', newBook);
    const fetchData = async () => {
      try {
        const options = {};
        options.method = 'POST';
        options.headers = {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        };
        options.body = JSON.stringify(newBook);
        const result = await fetch(`${url}`,options);
        const resBook = await result.json();
        console.log('CREATE RES ', resBook);
      } catch (err) {
        console.error("ERROR", err);
      }
    }
    fetchData();
    navigate('/');
  }
  
  //======================================
  return (
    <>
      <div>
        <span className="create-titles">Title:</span>
        <input className="create-inputs" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
      </div>
      <div>
        <span className="create-titles">Description:</span>
        <input className="create-inputs"type="text" value={desc} onChange={(e) => setDesc(e.target.value)}/>
      </div>
      <button className="create-btn" onClick={hendlerCreatBook}>Создать</button>
    </>
  );
}
