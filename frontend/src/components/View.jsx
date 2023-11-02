import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { socket } from '../socket';
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");
const url = `http://localhost:3000/books`;

//===============================
export default function View() {
  const { id } = useParams();

  const [book, setBook] = useState({});
  const [messages, setMessages] = useState([]);
  const [comment, setComment] = useState("");

  //==========================
  useEffect(() => {
    console.log("111");
    const fetchData = async () => {
      try {
        const result = await fetch(`${url}/${id}`);
        setBook(await result.json());
      } catch (err) {
        console.error("ERROR", err);
      }
    };
    fetchData();
  }, [id]); // без id тоже работает

  //===============================
  useEffect(() => {
    console.log("222");
    const eventName = "srvMessage";
    socket.on(eventName, (data) => {
      console.log("on message!!! YESSSS", data);
      setMessages([...messages, data]);
    });
    return () => {
      socket.off(eventName);
    };
  }, [messages]);

  //===============================
  function testSocket(e) {
    e.preventDefault();
    // socket.on('message', (msg) => {
    console.log("emit");
    const newId = Date.now();
    const body = {
      id: newId,
      bookId: id,
      comment: comment,
    };
    socket.emit("message", body);
    setComment('');
    //const div = templateMessage(msg);
    //dialog.insertAdjacentHTML('beforeend', div);
    //message.value = '';
    // });
  }

  function deleteComment(id) {
    console.log(id)
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
          <button onClick={testSocket}>Отправить</button>
        </div>
      </div>
    </>
  );
}
