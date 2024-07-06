import styled from "styled-components"
import Logout from "../features/auth/Logout"
import { useEffect, useState } from "react"
import { useData } from "../context/useData";
import Spinner from "./Spinner";
import HeaderMenu from "./HeaderMenu";
const StyledHeader = styled.header`
    width: 100%; 
    padding: 1.2rem 4.8rem; 
    background-color: var(--color-grey-0);  
    border-bottom: 1px solid var(--color-grey-100); 
    display: flex;
    gap:2.4rem; 
    align-items: center; 
    justify-content: flex-end;
`

export default function Header() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])

    const token = JSON.parse(localStorage.getItem('access_token'))
    console.log(token)
    useEffect(() => {
        async function getMe() {
            setLoading(true);

            try {
                const res = await fetch('https://we-care-server-seven.vercel.app/api/v1/users/getMe', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                setData(data.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false);
            }
        }
        getMe();
    }, [token]);


    return (
        <>
            <StyledHeader>

                <p>Welcome, {data?.name}</p>
                <HeaderMenu id={data?._id} />

            </StyledHeader>

        </>
    )
}
