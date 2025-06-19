import React, { useEffect } from 'react'
import useAppStore from './stores/useAppStore'
import { Routes, useLocation } from "react-router-dom";
import { Bounce, toast, ToastContainer } from 'react-toastify';

function App() {
  // 훅을 통째로 가져온 다음 checkAuth, socket 을 꺼낸다
  // 훅에 있는 어떤 상태라도 변경되면 재렌더링
  const {checkAuth, socket} = useAppStore();

  // 훅에서 checkAuth 만 가져온다
  // const checkAuth = useAppStore(state=>state.checkAuth);

  // 주소가 바뀔때마다 로그인 정보를 갱신해라
  // 지금은 BrowserRouter 가 없기에 에러가 남
  const location = useLocation();
  useEffect(()=>checkAuth(),[location]);

  // 로그인 했으면 toast 를 띄울 subscribe 를 등록
  // 처음 로그인 했을 때 띄우면 undefined 기 때문에 이를 방지하기 위해 useEffect 에 넣어야함
  // 의존성 배열이 있으면 무조건 한 번은 실행함
  useEffect(()=> {
    if(!socket)
      return;
    socket.subscribe('/user/sub/job3', (message)=>{
      toast.success(`🦄 메시지가 도착했습니다`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          })
    })
  },[socket])

  return (
    <div>
      <Routes>

      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App