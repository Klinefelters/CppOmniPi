import { Box, Flex, Spacer, Button, Text } from '@chakra-ui/react'
import Simulator from '../components/Simulator';
import { useState } from 'react';
import { useSpeechRecognition  } from 'react-speech-kit';

export default function Voice() {
  
  const [vx, setVX] = useState(0);
  const [vy, setVY] = useState(0);
  const [vr, setVR] = useState(0);
  const [buttonName, setButtonName] = useState("Start Listening");
  const [displayedText, setDisplayedText] = useState("");
  const [buttonColor, setButtonColor] = useState("green");
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      const command = result.toLowerCase();
      console.log("onResulty")
      setDisplayedText(command);
      if (command.includes('forward')) {
        setVX(1);
      } else if (command.includes('back')) {
        setVX(-1);
      } else if (command.includes('turn right')) {
        setVR(1);
      } else if (command.includes('turn left')) {
        setVR(-1);
      } else if (command.includes('right')) {
        setVY(1);
      } else if (command.includes('left')) {
        setVY(-1);
      } else if (command.includes('stop')) {
        setVX(0);
        setVY(0);
        setVR(0);
      }
    },
  });

  function handleButton () {
    if (listening){
      stop();
      setButtonName("Start Listening");
      setButtonColor("green");
    }else{
      listen();
      setButtonName("Stop Listening");
      setButtonColor("red");
    }
  }

  return (
    <Box bg="black" h="100vh">
      <Spacer h="15px" />
      <Flex>
        <Spacer />
        <Simulator vx={vx} vy={vy} vr={vr} max_speed={10} />
        <Spacer />
      </Flex>
      <Spacer h="15px" />
      <Flex justifyContent="center">
        <Button onClick={handleButton} colorScheme={buttonColor} disabled={listening}>
          {buttonName}
        </Button>
      </Flex>
      <Flex justifyContent="center">
        <Text >
          Heard: {displayedText}
        </Text>
      </Flex>
    </Box>
  );
}