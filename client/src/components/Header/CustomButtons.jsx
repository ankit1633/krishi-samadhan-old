import React, { useState, useContext } from 'react';
import { Box, Button, Typography, styled, Menu, MenuItem, IconButton } from '@mui/material';
import LoginDialog from '../login/LoginDialog';
import { DataContext } from '../../context/DataProvider';
import Profile from './Profile';
import Question from './Question';
import Problem from './Problem';
import Solution from './Solution';
import Warehouse from './Warehouse';
import Weather from './Weather'; // Import the Weather component
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Icon for profile button

const LoginButton = styled(Button)`
    color: #008000;
    background: #F3CA52;
    text-transform: none;
    font-weight: 600;
    border-radius: 50px;
    padding: 8px 20px; /* Adjust padding for better spacing */
    height: 40px; /* Set a consistent height */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    width: 180px; /* Initial width */
    transition: width 0.3s ease, background-color 0.3s ease; /* Smooth transition for width and color */
    text-align: center; /* Center text */
    display: flex;
    align-items: center; /* Center text vertically */
    justify-content: center; /* Center text horizontally */
    
    &:hover {
        width: 220px; /* Increase the width on hover */
        background: #E0B646; /* Darken the background color on hover */
    }
`;

const ProfileButton = styled(IconButton)`
    color: #008000;
    background: #F3CA52;
    border-radius: 50%; /* Make it circular */
    width: 40px;
    height: 40px;
    padding: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
        background: #E0B646; /* Darken the background color on hover */
    }
`;

const Wrapper = styled(Box)`
    display: flex;
    align-items: center;
    gap: 20px; /* Space between buttons */
    width: 100%; /* Take full width of the container */
    justify-content: flex-end; /* Align buttons and profile to the right */
`;

const CustomButtons = () => {
    const { account, setAccount, user } = useContext(DataContext);
    const [open, setOpen] = useState(false);
    const [openQuestion, setOpenQuestion] = useState(false);
    const [openWarehouse, setOpenWarehouse] = useState(false);
    const [openProblem, setOpenProblem] = useState(false);
    const [openSolution, setOpenSolution] = useState(false);
    const [openWeather, setOpenWeather] = useState(false); // New state for Weather component
    const [anchorEl, setAnchorEl] = useState(null); // State for dropdown menu
    const [profileMenuAnchor, setProfileMenuAnchor] = useState(null); // State for profile dropdown menu

    const openDialog = () => setOpen(true);
    const openQuestionDialog = () => setOpenQuestion(true);
    const openWarehouseDialog = () => setOpenWarehouse(true);
    const openProblemDialog = () => setOpenProblem(true);
    const openSolutionDialog = () => setOpenSolution(true);
    const openWeatherDialog = () => setOpenWeather(true); // Open Weather Dialog
    const closeWeatherDialog = () => setOpenWeather(false); // Close Weather Dialog
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleProfileClick = (event) => setProfileMenuAnchor(event.currentTarget);
    const handleProfileClose = () => setProfileMenuAnchor(null);

    return (
        <Wrapper>
            {user && (
                <>
                    <LoginButton variant='contained' onClick={handleClick}>
                        <Typography>Q&A</Typography>
                    </LoginButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => { openQuestionDialog(); handleClose(); }}>
                            Ask a Question
                        </MenuItem>
                        <MenuItem onClick={() => { openProblemDialog(); handleClose(); }}>
                            Ask a Problem
                        </MenuItem>
                        {user === "farmer" && (
                            <MenuItem onClick={() => { openSolutionDialog(); handleClose(); }}>
                                Solutions
                            </MenuItem>
                        )}
                    </Menu>
                    
                </>
            )}
            {user && <LoginButton variant='contained' onClick={openWarehouseDialog}>
                {user === "farmer" ? <Typography>Warehouse List</Typography> : <Typography>Add warehouse</Typography>}
            </LoginButton>}
            {user && <LoginButton variant='contained' onClick={openWeatherDialog}>
                <Typography>Weather</Typography>
            </LoginButton>}
            
            {/* Profile button */}
            {account ? (
                <>
                    <ProfileButton onClick={handleProfileClick}>
                        <AccountCircleIcon />
                    </ProfileButton>
                    <Menu
                        anchorEl={profileMenuAnchor}
                        open={Boolean(profileMenuAnchor)}
                        onClose={handleProfileClose}
                    >
                        <MenuItem onClick={handleProfileClose}>Username: {account.username}</MenuItem>
                        <MenuItem onClick={() => { setAccount(null); handleProfileClose(); }}>Logout</MenuItem>
                    </Menu>
                </>
            ) : (
                <LoginButton variant='contained' onClick={openDialog}> Login/Sign-up </LoginButton>
            )}

            <LoginDialog open={open} setOpen={setOpen} />
            <Question openQuestion={openQuestion} setQuestionDialog={setOpenQuestion} />
            <Warehouse openWarehouse={openWarehouse} setWarehouseDialog={setOpenWarehouse} />
            <Problem openProblem={openProblem} setProblemDialog={setOpenProblem} />
            <Solution style={{ borderRadius: '5px' }} openSolution={openSolution} setSolutionDialog={setOpenSolution} />
            {openWeather && <Weather />} {/* Conditionally render the Weather component */}
        </Wrapper>
    );
};

export default CustomButtons;
