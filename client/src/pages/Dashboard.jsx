import { EditIcon, ChatIcon, ViewIcon, AddIcon } from '@chakra-ui/icons'
import { 
  SimpleGrid,
  Card, 
  CardHeader,
  CardBody,
  CardFooter,
  Button
} from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import { useLoaderData } from "react-router-dom"

export default function Dashboard() {
  const tasks = useLoaderData()

  return (
    <SimpleGrid spacing={10} minChildWidth={300} w ="100hv">
        <Card>
            <CardHeader>
                Controller
            </CardHeader>

            <CardBody>
                <AddIcon as={EditIcon} color="brand.300" />
            </CardBody>

            <CardFooter>
                <NavLink to="controller">
                    <Button colorScheme="blue">Visit</Button>
                </NavLink>
            </CardFooter>

        </Card>

        <Card>
            <CardHeader>
                Video
            </CardHeader>

            <CardBody>
                <AddIcon as={ViewIcon} color="brand.300" />
            </CardBody>

            <CardFooter>
                <NavLink to="video">
                <Button colorScheme="blue">Visit</Button>
                </NavLink>
            </CardFooter>

        </Card>

        <Card>
            <CardHeader>
                Voice
            </CardHeader>

            <CardBody>
                <AddIcon as={ChatIcon} color="brand.300" />
            </CardBody>

            <CardFooter>
                <NavLink to="voice">
                <Button colorScheme="blue">Visit</Button>
                </NavLink>
            </CardFooter>

        </Card>
    </SimpleGrid>
  )
}