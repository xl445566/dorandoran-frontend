import React, { useEffect } from "react";

import PropTypes from "prop-types";
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
        <Overlay />
        {!size ? (
          <Container>{children}</Container>
        ) : (
          <SmallContainer data-testid="small">{children}</SmallContainer>
        )}
      </ModalWrapper>
    </>
  );
};

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
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
  background: #00000080;
  z-index: 1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 60%;
  height: 80%;
  border: 15px solid #7f8c8d;
  border-radius: 2rem;
  background: var(--white-color);
  overflow: hidden;
  z-index: 10;
`;

const SmallContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 30%;
  height: 40%;
  border: 5px solid var(--orange-color);
  border-radius: 2rem;
  background: var(--white-color);
  overflow: hidden;
  z-index: 10;
`;

Modal.propTypes = {
  size: PropTypes.string,
  children: PropTypes.object,
};

export default Modal;
