import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { socket } from '../socket';
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

export default function View() {
  const {id} = useParams();
  const url = `http://localhost:3000/books/${id}`;
  const [book, setBook] = useState({});
  const [message, setMessage] = useState('');

  //==========================
  useEffect(() => {
    console.log('111');
    const fetchData = async () => {
      try {
        const result = await fetch(url);
        setBook(await result.json());
      } catch (err) {
        console.error("ERROR", err);
      }
    };
    fetchData();
  },[]);

  useEffect(() => {
    console.log('222');
    socket.on("message", data => {
      // setState((_state) => [..._state, data]);
      console.log('on message!!! YESSSS', data);
    });
    return () => {
      // BAD: this will remove all listeners for the 'foo' event, which may
      // include the ones registered in another component
      socket.off('message');
    }
  }, [message]);

  function testSocket(e) {
    e.preventDefault();
    // socket.on('message', (msg) => {
    console.log('emit')  
    socket.emit('message', 'DDDDDDDDDDDDDD', data => {
      console.log('5555555', data);
    });
      //const div = templateMessage(msg);
      //dialog.insertAdjacentHTML('beforeend', div);
      //message.value = '';
    // });
    setMessage('asd');
    
    
  }

  //============================
  return (
    <>
      <h1>VIEW {id}</h1>
      <p>-------------</p>
      <h1>Title: {book.title}</h1>
      <h1>Description: {book.description}</h1>
      <p>message {message}</p>
      <button onClick={testSocket}>test socket</button>
    </>
  );
}