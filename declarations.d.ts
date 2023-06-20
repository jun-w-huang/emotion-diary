// This is a fix for typescript errors described in: https://github.com/gregberge/svgr/issues/546
// tsconfig.json includes this file. Fixes unsafe 'any' assignment.
declare module '*.svg' {
    import React from 'react';
    const content: React.FC<React.SVGProps<SVGSVGElement>>;
    export default content;
  }
  