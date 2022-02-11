export const setMediaStream = (videoEl) => {
  const getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

  getUserMedia({ video: true }, (stream) => {
    videoEl.srcObject = stream;
  });
};

export const peerCall = (peer, remotePeerId, video1, video2, video3) => {
  const getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

  getUserMedia({ video: true }, (myStream) => {
    const call = peer.call(remotePeerId, myStream);

    call.on("stream", (remoteStream) => {
      if (!video1.srcObject) {
        video1.srcObject = remoteStream;
      } else if (!video2.srcObject) {
        video2.srcObject = remoteStream;
      } else if (!video3.srcObject) {
        video3.srcObject = remoteStream;
      }
    });

    call.on("close", () => {
      console.log("먼저 있던 친구가 나갑니다.", call);
      call.close();
    });
  });
};

export const peerAnswer = (call, video1, video2, video3) => {
  navigator.getUserMedia({ video: true }, (myStream) => {
    call.answer(myStream);

    call.on("stream", (remoteStream) => {
      if (!video1.srcObject) {
        video1.srcObject = remoteStream;
      } else if (!video2.srcObject) {
        video2.srcObject = remoteStream;
      } else if (!video3.srcObject) {
        video3.srcObject = remoteStream;
      }
    });

    call.on("close", () => {
      console.log("나중에 온 친구가 먼저 나갑니다.", call);
      call.close();
    });
  });
};

export const handlePeerDisconnect = (peer) => {
  for (let conns in peer.connections) {
    peer.connections[conns].forEach((conn) => {
      conn.peerConnection.close();

      if (conn.close) {
        conn.close();
      }
    });
  }
};
