import { SimpleGrid} from "@chakra-ui/react"
import CustomCard from "../components/CustomCard"

export default function Dashboard() {

  return (
    <SimpleGrid spacing={10} minChildWidth={300} w ="100hv">
        <CustomCard name="Controller" img="/img/Sim.png" link="controller"/>
        <CustomCard name="Voice" img="/img/Sim.png" link="voice"/>
        <CustomCard name="Video" img="/img/Sim.png" link="video"/>
        <CustomCard name="Touch" img="/img/Touch.png" link="touch"/>
        <CustomCard name="Keyboard" img="/img/Sim.png" link="keyboard"/>
    </SimpleGrid>
  )
}