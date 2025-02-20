import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { getAppointments, approveAppointment, rejectAppointment } from '../../services/appointmentService';

const OfficerDashboard = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const data = await getAppointments();
            setAppointments(data);
        };
        fetchAppointments();
    }, []);

    const handleApprove = async (id) => {
        await approveAppointment(id);
        setAppointments(appointments.filter(appointment => appointment._id !== id));
    };

    const handleReject = async (id) => {
        await rejectAppointment(id);
        setAppointments(appointments.filter(appointment => appointment._id !== id));
    };

    return (
        <Container>
            <h1>Officer Dashboard</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Appointment ID</th>
                        <th>Citizen Name</th>
                        <th>Service Type</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => (
                        <tr key={appointment._id}>
                            <td>{appointment._id}</td>
                            <td>{appointment.citizenName}</td>
                            <td>{appointment.serviceType}</td>
                            <td>{appointment.status}</td>
                            <td>
                                <Button variant="success" onClick={() => handleApprove(appointment._id)}>Approve</Button>
                                <Button variant="danger" onClick={() => handleReject(appointment._id)}>Reject</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default OfficerDashboard;