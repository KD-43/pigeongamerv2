import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

export default function SimpleContainer() {
  const theme = useTheme();

  return (
 
      <div>
        <CssBaseline />
        {/* <Container maxWidth="xl">
          <Box sx={{ bgcolor: theme.palette.primary.main, height: '100vh' }} />
          <Button variant="contained">Hello World</Button>
          <Button variant="outlined">Hello World</Button>
        </Container> */}

        <Container maxWidth="xl">
          <Grid container justifyContent="center" spacing={2} bgcolor={theme.palette.primary.main}>
            <Grid item>
              <Box>Hello</Box>
            </Grid>
            <Grid>
              
            </Grid>
          </Grid>
        </Container>
      </div>

  );
}