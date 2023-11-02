import React, { useState } from 'react';
import axios from 'axios';
import { Box } from '@chakra-ui/react';

export default function OmniPi() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [r, setR] = useState(0);

  const handleControlClick = () => {
    // Create a data object with the x, y, and r values
    const data = {
      x: x,
      y: y,
      r: r
    };

    // Make a POST request to the Flask server's /control endpoint
    axios.post('http://localhost:8000/control', { x: 0, y: 0, r: 0})
      .then(response => {
        console.log(response.data); // Log the response from the server
        // Handle the response as needed
      })
      .catch(error => {
        console.error(error); // Log any errors
        // Handle the error as needed
      });
  };

  return (
    <Box bg="white">
      <div>
        <label>X:</label>
        <input type="number" value={x} onChange={e => setX(e.target.value)} />
      </div>
      <div>
        <label>Y:</label>
        <input type="number" value={y} onChange={e => setY(e.target.value)} />
      </div>
      <div>
        <label>R:</label>
        <input type="number" value={r} onChange={e => setR(e.target.value)} />
      </div>
      <button onClick={handleControlClick}>Control Robot</button>
    </Box>
  );
}