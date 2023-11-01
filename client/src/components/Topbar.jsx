import { UnlockIcon } from "@chakra-ui/icons"
import { 
  Flex, 
  Heading, 
  Text, 
  Button, 
  Spacer, 
  HStack, 
  AvatarBadge,
  Avatar
} from "@chakra-ui/react"

export default function Topbar() {

  return (
    <Flex as="nav" p="10px" mb="60px" alignItems="center">
      <Heading as="h1" fontSize="1.5em">OmniPi</Heading>
    </Flex>
  )
}