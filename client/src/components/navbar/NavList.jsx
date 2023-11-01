import { List, ListItem, ListIcon } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import { EditIcon, LinkIcon, ChatIcon, ViewIcon, DragHandleIcon, HamburgerIcon, SettingsIcon } from "@chakra-ui/icons"

export default function NavList(){
    return(
        <List color="brand.600" fontSize="1.2em" spacing={4}>
              <ListItem>
                <NavLink to="/">
                  <ListIcon as={EditIcon} color="brand.300" />
                  Dashboard
                </NavLink>
              </ListItem>
              <ListItem>
                <NavLink to="controller">
                  <ListIcon as={LinkIcon} color="brand.300" />
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
                  <ListIcon as={DragHandleIcon} color="brand.300" />
                  Touch
                </NavLink>
              </ListItem>
              <ListItem>
                <NavLink to="keyboard">
                  <ListIcon as={HamburgerIcon} color="brand.300" />
                  Keyboard
                </NavLink>
              </ListItem>
              <ListItem>
                <NavLink to="settings">
                  <ListIcon as={SettingsIcon} color="brand.300" />
                  Settings
                </NavLink>
              </ListItem>
            </List>
    )
}