import './App.css';
import { Client } from '@stomp/stompjs';
import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';

// 웹소켓 연결하기
function App() {
  // useState 왜 사용하는 이유 : 일반 변수는 재렌더링될 때마다 새로 만들어진다 (값이 보존되지 않음)
    // 만약 보존되어야하는데 화면에 찍을 필요가 없다면?
  
  // useRef 는 렌더링 하지 않는 상태
  const socket = useRef(null);

  // useRef 도 상태이기에 useEffect를 사용해야함
  useEffect(()=>{
    // STOMP 연결 설정 객체를 생성
    const client = new Client({

      // 서버에 연결한 다음 웹소켓 객체를 리턴하는 함수를 등록
      webSocketFactory:()=>new SockJS("http://localhost:8080/ws"),
      // 서버가 연결되었을 때 실행할 콜백을 등록 (객체로 등록해야함)
      onConnect:()=> {
        client.subscribe("/sub/job1", (message)=>{console.log(message.body)})
      },
    });

    // 실제 연결을 수행
    client.activate();

    // socket 에 저장
    socket.current = client;
  },[])
  return (
    <div>웹소켓 수신 예제</div>
  );
}

export default App;
