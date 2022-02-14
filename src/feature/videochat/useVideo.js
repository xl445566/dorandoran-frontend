import { useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import Peer from "simple-peer";

import { socketVideoApi } from "../../modules/api/socketApi";
import { socketVideo } from "../../modules/saga/socketSaga";
import { videoSliceActions } from "../../modules/slice/videoSlice";

const useVideo = (roomId) => {
  const dispatch = useDispatch();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const [peers, setPeers] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        userVideo.current.srcObject = stream;

        socketVideoApi.enterRoom(roomId);

        socketVideo.on("currentVideoChatParticipants", (participants) => {
          console.log("현재 참가자 알림 (currentVideoChatParticippants");
          const onlinePeers = [];

          participants.forEach((participantID) => {
            const newPeer = createPeer(participantID, socketVideo.id, stream);

            peersRef.current.push({
              peerID: participantID,
              peer: newPeer,
            });

            onlinePeers.push({
              peerID: participantID,
              peer: newPeer,
            });
          });

          setPeers(onlinePeers);
        });

        socketVideo.on("newVideoChatParticipant", (payload) => {
          console.log("새로운 참가자 알림 (newVideoChatParticipant");
          const newPeer = addPeer(payload.signal, payload.callerID, stream);

          const peerObj = {
            peerID: payload.callerID,
            peer: newPeer,
          };

          peersRef.current.push(peerObj);

          setPeers((peers) => [...peers, peerObj]);
        });

        socketVideo.on("receivingReturnedSignalToConnectWebRTC", (payload) => {
          console.log(
            "신호를 받고 내 신호를 보냅니다. receivingReturnedSignalToConnectWebRTC"
          );
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });

        socketVideo.on("participantLeft", (id) => {
          console.log("이탈자 발생");
          const peerObj = peersRef.current.find((p) => p.peerID === id);
          const peers = peersRef.current.filter((p) => p.peerID !== id);

          peersRef.current = peers;

          if (peerObj) {
            peerObj.peer.destroy();
          }

          setPeers((peers) => peers.filter((peer) => peer.peerID !== id));
        });
      } catch (error) {
        console.log("init error :::::::", error);
      }
    };

    init();

    return () => {
      peersRef.current = [];
      setPeers([]);

      dispatch(videoSliceActions.leaveVideoChat());

      // socketVideo.removeAllListeners("currentVideoChatParticipants");
      // socketVideo.removeAllListeners("newVideoChatParticipant");
      // socketVideo.removeAllListeners("receivingReturnedSignalToConnectWebRTC");
      // socketVideo.removeAllListeners("participantLeft");
      socketVideo.off("currentVideoChatParticipants");
      socketVideo.off("newVideoChatParticipant");
      socketVideo.off("receivingReturnedSignalToConnectWebRTC");
      socketVideo.off("participantLeft");

      socketVideoApi.leaveVideoChat();
    };
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketVideoApi.sendingSignalToConnectWebRTC({
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.signal(incomingSignal);
    peer.on("signal", (signal) => {
      socketVideoApi.returningSignalToConnectWebRTC({ signal, callerID });
    });

    return peer;
  }

  return {
    peers,
    userVideo,
  };
};

export default useVideo;
