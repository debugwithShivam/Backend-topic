import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Account from "./AccountData";
import {Outlet, useNavigate,Navigate} from 'react-router-dom'
export default function ProtectiveRouting({children}) {
  const navigate = useNavigate()
 const token = JSON.parse(localStorage.getItem("token"));

 console.log('ok')
  return token?<Outlet/>:<Navigate to='/Login' replace/>

}
