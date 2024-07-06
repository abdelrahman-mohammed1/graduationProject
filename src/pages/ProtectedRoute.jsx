import { useEffect } from "react";
import { useData } from "../context/useData"
import { useNavigate } from "react-router-dom";


export default function ProtectedRoute({ children }) {
    const token = JSON.parse(localStorage.getItem('access_token'))
    console.log(token)
    const navigate = useNavigate();
    useEffect(function () {
        if (!token) navigate('/login')
    }, [token, navigate])


    if (token) return children

}
