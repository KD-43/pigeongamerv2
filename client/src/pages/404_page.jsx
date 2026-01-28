import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { Box, Container, Typography, useTheme } from '@mui/material';
import { ErrorOutline } from "@mui/icons-material";
import Footer from "../components/FooterComponent";

export default function ErrorPage () {
    const theme = useTheme();

    return (
        <>
            <Container sx={{ paddingTop: '56px', height: '100vh', }}>
                <Navbar />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'tertiary.main' }}>
                    <ErrorOutline sx={{ fontSize: 150, mb: 4,}} />
                    <Typography fontWeight={900} fontSize={56}>Not Found!</Typography>
                </Box>
            </Container>
            <Footer />
        </>
    )
};