import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import kakaoApi from "../../modules/api/kakaoApi";
import { authSliceActions } from "../../modules/slice/authSlice";

const Login = () => {
  const [address, setAddress] = useState("");
  const [isAddress, setIsAddress] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    kakaoApi.getUserLocation(setAddress, setIsAddress);
  }, []);

  const handleLogin = () => {
    const scope =
      "profile_nickname, profile_image, account_email, gender, age_range";

    window.Kakao.Auth.login({
      scope,
      success: async (response) => {
        window.Kakao.Auth.setAccessToken(response.access_token);
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: (response) => {
            dispatch(
              authSliceActions.loginRequest({
                email: response.kakao_account.email,
                age_range: response.kakao_account.age_range,
                gender: response.kakao_account.gender,
                name: response.kakao_account.profile.nickname,
                profile: response.kakao_account.profile.profile_image_url,
                current_address: address,
              })
            );
          },
        });
      },
    });
  };

  const jsKey = "6fe0be1f6b114e35d999d9c9ba281084";

  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(jsKey);
  }

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
  }, [isLoggedIn]);

  const handleReload = () => {
    window.location.reload();
  };
  return (
    <>
      <Main>
        <Section>
          <Title>
            도란
            <LogoImage>
              <img src="/assets/logo.svg" alt="logo" />
            </LogoImage>
            도란
          </Title>
          <SubTitle>우리동네 어르신들의 화상 채팅 방</SubTitle>
          <TitleImg>
            <img
              src="/assets/cards/card12.png"
              alt="할머니 할아버지가 즐겁게 달리는 이미지"
            />
          </TitleImg>
          {!isAddress && (
            <LocationErrorWrap>
              <p>
                현재 위치를 알 수 없습니다. <br /> 새로고침 해보시겠어요?
              </p>
              <RefreshButton onClick={handleReload}>
                <span className="refreshImage">
                  <img src="/assets/refresh.png" alt="새로고침 이미지" />
                </span>
                새로고침
              </RefreshButton>
            </LocationErrorWrap>
          )}

          {!address && isAddress && <p>사용자의 위치를 불러오고 있습니다..</p>}
          {address && (
            <Button onClick={handleLogin}>
              <img
                src="/kakao_login_large_narrow.png"
                alt="kakao login image"
              />
            </Button>
          )}
        </Section>
      </Main>
    </>
  );
};

const Main = styled.main`
  position: relative;
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--scarlet-color) 0%,
    var(--orange-color) 100%
  );
`;

const Section = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  margin: 0 auto;
  padding: 70px 50px;
  border-radius: 20px;
  background-color: #fff;
  text-align: center;
  box-shadow: 1px 1px 18px 4px #c87247;
`;

const Title = styled.h2`
  margin-bottom: 10px;
  color: var(--orange-color);
  font-size: 50px;
  font-weight: bold;
`;

const SubTitle = styled.p`
  margin-bottom: 30px;
  font-size: 20px;
`;

const LogoImage = styled.span`
  display: inline-block;
  width: 50px;

  img {
    vertical-align: top;
  }
`;

const TitleImg = styled.div`
  width: 40%;
  margin-bottom: 30px;
`;

const LocationErrorWrap = styled.div`
  width: 200px;
`;
const Button = styled.button`
  width: 200px;
`;

const RefreshButton = styled.button`
  width: 200px;
  margin-top: 20px;
  padding: 10px 15px;
  border-radius: 30px;
  background-color: var(--dark-gray-color);
  font-size: 20px;

  .refreshImage {
    display: inline-block;
    vertical-align: sub;
    width: 15px;
    margin-right: 5px;
    overflow: hidden;
  }
`;
export default Login;
