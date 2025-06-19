import React, { useState } from 'react'
import useWS from './hooks/useWS';

// 서버로 메시지를 보내고 수신하기
function App() {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState('');

  const socket = useWS('/sub/job2', (message)=>append(message.body));

  // 메시지를 출력하고 줄바꾸기
  const append=(msg)=>setMessages(prev=>prev+(msg)+"\n");

  const handleKeyDown=e=> {
    if(e.key==='Enter') {
      socket.current.publish({destination:'/pub/job2', body:value});
      setValue("");
    }
  }

  return (
    <div>
      <h1>웹소켓 초간단 채팅</h1>
      <input value={value} onChange={e=>setValue(e.target.value)} onKeyDown={handleKeyDown} placeholder='엔터 후 입력' />
      <textarea value={messages} readOnly rows={10}></textarea>
    </div>
  )
}

export default App