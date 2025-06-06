"use client";

import React, { useState } from "react";
import {
    Paper,
    TextField,
    Typography,
    Button,
    Grid,
    Divider,
    IconButton,
    Snackbar,
    Alert,
    Checkbox,
    Box,
    Stack,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const FILTERS = {
    all: (task) => true,
    active: (task) => !task.completed,
    completed: (task) => task.completed,
};

export default function TodoList({ listId, onDeleteList, onTaskComplete }) {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [filter, setFilter] = useState("all");
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [title, setTitle] = useState("Untitled List");
    const [openToast, setOpenToast] = useState(false);
    const [completedMessage, setCompletedMessage] = useState("");

    const handleAddTask = () => {
        if (!task.trim()) return;
        setTasks((prev) => [...prev, { text: task, completed: false }]);
        setTask("");
        setCompletedMessage("✅ Task added successfully!");
        setOpenToast(true);
    };

    const handleDeleteTask = (indexToDelete) => {
        setTasks((prev) => prev.filter((_, index) => index !== indexToDelete));
    };

    const toggleTask = (index) => {
        setTasks((prev) => {
            const updated = prev.map((item, i) =>
                i === index ? { ...item, completed: !item.completed } : item
            );
            if (updated[index].completed) {
                setCompletedMessage(`🎉 '${updated[index].text}' completed!`);
                setOpenToast(true);
                onTaskComplete?.(updated[index].text);
            }
            return updated;
        });
    };

    const filteredTasks = tasks.filter(FILTERS[filter]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
        >
            <Paper
                sx={{
                    mb: 4,
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: "#fafafa",
                }}
            >
                <Stack spacing={2}>
                    {/* Title and Delete List */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        {isEditingTitle ? (
                            <TextField
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                size="small"
                                sx={{ flexGrow: 1 }}
                            />
                        ) : (
                            <Typography
                                variant="h6"
                                noWrap
                                sx={{ flexGrow: 1 }}
                            >
                                📝 {title}
                            </Typography>
                        )}
                        <Box>
                            <IconButton
                                onClick={() =>
                                    setIsEditingTitle((prev) => !prev)
                                }
                            >
                                {isEditingTitle ? <SaveIcon /> : <EditIcon />}
                            </IconButton>
                            <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={() => onDeleteList(listId)}
                                sx={{ ml: 1 }}
                            >
                                Delete List
                            </Button>
                        </Box>
                    </Box>

                    {/* Add Task Input */}
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <TextField
                            fullWidth
                            label="Add a new task"
                            variant="outlined"
                            size="small"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleAddTask()
                            }
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddTask}
                        >
                            Add
                        </Button>
                    </Box>

                    {/* Filter Buttons */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 1,
                        }}
                    >
                        {["all", "active", "completed"].map((key) => (
                            <Button
                                key={key}
                                variant={
                                    filter === key ? "contained" : "outlined"
                                }
                                size="small"
                                onClick={() => setFilter(key)}
                            >
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </Button>
                        ))}
                    </Box>

                    <Divider />

                    {/* Tasks List */}
                    <Grid container spacing={2}>
                        {filteredTasks.length ? (
                            <AnimatePresence>
                                {filteredTasks.map((item, index) => (
                                    <Grid item xs={12} key={index}>
                                        <Paper
                                            component={motion.div}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            sx={{
                                                p: 2,
                                                borderRadius: 2,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                backgroundColor: item.completed
                                                    ? "#e7f9ed"
                                                    : "#ffffff",
                                                boxShadow: 1,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 2,
                                                }}
                                            >
                                                <Checkbox
                                                    checked={item.completed}
                                                    onChange={() =>
                                                        toggleTask(index)
                                                    }
                                                />
                                                <Typography
                                                    variant="body1"
                                                    noWrap
                                                    sx={{
                                                        textDecoration:
                                                            item.completed
                                                                ? "line-through"
                                                                : "none",
                                                        color: item.completed
                                                            ? "text.secondary"
                                                            : "text.primary",
                                                    }}
                                                >
                                                    {item.text}
                                                </Typography>
                                            </Box>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                color="error"
                                                onClick={() =>
                                                    handleDeleteTask(index)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </Paper>
                                    </Grid>
                                ))}
                            </AnimatePresence>
                        ) : (
                            <Grid item xs={12}>
                                <Typography
                                    variant="body2"
                                    align="center"
                                    color="text.secondary"
                                >
                                    No tasks to show
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </Stack>
            </Paper>

            {/* Toast Notification */}
            <Snackbar
                open={openToast}
                autoHideDuration={2000}
                onClose={() => setOpenToast(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setOpenToast(false)}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    {completedMessage}
                </Alert>
            </Snackbar>
        </motion.div>
    );
}
