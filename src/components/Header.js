"use client";

import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Badge,
    Popover,
    List,
    ListItem,
    ListItemText,
    IconButton,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function Header({
    userName,
    onAddList,
    onDeleteAll,
    onLogout,
    completedCount,
    completedTasks = [],
}) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleBellClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "completed-tasks-popover" : undefined;

    return (
        <AppBar position="static" className="mb-10">
            <Toolbar className="flex justify-between">
                <Typography variant="h6">📋 Welcome, {userName}!</Typography>
                <div className="flex items-center gap-4">
                    <IconButton
                        color="inherit"
                        onClick={handleBellClick}
                        aria-describedby={id}
                    >
                        <Badge badgeContent={completedCount} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>

                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                        }}
                    >
                        <List sx={{ p: 2, maxWidth: 300 }}>
                            {completedTasks.length > 0 ? (
                                completedTasks.map((task, index) => (
                                    <ListItem key={index} disablePadding>
                                        <ListItemText
                                            primary={`✅ Completed: '${task}'`}
                                        />
                                    </ListItem>
                                ))
                            ) : (
                                <ListItem>
                                    <ListItemText primary="No completed tasks yet." />
                                </ListItem>
                            )}
                        </List>
                    </Popover>

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
