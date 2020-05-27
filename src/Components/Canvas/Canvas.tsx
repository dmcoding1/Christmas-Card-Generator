import React, { useEffect, useRef } from 'react';

import './Canvas.scss';
import { init } from '../../Utils/canvas'

const Canvas: React.FC = () => {
    const canvasNode = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      if (canvasNode.current) {        
        setTimeout(() => init(canvasNode.current), 1000);        
      }
    });

    return (
      <canvas id="canvas" ref={canvasNode}></canvas>
    )
};

export default Canvas;