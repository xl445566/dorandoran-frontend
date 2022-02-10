import React, { useEffect, useState } from "react";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Header from "../../common/components/Header";
import Modal from "../../common/components/modal/Modal";
import { authSliceActions } from "../../modules/slice/authSlice";
import { roomListSliceActions } from "../../modules/slice/roomListSlice";
import RoomModal from "../room/RoomModal";
import ChatRoomList from "./ChatRoomList";
import RoomCreate from "./RoomCreate";

const Rooms = () => {
  const roomList = useSelector((state) => state.roomList.roomList);
  const isLoading = useSelector((state) => state.roomList.isLoading);
  const error = useSelector((state) => state.roomList.error);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentAddress = useSelector(
    (state) => state.auth.user.current_address
  );

  const history = useHistory();
  const dispatch = useDispatch();
  const [isCreateRoomModal, setIsCreateRoomModal] = useState(false);
  const [isNotJoinModal, setIsNotJoinModal] = useState(false);

  const handleModalShowChange = () => {
    setIsCreateRoomModal(isCreateRoomModal ? false : true);
  };

  useEffect(() => {
    dispatch(roomListSliceActions.getRooms());
  }, []);

  const handleNextClick = () => {
    dispatch(roomListSliceActions.getNextRooms(roomList));
  };

  const handlePrevClick = () => {
    dispatch(roomListSliceActions.getPrevRooms(roomList));
  };

  const handleRefreshClick = () => {
    dispatch(roomListSliceActions.getFreshRooms(roomList));
  };

  const handleLogout = () => {
    window.Kakao.API.request({
      url: "/v1/user/unlink",
      success: function () {
        dispatch(authSliceActions.logoutRequest());
      },
    });
  };

  const changeJoinModalDisplay = () => {
    isNotJoinModal ? setIsNotJoinModal(false) : setIsNotJoinModal(true);
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
      {isNotJoinModal && (
        <Modal size="small">
          <RoomModal onClick={changeJoinModalDisplay} />
        </Modal>
      )}
      <RoomCreate
        isShow={isCreateRoomModal}
        handleModalShowChange={handleModalShowChange}
      />
      <Header
        leftOnClick={handleModalShowChange}
        centerOnClick={handleRefreshClick}
        rightOnClick={handleLogout}
        title={`${currentAddress} 노인정`}
        text="방 만들기"
        size="small"
        type="refresh"
      />
      <MainBody>
        <button onClick={handlePrevClick}>
          <FaChevronLeft size="60" className="icon" />
        </button>
        {!isLoading && (
          <ChatRoomList
            setIsShowModal={setIsNotJoinModal}
            roomList={roomList}
          />
        )}
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
  align-items: center;

  .icon {
    color: var(--black-color);
  }
`;

export default Rooms;
