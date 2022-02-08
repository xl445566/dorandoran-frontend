import React, { useEffect, useState } from "react";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Header from "../../common/components/Header";
import { authSliceActions } from "../../modules/slice/authSlice";
import { roomSliceActions } from "../../modules/slice/roomSlice";
import ChatRoomList from "./ChatRoomList";
import RoomCreate from "./RoomCreate";

const Rooms = () => {
  const roomList = useSelector((state) => state.room.roomList);
  const isLoading = useSelector((state) => state.room.isLoading);
  const error = useSelector((state) => state.room.error);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentAddress = useSelector(
    (state) => state.auth.user.current_address
  );

  const history = useHistory();
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);

  const handleModalShowChange = () => {
    setIsShow(isShow ? false : true);
  };

  useEffect(() => {
    dispatch(roomSliceActions.getRooms());
  }, []);

  const handleNextClick = () => {
    dispatch(roomSliceActions.getNextRooms(roomList));
  };

  const handlePrevClick = () => {
    dispatch(roomSliceActions.getPrevRooms(roomList));
  };

  const handleRefreshClick = () => {
    dispatch(roomSliceActions.getFreshRooms(roomList));
  };

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

  return (
    <Entry>
      <RoomCreate
        isShow={isShow}
        handleModalShowChange={handleModalShowChange}
      />
      <Header
        leftOnClick={handleModalShowChange}
        centerOnClick={handleRefreshClick}
        rightOnClick={handleLogout}
        title={`${currentAddress} 노인정`}
        text="방 만들기"
      />
      <MainBody>
        <button onClick={handlePrevClick}>
          <FaChevronLeft size="60" className="icon" />
        </button>
        {!isLoading && <ChatRoomList roomList={roomList} />}
        <button onClick={handleNextClick}>
          <FaChevronRight size="60" className="icon" />
        </button>
      </MainBody>
    </Entry>
  );
};

const Entry = styled.main`
  height: 100%;
  background-color: #f6f8f9;
  color: var(--black-color);
`;

const MainBody = styled.section`
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;

  .icon {
    color: var(--black-color);
  }
`;

export default Rooms;
