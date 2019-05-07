
import React from 'react';
import Cube from 'cubejs';
import RubiksCubePlan from 'components/RubiksCubePlan';

export interface RubiksCubeProps {
  cube: Cube,
  size?: number,
}

export const RubiksCube: React.FC<RubiksCubeProps> = (props: RubiksCubeProps) => {

  return (
    <RubiksCubePlan {...props} />
  )
};


export default RubiksCube;