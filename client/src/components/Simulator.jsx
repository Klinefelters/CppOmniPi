import { useEffect, useState, useRef } from 'react';
import { Box, Avatar } from "@chakra-ui/react";

export default function Simulator({ vx, vy, vr, max_speed }) {
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const [heading, setHeading] = useState(0);

  const vxRef = useRef(vx);
  const vyRef = useRef(vy);
  const vrRef = useRef(vr);
  const maxSpeedRef = useRef(max_speed);

  useEffect(() => {
    // Update the refs whenever the state values change
    vxRef.current = vx;
    vyRef.current = vy;
    vrRef.current = vr;
    maxSpeedRef.current = max_speed;
  }, [vx, vy, vr, max_speed]);

  useEffect(() => {
    const interval = setInterval(() => {
        // Use the latest values from the refs in the interval
        AvatarMove(vxRef.current, vyRef.current, vrRef.current, maxSpeedRef.current);
    }, 50);

    return () => clearInterval(interval);
  }, []);  // Empty dependency array ensures this effect runs only once after component mounts.

  function AvatarMove(vx, vy, vr, max_speed) {
    console.log("Initial: x: ", xPos, "| y:", yPos, "| r:", heading)
    setHeading(prevHeading => {
        const rNew = prevHeading + vr * 5;
        return rNew;
    });

    setXPos(prevXPos => {
        const cosR = Math.cos(heading * Math.PI / 180);
        const sinR = Math.sin(heading * Math.PI / 180);
        const xNew = prevXPos + max_speed * (vx * cosR + -vy * sinR);
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

    console.log("Ending: x: ", xPos, "| y:", yPos, "| r:", heading)
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