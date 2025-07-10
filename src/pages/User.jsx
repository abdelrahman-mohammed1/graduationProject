

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../ui/Spinner";
import Row from '../ui/Row';
import styled from "styled-components";
import Button from '../ui/Button';
import { useData } from "../context/useData";

const Container = styled.div`
    display: flex; 
    justify-content: space-around; 
    align-items: center; 
    gap: 41.5rem;
    border: 2px solid #097B94; 
    border-radius: 20px;  
    padding: 50px 0;
`;

const Span = styled.span`
    color: #097B94;
`;

const Circle = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #097B94;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4.5rem;
    font-weight: bold;
`;

const ErrorMessage = styled.div`
    color: red;
    margin-top: 1rem;
`;

export default function User() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('access_token'))
    console.log(token)

    useEffect(() => {
        async function getUser() {
            setLoading(true);
            setError(null);

            try {   
                const res = await fetch(`${import.meta.env.VITE_BASE_URL}users/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                setUser(data.data);

            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to fetch user data. Please try again later.');
            } finally {
                setLoading(false);
            }
        }
        getUser();
    }, [id, token]);

    const { name, gender, email, dateOfBirth, phone, age, city, governorate } = user;
    const firstChar = name ? name.charAt(0) : '';

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <Button variation="basic" style={{ width: '10%' }} onClick={() => navigate(-1)}>
                        &larr; Back
                    </Button>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    <Container>
                        <Circle>{firstChar?.toUpperCase()}</Circle>
                        <Row>
                            <p><Span>Name</Span>: {name || "ads"}</p>
                            <p><Span>Gender</Span>: {gender || "sad"}</p>
                            <p><Span>User email</Span>: {email || "ad"}</p>
                            <p><Span>Birth Year</Span>: {dateOfBirth || "adswqe"}</p>
                            <p><Span>Phone</Span>: {phone || "01274600679"}</p>
                            <p><Span>Age</Span>: {age || "26"}</p>
                            <p><Span>City Name</Span>: {city?.name || "125"}</p>
                            <p><Span>Governorate</Span>: {governorate?.name || "152"}</p>
                        </Row>
                    </Container>
                </>
            )}
        </>
    );
}
