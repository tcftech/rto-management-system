import React, { useEffect, useState } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import { Grid, Card, CardContent, Typography, Button, Snackbar } from "@mui/material";
// import { getUserProfile } from "../services/userService";
// import CitizenDashboard from "../components/CitizenDashboard";

// Default services in case of API failure or empty response
const defaultServices = [
    { id: 1, title: "DrivinglicenseRenewal", description: "Apply for a driving license renewal quickly." },
    { id: 2, title: "Vehicleregistration", description: "Register your new vehicle hassle-free." },
    { id: 3, title: "RoadTaxpayment", description: "Pay your road tax online with ease." },
];

const CitizenPage = () => {
    let user = JSON.parse(localStorage.getItem("user"))?.user;
    const [services, setServices] = useState(defaultServices);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        // const fetchServices = async () => {
        //     try {
        //         if (!user?.id) {
        //             throw new Error("User not found. Please log in again.");
        //         }
        //         const response = await getUserProfile(user.id);
        //         if (!response?.data || response.data.length === 0) {
        //             setServices(defaultServices); // Set default services if API returns empty
        //         } else {
        //             setServices(response.data);
        //         }
        //     } catch (err) {
        //         console.error("Error fetching services:", err);
        //         setError(err.message || "Failed to fetch services.");
        //         setServices(defaultServices); // Use default services in case of an error
        //         setOpenSnackbar(true);
        //     } finally {
        //         setLoading(false);
        //     }
        // };

        // fetchServices();
    }, [user?.id]);

    return (
        <Container>
            <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ my: 4 }}>
                Welcome, {user?.username || "Citizen"}
            </Typography>

            {loading ? (
                <div className="d-flex justify-content-center my-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : error ? (
                <Alert variant="danger" className="text-center">{error}</Alert>
            ) : (
                <Grid container spacing={3} justifyContent="center">
                    {services.map((service) => (
                        <Grid item xs={12} sm={6} md={4} key={service.id}>
                            <Card
                                sx={{
                                    boxShadow: 5,
                                    borderRadius: 3,
                                    textAlign: "center",
                                    transition: "0.3s",
                                    "&:hover": { transform: "scale(1.05)" },
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" fontWeight="bold">{service.title}</Typography>
                                    <Typography variant="body2" sx={{ mb: 2 }}>{service.description}</Typography>
                                    <Button variant="contained" color="primary" href={`/services/${service.title}`}>
                                        View Details
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}


            {/* Snackbar for error messages */}
            <Snackbar 
                open={openSnackbar} 
                autoHideDuration={3000} 
                onClose={() => setOpenSnackbar(false)}
                message={error} 
                anchorOrigin={{ vertical: "top", horizontal: "center" }} 
            />
        </Container>
    );
};

export default CitizenPage;
