import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import appointmentService from '../services/appointmentService';

const AppointmentScheduler = () => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await appointmentService.scheduleAppointment({ date, time, serviceType });
            setMessage(response.data.message);
            setError('');
        } catch (err) {
            setError(err.response.data.message);
            setMessage('');
        }
    };

    return (
        <Container>
            <h2>Schedule an Appointment</h2>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control 
                        type="date" 
                        value={date} 
                        onChange={(e) => setDate(e.target.value)} 
                        required 
                    />
                </Form.Group>
                <Form.Group controlId="formTime">
                    <Form.Label>Time</Form.Label>
                    <Form.Control 
                        type="time" 
                        value={time} 
                        onChange={(e) => setTime(e.target.value)} 
                        required 
                    />
                </Form.Group>
                <Form.Group controlId="formServiceType">
                    <Form.Label>Service Type</Form.Label>
                    <Form.Control 
                        as="select" 
                        value={serviceType} 
                        onChange={(e) => setServiceType(e.target.value)} 
                        required
                    >
                        <option value="">Select...</option>
                        <option value="Vehicle Inspection">Vehicle Inspection</option>
                        <option value="License Test">License Test</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Schedule Appointment
                </Button>
            </Form>
        </Container>
    );
};

export default AppointmentScheduler;