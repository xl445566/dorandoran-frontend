import React from "react";
import styled from "styled-components";
import kakaoApi from "../../modules/api/kakaoApi";

const Auth = () => {
  const scope =
    "profile_nickname, profile_image, account_email, gender, age_range";

  const handleLogin = () => {
    window.Kakao.Auth.login({
      scope,
      success: async function (response) {
        window.Kakao.Auth.setAccessToken(response.access_token);
        console.log(`is set?: ${window.Kakao.Auth.getAccessToken()}`);
        kakaoApi.getUser();
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
      <Section>
        <Article>
          <Title>
            <Font>
              도란
              <LogoImg>
                <img src="/favicon-32x32.png" alt="logo" />
              </LogoImg>
              도란
            </Font>
            <p>우리동네 어르신들의 화상 채팅 방</p>
          </Title>
          <Button onClick={handleLogin}>
            <img src="/kakao_login_large_narrow.png" alt="kakao login image" />
          </Button>
        </Article>
      </Section>
    </>
  );
};

const Section = styled.section`
  padding: 20px 0;
  background: linear-gradient(
    90deg,
    var(--scarlet-color) 0%,
    var(--orange-color) 100%
  );
  background-size: auto 100%;
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background-color: #fff;
`;

const Title = styled.div`
  padding: 10px;
`;

const Font = styled.div`
  font-size: $sizeXXS;
`;

const LogoImg = styled.span`
  display: inline-block;
  width: 30px;
`;

const Button = styled.button`
  width: 150px;
`;

export default Auth;
