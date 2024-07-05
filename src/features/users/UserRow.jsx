

import styled from "styled-components";
import { HiEye } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const TableRow = styled.div`
    display: grid; 
    grid-template-columns: repeat(4, 1fr) auto; 
    padding: 1.4rem 2.4rem; 
    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

const StyledIcon = styled(HiEye)`
    cursor: pointer; 
    color: #097B94;
`;

export default function UserRow({ user }) {
    const { _id, name, email, governorate, city } = user;
    const navigate = useNavigate();

    return (
        <TableRow>
            <div>{name}</div>
            <div>{city?.name}</div>
            <div>{governorate?.name}</div>
            <div>{email}</div>
            <StyledIcon onClick={() => navigate(`${_id}`)} />
        </TableRow>
    );
}
