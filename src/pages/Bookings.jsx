
import Spinner from '../ui/Spinner'
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Input from "../ui/Input";
import BookingsTable from "./BookingsTable";
import { useData } from "../context/useData";
import { useState } from 'react';

function Bookings() {
  const { loadingBooking } = useData();
  const [appointmentCode, setAppointmentCode] = useState("")
  return (
    <>

      {loadingBooking ? <Spinner /> :
        <>
          <Row type="horizontal">
            <Heading as="h1">All Bookings</Heading>
            <Input kind="form" type='text' style={{ width: '23%' }} placeholder='Search by appointmentCode' value={appointmentCode} onChange={(e) => setAppointmentCode(e.target.value)}></Input>
          </Row>
          <Row>
            <BookingsTable appointmentCode={appointmentCode} />
          </Row>
        </>
      }
    </>


  );
}

export default Bookings;


