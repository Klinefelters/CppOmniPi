import { Flex, Heading, Spacer, IconButton } from "@chakra-ui/react"
import { SettingsIcon } from "@chakra-ui/icons"
import Navbar from "./navbar/Navbar"
import { NavLink } from "react-router-dom"

export default function Topbar() {

  return (
    <Flex as="nav" p="10px" bg = "brand.900">
      <Navbar />
      <Heading as="h1" fontSize="1.5em" p="10px" color="white">OmniPi</Heading>
      <Spacer />
      <NavLink to="settings">
        <IconButton aria-label='Settings' colorScheme='blue' icon={<SettingsIcon/>} />
      </NavLink>
      
    </Flex>
  )
}