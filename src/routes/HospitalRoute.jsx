import React from "react";
import useAppStore from "../stores/useAppStore";
import { Navigate } from "react-router-dom";

function HospitalRoute({ element }) {
  const { username, role } = useAppStore();

  if (username === undefined) return;
  if (username === null) return <Navigate to="/login" replace />;
  if (role !== "ROLE_HOSPITAL") return <Navigate to="/e403" replace />;
  return element;
}

export default HospitalRoute;