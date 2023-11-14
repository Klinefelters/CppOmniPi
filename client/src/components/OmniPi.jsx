import  { useEffect } from 'react';
import axios from 'axios';
import { Box, Image, Flex, Heading } from '@chakra-ui/react';

export default function OmniPi({vx, vy, vr}) {

  const videoUrl = 'http://localhost:8000/video_feed';

  const sendData = () => {
    const data = {
      x: 0,
      y: 0,
      r: 0
    };

    axios.post('http://localhost:8000/control', data)
      .then(response => {
        console.log(response.data); 
      })
      .catch(error => {
        console.error(error); 
      });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      sendData();
    }, 50);

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [vx, vy, vr]);

  return (
    <Box bg="brand.900" p={4} borderRadius='lg'>
      <Flex p={2} alignItems='center'>
        <Heading color="white" size='xl' textAlign={"center"} >OmniPi</Heading>
      </Flex>
      <Image id="videoFeed" src={videoUrl} alt="video_feed"  w="640px" h="480px" />
    </Box>
  );
}