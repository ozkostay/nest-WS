import React, { useEffect, useState } from "react";
import BooksItem from "./booksItem";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [books, setBooks] = useState([]);
  const url = "http://localhost:3000/books";
  const navigate = useNavigate();

  //==========================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(url);
        setBooks(await result.json());
      } catch (err) {
        console.error("ERROR", err);
      }
    };
    fetchData();
  }, []);
  
  //==========================
  async function deleteItem(id) {
    const fetchData = async () => {
      try {
        const options = {};
        options.method = 'DELETE';
        options.headers = {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        };
        const result = await fetch(`${url}/${id}`,options);
        const deletId = await result.json();
        console.log('RES', deletId._id);
        const newBooks = books.filter((i) => i._id !== deletId._id);
        setBooks(newBooks);
      } catch (err) {
        console.error("ERROR", err);
      }
    };
    fetchData();
  }

  //==========================
  function view(id) {
    console.log('VIEW ', id);
    navigate(`/view/${id}`);
    return;
  }

  //==========================
  return (
    <>
      <div>
        <h1>Главная</h1>
        {books.map((item, index) => (
          <BooksItem key={item._id} item={item} index={index} deleteItem={deleteItem} view={view}/>
        ))}
      </div>
    </>
  );
}
