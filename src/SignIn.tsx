import React from 'react';
import { Button, TextField } from '@mui/material';

const SignIn: React.FC = () => {
  
  return (
    <div>
      <TextField label="Username" />
      <TextField label="Password" type="password" />
      <Button variant="contained" color="primary">
        Sign In
      </Button>
    </div>
  );
};

export default SignIn;
