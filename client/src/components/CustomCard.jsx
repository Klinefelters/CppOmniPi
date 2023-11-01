import {Card, CardHeader, CardBody, Flex, Spacer, IconButton, Image, Button, Heading} from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { NavLink } from "react-router-dom"

export default function CustomCard({name, img, link}) {
    return (
        <Card>
            <CardHeader bg="brand.600">
                <Flex>
                    <Heading color="white">{name}</Heading>
                    <Spacer />
                    <NavLink to={link}>
                        <IconButton colorScheme="blue" icon={<ExternalLinkIcon/>}/>
                    </NavLink>
                </Flex>     
            
            </CardHeader>

            <CardBody bg="brand.grey">
                <Image src={img} alt="Image" />
            </CardBody>
        </Card>
    )
}