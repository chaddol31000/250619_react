import React from 'react'
import useAppStore from '../stores/useAppStore'
import { Navigate } from 'react-router-dom';

function PrivateRoute() {
    const username = useAppStore(state=>state.username);
    // 로그인 되어있지 않은 상태는 undefined
    if(username===undefined)
        return;
    return username? element : <Navigate to="/login" replace />;
}

export default PrivateRoute