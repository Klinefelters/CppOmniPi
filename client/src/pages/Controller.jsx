import { useState, useEffect } from "react";
import { Box, Flex, Spacer } from '@chakra-ui/react';
import CombinedControl from "../components/CombinedControl";

export default function Controller() {

  const [leftJoystickPosition, setLeftJoystickPosition] = useState({ x: 0, y: 0 });
  const [rightJoystickPosition, setRightJoystickPosition] = useState({ x: 0, y: 0 });

  const updateJoystickPosition = () => {
    if (navigator.getGamepads) {
      const gamepad = navigator.getGamepads()[0]; // Assuming there's only one connected gamepad
      if (gamepad) {
        const lxAxis = Math.abs(gamepad.axes[0]) < 0.1 ? 0 : gamepad.axes[0];
        const lyAxis = Math.abs(gamepad.axes[1]) < 0.1 ? 0 : gamepad.axes[1];
        const rxAxis = Math.abs(gamepad.axes[2]) < 0.1 ? 0 : gamepad.axes[2];
        const ryAxis = Math.abs(gamepad.axes[3]) < 0.1 ? 0 : gamepad.axes[3];

        setLeftJoystickPosition({ x: lxAxis, y: lyAxis });
        setRightJoystickPosition({ x: rxAxis, y: ryAxis });
      }
    }
  };

  // Attach event listener to update joystick position
  useEffect(() => {
    const gamepadInterval = setInterval(updateJoystickPosition, 50); // Adjust the interval as needed
    return () => clearInterval(gamepadInterval);
  }, []);


  return (
    <Box bg="black" h="100vh">
      <Spacer h="15px"/>
      
      <Flex>
        <Spacer />
        <CombinedControl vx={leftJoystickPosition.x} vy={-leftJoystickPosition.y} vr={rightJoystickPosition.x} />
        <Spacer />
      </Flex>
    </Box>
  );
}
