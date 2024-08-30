import React from 'react';
import { AppBar, Toolbar, Box, styled } from '@mui/material';
import CustomButtons from './CustomButtons'; // Adjust path if necessary
import logo from './logo2.jpeg'; // Adjust path if necessary

const Header = () => {
    // Styled AppBar with updated height
    const StyledHeader = styled(AppBar)`
        background: #008000;
        height: 60px;
    `;

    // Styled image with updated dimensions
    const Image = styled('img')({
        width: 100,
        height: 50
    });

    return (
        <StyledHeader>
            <Toolbar>
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                    {/* Uncomment if you want to display text */}
                    {/* <Typography>Krishi-Samadhan</Typography> */}
                    <Image src={logo} alt='logo' /> {/* New logo */}
                    <CustomButtons /> {/* Existing custom buttons */}
                </Box>
            </Toolbar>
        </StyledHeader>
    );
};

export default Header;
