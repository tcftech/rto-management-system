import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { Download, PictureAsPdf } from "@mui/icons-material";
import axios from "axios";
import moment from "moment";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { fetchVehicleRegistrations } from "../../services/vehicleService";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await fetchVehicleRegistrations();
        setVehicles(data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateVehicleStatus(id, newStatus);
      setVehicles((prev) => prev.map((v) => (v._id === id ? { ...v, status: newStatus } : v)));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDownloadPDF = (vehicle) => {
    const doc = new jsPDF();
    doc.text("Vehicle Details", 14, 10);
    doc.text(`Owner: ${vehicle.ownerName}`, 10, 20);
    doc.text(`Model: ${vehicle.model}`, 10, 30);
    doc.text(`Brand: ${vehicle.brand}`, 10, 40);
    doc.text(`Year: ${vehicle.yearOfManufacture}`, 10, 50);
    doc.text(`Color: ${vehicle.color}`, 10, 60);
    doc.text(`Registration: ${moment(vehicle.registrationDate).format("DD MMM YYYY")}`, 10, 70);
    doc.text(`Status: ${vehicle.status}`, 10, 80);
    doc.save(`${vehicle.registrationNumber}.pdf`);
  };

  const handleDownloadExcel = (vehicle) => {
    const worksheet = XLSX.utils.json_to_sheet([
      {
        "Registration Number": vehicle.registrationNumber,
        "Owner Name": vehicle.ownerName,
        "Vehicle Type": vehicle.vehicleType,
        "Model": vehicle.model,
        "Brand": vehicle.brand,
        "Year": vehicle.yearOfManufacture,
        "Color": vehicle.color,
        "Registration Date": moment(vehicle.registrationDate).format("DD MMM YYYY"),
        "Status": vehicle.status,
      },
    ]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vehicle");
    XLSX.writeFile(workbook, `${vehicle.registrationNumber}.xlsx`);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        🚗 Vehicle List
      </Typography>
      <Select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        displayEmpty
        sx={{ mb: 2, minWidth: 200 }}
      >
        <MenuItem value="">All Statuses</MenuItem>
        <MenuItem value="registered">Registered</MenuItem>
        <MenuItem value="renewed">Renewed</MenuItem>
        <MenuItem value="pending">Pending</MenuItem>
      </Select>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>#</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Registration</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Owner</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Model</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Year</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicles
                .filter((v) => (filterStatus ? v.status === filterStatus : true))
                .map((vehicle, index) => (
                  <TableRow key={vehicle._id} hover>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{vehicle.registrationNumber}</TableCell>
                    <TableCell>{vehicle.ownerName}</TableCell>
                    <TableCell>{vehicle.model}</TableCell>
                    <TableCell>{vehicle.yearOfManufacture}</TableCell>
                    <TableCell>
                      <Select
                        value={vehicle.status}
                        onChange={(e) => handleStatusChange(vehicle._id, e.target.value)}
                        sx={{ minWidth: 120 }}
                      >
                        <MenuItem value="registered">Registered</MenuItem>
                        <MenuItem value="renewed">Renewed</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<PictureAsPdf />}
                        onClick={() => handleDownloadPDF(vehicle)}
                        sx={{ mr: 1 }}
                      >
                        PDF
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        startIcon={<Download />}
                        onClick={() => handleDownloadExcel(vehicle)}
                      >
                        Excel
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default VehicleList;
