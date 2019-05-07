
import React from 'react';
import Cube from 'cubejs';

export interface RubiksCubePlanProps {
  cube: Cube,
  size?: number
}

export const RubiksCubePlan: React.FC<RubiksCubePlanProps> = (props: RubiksCubePlanProps) => {

  const { cube }: RubiksCubePlanProps = props;
  const size = typeof props.size !== 'undefined' ? props.size : '100%';
  const colorMapper =  (str: string): string => {
    switch(str) {
      case 'U': 
        return 'rgb(247, 255, 43)';
      case 'F':
        return 'rgb(0, 255, 0)';
      case 'B':
        return 'rgb(0, 0, 255)';
      case 'D':
        return 'rgb(255, 255, 255)';
      case 'R':
        return 'rgb(244, 176, 66)';
      case 'L':
        return 'rgb(255, 0, 0)'; 
      default:
        return '';
    }
  }  

  const cubeArr: string[] = cube.asString().split('').map(colorMapper);
  
  return (
    <svg width={size} height={size} viewBox="0 0 500 500">
      <polyline fill="rgb(0,0,0)" points="68,68 90,0 410,0 432,68 500,90 500,410 432,432 410,500 90,500 68,432 0,410 0,90 "/>
      <rect fill={cubeArr[0]} height="116" width="116" x="72" y="72"/>
      <rect fill={cubeArr[3]} height="116" width="116" x="72" y="192"/>
      <rect fill={cubeArr[6]} height="116" width="116" x="72" y="312"/>
      <rect fill={cubeArr[1]} height="116" width="116" x="192" y="72"/>
      <rect fill={cubeArr[4]} height="116" width="116" x="192" y="192"/>
      <rect fill={cubeArr[7]} height="116" width="116" x="192" y="312"/>
      <rect fill={cubeArr[2]} height="116" width="116" x="312" y="72"/>
      <rect fill={cubeArr[5]} height="116" width="116" x="312" y="192"/>
      <rect fill={cubeArr[8]} height="116" width="116" x="312" y="312"/>
      <polyline fill={cubeArr[4*9 + 0]} points="68,72 68,188 4,188 4,92"/>
      <rect fill={cubeArr[4*9 + 1]} height="116" width="64" x="4" y="192"/>
      <polyline fill={cubeArr[4*9 + 2]} points="68,428 68,312 4,312 4,408"/>
      <polyline fill={cubeArr[9 + 2]} points="432,72 432,188 496,188 496,92"/>
      <rect fill={cubeArr[9 + 1]} height="116" width="64" x="432" y="192"/>
      <polyline fill={cubeArr[9 + 0]} points="432,428 432,312 496,312 496,408"/>
      <polyline fill={cubeArr[5*9 + 2]} points="72,68 188,68 188,4 92,4"/>
      <rect fill={cubeArr[5*9 + 1]} height="64" width="116" x="192" y="4"/>
      <polyline fill={cubeArr[5*9 + 0]} points="428,68 312,68 312,4 408,4"/>
      <polyline fill={cubeArr[2*9 + 0]} points="72,432 188,432 188,496 92,496"/>
      <rect fill={cubeArr[2*9 + 1]} height="64" width="116" x="192" y="432"/>
      <polyline fill={cubeArr[2*9 + 2]} points="428,432 312,432 312,496 408,496"/>
    </svg>
  )
};


export default RubiksCubePlan;