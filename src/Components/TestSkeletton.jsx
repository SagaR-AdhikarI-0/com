import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Variants({width,gridcols,height}) {
  return (
    <div className={`grid ${gridcols} m-5 mt-10`}>
    <Stack spacing={3} >
      {/* For variant="text", adjust the height via font-size */}    
      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="rectangular" width={width} height={height} />
      <Skeleton variant="rounded" width={width} height={height} />
      <Skeleton variant="rounded" width={width} height={height} />
    
     
    </Stack>
    <Stack spacing={3}>
    <Skeleton variant="rounded" width={width} height={height} />
      <Skeleton variant="rounded" width={width} height={height} />
      <Skeleton variant="rounded" width={width} height={height} />
    </Stack>
    <Stack spacing={3}>
    <Skeleton variant="rounded" width={width} height={height} />
      <Skeleton variant="rounded" width={width} height={height} />
      <Skeleton variant="rounded" width={width} height={height} />
    </Stack>

    </div>
  );
}
