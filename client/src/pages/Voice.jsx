import { Box, Flex, Spacer, Button, Text } from '@chakra-ui/react';
import CombinedControl from '../components/CombinedControl';
import { useState, useEffect } from 'react';
import annyang from 'annyang';

export default function Voice() {
  const [vx, setVX] = useState(0);
  const [vy, setVY] = useState(0);
  const [vr, setVR] = useState(0);
  const [buttonName, setButtonName] = useState("Start Listening");
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const originalCommands = ['turn left', 'turn right', 'forward', 'backward', 'left', 'right', 'stop'];
    let commands = [...originalCommands]; // Make a copy to avoid modifying the original array
  
    const executeCommand = (command) => {
      switch (command) {
        case 'turn right':
          setVR((vr) => Math.min(Math.max(vr + 1, -1), 1));
          break;
        case 'turn left':
          setVR((vr) => Math.min(Math.max(vr - 1, -1), 1));
          break;
        case 'forward':
          setVY((vy) => Math.min(Math.max(vy + 1, -1), 1));
          break;
        case 'backward':
          setVY((vy) => Math.min(Math.max(vy - 1, -1), 1));
          break;
        case 'right':
          setVX((vx) => Math.min(Math.max(vx + 1, -1), 1));
          break;
        case 'left':
          setVX((vx) => Math.min(Math.max(vx - 1, -1), 1));
          break;
        case 'stop':
          setVX(0);
          setVY(0);
          setVR(0);
          break;
        default:
          break;
      }
    };
  
    annyang.addCallback('result', (phrases) => {
      let string = phrases[0].toLowerCase();
      let displayedCommand = '';
  
      for (const command of commands) {
        if (string.includes(command)) {
          executeCommand(command);
          displayedCommand += `${command} `;
          // Remove the processed command from the string
          string = string.replace(command, '').trim();
        }
      }
  
      setDisplayedText(displayedCommand.trim());
    });
  
    // Start annyang
    annyang.start();
  
    return () => {
      // Clean up annyang when the component unmounts
      annyang.abort();
    };
  }, []); // Empty dependency array ensures this effect runs only once
      
    
  
  function handleButton() {
    if (annyang.isListening()) {
      annyang.abort();
      setButtonName("Start Listening");
    } else {
      annyang.start();
      setButtonName("Stop Listening");
    }
  }

  return (
    <Box bg="black" h="100vh">
      <Spacer h="15px" />
      <Flex>
        <Spacer />
        <CombinedControl vx={vx} vy={vy} vr={vr} max_speed={10} />
        <Spacer />
      </Flex>
      <Spacer h="15px" />
      <Flex justifyContent="center">
        <Button onClick={handleButton} colorScheme={annyang.isListening() ? "red" : "green"}>
          {buttonName}
        </Button>
      </Flex>
      <Flex justifyContent="center">
        <Text>
          Heard: {displayedText}
        </Text>
      </Flex>
    </Box>
  );
}
