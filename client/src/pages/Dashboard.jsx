import { Box, SimpleGrid } from "@chakra-ui/react";
import CustomCard from "../components/CustomCard";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true); // You can manage a global loading state for the entire dashboard

  useEffect(() => {
    // Simulate a delay for loading content (e.g., fetching data)
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false when content is ready
    }, 2000); // You can adjust the delay as needed
  }, []);

  return (
    <Box bg="black" h="100vh">
      <SimpleGrid spacing={10} p="10" minChildWidth={400} w="100hv" bg="black">
        <CustomCard
          name="Controller"
          img="/img/Controller.png"
          link="controller"
          isLoading={isLoading}
        />
        <CustomCard
          name="Voice"
          img="/img/Voice.png"
          link="voice"
          isLoading={isLoading}
        />
        <CustomCard
          name="Video"
          img="/img/Video.png"
          link="video"
          isLoading={isLoading}
        />
        <CustomCard
          name="Touch"
          img="/img/Touch.png"
          link="touch"
          isLoading={isLoading}
        />
        <CustomCard
          name="Keyboard"
          img="/img/Keyboard.png"
          link="keyboard"
          isLoading={isLoading}
        />
      </SimpleGrid>
    </Box>
  );
}
