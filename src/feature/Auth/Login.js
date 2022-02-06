import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import kakaoApi from "../../modules/api/kakaoApi";
import { authSliceActions } from "../../modules/slice/authSlice";

const Login = () => {
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [isAddress, setIsAddress] = useState(true);

  useEffect(() => {
    kakaoApi.getUserLocation(setAddress, setIsAddress);
  }, []);

  const handleLogin = () => {
    const scope =
      "profile_nickname, profile_image, account_email, gender, age_range";
    window.Kakao.Auth.login({
      scope,
      success: async function (response) {
        window.Kakao.Auth.setAccessToken(response.access_token);
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: function (response) {
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
          {!isAddress && <span>위치를 알 수 없습니다.</span>}
          <TitleImg>
            <img src="/assets/cards/card12.png" alt="title img" />
          </TitleImg>
          {!address && isAddress && (
            <span>사용자의 위치를 불러오고 있습니다..</span>
          )}
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

export default Login;
