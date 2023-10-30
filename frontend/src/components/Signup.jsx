import React, { useState } from "react";

export default function Signup() {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  
  async function hendlerSubmit(event) {
    event.preventDefault();
    // console.log('Yes SUBMIT', email, password);
    const url = 'http://localhost:3000/api/users/signup';
    const body = { email, password, firstName, lastName };
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
        // console.log('response STATUSCODE === ', response.statusCode);
        alert(response.message);
      } else {
        console.log('response YES === ', response);
        localStorage.setItem("token", response.access_token);
        alert('Вы зарегистрировались успешно!');
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
          <div>
            <span className="input-span">Имя</span>
            <input 
              className="login-input"
              type="text"
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div>
            <span className="input-span">Фамилия</span>
            <input 
              className="login-input"
              type="text"
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} />
          </div>
          <button style={{ 'width':'250px' }} onClick={hendlerSubmit} type="submit" className="form-button">Зарегистрироваться</button>
        </form>
      </div> 
    </>
  );
}