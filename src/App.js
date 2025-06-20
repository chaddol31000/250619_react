import React, { useEffect } from 'react'
import useAppStore from './stores/useAppStore'
import { Route, Routes, useLocation } from "react-router-dom";
import { Bounce, toast, ToastContainer } from 'react-toastify';
import Nav from './fragments/Nav';
import Index from './pages/Index';
import Login from './pages/Login';
import Private from './pages/Private';
import User from './pages/User';
import Hospital from './pages/Hospital';
import E403 from './pages/E403';
import NotFound from './pages/NotFound';
import PublicRoute from './routes/PublicRoute'
import PrivateRoute from './routes/PrivateRoute'
import HospitalRoute from './routes/HospitalRoute'
import UserRoute from './routes/UserRoute'


function App() {
  // 훅을 통째로 가져온 다음 checkAuth, socket 을 꺼낸다
  // 훅에 있는 어떤 상태라도 변경되면 재렌더링
  const {checkAuth, socket} = useAppStore();

  // 훅에서 checkAuth 만 가져온다
  // const checkAuth = useAppStore(state=>state.checkAuth);

  // 주소가 바뀔때마다 로그인 정보를 갱신해라
  // 지금은 BrowserRouter 가 없기에 에러가 남
  const location = useLocation();

  // useEffect 의 콜백 함수의 리턴은 함수
    // useEffect는 side effect 들을 모아놓은 곳 + 라이프 사이클 관리 함수
    // 라이프 사이클(life cycle(생명주기, 수명주기)) : 생성될 때 → 사용할 때 → 파괴할 때
    //                                             @PostConstruct         @PreDestroy
    // useEffect 의 콜백 파라미터의 리턴값은 컴포넌트가 파괴될 때 뒷정리하는 cleanup 함수
  //   useEffect(()=>{
  //   return ()=>{컴포넌트가_파괴될_때_정리하는_함수}
  // })
  // useEffect 의 콜백 파라미터는 cleanup 함수를 리턴한다 → 다른 걸 리턴할 수 없다
  // useEffect(()=>{
  //   console.log("호엥") ← 생성될 때 호엥 출력
  //   return ()=>console.log("안녕") ← 파괴될 때 안녕 출력
  // },[])

  // promise 구조
  // 자바 스크립트에서 비동기 작업의 수행 결과가 Promise
    // Promise 는 언젠가 결과가 도착할 거라는 약속
  // async 함수는 리턴이 있는 것으로 취급된다
  // async 함수는 내부에 await 를 가지고 있다
  // useEffect 의 콜백은 리턴이 없거나 있다면 cleanup 함수다
  // 따라서 useEffect 의 콜백은 async 가 될 수 없다
  // useEffect(async()=> {
  //   await axios.get('주소')
  // })

  // 비동기 함수의 결과를 안전하게 받으려면 기다려야함
  // const response = await axios.get();
  useEffect(()=>{
    const run=async()=>{
      await checkAuth();
    }
    run();
  },[location]);

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
      <Nav />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<PublicRoute element={<Login />} />} />
        <Route path="/private" element={<PrivateRoute element={<Private />} />} />
        <Route path="/user" element={<UserRoute element={<User />}/>} />
        <Route path="/hospital" element={<HospitalRoute element={<Hospital />}/>} />
        <Route path="/e403" element={<E403 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App