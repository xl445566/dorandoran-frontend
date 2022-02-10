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
    " 님의 놀러와방",
  ];

  const randomIndex = Math.floor(Math.random() * 13);

  return roomNames[randomIndex];
};

export const makeRandomRoomImage = () => {
  const roomImages = [
    [
      "/assets/cards/card1.png",
      "채팅 프로필 이미지 - 자전거 타는 어르신 이미지",
    ],
    [
      "/assets/cards/card2.png",
      "채팅 프로필 이미지 - 화상 채팅 하는 어르신 이미지",
    ],
    ["/assets/cards/card3.png", "채팅 프로필 이미지 - 여행 가는 어르신 이미지"],
    ["/assets/cards/card4.png", "채팅 프로필 이미지 - 운동하는 어르신 이미지"],
    ["/assets/cards/card5.png", "채팅 프로필 이미지 - 휴식하는 어르신 이미지"],
    ["/assets/cards/card6.png", "채팅 프로필 이미지 - 요가하는 어르신 이미지"],
    ["/assets/cards/card7.png", "채팅 프로필 이미지 - 등산 하는 어르신 이미지"],
    [
      "/assets/cards/card8.png",
      "채팅 프로필 이미지 - 서로 대화하는 어르신 이미지",
    ],
    [
      "/assets/cards/card9.png",
      "채팅 프로필 이미지 - 화분을 가꾸는 어르신 이미지",
    ],
    ["/assets/cards/card10.png", "채팅 프로필 이미지 - 산책하는 어르신 이미지"],
    ["/assets/cards/card11.png", "채팅 프로필 이미지 - 체스하는 어르신 이미지"],
    ["/assets/cards/card12.png", "채팅 프로필 이미지 - 활발한 어르신 이미지"],
  ];

  const randomIndex = Math.ceil(Math.random() * 11);

  return roomImages[randomIndex];
};
