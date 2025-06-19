import logo from './logo.svg';
import { Bounce, Slide, toast, ToastContainer } from 'react-toastify';

// 1. toast 띄우기

function App() {
  const show1=()=>toast.error('🦄 예약 접수에 실패했습니다', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", transition: Bounce, });
  const show2=()=>toast.success('🦄 예약 접수에 성공했습니다!', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", transition: Slide, });
  return (
    <div>
      <h1>Toast 띄우기</h1>
      <button onClick={show1}>colored</button>
      <button onClick={show2}>colored</button>
      <ToastContainer />
    </div>
  );
}

export default App;
