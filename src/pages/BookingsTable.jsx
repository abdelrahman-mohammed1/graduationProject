import styled from "styled-components";
import { useData } from "../context/useData";
import BookingRow from '../pages/BookingRow'
const Table = styled.div`
    border: 1px solid var(--color-grey-200); 
    font-size: 1.4rem; 
    background-color: var(--color-grey-0); 
    border-radius: 7px; 
    overflow: auto;
`;

const TableHeader = styled.header`
    display: grid; 
    align-items: center;
    grid-template-columns: repeat(5, 1fr) auto;  
    background-color: var(--color-grey-50);
    border-bottom: 1px solid var(--color-grey-100);
    text-transform: uppercase;
    letter-spacing: 0.4px; 
    font-weight: 600;
    color: var(--color-grey-600);
    padding: 1.6rem 2.4rem;
`;

export default function BookingsTable({ appointmentCode }) {

    const { bookings } = useData();






    const bookingsFilter = appointmentCode
        ? bookings?.data?.filter((book) => String(book.appointmentCode).includes(appointmentCode))
        : bookings?.data;



    return (
        <Table role='table'>
            <TableHeader role='row'>
                <div>userName</div>
                <div>nurseName</div>
                <div>serviceType</div>
                <div>TotalCost</div>
                <div>AppointmentCode</div>
            </TableHeader>
            {bookingsFilter?.map((book, i) => <BookingRow key={i} book={book} />)}
        </Table>
    )
}
