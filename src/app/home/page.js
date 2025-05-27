"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Grid } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import TodoList from "@/components/TodoList";

export default function HomePage() {
    const [lists, setLists] = useState([]);
    const [completedCount, setCompletedCount] = useState(0);
    const router = useRouter();

    const handleAddNewList = () => {
        setLists([...lists, Date.now()]);
    };

    const handleDeleteList = (idToDelete) => {
        setLists(lists.filter((id) => id !== idToDelete));
    };

    const handleDeleteAllLists = () => {
        setLists([]);
        setCompletedCount(0);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        router.push("/");
    };

    const handleTaskComplete = () => {
        setCompletedCount((prev) => prev + 1);
    };

    return (
        <>
            <Header
                userName="User"
                onAddList={handleAddNewList}
                onDeleteAll={handleDeleteAllLists}
                onLogout={handleLogout}
                completedCount={completedCount}
            />

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
                                        onTaskComplete={handleTaskComplete}
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
