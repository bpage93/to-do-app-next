"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Grid } from "@mui/material";
import Header from "@/components/Header";
import TodoList from "@/components/TodoList";
import CalendarComponent from "@/components/Calendar";
import { AnimatePresence } from "framer-motion";

export default function HomePage() {
    const [lists, setLists] = useState([]);
    const [completedCount, setCompletedCount] = useState(0);
    const [completedTasks, setCompletedTasks] = useState([]);
    const router = useRouter();

    const STORAGE_KEY = "todo-app-state";

    // Load saved state from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const {
                    lists: savedLists,
                    completedCount: savedCount,
                    completedTasks: savedTasks,
                } = JSON.parse(saved);
                setLists(savedLists || []);
                setCompletedCount(savedCount || 0);
                setCompletedTasks(savedTasks || []);
            } catch {}
        }
    }, []);

    // Save state to localStorage whenever it changes
    useEffect(() => {
        const toSave = { lists, completedCount, completedTasks };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    }, [lists, completedCount, completedTasks]);

    // Add a new list
    const handleAddNewList = () => {
        setLists((prev) => [...prev, Date.now()]);
    };

    // Delete a single list
    const handleDeleteList = (idToDelete) => {
        setLists((prev) => prev.filter((id) => id !== idToDelete));
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
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
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

            <Box sx={{ flexGrow: 1, p: 2 }}>
                <Grid container spacing={2}>
                    {/* Left: Calendar */}
                    <Grid item xs={12} md={4} lg={3}>
                        <CalendarComponent />
                    </Grid>

                    {/* Right: To-Do Lists */}
                    <Grid item xs={12} md={8} lg={9}>
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
                                            md={6}
                                            lg={4}
                                            key={id}
                                        >
                                            <TodoList
                                                listId={id}
                                                onDeleteList={handleDeleteList}
                                                onTaskComplete={
                                                    handleTaskComplete
                                                }
                                            />
                                        </Grid>
                                    ))}
                                </AnimatePresence>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
