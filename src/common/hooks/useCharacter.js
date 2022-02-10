import { useState } from "react";

import { useEffect } from "react/cjs/react.development";

import mapSpots from "../utils/mapSpot";

export const useCharacter = (username) => {
  const [pos, setPos] = useState({ x: 1, y: 5 });
  const [side, setSide] = useState("down");
  const [name, setName] = useState(username);
  const [isChatting, setIsChatting] = useState(false);
  const [chairZone, setChairZone] = useState({
    top: false,
    right: false,
    bottom: false,
    left: false,
  });

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
    if (mapSpots[y][x] !== undefined) {
      if (mapSpots[y][x] === 1) {
        setChairZone({ top: false, right: false, bottom: false, left: false });
        setIsChatting(false);

        return true;
      }
      if (mapSpots[y][x] === 2) {
        setIsChatting(true);
        setChairZone({ top: true });

        return true;
      } else if (mapSpots[y][x] === 3) {
        setIsChatting(true);
        setChairZone({ right: true });

        return true;
      } else if (mapSpots[y][x] === 4) {
        setIsChatting(true);
        setChairZone({ bottom: true });

        return true;
      } else if (mapSpots[y][x] === 5) {
        setIsChatting(true);
        setChairZone({ left: true });

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
