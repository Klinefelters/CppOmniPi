import { HamburgerIcon } from "@chakra-ui/icons"
import NavList from "./NavList"
import {
  Drawer,
  DrawerBody,
  IconButton,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import React from "react"


export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  return (
    <>
      <IconButton ref={btnRef} colorScheme='blue' onClick={onOpen} icon={<HamburgerIcon/>}>
        
      </IconButton>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Navigation</DrawerHeader>

          <DrawerBody>
            <NavList />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}