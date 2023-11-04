import React, { useRef, useEffect } from "react";
import handTrack from "handtrackjs";
import Webcam from "react-webcam";

export default function HandSegmentation() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const runHandTracking = async () => {
      const video = webcamRef.current.video;
      const canvas = canvasRef.current;
      const model = await handTrack.load();

      model.detect(video).then((predictions) => {
        model.renderPredictions(predictions, canvas, context, video);
      });
    };

    runHandTracking();
  }, []);

  return (
    <div>
      <Webcam ref={webcamRef} style={{ display: "none" }} />
      <canvas ref={canvasRef} />
    </div>
  );
}
