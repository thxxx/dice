import styled from "@emotion/styled";
import React from "react";

const Footer = () => {
  return (
    <FooterContainer>
      <div>Dice</div>
      <div>khj605123@gmail.com</div>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  padding: 60px 35px;
  border-top: 1px solid ${({ theme }) => theme.borderColor01};
`;
