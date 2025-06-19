import logo from './logo.svg';
import './App.css';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import useWS from './hooks/useWS';
import api from './utils/api';

// 서버로 메시지 보내고 수신하기

function App() {
  const [value, setValue] = useState(''); // input에 들어오는 값 받기 위한 상태
  const [messages, setMessages] = useState(''); // textarea에 출력할거
  const [username, setUsername] = useState('');  // 로그인 아이디

  const socket = useWS('/sub/job2', (message) => append(message.body));

  const append = (msg) => setMessages(prev => prev + (msg) + "\n")  // 출력할 메시지가 오면 셋메시지에 추가해주는거

  const handleKeyDown = e => {  // 엔터 키 잡는 방법 검색하면 나와
    if (e.key === 'Enter') {
      socket.current.publish({ destination: '/pub/job2', body: value });
      setValue("");
    }
  }

  const login = async (id) => {
    const requestForm = { username: id, password: '1234' }

    try {
      console.log(api);
      await api.post('/login', new URLSearchParams(requestForm));
      setUsername(id);

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>웹소켓 초간단 채팅</h1>
      <p>id: {username}</p>
      <input value={value} onChange={e => setValue(e.target.value)} onKeyDown={handleKeyDown} placeholder='입력 후 엔터' /><br /><br />
      <button onClick={() => login('spring')} disabled={username && username != 'spring'}>spring 로그인</button>
      <button onClick={() => login('summer')} disabled={username && username != 'summer'}>summer 로그인</button>
      <button onClick={() => login('winter')} disabled={username && username != 'winter'}>winter 로그인</button>
      <br /><br />
      <textarea value={messages} readOnly style={{ width: "400px" }} rows={10}></textarea> {/* 메시지 여러개 출력해야하니까 textarea. react의 textarea는 글 출력하는거야 */}
    </div>
  );
}


export default App;