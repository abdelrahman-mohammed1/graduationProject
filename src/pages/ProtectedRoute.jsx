import { useEffect } from "react";
import { useData } from "../context/useDate"
import { useNavigate } from "react-router-dom";


export default function ProtectedRoute({ children }) {
    const { token } = useData();
    const navigate = useNavigate();
    useEffect(function () {
        if (!token) navigate('/login')
    }, [token, navigate])


    if (token) return children

}
