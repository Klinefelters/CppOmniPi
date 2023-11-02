import { Box, SimpleGrid} from "@chakra-ui/react"
import CustomCard from "../components/CustomCard"

export default function Dashboard() {

  return (
    <Box bg="black" h="100vh">
      <SimpleGrid spacing={10} p="10" minChildWidth={400} w ="100hv" bg="black">
        <CustomCard name="Controller" img="/img/Controller.png" link="controller"/>
        <CustomCard name="Voice" img="/img/Voice.png" link="voice"/>
        <CustomCard name="Video" img="/img/Video.png" link="video"/>
        <CustomCard name="Touch" img="/img/Touch.png" link="touch"/>
        <CustomCard name="Keyboard" img="/img/Keyboard.png" link="keyboard"/>
      </SimpleGrid>
    </Box>
  )
}