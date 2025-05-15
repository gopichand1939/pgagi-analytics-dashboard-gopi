'use client';

import React from 'react';
import Lottie from 'lottie-react';

interface LottieClientProps {
  animationData: any;
  className?: string;
}

const LottieClient: React.FC<LottieClientProps> = ({ animationData, className }) => {
  return (
    <Lottie
      animationData={animationData}
      loop={true}
      className={className}
    />
  );
};

export default LottieClient;