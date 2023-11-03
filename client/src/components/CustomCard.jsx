import { Card, CardHeader, CardBody, Flex, Spacer, IconButton, Image, Heading, Spinner } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";

export default function CustomCard({ name, img, link, isLoading }) {
  return (
    <Card borderRadius="2xl" bg="brand.grey">
      <CardHeader bg="brand.600" borderRadius="2xl">
        <Flex>
          <Heading color="white">{name}</Heading>
          <Spacer />
          <NavLink to={link}>
            <IconButton colorScheme="blue" icon={<ExternalLinkIcon />} />
          </NavLink>
        </Flex>
      </CardHeader>

      <CardBody bg="brand.grey" borderRadius="2xl">
        {isLoading ? (
          // Render a loading indicator (e.g., Spinner) when isLoading is true
          <Spinner style={{ width: "300px", height: "300px"}} color="brand.600" />
        ) : (
          // Render the card content when isLoading is false
          <Image src={img} w="480" h="360" alt="Image" borderRadius="2xl" />
        )}
      </CardBody>
    </Card>
  );
}
