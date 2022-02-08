import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { authSliceActions } from "../../modules/slice/authSlice";
import { useCharacter } from "../../common/hooks/useCharacter";
import Header from "../../common/components/Header";
import Character from "./Character";

const Room = () => {
  const char = useCharacter("교감쌤");
  const [mCount, setMcount] = useState(0);
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
  }, []);

  const error = useSelector((state) => state.room.error);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    window.Kakao.API.request({
      url: "/v1/user/unlink",
      success: function () {
        dispatch(authSliceActions.logoutRequest());
      },
    });
  };

  useEffect(() => {
    if (error) {
      history.push("/error");
    }
    if (!isLoggedIn) {
      history.push("/login");
    }
  }, [error, isLoggedIn]);

  let count = 0;

  const handleKeyDown = (e) => {
    switch (e.code) {
      case "KeyA":
      case "ArrowLeft":
        setMcount(count++);
        if (mCount === 4) {
          setMcount(0);
        }
        char.moveLeft();
        break;
      case "KeyW":
      case "ArrowUp":
        setMcount(count++);
        if (mCount === 4) {
          setMcount(0);
        }
        char.moveUp();
        break;
      case "KeyD":
      case "ArrowRight":
        setMcount(count++);
        if (mCount === 4) {
          setMcount(0);
        }
        char.moveRight();
        break;
      case "KeyS":
      case "ArrowDown":
        setMcount(count++);
        if (mCount === 4) {
          setMcount(0);
        }
        char.moveDown();
        break;
    }
  };
  return (
    <>
      <Main>
        <Header rightOnClick={handleLogout} title="우리들의 방" />
        <Section>
          <Character
            count={mCount}
            side={char.side}
            x={char.x}
            y={char.y}
            name={char.name}
          />
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
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 480px;
  margin: 0 auto;
  padding: 70px 50px;
  border-radius: 20px;
  background: url(/assets/pixelArt-bg1.png) no-repeat center;
  text-align: center;
  box-shadow: 1px 1px 18px 4px #c87247;
`;

export default Room;
