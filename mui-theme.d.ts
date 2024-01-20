 

import { CSSProperties } from 'react';

declare module '@mui/system' {
  // Theme
  interface Theme {
    brand?: {
      blue: CSSProperties['color'];
      green: CSSProperties['color'];
    };
    scrollbar?: {
      default: any;
      light: any;
    };
  }

  interface ThemeOptions {
    brand?: {
      blue: CSSProperties['color'];
      green: CSSProperties['color'];
    };
    
  }




}


