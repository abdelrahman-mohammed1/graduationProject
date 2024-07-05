
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../ui/Spinner";
import styled from "styled-components";
import Button from '../ui/Button';
import { useData } from "../context/useDate";

const Container = styled.div`
    display: flex; 
    flex-direction: column;
    align-items: center; 
    gap: 2rem; 
    border:2px solid  #097B94 ; 
    border-radius: 10px; 
    padding: 30px 0;

`;

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 9rem;
    
    align-items: center;
`;



const ImageContainer = styled.div`
    padding: 10px 5px;
    border-radius: 10px; 
    background-color: #f9f1f1; 
    width: 224px;
    background-image: url(${props => props.photo}); 
    background-size: cover;
    height: 224px;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const DocumentsTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
`;

const TableRow = styled.tr`
    border-bottom: 1px solid #097B94 ;
`;

const TableHeader = styled.th`
    padding: 8px;
    text-align: left;
`;

const TableData = styled.td`
    padding: 8px;
    text-align: left;
`;

const ViewLink = styled.a`
    color: #1d72b8;
    cursor: pointer;
`;
const Span = styled.span`
color: #097B94 ;  
margin-right: 10px;
`
export default function Nurse() {
    const [loading, setLoading] = useState(false);
    const [nurse, setNurse] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useData();

    useEffect(function () {
        async function getNurse() {
            setLoading(true);


            const res = await fetch(`https://we-care-server-seven.vercel.app/api/v1/nurses/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            setLoading(false);
            setNurse(data.data);

        }
        getNurse();
    }, [id, token]);


    const { name, email, gender, idCardFront, idCardBack, certificate, dateOfBirth, phone, photo, age, specialization, yearsOfExperience, ratingsAverage, about, city, governorate } = nurse;

    return (
        <>
            {loading ? <Spinner /> :
                <>
                    <Button variation='basic' style={{ width: '10%' }} onClick={() => navigate(-1)}>&larr; Back</Button>
                    <Container>
                        <ProfileContainer>
                            <ImageContainer photo={photo || "https://via.placeholder.com/224x300.png?text=User+Photo"} />
                            <InfoContainer>
                                <p><Span>Name :</Span>  {name}</p>
                                <p><Span>Gender :</Span> {gender}</p>
                                <p><Span>Email :</Span>  {email}</p>
                                <p><Span>Birth Year :</Span>  {dateOfBirth}</p>
                                <p><Span>Phone :</Span>  {phone}</p>
                                <p><Span>Age :</Span>  {age}</p>
                                <p><Span>Specialization :</Span> {specialization}</p>
                                <p><Span>City :</Span> {city?.name}</p>
                                <p><Span>Governorate :</Span> {governorate?.name}</p>
                                <p><Span>About {name} :</Span> {about}</p>
                                <p><Span>Years of Experience :</Span>  {yearsOfExperience}</p>
                                <p><Span >Average Rating :</Span>  {Number(ratingsAverage) || <em>Not Available Now</em>}</p>
                            </InfoContainer>
                        </ProfileContainer>
                        <DocumentsTable>
                            <thead>
                                <TableRow>
                                    <TableHeader>Document</TableHeader>
                                    <TableHeader>View</TableHeader>
                                </TableRow>
                            </thead>
                            <tbody>
                                <TableRow>
                                    <TableData>ID card face</TableData>
                                    <TableData>
                                        <ViewLink href={idCardFront || "https://via.placeholder.com/224x300.png?text=ID+Card+Front"} target="_blank">👁️</ViewLink>
                                    </TableData>
                                </TableRow>
                                <TableRow>
                                    <TableData>ID card Back</TableData>
                                    <TableData>
                                        <ViewLink href={idCardBack || "https://via.placeholder.com/224x300.png?text=ID+Card+Back"} target="_blank">👁️</ViewLink>
                                    </TableData>
                                </TableRow>
                                <TableRow>
                                    <TableData>Graduation</TableData>
                                    <TableData>
                                        <ViewLink href={certificate || "https://via.placeholder.com/224x300.png?text=Certificate"} target="_blank">👁️</ViewLink>
                                    </TableData>
                                </TableRow>
                            </tbody>
                        </DocumentsTable>
                    </Container>
                </>
            }
        </>
    );
}
