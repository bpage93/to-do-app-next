"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Grid, Box } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import TodoList from "@/components/TodoList";

export default function HomePage() {
    const [lists, setLists] = useState([]);
    const [completedCount, setCompletedCount] = useState(0);
    const [completedTasks, setCompletedTasks] = useState([]);
    const router = useRouter();

    // Add a new list
    const handleAddNewList = () => {
        setLists([...lists, Date.now()]);
    };

    // Delete a single list
    const handleDeleteList = (idToDelete) => {
        setLists(lists.filter((id) => id !== idToDelete));
    };

    // Delete all lists and reset notifications
    const handleDeleteAllLists = () => {
        setLists([]);
        setCompletedCount(0);
        setCompletedTasks([]);
    };

    // Logout clears user and navigates to the login page
    const handleLogout = () => {
        localStorage.removeItem("user");
        router.push("/login");
    };

    // Track a completed task (text passed from TodoList)
    const handleTaskComplete = (taskText) => {
        setCompletedCount((prev) => prev + 1);
        setCompletedTasks((prev) => [...prev, taskText]);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                background:
                    "linear-gradient(135deg, rgba(107,33,168,0.3), rgba(59,130,246,0.3))",
                animation: "gradientShift 5s ease infinite",
                "@keyframes gradientShift": {
                    "0%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                    "100%": { backgroundPosition: "0% 50%" },
                },
                backgroundSize: "200% 200%",
            }}
        >
            <Header
                userName="User"
                onAddList={handleAddNewList}
                onDeleteAll={handleDeleteAllLists}
                onLogout={handleLogout}
                completedCount={completedCount}
                completedTasks={completedTasks}
            />

            {/* Scrollable Container for Too Many Lists */}
            <Container
                maxWidth="xl"
                sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                    py: 2,
                    px: 2,
                }}
            >
                <Box
                    sx={{
                        maxHeight: "calc(100vh - 150px)",
                        overflowY: "auto",
                    }}
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
                                        onTaskComplete={handleTaskComplete}
                                    />
                                </Grid>
                            ))}
                        </AnimatePresence>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}
