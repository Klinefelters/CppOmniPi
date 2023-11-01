import { useEffect, useState } from 'react';
import { Box, Avatar } from "@chakra-ui/react";

export default function Simulator(vx, vy, vr, max_speed) {
  const [x_pos, setXPos] = useState(0);
  const [y_pos, setYPos] = useState(0);
  const [heading, setHeading] = useState(0);

  function AvatarMove(vx, vy, vr, max_speed) {
    
    r_new = heading + vr
    
    x_new = x_pos + (vx * Math.cos(r_new) + vy * Math.sin(r_new))* max_speed
    y_new = y_pos + (vy * Math.cos(r_new) + vx * Math.sin(r_new))* max_speed

  }

  useEffect(() => {
    const interval = setInterval(() => {AvatarMove(vx, vy, vr, max_speed)}, 50);

    return () => {
      clearInterval(interval);
    };
  }, []);


  const avatar_styles = {
    position: "relative",
    left: `${x_pos}px`,
    top: `${y_pos}px`,
    transform: `rotate(${heading}deg)`
  }


  return <div id="simulator">
    <Box w="480" h="640" bg = "black" >
      <Avatar name = 'OmniPi' style={avatar_styles}  />
    </Box>
  </div>;
}
