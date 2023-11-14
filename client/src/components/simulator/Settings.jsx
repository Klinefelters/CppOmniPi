import { SettingsIcon } from '@chakra-ui/icons'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  useDisclosure,
  Button,
  VStack,
  Box,
  Slider,
  SliderThumb,
  SliderTrack,
  SliderFilledTrack,
  Heading,
  Flex,
  Switch
} from '@chakra-ui/react'

export default function ({ numbers, onNumberChange, isChecked, toggleSwitch }) {
  const handleSliderChange = (key, value) => {
    onNumberChange(key, value);
  };

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <IconButton onClick={onOpen} icon={<SettingsIcon />}/>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              {Object.keys(numbers).map((key) => (
                <Box key={key}>
                  <p>{key}: {numbers[key]}</p>
                  <Slider
                    width={"200px"}
                    defaultValue={numbers[key]}
                    min={0}
                    max={25}
                    onChange={(value) => handleSliderChange(key, value)}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </Box>
              ))}
              <Flex p={2} alignItems='center' >
                <Switch size="lg" onChange={toggleSwitch} isChecked={isChecked} pr={6} />
                <Heading color="black" size='md' textAlign={"center"} >Field Oriented</Heading>
              </Flex>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}