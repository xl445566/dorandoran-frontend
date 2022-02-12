import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

import Header from "../../common/components/Header";
import { useCharacter } from "../../common/hooks/useCharacter";
import createKey from "../../common/utils/createKey";
import mapSpots from "../../common/utils/mapSpot";
import { socketCharacterApi } from "../../modules/api/socketApi";
import { authSliceActions } from "../../modules/slice/authSlice";
import { roomListSliceActions } from "../../modules/slice/roomListSlice";
import { roomSliceActions } from "../../modules/slice/roomSlice";
import Character from "./Character";

const Room = () => {
  const char = useCharacter("교감쌤");
  const [moveCount, setMoveCount] = useState(0);
  const roomInfo = useSelector((state) => state.room.info);
  const characters = useSelector((state) => state.character.characters);
  const error = useSelector((state) => state.room.error);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUser = useSelector((state) => state.auth.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [moveCount]);

  useEffect(() => {
    if (
      mapSpots[char.y][char.x] === 2 ||
      mapSpots[char.y][char.x] === 3 ||
      mapSpots[char.y][char.x] === 4 ||
      mapSpots[char.y][char.x] === 5
    ) {
      mapSpots[char.y - 1][char.x] = 0;
      mapSpots[char.y][char.x - 1] = 0;
      mapSpots[char.y][char.x + 1] = 0;
      mapSpots[char.y + 1][char.x] = 0;

      dispatch(
        authSliceActions.setSeatPosition([
          [char.y - 1, char.x],
          [char.y, char.x - 1],
          [char.y, char.x + 1],
          [char.y + 1, char.x],
        ])
      );
    }
  }, [char.y, char.x]);

  useEffect(() => {
    socketCharacterApi.enterRoom({
      roomId: params.roomId,
      x: char.x,
      y: char.y,
      type: "/assets/characters/famale1.png",
      side: char.side,
      isChatting: char.isChatting,
    });
  }, []);

  const handleLogout = () => {
    window.Kakao.API.request({
      url: "/v1/user/unlink",
      success: function () {
        dispatch(
          roomSliceActions.deleteUser({
            currentUser: currentUser._id,
            currentRoom: params.roomId,
          })
        );
        dispatch(roomSliceActions.init());

        dispatch(authSliceActions.logoutRequest());
      },
    });
  };

  const handleRoomsPage = () => {
    dispatch(
      roomSliceActions.deleteUser({
        currentUser: currentUser._id,
        currentRoom: params.roomId,
      })
    );

    dispatch(roomSliceActions.init());
    dispatch(roomListSliceActions.getRooms());
    socketCharacterApi.exitUser();

    history.push("/");
  };

  useEffect(() => {
    if (error) {
      history.push("/error");
    }
    if (!isLoggedIn) {
      history.push("/");
    }
  }, [error, isLoggedIn]);

  useEffect(() => {
    socketCharacterApi.changeCurrentCharacter(
      char.x,
      char.y,
      char.side,
      moveCount
    );
  }, [moveCount, char.side, char.x, char.y]);

  const handleKeyDown = (e) => {
    switch (e.code) {
      case "KeyA":
      case "ArrowLeft":
        setMoveCount(moveCount + 1);
        if (moveCount === 2) {
          setMoveCount(0);
        }
        char.moveLeft();

        break;
      case "KeyW":
      case "ArrowUp":
        setMoveCount(moveCount + 1);
        if (moveCount === 2) {
          setMoveCount(0);
        }
        char.moveUp();

        break;
      case "KeyD":
      case "ArrowRight":
        setMoveCount(moveCount + 1);
        if (moveCount === 2) {
          setMoveCount(0);
        }
        char.moveRight();

        break;
      case "KeyS":
      case "ArrowDown":
        setMoveCount(moveCount + 1);
        if (moveCount === 2) {
          setMoveCount(0);
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
          title={roomInfo ? roomInfo.title : false}
          text="방 리스트로 가기"
          leftOnClick={handleRoomsPage}
        />
        <Section>
          {characters.map((character) => {
            return (
              <Character
                key={createKey()}
                roomId={character.roomId}
                count={character.moveCount}
                isChatting={character.isChatting}
                x={character.x}
                y={character.y}
                side={character.side}
                name={character.id}
                type={character.type}
              />
            );
          })}
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
  width: 1350px;
  height: 480px;
  margin: 0 auto;
  padding: 70px 50px;
  border-radius: 20px;
  background: url(/assets/pixelArt-bg.png) no-repeat center/cover;
  text-align: center;
  box-shadow: 1px 1px 10px 1px #756f6f;
`;

export default Room;
