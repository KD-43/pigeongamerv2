import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={(theme) => ({
        bgcolor: theme.palette.primary.main,
        color: theme.palette.background.default,
        py: 6,
        mt: 'auto',
      })}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              MyBrand
            </Typography>
            <Typography variant="body2" color="tertiary.main">
              Making web experiences simple, elegant, and responsive.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Company
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link color="inherit" underline="hover" href="#">
                About
              </Link>
              <Link color="inherit" underline="hover" href="#">
                Careers
              </Link>
              <Link color="inherit" underline="hover" href="#">
                Contact
              </Link>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Resources
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link color="inherit" underline="hover" href="#">
                Docs
              </Link>
              <Link color="inherit" underline="hover" href="#">
                Tutorials
              </Link>
              <Link color="inherit" underline="hover" href="#">
                API
              </Link>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link color="inherit" href="#">
                X / Twitter
              </Link>
              <Link color="inherit" href="#">
                GitHub
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'background.default' }} />

        <Typography variant="body2" color="tertiary.main" textAlign="center">
          © {new Date().getFullYear()} MyBrand. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
