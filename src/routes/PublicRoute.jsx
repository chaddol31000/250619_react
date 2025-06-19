import React from "react";
import useAppStore from "../stores/useAppStore";
import { Navigate } from "react-router-dom";

function PublicRoute({ element }) {
  const username = useAppStore(state => state.username);

  // 웹브라우저에서 뒤로 가기 누르면 지금까지 방문했던 페이지들 역순으로 방문(window.history)
  // 현재 접근주소에서 /signup에서 권한오류가 발생해서 /로 이동 -> 뒤로가기하면 /signup로 가서 /로 다시 이동
  return username ? <Navigate to="/" replace /> : element;
}

export default PublicRoute;