import { useState, useEffect } from "react";

import mapSpots from "../utils/mapSpot";
import { randomPos } from "../utils/randomPos";

export const useCharacter = (username) => {
  const [pos, setPos] = useState(randomPos(mapSpots));
  const [side, setSide] = useState("down");
  const [name, setName] = useState(username);
  const [isChatting, setIsChatting] = useState(false);
  const [chairZone, setChairZone] = useState("");

  useEffect(() => {
    setName(username);
  }, [username]);

  const moveLeft = () => {
    setPos((pos) => ({
      x: canMove(pos.x - 1, pos.y) ? pos.x - 1 : pos.x,
      y: pos.y,
    }));

    setSide("left");
  };

  const moveRight = () => {
    setPos((pos) => ({
      x: canMove(pos.x + 1, pos.y) ? pos.x + 1 : pos.x,
      y: pos.y,
    }));

    setSide("right");
  };

  const moveDown = () => {
    setPos((pos) => ({
      x: pos.x,
      y: canMove(pos.x, pos.y + 1) ? pos.y + 1 : pos.y,
    }));

    setSide("down");
  };

  const moveUp = () => {
    setPos((pos) => ({
      x: pos.x,
      y: canMove(pos.x, pos.y - 1) ? pos.y - 1 : pos.y,
    }));

    setSide("up");
  };

  const canMove = (x, y) => {
    if (mapSpots[y] !== undefined || mapSpots[y][x] !== undefined) {
      if (mapSpots[y][x] === 1) {
        setChairZone("");
        setIsChatting(false);

        return true;
      }
      if (mapSpots[y][x] === 2) {
        setIsChatting(true);
        setChairZone("top");

        return true;
      } else if (mapSpots[y][x] === 3) {
        setIsChatting(true);
        setChairZone("right");

        return true;
      } else if (mapSpots[y][x] === 4) {
        setIsChatting(true);
        setChairZone("bottom");

        return true;
      } else if (mapSpots[y][x] === 5) {
        setIsChatting(true);
        setChairZone("left");

        return true;
      }
    }

    return false;
  };

  return {
    name,
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
