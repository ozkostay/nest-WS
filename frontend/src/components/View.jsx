import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { socket } from '../socket';
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");
const url = `http://localhost:3000/books`;

//===============================
export default function View() {
  const {id} = useParams();
  
  const [book, setBook] = useState({});
  const [messages, setMessages] = useState([{ name: 'Konst', message: 'Konst message'}]);

  //==========================
  useEffect(() => {
    console.log('111');
    const fetchData = async () => {
      try {
        const result = await fetch(`${url}/${id}`);
        setBook(await result.json());
      } catch (err) {
        console.error("ERROR", err);
      }
    };
    fetchData();
  },[id]); // без id тоже работает

  //===============================
  useEffect(() => {
    console.log('222');
    const eventName = "srvMessage";
    socket.on( eventName, (data) => {
    console.log('on message!!! YESSSS', data);
      setMessages([...messages, data]);
    });
    return () => {
      socket.off(eventName);
    }
  }, [messages]);

  //===============================
  function testSocket(e) {
    e.preventDefault();
    // socket.on('message', (msg) => {
    console.log('emit')  
    const body= {
      user: 'Vasia',
      message: 'message from Vasia'
    };
    socket.emit('message', body);
      //const div = templateMessage(msg);
      //dialog.insertAdjacentHTML('beforeend', div);
      //message.value = '';
    // });
  }

  //============================
  return (
    <>
      <h1>VIEW {id}</h1>
      <p>-------------</p>
      <h1>Title: {book.title}</h1>
      <h1>Description: {book.description}</h1>
      {messages.map((i,index) => <p>{i.message}</p>)}
      <button onClick={testSocket}>test socket</button>
    </>
  );
}