import { useState } from "react";
import { Joystick } from 'react-joystick-component';
import Simulator from '../components/Simulator';
import { Flex, Spacer } from '@chakra-ui/react'

export default function Keyboard() {

  const [vx, setVX] = useState(0);
  const [vy, setVY] = useState(0);
  const [vr, setVR] = useState(0);


  return (
    <div>
      <Flex>
        <Spacer />
        <Simulator vx={vx} vy={vy} vr={vr} max_speed={10} />
        <Spacer />
      </Flex>
      
    </div>
  );
}
