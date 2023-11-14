import OmniPi from "./OmniPi";
import Simulator from "./Simulator";
import { Box, Flex, Heading, Switch } from "@chakra-ui/react";
import { useState } from "react";


export default function CombinedControl({vx, vy, vr}) {
    const [isChecked, setIsChecked] = useState(false);
    const [heading, setHeading] = useState("Simulator");

    const toggleSwitch = () => {
        setIsChecked(!isChecked);
        if (isChecked){
            setHeading("Simulator Control")
        }else{
            setHeading("OmniPi Control")
        }
        
    };

    return (
        <Box bg="brand.900" p={4} borderRadius='lg'>
            {isChecked ? <OmniPi vx={vx} vy={vy} vr={vr}/> : <Simulator vx={vx} vy={vy} vr={vr} />}
            <Flex p={2} alignItems='center' >
                <Switch size="lg" onChange={toggleSwitch} isChecked={isChecked} pr={6} />
                <Heading color="white" size='lg' textAlign={"center"} >{heading}</Heading>
            </Flex>
        </Box>
    );

}