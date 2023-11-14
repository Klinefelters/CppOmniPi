import { useState, useEffect } from "react";
import { Box, Flex, Spacer } from '@chakra-ui/react'
import CombinedControl from "../components/CombinedControl";

export default function Keyboard() {

  const [vx, setVX] = useState(0);
  const [vy, setVY] = useState(0);
  const [vr, setVR] = useState(0);

  const handleKeyPress = (event) => {
    // Check if a specific key is pressed
    if (event.key === 'a') {setVX(-1);}
    if (event.key === 'd') {setVX(1);}
    if (event.key === 'q') {setVR(-1);}
    if (event.key === 'e') {setVR(1);}
    if (event.key === 'w') {setVY(1);}
    if (event.key === 's') {setVY(-1);}
  };

  // Define a function to handle key releases
  const handleKeyRelease = (event) => {
    if (event.key === 'a') {setVX(0);}
    if (event.key === 'd') {setVX(0);}
    if (event.key === 'q') {setVR(0);}
    if (event.key === 'e') {setVR(0);}
    if (event.key === 'w') {setVY(0);}
    if (event.key === 's') {setVY(0);}
  };

  // Add the keydown event listener when the component mounts
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', handleKeyRelease);

    // Remove the event listeners when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keyup', handleKeyRelease);
    };
  }, []);


  return (
    <Box bg="black" h="100vh">
      <Spacer h="15px"/>
      <Flex>
        <Spacer />
        <CombinedControl vx={vx} vy={vy} vr={vr}/>
        <Spacer />
      </Flex>
      
    </Box>
  );
}
