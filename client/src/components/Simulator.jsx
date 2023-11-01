import { useEffect, useState } from 'react';
import { Box, Avatar } from "@chakra-ui/react";

export default function Simulator({ vx, vy, vr, max_speed }) {
  const [xPos, setXPos] = useState(295);
  const [yPos, setYPos] = useState(215);
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    let animationFrame;

    const updateAvatar = () => {
      if (vx !== 0 || vy !== 0 || vr !== 0) {
        AvatarMove(vx, vy, vr, max_speed);
        animationFrame = requestAnimationFrame(updateAvatar);
      } else {
        cancelAnimationFrame(animationFrame);
      }
    }

    animationFrame = requestAnimationFrame(updateAvatar);

    return () => cancelAnimationFrame(animationFrame);
  }, [vx, vy, vr, max_speed]);

  function AvatarMove(vx, vy, vr, max_speed) {
    setHeading(prevHeading => {
        const rNew = prevHeading + vr * 5;
        return rNew;
    });

    setXPos(prevXPos => {
        const cosR = Math.cos(heading * Math.PI / 180);
        const sinR = Math.sin(heading * Math.PI / 180);
        const xNew = prevXPos + max_speed * (vx * cosR + vy * sinR);
        // Ensure xNew is within valid bounds
        return Math.min(Math.max(xNew, 0), 590);
    });

    setYPos(prevYPos => {
        const cosR = Math.cos(heading * Math.PI / 180);
        const sinR = Math.sin(heading * Math.PI / 180);
        const yNew = prevYPos + max_speed * (-vy * cosR + vx * sinR);
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
    <div id="simulator">
      <Box w="640px" h="480px" bg="black">
        <Avatar name='Omni Pi' style={avatarStyles} />
      </Box>
    </div>
  );
}