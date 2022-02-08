export const makeRandomRoomName = () => {
  const roomNames = [
    " 님의 수다방",
    " 님의 사랑방",
    " 님의 앞마당",
    " 님의 행복방",
    " 님의 여기모여방",
    " 님의 소망방",
    " 님의 대화방",
    " 님의 자랑방",
    " 님의 토크방",
    " 님의 이야기방",
    " 님의 비밀얘기방",
    " 님의 일루와방",
  ];

  const randomIndex = Math.floor(Math.random() * 13);

  return roomNames[randomIndex];
};

export const makeRandomRoomImage = () => {
  const roomImages = [
    "/assets/cards/card1.png",
    "/assets/cards/card2.png",
    "/assets/cards/card3.png",
    "/assets/cards/card4.png",
    "/assets/cards/card5.png",
    "/assets/cards/card6.png",
    "/assets/cards/card7.png",
    "/assets/cards/card8.png",
    "/assets/cards/card9.png",
    "/assets/cards/card10.png",
    "/assets/cards/card11.png",
    "/assets/cards/card12.png",
  ];

  const randomIndex = Math.ceil(Math.random() * 11);

  return roomImages[randomIndex];
};
