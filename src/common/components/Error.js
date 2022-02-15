import React from "react";

import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Error = () => {
  const history = useHistory();
  const roomListError = useSelector((state) => state.roomList.error.response);
  const roomError = useSelector((state) => state.room.error.response);

  const handleLoginPage = () => {
    history.push("/");
  };

  return (
    <>
      <Main>
        <Section>
          <TitleImg>
            <img
              src="/assets/logo/error_logo.svg"
              alt="에러를 표시하는, 물에 빠지는 로고"
            />
          </TitleImg>
          <Title>
            {(roomListError && roomListError.status) ||
              (roomError && roomError.status)}
          </Title>
          <SubTitle>
            {/* 현재 테스트중입니다 */}
            {/* {(roomListError && roomListError.data.message) ||
              (roomError && roomError.data.message) ||
              "페이지를 찾을 수 없습니다. 이전페이지로 이동하시겠어요?"} */}
            페이지를 찾을 수 없습니다.
            <br /> 메인페이지로 이동하시겠어요?
            <br /> 로그인을 하지 않았을 경우, 로그인 페이지로 이동합니다.
          </SubTitle>
          <Button onClick={handleLoginPage}>메인페이지로 돌아가기</Button>
        </Section>
      </Main>
    </>
  );
};

const Main = styled.main`
  position: relative;
  height: 100%;
  background: var(--dark-grey-shadow-color);
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  margin: 0 auto;
  padding: 70px 50px;
  border-radius: 20px;
  background-color: #fff;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 10px;
  color: var(--dark-gray-color);
  font-size: 60px;
  font-weight: bold;
`;

const TitleImg = styled.div`
  width: 40%;
  margin-bottom: 30px;
`;

const SubTitle = styled.p`
  margin-bottom: 30px;
  font-size: 30px;
  font-weight: 500;
  line-height: 1.5;
`;

const Button = styled.button`
  padding: 15px 27px;
  border-radius: 50px;
  background-color: var(--dark-grey-shadow-color);
  color: var(--white-color);
  font-size: 35px;
  font-weight: 500;
`;

export default Error;
