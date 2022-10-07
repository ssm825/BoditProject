import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
const GlobalStyle = createGlobalStyle`
  ${reset}
  
  * {
    box-sizing: border-box;
    
  }
  
  body {
    
  }

  a {
    color: black;
    cursor: pointer;
  }
 
`;
export default GlobalStyle;
