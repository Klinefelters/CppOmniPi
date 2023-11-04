import { Box, Flex, Spacer } from "@chakra-ui/react"
import OmniPi from "../components/OmniPi"
import { useState } from "react";
import HandSegmentation from "../components/HandSegmentation";

export default function Video() {

  const [vx, setVX] = useState(0);
  const [vy, setVY] = useState(0);
  const [vr, setVR] = useState(0);
  
  return (
    <Box bg="black" h="100vh">
      <Flex>
        <Spacer />
          <HandSegmentation />
        <Spacer />
      </Flex>
    </Box>
  )
}