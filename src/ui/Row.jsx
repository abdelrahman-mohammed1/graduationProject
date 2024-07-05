import styled, { css } from "styled-components";

const Row = styled.div`
    display: flex; 
  ${prop => prop.type === 'horizontal' && css`
    justify-content: space-between; 
    align-items: center;
  `} 
  ${prop => prop.type === 'vertical' && css`
    flex-direction: column; 
    gap: 1.6rem;
  `}
`
Row.defaultProps = {
    type: 'vertical'
}
export default Row

