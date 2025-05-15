"use client";

import React, { useState, useEffect } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Grid,
    Button,
    Paper,
    TextField,
    Divider,
    Checkbox,
    IconButton,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const FILTERS = {
    all: (task) => true,
    active: (task) => !task.completed,
    completed: (task) => task.completed,
};

const TodoList = ({ listId, onDeleteList }) => {
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
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
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
                                                onChange={() =>
                                                    toggleTask(index)
                                                }
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
                                            onClick={() =>
                                                handleDeleteTask(index)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </Paper>
                                </motion.div>
                            </Grid>
                        ))}
                    </AnimatePresence>
                </Grid>
            </Paper>
        </motion.div>
    );
};

export default function HomePage() {
    const [lists, setLists] = useState([]);
    const router = useRouter();

    const handleAddNewList = () => {
        setLists([...lists, Date.now()]);
    };

    const handleDeleteList = (idToDelete) => {
        setLists(lists.filter((id) => id !== idToDelete));
    };

    const handleDeleteAllLists = () => {
        setLists([]);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        router.push("/");
    };

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user || !JSON.parse(user).loggedIn) {
            router.push("/");
        }
    }, [router]);

    return (
        <>
            <AppBar position="static" className="mb-10">
                <Toolbar className="flex justify-between">
                    <Typography variant="h6">📋 My To-Do App</Typography>
                    <div className="flex gap-4">
                        <Button color="inherit" onClick={handleAddNewList}>
                            ➕ Add New List
                        </Button>
                        <Button color="inherit" onClick={handleDeleteAllLists}>
                            🗑️ Delete All
                        </Button>
                        <Button color="inherit" onClick={handleLogout}>
                            🚪 Log Out
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>

            <Container maxWidth="xl">
                <div
                    className="overflow-x-hidden overflow-y-auto pb-10"
                    style={{ maxHeight: "calc(100vh - 150px)" }}
                >
                    <Grid container spacing={4}>
                        <AnimatePresence>
                            {lists.map((id) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={4}
                                    key={id}
                                >
                                    <TodoList
                                        listId={id}
                                        onDeleteList={handleDeleteList}
                                    />
                                </Grid>
                            ))}
                        </AnimatePresence>
                    </Grid>
                </div>
            </Container>
        </>
    );
}
