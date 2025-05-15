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
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import TodoItem from "@/components/TodoItem";

const FILTERS = {
    all: (task) => true,
    active: (task) => !task.completed,
    completed: (task) => task.completed,
};

export default function TodoList({ listId, onDeleteList }) {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [filter, setFilter] = useState("all");
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [title, setTitle] = useState("Untitled List");

    const handleAddTask = () => {
        if (task.trim() === "") return;
        setTasks([...tasks, { text: task, completed: false }]);
        setTask("");
    };

    const handleDeleteTask = (indexToDelete) => {
        setTasks(tasks.filter((_, index) => index !== indexToDelete));
    };

    const toggleTask = (index) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
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

                <Grid container spacing={3}>
                    <AnimatePresence>
                        {filteredTasks.map((item, index) => (
                            <Grid item xs={12} key={index}>
                                <TodoItem
                                    item={item}
                                    index={index}
                                    toggleTask={toggleTask}
                                    handleDeleteTask={handleDeleteTask}
                                />
                            </Grid>
                        ))}
                    </AnimatePresence>
                </Grid>
            </Paper>
        </motion.div>
    );
}
