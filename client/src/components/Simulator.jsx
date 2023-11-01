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
    //console.log('vx:', vx, '| vy:', vy, '| vr:', vr);
    //console.log('ix:', xPos, '| iy:', yPos, '| iheading:', heading);
    const rNew = heading + vr * 5;
  
    const cosR = Math.cos(rNew * Math.PI / 180);
    const sinR = Math.sin(rNew * Math.PI / 180);
  
    const xNew = xPos + max_speed * (vx * cosR + -vy * sinR);
    const yNew = yPos + max_speed * (-vy * cosR + vx * sinR);
  
    // Ensure xNew and yNew are within valid bounds
    const newXPos = Math.min(Math.max(xNew, 0), 590);
    const newYPos = Math.min(Math.max(yNew, 0), 430);
  
    setHeading(rNew);
    setXPos(newXPos);
    setYPos(newYPos);
    console.log('Avatar Move: x:', newXPos, '| y:', newYPos, '| heading:', rNew);
  } 

  useEffect(() => {
    function handleAvatarMove() {
        AvatarMove(vx, vy, vr, max_speed);
    }

    const interval = setInterval(handleAvatarMove, 50);

    return () => clearInterval(interval);
  }, []);

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