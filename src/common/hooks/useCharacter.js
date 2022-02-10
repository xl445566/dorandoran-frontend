import { useState, useEffect } from "react";

import { mapSpots } from "../../data/mapSpot";

export const useCharacter = (username) => {
  const [pos, setPos] = useState({ x: 3, y: 5 });
  const [side, setSide] = useState("down");
  const [name, setName] = useState(username);

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
        return true;
      }

      if (mapSpots[y][x] === 2) {
        alert("의자 입니다 !");
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
    moveLeft,
    moveRight,
    moveDown,
    moveUp,
  };
};
