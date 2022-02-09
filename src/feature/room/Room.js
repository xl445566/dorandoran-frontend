import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Header from "../../common/components/Header";
import { useCharacter } from "../../common/hooks/useCharacter";
import { authSliceActions } from "../../modules/slice/authSlice";
import Character from "./Character";

const Room = () => {
  const char = useCharacter("교감쌤");
  const [mCount, setMcount] = useState(0);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mCount]);

  const error = useSelector((state) => state.room.error);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const history = useHistory();
  const dispatch = useDispatch();

  const roomTitle = history.location.state.title;

  const handleLogout = () => {
    window.Kakao.API.request({
      url: "/v1/user/unlink",
      success: function () {
        dispatch(authSliceActions.logoutRequest());
      },
    });
  };

  const onRoomsPage = () => {
    history.push("/");
  };

  useEffect(() => {
    if (error) {
      history.push("/error");
    }
    if (!isLoggedIn) {
      history.push("/login");
    }
  }, [error, isLoggedIn]);

  const handleKeyDown = (e) => {
    switch (e.code) {
      case "KeyA":
      case "ArrowLeft":
        setMcount(mCount + 1);
        if (mCount === 2) {
          setMcount(0);
        }
        char.moveLeft();
        break;
      case "KeyW":
      case "ArrowUp":
        setMcount(mCount + 1);
        if (mCount === 2) {
          setMcount(0);
        }
        char.moveUp();
        break;
      case "KeyD":
      case "ArrowRight":
        setMcount(mCount + 1);
        if (mCount === 2) {
          setMcount(0);
        }
        char.moveRight();
        break;
      case "KeyS":
      case "ArrowDown":
        setMcount(mCount + 1);
        if (mCount === 2) {
          setMcount(0);
        }
        char.moveDown();
        break;
    }
  };

  return (
    <>
      <Main>
        <Header
          rightOnClick={handleLogout}
          title={roomTitle}
          text="방 리스트로 가기"
          leftOnClick={onRoomsPage}
        />
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
  background: var(--light-gray-color);
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
  box-shadow: 1px 1px 10px 1px #756f6f;
`;

export default Room;
