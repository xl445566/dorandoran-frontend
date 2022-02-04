import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions } from "../../modules/slice/authSlice";
import kakaoApi from "../../modules/api/kakaoApi";

const Auth = () => {
  const auth = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const scope =
    "profile_nickname, profile_image, account_email, gender, age_range";

  const handleLogin = () => {
    window.Kakao.Auth.login({
      scope,
      success: async function (response) {
        window.Kakao.Auth.setAccessToken(response.access_token);
        // console.log(`is set?: ${window.Kakao.Auth.getAccessToken()}`);
        // kakaoApi.getUser();
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: function (response) {
            console.log(
              "response!!!!!!!!!!!!!!",
              response.kakao_account.age_range,
              response.kakao_account.email,
              response.kakao_account.gender,
              response.kakao_account.profile.nickname,
              response.kakao_account.profile.thumbnail_image_url
            );
            kakaoApi.getUserLocation();
            dispatch(
              authSliceActions.loginRequest({
                email: response.kakao_account.email,
              })
            );
          },
          fail: function (error) {
            console.log("error", error);
          },
        });
      },
      fail: function (error) {
        console.log(error);
      },
    });
  };

  const jsKey = "6fe0be1f6b114e35d999d9c9ba281084";

  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(jsKey);
    console.log("Kakao.isInitialized", window.Kakao.isInitialized());
  }

  return (
    <>
      <Main>
        <Section>
          <Title>
            도란
            <Logo>
              <img src="/favicon-32x32.png" alt="logo" />
            </Logo>
            도란
            <p>우리동네 어르신들의 화상 채팅 방</p>
          </Title>
          {auth}
          <TitleImg>
            <img src="/assets/cards/card12.png" alt="title img" />
          </TitleImg>
          <Button onClick={handleLogin}>
            <img src="/kakao_login_large_narrow.png" alt="kakao login image" />
          </Button>
        </Section>
      </Main>
    </>
  );
};

const Main = styled.main`
  height: 100%;
  padding: 20px 0;
  background: linear-gradient(
    90deg,
    var(--scarlet-color) 0%,
    var(--orange-color) 100%
  );
`;

const Section = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  border-radius: 20px;
  text-align: center;
  background-color: #fff;
`;

const Title = styled.div`
  padding: 10px;
`;

const Logo = styled.span`
  display: inline-block;
  width: 30px;
`;

const TitleImg = styled.div`
  width: 50%;
`;

const Button = styled.button`
  width: 150px;
`;

export default Auth;
