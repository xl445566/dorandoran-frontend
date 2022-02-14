import React, { useRef, useEffect } from "react";

const Video = ({ peer }) => {
  const ref = useRef();

  useEffect(() => {
    peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });

    return () => {
      ref.current = null;
    };
  }, []);

  return <video autoPlay playsInline ref={ref}></video>;
};

export default Video;
