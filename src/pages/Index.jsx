import React from 'react'
import { Link } from 'react-router-dom'

function Index() {
  return (
    <div>
      <ul>
        <li><Link to="/login">로그인</Link></li>
        <li><Link to="/private">메시지 보내기 (로그인만 접근 가능)</Link></li>
        <li><Link to="/user">유저만 접근 가능</Link></li>
        <li><Link to="/hospital">병원만 접근 가능</Link></li>
      </ul>
    </div>
  )
}

export default Index