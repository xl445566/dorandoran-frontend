import React, { useRef, useEffect } from "react";

const Video = ({ peerConnection }) => {
  const videoRef = useRef();

  useEffect(() => {
    peerConnection.on("stream", (stream) => {
      videoRef.current.srcObject = stream;
    });

    return () => {
      videoRef.current = null;
    };
  }, []);

  return <video autoPlay playsInline ref={videoRef}></video>;
};

export default Video;
