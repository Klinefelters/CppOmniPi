import {Card, CardHeader, CardBody, CardFooter, Flex, Spacer, IconButton, Image, Button, Heading} from "@chakra-ui/react"
import { SettingsIcon } from "@chakra-ui/icons"
import { NavLink } from "react-router-dom"

export default function CustomCard({name, img, link}) {
    return (
        <Card>
            <CardHeader bg="black">
                <Flex>
                    <Heading color="white">{name}</Heading>
                </Flex>     
            </CardHeader>

            <CardBody bg="brand.grey">
                <Image src={img} alt="Image" />
            </CardBody>

            <CardFooter bg="brand.grey">
                <NavLink to={link}>
                    <Button colorScheme="blue">Visit</Button>
                </NavLink>
            </CardFooter>

        </Card>
    )
}