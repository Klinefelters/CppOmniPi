import { Box, Heading, Flex, Spacer } from "@chakra-ui/react"
import CombinedControl from "../components/CombinedControl";
import { useState, useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import {drawHand} from "../utilities/handPose"

export default function Video() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [vx, setVX] = useState(0);
  const [vy, setVY] = useState(0);

  useEffect(() => {
    const runHandpose = async () => {
      const net = await handpose.load();

      // Loop and detect hands
      const intervalId = setInterval(() => {
        detect(net);
      }, 10);

      // Clear the interval when the component is unmounted
      return () => clearInterval(intervalId);
    };

    runHandpose();
  }, []); // Run once when the component mounts

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const hand = await net.estimateHands(video);
      
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
      processHandGestures(hand, videoWidth, videoHeight);
    }
  };

  const processHandGestures = (hand, videoWidth, videoHeight) => {
    // Assuming hand[0] is the first detected hand
    if (hand.length > 0) {
      const landmarks = hand[0].landmarks; // Get landmarks of the hand
      console.log("X: " + landmarks[0][0])
      console.log("Y: " + landmarks[0][1])
      // If finger on right third of the screen, robot moves right, if on the left third, it will go left, and otherwise, it will stay put in the x position
      if (landmarks[0][0] > (2*videoWidth) / 3) {
        setVX(1);
      } else if (landmarks[0][0] < videoWidth / 3) {
        setVX(-1);
      } else {
        setVX(0);
      }
  
      // Same as above for y
      if (landmarks[0][1] < videoHeight / 3) {
        setVY(1);
      } else if (landmarks[0][1] > (2*videoHeight) / 3) {
        setVY(-1);
      } else {
        setVY(0);
      }
    }
  };

  return (
    <Flex bg="brand.900">
      <Box w="640" h="480">
        <Heading py="8" color="white" size='lg' textAlign={"center"} >WebCam</Heading>
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            width: 640,
            height: 480,
          }}
        />
        <Box >
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              marginLeft: 0,
              marginRight: "auto",
              left: 0,
              textAlign: "center",
              zIndex: 9,
              width: 640,
              height: 480,
            }}
          />
        </Box>
      </Box>
      <Spacer />
      <CombinedControl vx={vx} vy={vy} vr={0} max_speed={10} />
    </Flex>
  );
}