import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const Weather = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Changed to false initially
    const [open, setOpen] = useState(false); // State to control dialog visibility

    const apiKey = '36051bea39feb1ba9d732baebc7bfb98'; // Replace with your OpenWeatherMap API key

    useEffect(() => {
        const fetchWeather = async (lat, lon) => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
                );
                if (response.status === 200) {
                    const data = response.data;
                    setWeatherData([
                        {
                            id: data.id,
                            name: data.name,
                            description: data.weather[0].description,
                            temperature: data.main.temp,
                            humidity: data.main.humidity,
                            windSpeed: data.wind.speed,
                            rainChance: data.rain ? (data.rain['1h'] || 0) : 0, // Rain in the last 1 hour, or 0 if no rain
                        },
                    ]);
                    setError(null);
                } else {
                    setError('Error loading weather data');
                }
            } catch (error) {
                console.error("Error occurred while fetching weather data:", error);
                setError('Error loading weather data');
            } finally {
                setLoading(false);
            }
        };

        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        fetchWeather(latitude, longitude);
                    },
                    (error) => {
                        setError('Error retrieving location');
                        setLoading(false);
                    }
                );
            } else {
                setError('Geolocation is not supported by this browser.');
                setLoading(false);
            }
        };

        if (open) { // Fetch weather only if the dialog is open
            getLocation();
        }
    }, [open]); // Add 'open' as a dependency to fetch weather data when dialog opens

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginBottom: '1rem' }}>
                Show Weather
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>
                    Weather Information
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {loading && <Typography>Loading...</Typography>}
                    {error && <Typography color="error">{error}</Typography>}
                    <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                        <Table>
                            <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>City</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Temperature (°C)</TableCell>
                                    <TableCell>Humidity (%)</TableCell>
                                    <TableCell>Wind Speed (m/s)</TableCell>
                                    <TableCell>Rain Chance (mm)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {weatherData.length > 0 ? (
                                    weatherData.map((weather) => (
                                        <TableRow key={weather.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                                            <TableCell>{weather.id}</TableCell>
                                            <TableCell>{weather.name}</TableCell>
                                            <TableCell>{weather.description}</TableCell>
                                            <TableCell>{weather.temperature}</TableCell>
                                            <TableCell>{weather.humidity}</TableCell>
                                            <TableCell>{weather.windSpeed}</TableCell>
                                            <TableCell>{weather.rainChance}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7}>
                                            <Typography>No weather data available</Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Weather;
