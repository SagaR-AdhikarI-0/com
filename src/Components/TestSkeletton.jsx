import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Variants({width,gridcols}) {
  return (
    <div className={`grid ${gridcols} mt-7 ml-16`}>
    <Stack spacing={3} >
      {/* For variant="text", adjust the height via font-size */}    
      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="rectangular" width={width} height={340} />
      <Skeleton variant="rounded" width={width} height={340} />
      <Skeleton variant="rounded" width={width} height={340} />
    
     
    </Stack>
    <Stack spacing={3}>
    <Skeleton variant="rounded" width={width} height={340} />
      <Skeleton variant="rounded" width={width} height={340} />
      <Skeleton variant="rounded" width={width} height={340} />
    </Stack>
    <Stack spacing={3}>
    <Skeleton variant="rounded" width={width} height={340} />
      <Skeleton variant="rounded" width={width} height={340} />
      <Skeleton variant="rounded" width={width} height={340} />
    </Stack>

    </div>
  );
}
