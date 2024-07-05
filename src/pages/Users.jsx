import { useState } from "react";
import UsersTable from "../features/users/UsersTable";
import Heading from "../ui/Heading";
import Input from "../ui/Input";
import Row from "../ui/Row";

function Bookings() {
    const [searchName, setSearchName] = useState('');
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All Users</Heading>
                <Input kind="form" placeholder="search by name" value={searchName} onChange={(e) => setSearchName(e.target.value)} ></Input>
            </Row>
            <Row>
                <UsersTable searchName={searchName} />
            </Row>
        </>
    );
}

export default Bookings;
