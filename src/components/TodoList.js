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
        if (task.trim() === "") return;
        setTasks([...tasks, { text: task, completed: false }]);
        setTask("");
        setCompletedMessage("✅ Task added successfully!");
        setOpenToast(true);
    };

    const handleDeleteTask = (indexToDelete) => {
        setTasks(tasks.filter((_, index) => index !== indexToDelete));
    };

    const toggleTask = (index) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);

        if (newTasks[index].completed) {
            setCompletedMessage(
                `✅ Task '${newTasks[index].text}' marked complete!`
            );
            setOpenToast(true);
            onTaskComplete?.(newTasks[index].text);
        }
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
                className="mb-8 p-8 rounded-2xl shadow-lg bg-gray-50"
                elevation={3}
            >
                <div className="flex items-center justify-between mb-4">
                    {isEditingTitle ? (
                        <TextField
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            size="small"
                            className="w-full max-w-sm"
                        />
                    ) : (
                        <Typography
                            variant="h6"
                            className="truncate max-w-[75%]"
                        >
                            📝 {title}
                        </Typography>
                    )}
                    <div className="flex gap-2">
                        <IconButton
                            onClick={() => setIsEditingTitle((prev) => !prev)}
                        >
                            {isEditingTitle ? <SaveIcon /> : <EditIcon />}
                        </IconButton>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => onDeleteList(listId)}
                        >
                            Delete List
                        </Button>
                    </div>
                </div>

                {/* Task Input */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <TextField
                        fullWidth
                        label="Add a new task"
                        variant="outlined"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />
                    <Button
                        className="min-w-[150px]"
                        variant="contained"
                        color="primary"
                        onClick={handleAddTask}
                    >
                        ➕ Add Task
                    </Button>
                </div>

                {/* Filter Buttons */}
                <div className="flex justify-center gap-4 mb-6">
                    <Button
                        variant={filter === "all" ? "contained" : "outlined"}
                        onClick={() => setFilter("all")}
                    >
                        All
                    </Button>
                    <Button
                        variant={filter === "active" ? "contained" : "outlined"}
                        onClick={() => setFilter("active")}
                    >
                        Active
                    </Button>
                    <Button
                        variant={
                            filter === "completed" ? "contained" : "outlined"
                        }
                        onClick={() => setFilter("completed")}
                    >
                        Completed
                    </Button>
                </div>

                <Divider className="mb-6" />

                {/* Tasks */}
                <Grid container spacing={3}>
                    <AnimatePresence>
                        {filteredTasks.map((item, index) => (
                            <Grid item xs={12} key={index}>
                                <Paper
                                    className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                                        item.completed
                                            ? "bg-green-100"
                                            : "bg-white"
                                    }`}
                                    elevation={1}
                                >
                                    <div className="flex items-center gap-4">
                                        <Checkbox
                                            checked={item.completed}
                                            onChange={() => toggleTask(index)}
                                        />
                                        <Typography
                                            variant="body1"
                                            className={`text-lg ${
                                                item.completed
                                                    ? "line-through text-gray-400"
                                                    : "text-gray-800"
                                            }`}
                                        >
                                            {item.text}
                                        </Typography>
                                    </div>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleDeleteTask(index)}
                                    >
                                        Delete
                                    </Button>
                                </Paper>
                            </Grid>
                        ))}
                    </AnimatePresence>
                </Grid>
            </Paper>

            {/* Toast Notification */}
            <Snackbar
                open={openToast}
                autoHideDuration={2000}
                onClose={() => setOpenToast(false)}
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
