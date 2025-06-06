"use client";

import React, { useState } from "react";
import { Box, Typography, Paper, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function CalendarComponent() {
    const [date, setDate] = useState(dayjs());

    return (
        <Box
            sx={{
                mb: 6,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography
                variant="h5"
                sx={{ mb: 2, fontWeight: 500, color: "primary.main" }}
            >
                Select Date
            </Typography>
            <Paper
                elevation={1}
                sx={{ backgroundColor: "rgba(255,255,255,0.8)", p: 2 }}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={date}
                        onChange={(newValue) => setDate(newValue)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Paper>
        </Box>
    );
}
