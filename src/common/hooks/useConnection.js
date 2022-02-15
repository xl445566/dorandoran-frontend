import { useEffect, useRef, useState } from "react";

import Peer from "simple-peer";

import { socketVideoApi } from "../../modules/api/socketApi";
import { socketVideo } from "../../modules/saga/socketSaga";

const useConnection = (roomId) => {
  const myVideo = useRef();
  const connectionList = useRef([]);
  const [peerList, setPeerList] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        myVideo.current.srcObject = stream;
        socketVideoApi.enterRoom(roomId);

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

        socketVideo.on("exitRoom", (partnerId) => {
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
        });
      } catch (error) {
        console.log(error);
      }
    };

    init();

    return () => {
      connectionList.current = [];
      setPeerList([]);

      socketVideo.off("enterRoom");
      socketVideo.off("offer");
      socketVideo.off("answer");
      socketVideo.off("exitRoom");

      socketVideoApi.leaveRoom();
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
  };
};

export default useConnection;
