import { useEffect, useRef, useState, forwardRef } from "react";
// import ReactAudioPlayer from "react-audio-player";

const AudioPlayer = forwardRef(({ sourceLink }, ref) => {
  const audioRef = useRef(ref || null);
  const [currentTimeStamp, setCurrentTimeStamp] = useState(0);

  useEffect(() => {
    const audioEl = audioRef?.current.audioEl.current;
    setCurrentTimeStamp(audioEl.currentTime);
  }, [audioRef.current]);

  const handleListen = (e) => {
    setCurrentTimeStamp;
  };

  return (
    <>
      <p>Current Time: {currentTimeStamp}</p>
    </>
  );
});

export default AudioPlayer;
