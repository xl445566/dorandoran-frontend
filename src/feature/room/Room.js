import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MainHeader from "../rooms/MainHeader";
import Character from "./Character";
import { useCharacter } from "../../common/hooks/useCharacter";

const room = () => {
  const char = useCharacter("교감쌤");
  const [mCount, setMcount] = useState(0);
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
  }, []);

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
        <MainHeader />
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  height: 480px;
  margin: 0 auto;
  padding: 70px 50px;
  border-radius: 20px;
  background: url(/assets/pixelArt-bg1.png) no-repeat center;
  text-align: center;
  box-shadow: 1px 1px 18px 4px #c87247;
`;

export default room;
