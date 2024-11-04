import React from 'react';
import { Button } from 'shadcn-ui';

const ButtonGenerateRDO: React.FC = () => {
  return (
    <Button onClick={() => alert('RDO Generated!')}>
      Generate RDO
    </Button>
  );
};

export default ButtonGenerateRDO;