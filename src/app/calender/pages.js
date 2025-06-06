// src/app/calendar/page.js
"use client";

import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Calendar from "react-calendar"; // example library
import "react-calendar/dist/Calendar.css";

export default function CalendarPage() {
    const [date, setDate] = useState(new Date());

    return (
        <Box className="min-h-screen flex flex-col items-center py-8">
            <Typography variant="h4" className="mb-6">
                📅 Yearly Calendar
            </Typography>
            <Calendar
                onChange={setDate}
                value={date}
                view="year" /* shows months of the year */
                tileClassName="text-center"
            />
        </Box>
    );
}
