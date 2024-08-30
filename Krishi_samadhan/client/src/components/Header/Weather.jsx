import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { authenticateGetWeather } from '../../service/api'; // Ensure correct import

const Weather = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchWeather = async (lat, lon) => {
            try {
                setLoading(true);
                const response = await authenticateGetWeather(lat, lon);
                if (response.status === 200) {
                    const data = response.data;
                    setWeatherData([
                        {
                            id: data.id,
                            name: data.name,
                            description: data.description,
                            temperature: data.temperature,
                            humidity: data.humidity,
                            windSpeed: data.windSpeed,
                            rainChance: data.rainChance,
                        },
                    ]);
                    setError(null);
                } else {
                    setError('Error loading weather data');
                }
            } catch (error) {
                console.error('Error occurred while fetching weather data:', error);
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
                    () => {
                        setError('Error retrieving location');
                        setLoading(false);
                    }
                );
            } else {
                setError('Geolocation is not supported by this browser.');
                setLoading(false);
            }
        };

        if (open) {
            getLocation();
        }
    }, [open]);

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
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
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
