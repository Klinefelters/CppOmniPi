import {Card, CardHeader, CardBody, CardFooter, Flex, Spacer, IconButton, Image, Button, Heading} from "@chakra-ui/react"
import { SettingsIcon } from "@chakra-ui/icons"
import { NavLink } from "react-router-dom"

export default function CustomCard({name, img, link}) {
    return (
        <Card>
            <CardHeader>
                <Flex>
                    <Heading>{name}</Heading>
                    <Spacer />
                    <IconButton aria-label='Settings' icon={<SettingsIcon/>} />
                </Flex>     
            </CardHeader>

            <CardBody>
                <Image src={img} alt="Image" />
            </CardBody>

            <CardFooter>
                <NavLink to={link}>
                    <Button colorScheme="blue">Visit</Button>
                </NavLink>
            </CardFooter>

        </Card>
    )
}