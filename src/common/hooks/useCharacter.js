import { useState } from "react";

import mapSpots from "../../feature/room/resource/mapSpot";
import { randomPos } from "../utils/randomPos";

export const useCharacter = () => {
  const [pos, setPos] = useState(randomPos(mapSpots));
  const [side, setSide] = useState("down");
  const [isChatting, setIsChatting] = useState(false);
  const [chairZone, setChairZone] = useState("");

  const moveUp = () => {
    setPos((pos) => ({
      x: pos.x,
      y: canMove(pos.x, pos.y - 1) ? pos.y - 1 : pos.y,
    }));

    setSide("up");
  };

  const moveDown = () => {
    setPos((pos) => ({
      x: pos.x,
      y: canMove(pos.x, pos.y + 1) ? pos.y + 1 : pos.y,
    }));

    setSide("down");
  };

  const moveRight = () => {
    setPos((pos) => ({
      x: canMove(pos.x + 1, pos.y) ? pos.x + 1 : pos.x,
      y: pos.y,
    }));

    setSide("right");
  };

  const moveLeft = () => {
    setPos((pos) => ({
      x: canMove(pos.x - 1, pos.y) ? pos.x - 1 : pos.x,
      y: pos.y,
    }));

    setSide("left");
  };

  const canMove = (x, y) => {
    if (mapSpots[y] !== undefined || mapSpots[y][x] !== undefined) {
      if (mapSpots[y][x] === 1) {
        setChairZone("");
        setIsChatting(false);

        return true;
      }
      if (mapSpots[y][x] === 2) {
        setChairZone("top");
        setIsChatting(true);

        return true;
      } else if (mapSpots[y][x] === 3) {
        setChairZone("right");
        setIsChatting(true);

        return true;
      } else if (mapSpots[y][x] === 4) {
        setChairZone("bottom");
        setIsChatting(true);

        return true;
      } else if (mapSpots[y][x] === 5) {
        setChairZone("left");
        setIsChatting(true);

        return true;
      }
    }

    return false;
  };

  return {
    x: pos.x,
    y: pos.y,
    side,
    chairZone,
    isChatting,
    moveLeft,
    moveRight,
    moveDown,
    moveUp,
  };
};
