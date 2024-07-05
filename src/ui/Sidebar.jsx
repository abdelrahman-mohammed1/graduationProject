import styled from "styled-components"
import Logo from './Logo'
import Row from './Row'
import MainNav from "./MainNav"
const StyledSidebar = styled.aside`
    background-color: var(--color-grey-0); 
    padding: 3.2rem 1.8rem;
    grid-row: 1/-1;
    border-right: 1px solid var(--color-grey-100);
`

export default function Sidebar() {
    return (
        <StyledSidebar>
            <Row type='vertical'>
                <Logo />
                <MainNav />
            </Row>
        </StyledSidebar>
    )
}
