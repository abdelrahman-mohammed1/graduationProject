import styled, { css } from "styled-components";

const Input = styled.input`
  border: 1px solid var(--color-grey-300);  
  background-color :var(--color-grey-0) ;
  border-radius: var(--border-radius-sm); 
  padding: 0.8rem 1.2rem; 
  box-shadow: var(--shadow-sm);  
 
 ${props => props.kind === 'form' && css`
  &:focus{
    border:2px solid #097B94 ;   
    outline: #097B94;
    
  }
  `}
`;
export default Input 