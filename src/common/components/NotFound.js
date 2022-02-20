import React from "react";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { authSliceActions } from "../../modules/slice/authSlice";
import { roomListSliceActions } from "../../modules/slice/roomListSlice";
import { roomSliceActions } from "../../modules/slice/roomSlice";
import { videoSliceActions } from "../../modules/slice/videoSlice";
import constants from "../utils/constants";

const NotFound = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleMainPage = () => {
    dispatch(authSliceActions.clearError());
    dispatch(roomListSliceActions.clearError());
    dispatch(roomSliceActions.clearError());
    dispatch(videoSliceActions.clearError());
    history.push(constants.ROUTE_MAIN);
  };

  return (
    <>
      <Main>
        <Section>
          <TitleImg>
            <img
              src={constants.ASSET_ERROR_LOGO}
              alt="에러를 표시하는, 물에 빠지는 로고"
            />
          </TitleImg>
          <Title>404</Title>
          <SubTitle>
            <p>페이지를 찾을 수 없습니다.</p>
            <p>메인 페이지로 이동하시겠습니까 ?</p>
            <p>로그인을 하지 않았을 경우, 로그인 페이지로 이동합니다.</p>
          </SubTitle>
          <Button onClick={handleMainPage}>메인 페이지로</Button>
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

const SubTitle = styled.article`
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
  transition: all 0.2s;

  :hover {
    background: var(--dark-gray-color);
    color: var(--white-color);
  }
`;

export default NotFound;
