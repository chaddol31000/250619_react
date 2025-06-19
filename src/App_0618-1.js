import './App.css';
import { Client } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';

// 1. 증가버튼을 상태가 변경된다 → 재렌더링 발생
// 2. 메모리에 재렌더링한 다음 현재 DOM 에 출력된 화면과 비교해 변경된 부분만 부분 갱신 → 리액트가 vue 가 강조하는 장점 (빠르다)
// 3. 이 와중에 상태가 아닌 일반 변수들은 다시 초기화가 발생
// 4. 웹소켓을 일반 변수로 만들면 갱신할 때마다 소켓을 다시 연결함
  // 서버는 연결이 끊어진 웹소켓을 계속 유지 → 귀중한 연결이 낭비된다
  // 그래서 상태 변수로 만들어야함

function App() {
  let socket = null;
  const [value, setValue] = useState(1);

  socket = new Client({
    // ws 는 http 가 아니다. ws://localhost:8080 으로 접속해야한다
    // http 에 대해 https 가 있는 것처럼 ws 에 대해서는 wss 가 있다
    // sockJS 는 ws 가 미지원 되는 경우에도 ws 에뮬레이션 해준다 → ws 가 아닌 http 접속
    webSocketFactory:()=>new SockJS('http://localhost:8080/ws'),
    onConnect:()=> {
      console.log("===서버 연결===");
      socket.subscribe('/sub/job1', (message)=>{console.log(message.body)})
    }
  });
  socket.activate();

  return (
    <div>
      {value} <button onClick={()=>setValue(prev=>prev+1)}>증가</button>
    </div>
  )
}

export default App;
