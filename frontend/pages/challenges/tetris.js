import { useState } from 'react';
import TetrisChallengeImplementation from './implementations/tetris';

export default function Tetris() {
  const [showVideo, setShowVideo] = useState(false);
  return(
    <>
      <h1>
        Tetris
      </h1>
      <p>
        Build a Tetris Game (as far as you can take it)
      </p>
      <div>
        <button onClick={() => setShowVideo((sv) => !sv)}>Toggle video</button>
      </div>
      <div>
        {showVideo && <iframe width="560" height="315" src="https://www.youtube.com/embed/M8fqHaJU_cc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> }
      </div>
      <TetrisChallengeImplementation />
    </>
  )
}
