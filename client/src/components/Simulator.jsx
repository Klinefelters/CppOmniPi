import { useEffect, useState } from 'react';
import { Box, Avatar, Heading, Flex, Divider } from "@chakra-ui/react";
import Settings from "./simulator/Settings"

export default function Simulator({ vx, vy, vr}) {
  const initialsettings = {
    MaxSpeed: 15,
    MaxRotationalSpeed: 15,
  };

  const [settings, setsettings] = useState(initialsettings);

  const handleSettingsChange = (key, value) => {
    setsettings({
      ...settings,
      [key]: value,
    });
  };
  const [xPos, setXPos] = useState(295);
  const [yPos, setYPos] = useState(215);
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    let animationFrame;

    const updateAvatar = () => {
      if (vx !== 0 || vy !== 0 || vr !== 0) {
        AvatarMove(vx, vy, vr);
        animationFrame = requestAnimationFrame(updateAvatar);
      } else {
        cancelAnimationFrame(animationFrame);
      }
    }

    animationFrame = requestAnimationFrame(updateAvatar);

    return () => cancelAnimationFrame(animationFrame);
  }, [vx, vy, vr]);

  function AvatarMove(vx, vy, vr) {
    setHeading(prevHeading => {
        const rNew = prevHeading + vr * settings["MaxRotationalSpeed"];
        return rNew;
    });

    setXPos(prevXPos => {
        const cosR = Math.cos(heading * Math.PI / 180);
        const sinR = Math.sin(heading * Math.PI / 180);
        const xNew = prevXPos + settings["MaxSpeed"] * (vx * cosR + vy * sinR);
        // Ensure xNew is within valid bounds
        return Math.min(Math.max(xNew, 0), 590);
    });

    setYPos(prevYPos => {
        const cosR = Math.cos(heading * Math.PI / 180);
        const sinR = Math.sin(heading * Math.PI / 180);
        const yNew = prevYPos + settings["MaxSpeed"] * (-vy * cosR + vx * sinR);
        // Ensure yNew is within valid bounds
        return Math.min(Math.max(yNew, 0), 430);
    });
  } 

  const avatarStyles = {
    position: "relative",
    left: `${xPos}px`,
    top: `${yPos}px`,
    transform: `rotate(${heading}deg)`
  }

  return (
    <Box id="simulator" bg="brand.900">
      <Flex>
        <Heading color="white" h="15" textAlign={"center"} >Simulator</Heading>
        <Divider />
        <Settings numbers={settings} onNumberChange={handleSettingsChange} />
      </Flex>
      
      <Box w="640px" h="480px" bg="black">
        <Avatar name='Omni Pi' style={avatarStyles} />
      </Box>
    </Box>
  );
}