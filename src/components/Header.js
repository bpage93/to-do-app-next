"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function Header({ userName, onAddList, onDeleteAll, onLogout }) {
    return (
        <AppBar position="static" className="mb-10">
            <Toolbar className="flex justify-between">
                <Typography variant="h6">📋 Welcome, {userName}!</Typography>
                <div className="flex gap-4">
                    <Button color="inherit" onClick={onAddList}>
                        ➕ Add New List
                    </Button>
                    <Button color="inherit" onClick={onDeleteAll}>
                        🗑️ Delete All
                    </Button>
                    <Button color="inherit" onClick={onLogout}>
                        🚪 Log Out
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
}
