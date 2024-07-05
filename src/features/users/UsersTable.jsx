
import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import Spinner from '../../ui/Spinner';
import UserRow from "./UserRow";
import { useData } from "../../context/useDate";

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
    grid-template-columns: repeat(4, 1fr) auto;  
    background-color: var(--color-grey-50);
    border-bottom: 1px solid var(--color-grey-100);
    text-transform: uppercase;
    letter-spacing: 0.4px; 
    font-weight: 600;
    color: var(--color-grey-600);
    padding: 1.6rem 2.4rem;
`;

const ErrorMessage = styled.div`
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
    padding: 0.75rem 1.25rem;
    margin: 1rem 0;
`;

const UsersTable = ({ searchName }) => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const { token } = useData();

    useEffect(() => {
        async function getUsers() {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch('https://we-care-server-seven.vercel.app/api/v1/users/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                setUsers(data.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setError("Failed to fetch users. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        getUsers();
    }, [token]);

    const filteredUsers = useMemo(() => {
        if (searchName && searchName.length > 0) {
            return users.filter(user => user?.name?.toLowerCase().includes(searchName.toLowerCase()));
        }
        return users;
    }, [users, searchName]);

    return (
        <>
            {loading && <Spinner />}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {!loading && !error && (
                <Table role='table'>
                    <TableHeader role='row'>
                        <div>Name</div>
                        <div>City</div>
                        <div>Government</div>
                        <div>Email</div>
                    </TableHeader>
                    {filteredUsers.length > 0 && filteredUsers.map((user, i) => (
                        <UserRow key={i} user={user} />
                    ))}
                </Table>
            )}
        </>
    );
};

export default UsersTable;
