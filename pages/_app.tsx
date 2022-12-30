import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import styled from "@emotion/styled";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <MobileContainer>
        <div className="inner">
          <Component {...pageProps} />
        </div>
      </MobileContainer>
    </ChakraProvider>
  );
}

export default MyApp;

const MobileContainer = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.07);
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .inner {
    background-color: white;
    width: 400px;
    min-height: 100vh;

    @media (max-width: 700px) {
      width: 100%;
    }
  }
`;
