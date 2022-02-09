import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";

const Modal = ({ size, children }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <ModalWrapper>
        <Link to="/">
          <Overlay />
        </Link>
        {!size ? (
          <Container>{children}</Container>
        ) : (
          <SmallContainer>{children}</SmallContainer>
        )}
      </ModalWrapper>
    </>
  );
};

export default Modal;

const ModalWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  z-index: 999;

  .error {
    color: red;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: #00000080;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 15px solid #7f8c8d;
  border-radius: 2rem;
  background: var(--white-color);
  overflow: hidden;
  width: 60%;
  height: 80%;
  z-index: 10;
`;

const SmallContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 5px solid var(--orange-color);
  border-radius: 2rem;
  background: var(--white-color);
  overflow: hidden;
  width: 30%;
  height: 40%;
  z-index: 10;
`;
