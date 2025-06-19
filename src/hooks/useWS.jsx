import { Client } from '@stomp/stompjs';
import React, { useEffect, useRef } from 'react'
import SockJS from 'sockjs-client';

// 커스텀 훅 : 리액트 훅을 사용해서 만든 재사용 가능한 모듈로 use 로 시작하는 이름을 가진다
// 커스텀 훅은 컴포넌트 함수 또는 다른 커스텀 훅 내부에서만 사용할 수 있다
// 커스텀 훅은 조건문이나 루프 안에서 호출하면 안된다
  // 커스텀 훅이 함수 안에 있으면 있을 수도 있고 없을 수도 있다는 조건이 들어가기 때문에 호출하면 안됨
  // 조건은 훅 내부에서 처리해야함 (훅을 생성하는데 조건이 있음 이런 것 처럼?)
  // 이런 건 안된다.
    // function App {
    //    const[a, setA] = useState(10);
    //    const tets=()=> {
    //      const [b, setB] = useState(10); ← XXXXX 절대 안됨
    //  }
    //  if(로그인===true) {
    //    const socket = useWS();   ← XXXXXX 실행하면 바로 에러 떨어짐
    //  }
    // }
function useWS(url, handler) {
  const socket = useRef(null);

  useEffect(()=> {
    const client = new Client({
      // reconnectDelay : 재접속 시도 간격 주기
      reconnectDelay: 5000,
      webSocketFactory:()=> new SockJS("http://localhost:8080/ws"),
      onConnect:()=>{
        console.log("웹소켓 연결");
        // 수신 주소, 수신할 때 수행할 동작을 컴포넌트마다 다르게 하겠다
        client.subscribe(url, handler);
                        // ↑ url 은 구독하는 주소
      }
    });
    client.activate();
    socket.current = client;
  },[url]);

  return socket;
}

export default useWS