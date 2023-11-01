import { useState } from "react";
import { Joystick } from 'react-joystick-component';
import Simulator from '../components/Simulator';
import { Flex, Spacer } from '@chakra-ui/react'

export default function Controller() {

  const [vx, setVX] = useState(0);
  const [vy, setVY] = useState(0);
  const [vr, setVR] = useState(0);

  const handleRightMove = (e) => {
    setVR(e.x)
    console.log('Joystick: vx:', vx, '| vy:', vy, '| vr:', vr);

  };

  const handleLeftMove = (e) => {

    setVX(e.x)
    setVY(e.y)
    console.log('Joystick: vx:', vx, '| vy:', vy, '| vr:', vr);

  };
  
  const handleRightStop = () => {
    setVR(0)
    console.log('Joystick: vx:', vx, '| vy:', vy, '| vr:', vr);

  };

  const handleLeftStop = () => {
    setVX(0)
    setVY(0)
    console.log('Joystick: vx:', vx, '| vy:', vy, '| vr:', vr);

  };


  return (
    <div>
      <Flex>
        <Spacer />
        <Simulator vx={vx} vy={vy} vr={vr} max_speed={10} />
        <Spacer />
      </Flex>
      

      <Flex>
        <Spacer />
        <Joystick move = {handleLeftMove} stop = {handleLeftStop}/>
        <Spacer />
        <Joystick move = {handleRightMove} stop = {handleRightStop}/>
        <Spacer />
      </Flex>
    </div>
  );
}
