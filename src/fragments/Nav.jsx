import React from 'react'
import useAppStore from '../stores/useAppStore'
import { Link } from 'react-router-dom';
import axios from 'axios';

function Nav() {
  const {username, role, setLogout} = useAppStore();
  
  const doLogout=async(e)=> {
    // preventDefault : 고유 동작이 있는 요소들의 고유 동작을 막는다
    // ex. 자바스크립트라고 생각을 해보자
    // <form action='/주소'><button onclick={aaa}>서밋으로 동작</button></form>
      //  버튼을 클릭했을 때 aaa 함수에서 조건 체크를 해서 조건을 만족하지 못하면 작업을 중단하게 했다
      // 그래도 폼은 서밋된다 → why? 폼 안에 있는 버튼은 submit 한다는 고유 동작이 정의되어 있기 때문이다
      // <a href="/aaa"> onclick="조건 처리()"></a>
      // a 태그인데 내가 원할 때만 이동하게 만들고 싶어
      // 하지만 내가 잘 만들어도 고유 동작이 이동하는 것이기 때문에 무조건 이동함
      // 내가 원할 떄만 이동하게 하려면 e.preventDefault 를 이용해서 고유 동작을 끄고 시작해야함
    e.preventDefault();
    try {
      // MVC 방식에서는 a 사이트에서 수신한 쿠키를 브라우저가 자동 전송한다 vs REST 는 그런 거 없다
      // withCredentials:true → 쿠키를 서버로 자동 전송해라
      await axios.post('http://localhost:8080/logout', null, {withCredentials:true});
      setLogout();
    } catch(err) {
      console.log(err);
    }
  }

  if(!username) {
    return (
      <nav>
        <div>비로그인</div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">로그인</Link></li>
        </ul>
      </nav>
    )
  } else {
      if(role==='ROLE_USER') {
        return (
          <nav>
          <div>{username} 권한: {role}</div>
          <ul>
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/private">메시지 보내기(로그인 필요)</Link></li>
            <li><Link to="/user">유저권한 접근 가능</Link></li>
            <li><Link to="#" onClick={doLogout}>로그아웃</Link></li>
          </ul>
          </nav>
        )
      } else if(role==='ROLE_HOSPITAL') {
        return (
          <nav>
          <div>{username} 권한: {role}</div>
          <ul>
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/private">메시지 보내기(로그인 필요)</Link></li>
            <li><Link to="/hospital">유저권한 접근 가능</Link></li>
            <li><Link to="#" onClick={doLogout}>로그아웃</Link></li>
          </ul>
          </nav>
        )
      }
    } 
}

export default Nav