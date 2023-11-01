import { SimpleGrid} from "@chakra-ui/react"
import CustomCard from "../components/CustomCard"

export default function Dashboard() {

  return (
    <SimpleGrid spacing={10} p="10" minChildWidth={400} w ="100hv" bg="brand.600">
        <CustomCard name="Controller" img="/img/Sim.png" link="controller"/>
        <CustomCard name="Voice" img="/img/Sim.png" link="voice"/>
        <CustomCard name="Video" img="/img/Sim.png" link="video"/>
        <CustomCard name="Touch" img="/img/Touch.png" link="touch"/>
        <CustomCard name="Keyboard" img="/img/Sim.png" link="keyboard"/>
    </SimpleGrid>
  )
}