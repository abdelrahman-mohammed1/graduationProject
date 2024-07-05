import styled from "styled-components";


const StyledLogo = styled.div`
  text-align: center;
`
const Img = styled.img` 
height: 4.8rem;
    width: auto;
    position: relative;
    left: -30px;
    top: -15px;
  
`
function Logo() {
  return (
    <StyledLogo>
      <Img src="/logoo.svg" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
