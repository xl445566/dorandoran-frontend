import React, { useEffect, useState } from "react";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Header from "../../common/components/Header";
import Modal from "../../common/components/modal/Modal";
import { authSliceActions } from "../../modules/slice/authSlice";
import { roomListSliceActions } from "../../modules/slice/roomListSlice";
import { roomSliceActions } from "../../modules/slice/roomSlice";
import RoomModal from "../room/RoomModal";
import ChatRoomList from "./ChatRoomList";
import RoomCreate from "./RoomCreate";

const Rooms = () => {
  const roomList = useSelector((state) => state.roomList.roomList);
  const isLoading = useSelector((state) => state.roomList.isLoading);
  const error = useSelector((state) => state.roomList.error);
  const isComplete = useSelector((state) => state.room.isComplete);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentAddress = useSelector(
    (state) => state.auth.user.current_address
  );

  const history = useHistory();
  const dispatch = useDispatch();
  const [isCreateRoomModal, setIsCreateRoomModal] = useState(false);
  const isShowModal = useSelector((state) => state.room.isShowModal);

  const handleModalShowChange = () => {
    setIsCreateRoomModal(isCreateRoomModal ? false : true);
  };

  useEffect(() => {
    if (isComplete) {
      dispatch(roomSliceActions.changeIsComplted());
    } else {
      dispatch(roomListSliceActions.getRooms());
    }

    if (error) {
      history.push("/error");
    }

    if (!isLoggedIn) {
      history.push("/");
    }
  }, [isComplete, error, isLoggedIn]);

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
    dispatch(roomSliceActions.changeIsShowModal());
  };

  return (
    <Entry>
      {isShowModal && (
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
        <Pagination>
          <button onClick={handlePrevClick}>
            <FaChevronLeft size="60" className="icon" />
          </button>
          {!isLoading && <ChatRoomList roomList={roomList} />}
          <button onClick={handleNextClick}>
            <FaChevronRight size="60" className="icon" />
          </button>
        </Pagination>
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
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .icon {
    color: var(--black-color);
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
`;
export default Rooms;
