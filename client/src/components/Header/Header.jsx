import React from 'react';
import { AppBar, Toolbar, Box, styled } from '@mui/material';
import CustomButtons from './CustomButtons'; // Adjust path if necessary
import logo from './logo2.jpeg'; 

const Header = () => {

    const StyledHeader = styled(AppBar)`
        background: #008000;
        height: 60px;
    `;
    const Image = styled('img')({
        width: 100,
        height: 50
        
    });

    return (
        <StyledHeader>
            <Toolbar>
                <Box style={{ display: 'flex', alignItems: 'center'}}>
                    {/* <Typography>Krishi-Samadhan</Typography> */}
                    <Image src={logo} alt='logo' />
                    <CustomButtons />
                </Box>
            </Toolbar>
        </StyledHeader>
    );
};

export default Header;
