

import styled from "styled-components";
import { HiEye } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const TableRow = styled.div`
    display: grid; 
    grid-template-columns: 1.2fr 1.1fr 1.3fr 1fr 1fr auto;
    padding: 1.4rem 2.4rem; 
    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

const StyledIcon = styled(HiEye)`
    cursor: pointer;  
    font-size:17px;
    color: #097B94;
`;

export default function UserRow({ book }) {
    const { _id, nurse, user, appointmentType, totalCost, appointmentCode } = book;
    const navigate = useNavigate();

    return (
        <TableRow>
            <div>{user?.name}</div>
            <div>{nurse?.name}</div>
            <div>{appointmentType}</div>
            <div>{totalCost}</div>
            <div>{appointmentCode}</div>
            <StyledIcon onClick={() => navigate(`${_id}`)} />
        </TableRow>
    );
}
