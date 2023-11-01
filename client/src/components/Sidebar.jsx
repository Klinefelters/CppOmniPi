import { List, ListItem, ListIcon } from "@chakra-ui/react"
import { EditIcon, AtSignIcon, ChatIcon, ViewIcon } from '@chakra-ui/icons'
import { NavLink } from "react-router-dom"


export default function Sidebar() {
  return (
    <List color="white" fontSize="1.2em" spacing={4}>
      <ListItem>
        <NavLink to="/">
          <ListIcon as={AtSignIcon} color="brand.300" />
          Dashboard
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="controller">
          <ListIcon as={EditIcon} color="brand.300" />
          Controller
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="voice">
          <ListIcon as={ChatIcon} color="brand.300" />
          Voice
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="video">
          <ListIcon as={ViewIcon} color="brand.300" />
          Video
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="touch">
          <ListIcon as={ViewIcon} color="brand.300" />
          Touch
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="keyboard">
          <ListIcon as={ViewIcon} color="brand.300" />
          Keyboard
        </NavLink>
      </ListItem>
    </List>
  )
}