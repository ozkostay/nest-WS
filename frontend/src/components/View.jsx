import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { socket } from '../socket';
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");
const url = `http://localhost:3000/books`;
const urlComments = `http://localhost:3000/comments`;

//===============================
export default function View() {
  const { id } = useParams();

  const [book, setBook] = useState({});
  const [messages, setMessages] = useState([]);
  const [comment, setComment] = useState("");

  //=== Выборка книги ============================
  useEffect(() => {
    console.log("111");
    const fetchBook = async () => {
      try {
        const result = await fetch(`${url}/${id}`);
        setBook(await result.json());
      } catch (err) {
        console.error("ERROR", err);
      }
    };
    fetchBook();
  }, [id]); // без id тоже работает

  //=== Выборка комментов ============================
  useEffect(() => {
    console.log("222");
    const fetchComments = async () => {
      try {
        const result = await fetch(`${urlComments}/${id}`);
        // setBook(await result.json());
        setMessages(await result.json());
      } catch (err) {
        console.error("ERROR", err);
      }
    };
    fetchComments();
  }, [id]);
  
  //===============================
  useEffect(() => {
    console.log("333");
    const eventName = "srvMessage";
    socket.on(eventName, (data) => {
      console.log("on message!!! YESSSS", data);
      if (data.bookId === id) {
        setMessages([...messages, data]);
      }
      
    });
    return () => {
      socket.off(eventName);
    };
  }, [messages, id]);

  //===== Новый коммент ==========================
  function createComment(e) {
    e.preventDefault();
    // socket.on('message', (msg) => {
    console.log("emit");
    const newId = Date.now();
    const newComment = {
      id: newId,
      bookId: id,
      comment: comment,
    };
    const fetchData = async () => {
      try {
        const options = {};
        options.method = 'POST';
        options.headers = {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        };
        options.body = JSON.stringify(newComment);
        const result = await fetch(`${urlComments}`,options);
        const resComment = await result.json();
        console.log('CREATE COMMENT RES ', resComment);
        socket.emit("message", newComment);
        setComment('');
      } catch (err) {
        console.error("ERROR", err);
      }
    }
    fetchData();
  }

  //=== Удаляем комментарий ===============
  function deleteComment(id) {
    console.log(id)

    const fetchDelete = async () => {
      try {
        const options = {};
        options.method = 'DELETE';
        options.headers = {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        };
        // options.body = JSON.stringify(newComment);
        const result = await fetch(`${urlComments}/${id}`,options);
        const resComment = await result.json();
        console.log('DELETE COMMENT RES ', resComment);
        // socket.emit("message", newComment);
        // setComment('');
      } catch (err) {
        console.error("ERROR", err);
      }
    }
    fetchDelete();

    const newMessages = messages.filter((i) => i.id !== id);
    console.log('newMessages', newMessages)
    setMessages(newMessages);
  }

  //============================
  return (
    <>
      <div className="wrapper bb">
        <div className="book bb">
          <span className="book-title">{book.title}</span>
          <span className="book-desc">{book.description}</span>
        </div>
        <span className="comments-title">Комментарии:</span>
        {messages.map((item, index) => (
          <div className="wrap-comment" key={item.id}>
            <div className="comment" >
              {item.comment}
            </div>
            <button className="commentDelBtn" onClick={() => deleteComment(item.id)}>X</button>
          </div>
        ))}

        <div className="comments-form">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></input>
          <button onClick={createComment}>Отправить</button>
        </div>
      </div>
    </>
  );
}
