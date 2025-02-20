import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { getPendingAppointments, approveAppointment, rejectAppointment } from "../services/appointmentService";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

const OfficerPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
        try {
            const data = await getPendingAppointments();
            if (Array.isArray(data)) {
                setAppointments(data.length ? data : defaultAppointments);
            } else {
                console.error("Invalid data format received:", data);
                setAppointments(defaultAppointments);
            }
        } catch (error) {
            console.error("Error fetching appointments:", error);
            setAppointments(defaultAppointments);
        }
    };
fetchAppointments()
    
    
  }, []);

  const defaultAppointments = [
    { _id: "A1", citizenName: "John Doe", service: "Driving License", status: "Pending" },
    { _id: "A2", citizenName: "Jane Smith", service: "Vehicle Registration", status: "Pending" },
    { _id: "A3", citizenName: "Mark Wilson", service: "Road Test", status: "Pending" },
  ];

  const handleAction = async (id, action) => {
    try {
      if (action === "approve") {
        await approveAppointment(id);
        setNotification({ message: "Appointment approved successfully!", type: "success" });
      } else {
        await rejectAppointment(id);
        setNotification({ message: "Appointment rejected successfully!", type: "error" });
      }
      setAppointments(appointments?.filter((appointment) => appointment._id !== id));
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Action failed:", error);
      setNotification({ message: "Failed to update appointment!", type: "error" });
      setOpenSnackbar(true);
    }
  };

  // setAppointments(defaultAppointments)

  return (
    <Container>
      <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ my: 4 }}>
        Officer Dashboard
      </Typography>

      <Grid container spacing={3}>
        {appointments.map((appointment) => (
          <Grid item xs={12} sm={6} md={4} key={appointment._id}>
            <Card
              sx={{
                boxShadow: 4,
                borderRadius: 2,
                textAlign: "center",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardContent>
                <Typography variant="h6">Appointment ID: {appointment._id}</Typography>
                <Typography variant="body1">
                  <PersonIcon /> <strong>Citizen:</strong> {appointment.citizenName}
                </Typography>
                <Typography variant="body1">
                  <WorkIcon /> <strong>Service:</strong> {appointment.service}
                </Typography>
                <Typography variant="body1">
                  <PendingActionsIcon /> <strong>Status:</strong> {appointment.status}
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mt: 2, mx: 1 }}
                  onClick={() => handleAction(appointment._id, "approve")}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ mt: 2, mx: 1 }}
                  onClick={() => handleAction(appointment._id, "reject")}
                >
                  Reject
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Snackbar Notification */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity={notification.type} onClose={() => setOpenSnackbar(false)}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default OfficerPage;
