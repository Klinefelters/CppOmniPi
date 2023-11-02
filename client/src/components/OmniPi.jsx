import React, { useState } from 'react';
import axios from 'axios';
import { Box } from '@chakra-ui/react';

export default function OmniPi() {
  const videoUrl = 'http://localhost:8000/video_feed';
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [r, setR] = useState(0);

  const handleControlClick = () => {
    const data = {
      x: x,
      y: y,
      r: r
    };

    axios.post('http://localhost:8000/control', data)
      .then(response => {
        console.log(response.data); 
      })
      .catch(error => {
        console.error(error); 
      });
  };

  return (
    <Box bg="white">
      <img id="videoFeed" src={videoUrl} alt="video_feed" width="480" height="320" />
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