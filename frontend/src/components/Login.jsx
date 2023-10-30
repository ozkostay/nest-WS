import React, { useState } from "react";

export default function Login() {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  
  async function hendlerSubmit(event) {
    event.preventDefault();
    // console.log('Yes SUBMIT', email, password);
    const url = 'http://localhost:3000/api/users/signin';
    const body = { email, password };
    // console.log('===BODY ===',body);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body),
    }; 
    try {
      const data = await fetch(url, options);
      const response = await data.json();
      if (response.statusCode) {
        console.log('response STATUSCODE === ', response.statusCode);
        alert('Ошибка авторизации!!!');
      } else {
        console.log('response YES === ', response);
        localStorage.setItem("token", response.access_token);
        alert('Успешная авторизация!!!');
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="home bb">
        <form>
          <div className="pol">
            <span className="input-span">email</span>
            <input 
              className="login-input" 
              type="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <span className="input-span">Пароль</span>
            <input 
              className="login-input"
              type="text"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button onClick={hendlerSubmit} type="submit" className="form-button">Войти</button>
        </form>
      </div> 
    </>
  );
}