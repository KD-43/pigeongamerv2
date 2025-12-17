import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function ColumnSizedGrid() {
  return (
    <Box
      sx={{
        width: 1,
        height: 500,                 // 👈 must have a real height to divide
        border: '3px solid',
        borderColor: 'primary.main',
        borderRadius: 4,
        p: 1,
      }}
    >
      <Grid
        container
        direction="column"           // vertical main axis
        wrap="nowrap"                // stay in one column; don’t wrap
        columns={12}                 // default is 12; set explicitly for clarity
        rowSpacing={1}               // vertical gaps between rows
        sx={{ width: 1, height: 1 }} // fill the Box so 500px is available to split
      >
        <Grid
          size={10}                 // 10/12 of the container height
          sx={{ bgcolor: 'primary.light', display: 'grid', placeItems: 'center' }}
        >
          <Typography variant="subtitle1">Header (10/12)</Typography>
        </Grid>

        <Grid
          size={2}                  // 2/12 of the container height
          sx={{ bgcolor: 'secondary.light', display: 'grid', placeItems: 'center' }}
        >
          <Typography variant="subtitle1">Footer (2/12)</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
