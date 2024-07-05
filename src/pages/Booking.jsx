

import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useData } from '../context/useDate';
import Spinner from '../ui/Spinner'
import Button from '../ui/Button';
const BookingContainer = styled.div`
  padding: 20px;
  background-color: #e0f7fa;
  border-radius: 8px;
  width: 100%;
  margin: 20px 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const BookingHeader = styled.h2`
  color: #097B94 ;
  text-align: center;
  margin-bottom: 20px;
`;

const BookingDetails = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  font-weight: bold;
  color: #0277bd;
`;

const Value = styled.span`
  color: #01579b;
`;

const notesStyle = {
    color: 'red',
    fontWeight: 'bold',
    marginTop: '10px',
};

const nurseAcceptedStyle = {
    color: 'green',
    fontWeight: 'bold',
    marginTop: '10px',
};

const nurseRejectedStyle = {
    color: 'red',
    fontWeight: 'bold',
    marginTop: '10px',
};



export default function Booking() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useData();
    console.log(id);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(function () {
        async function getSpecificBooking() {
            setLoading(true);
            const res = await fetch(`https://we-care-server-seven.vercel.app/api/v1/appointments/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json()
            setLoading(false);
            setData(data.data);
        }
        getSpecificBooking();
    }, [id, token])
    console.log(data)
    return (
        <>
            <Button variation='basic' style={{ width: '10%' }} onClick={() => navigate(-1)} >&larr; Back </Button>

            {loading ? <Spinner /> :
                <BookingContainer  >
                    <BookingHeader>Booking Details</BookingHeader>

                    <BookingDetails  >
                        <DetailRow>
                            <Label>Appointment Type:</Label>
                            <Value>{data?.appointmentType}</Value>
                        </DetailRow>
                        <DetailRow>
                            <Label>Service Option:</Label>
                            <Value>{data?.serviceOption}</Value>
                        </DetailRow>

                        <DetailRow>
                            <Label>Nurse:</Label>
                            <Value>{data?.nurse?.name}</Value>
                        </DetailRow>
                        <DetailRow>
                            <Label>User:</Label>
                            <Value>{data?.user?.name}</Value>
                        </DetailRow>
                        <DetailRow>
                            <Label>Appointment Code:</Label>
                            <Value>{data?.appointmentCode}</Value>
                        </DetailRow>
                        <DetailRow>
                            <Label>Date:</Label>
                            <Value>{data?.date}</Value>
                        </DetailRow>
                        <DetailRow>
                            <Label>Time:</Label>
                            <Value>{data?.time}</Value>
                        </DetailRow>
                        <DetailRow>
                            <Label>Total Cost:</Label>
                            <Value>{data?.totalCost}</Value>
                        </DetailRow>
                        <DetailRow>
                            <Label>Notes:</Label>
                            <Value style={notesStyle}>{data?.notes}</Value>
                        </DetailRow>
                        <DetailRow>
                            <Label>Nurse Acceptance:</Label>
                            <Value style={data?.nurseAcceptance ? nurseAcceptedStyle : nurseRejectedStyle}>
                                {data?.nurseAcceptance ? 'Accepted' : 'Rejected'}
                            </Value>
                        </DetailRow>
                    </BookingDetails>

                </BookingContainer>
            }
        </>



    );




}