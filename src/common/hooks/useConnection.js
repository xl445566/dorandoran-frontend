import { useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import Peer from "simple-peer";

import { socketVideoApi } from "../../modules/api/socketApi";
import { socketVideo } from "../../modules/saga/socketSaga";
import { videoSliceActions } from "../../modules/slice/videoSlice";

const useConnection = (roomId, userName) => {
  const myVideo = useRef();
  const connectionList = useRef([]);
  const [peerList, setPeerList] = useState([]);
  const [participants, setParticipants] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        myVideo.current.srcObject = stream;
        socketVideoApi.enterRoom(roomId, userName);

        socketVideo.on("participants", (participantObj) => {
          setParticipants(participantObj);
        });

        socketVideo.on("enterRoom", (otherUsers) => {
          const peers = [];

          otherUsers.forEach((partnerId) => {
            const peer = createSenderPeer(partnerId, socketVideo.id, stream);

            connectionList.current.push({
              id: partnerId,
              peer,
            });

            peers.push({
              id: partnerId,
              peer,
            });
          });

          setPeerList(peers);
        });

        socketVideo.on("offer", (payload) => {
          const peer = createReceivePeer(
            payload.signal,
            payload.caller,
            stream
          );

          const connection = {
            id: payload.caller,
            peer,
            stream,
          };

          connectionList.current.push(connection);
          setPeerList((peerList) => [...peerList, connection]);
        });

        socketVideo.on("answer", (payload) => {
          const connection = connectionList.current.find(
            (connection) => connection.id === payload.caller
          );

          connection.peer.signal(payload.signal);
        });

        socketVideo.on("exitRoom", (partnerId, participantObj) => {
          const disConnection = connectionList.current.find(
            (connection) => connection.id === partnerId
          );
          const updateConnectionList = connectionList.current.filter(
            (connection) => connection.id !== partnerId
          );

          connectionList.current = updateConnectionList;

          if (disConnection) {
            disConnection.peer.destroy();
          }

          setPeerList((peerConnection) =>
            peerConnection.filter((peer) => peer.id !== partnerId)
          );

          setParticipants(participantObj);
        });
      } catch (error) {
        dispatch(videoSliceActions.saveError(error));
      }
    };

    init();

    return () => {
      connectionList.current = [];
      setPeerList([]);
      setParticipants({});

      socketVideo.off("participants");
      socketVideo.off("enterRoom");
      socketVideo.off("offer");
      socketVideo.off("answer");
      socketVideo.off("exitRoom");

      socketVideoApi.leaveRoom(userName);
    };
  }, []);

  const createSenderPeer = (partnerId, myId, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketVideoApi.offer({
        target: partnerId,
        caller: myId,
        signal,
      });
    });

    return peer;
  };

  const createReceivePeer = (partnerSignal, caller, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketVideoApi.answer({
        signal,
        target: caller,
      });
    });

    peer.signal(partnerSignal);

    return peer;
  };

  return {
    peerList,
    myVideo,
    participants,
  };
};

export default useConnection;
