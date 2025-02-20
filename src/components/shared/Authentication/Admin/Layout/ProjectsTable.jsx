import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

const ProjectsTable = ({ orders, admins }) => {
  const [selectedAdmin, setSelectedAdmin] = useState({});

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>شناسه سفارش</TableCell>
            <TableCell>کاربر</TableCell>
            <TableCell>خدمت</TableCell>
            <TableCell>توضیحات</TableCell>
            <TableCell>وضعیت</TableCell>
            <TableCell>مدیر پروژه</TableCell>
            <TableCell>عملیات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.userId}</TableCell>
              <TableCell>
                {services.find((s) => s.id === order.serviceId)?.name}
              </TableCell>
              <TableCell>{order.description}</TableCell>
              <TableCell>
                <Chip
                  label={order.status}
                  color={
                    order.status === "approved"
                      ? "success"
                      : order.status === "rejected"
                      ? "error"
                      : "warning"
                  }
                />
              </TableCell>
              <TableCell>
                <Select
                  value={selectedAdmin[order.id] || ""}
                  onChange={(e) =>
                    setSelectedAdmin({
                      ...selectedAdmin,
                      [order.id]: e.target.value,
                    })
                  }
                  sx={{ width: 150 }}
                >
                  <MenuItem value="" disabled>
                    انتخاب مدیر
                  </MenuItem>
                  {admins.map((admin) => (
                    <MenuItem key={admin.id} value={admin.id}>
                      {admin.name}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAssignAdmin(order.id)}
                >
                  ثبت مدیر
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectsTable;
