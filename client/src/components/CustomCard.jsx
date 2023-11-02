import {Card, CardHeader, CardBody, Flex, Spacer, IconButton, Image, Button, Heading} from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { NavLink } from "react-router-dom"

export default function CustomCard({name, img, link}) {
    return (
        <Card borderRadius="2xl" bg="brand.grey">
            <CardHeader bg="brand.600" borderRadius="2xl">
                <Flex>
                    <Heading color="white">{name}</Heading>
                    <Spacer />
                    <NavLink to={link}>
                        <IconButton colorScheme="blue" icon={<ExternalLinkIcon/>}/>
                    </NavLink>
                </Flex>     
            
            </CardHeader>

            <CardBody bg="brand.grey" borderRadius="2xl">
                <Image src={img} w="480" h="360" alt="Image" borderRadius="2xl"/>
            </CardBody>
        </Card>
    )
}