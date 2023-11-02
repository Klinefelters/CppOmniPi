import { Flex, Heading, Spacer, IconButton } from "@chakra-ui/react"
import { FaHome } from 'react-icons/fa';
import Navbar from "./navbar/Navbar"
import { NavLink } from "react-router-dom"

export default function Topbar() {

  return (
    <Flex as="nav" p="10px" bg = "brand.900">
      <NavLink to="/">
        <IconButton size="lg" aria-label='Dashboard' colorScheme='blue' icon={<FaHome />} />
      </NavLink>
      <Heading as="h1" fontSize="2em" p="10px" color="white">OmniPi</Heading>
      <Spacer />
      <Navbar />
    </Flex>
  )
}