// 로그인 하면 소켓 생성

import { Client } from "@stomp/stompjs";
import axios from "axios";
import SockJS from "sockjs-client";
import { create } from "zustand"

// zustand 의 store 의 자체도 커스텀 훅 객체
// create 함수는 커스텀 훅을 생성해서 리턴하는 함수
  // ㄴ zustand 는 상태를 다루기 위해 set, get을 제공
  // ㄴ 개발자는 create 를 이용해 set, get 을 전달받아 상태 관련 로직 객체를 작성한다

// connect = 웹소켓 연결
// deactivate = 연결 해제

const useAppStore=create((set, get)=> ({
  username: undefined,
  role: undefined,
  socket: undefined,

  connectWebSocket:()=> {
    // 만약에 연결되어 있다면 무시해라
    if(get().socket)
      return;
    const client = new Client({
      // 연결이 끊어지면 대기 후 재연결 요청을 보낼 간격을 설정 → 금지
      reconnectDelay:0,
      webSocketFactory:()=> new SockJS("http://localhost:8080/ws"),
      onConnect:()=>set({socket:client})
    })
    client.activate();
  },
  
  // 로그인 여부 확인 
    // f5 누르면 초기화
  checkAuth:async()=> {
    try {
      const prevUsername = get().username;
      const res = await axios.get('http://localhost:8080/api/auth/check', {withCredentials:true});
      const {username, role} = res.data;

      // zustand에서 이전값을 가지고 변경하는 경우가 아니라면 함수형 업데이트 불필요
      set({username, role})

      // 저장된 아이디가 바뀌었다면
      if(!prevUsername !== username)
      get().connectWebSocket();
    } catch(err) {
      if(get().socket)
        // 연결을 끊어라
        get().socket.deactivate();
      set({username:null, role:null, socket:null});
      console.log(err);
    }
  },

  // 로그인 설정
  setLogin: (username, role) => {
    set({username, role})
    get().connectWebSocket();
  },

  // 로그아웃 설정
  setLogout:()=> {
    if(get().socket)
      get().socket.deactivate();
    set({username:null, role:null, socket:null});
  },
}));

export default useAppStore