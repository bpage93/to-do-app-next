"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
    Box,
} from "@mui/material";
import { motion } from "framer-motion";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored && JSON.parse(stored).loggedIn) {
            router.push("/home");
        }
    }, [router]);

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem(
            "user",
            JSON.stringify({ loggedIn: true, name: email, email })
        );
        router.push("/home");
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #6B21A8, #3B82F6)",
                animation: "gradientShift 5s ease infinite",
                "@keyframes gradientShift": {
                    "0%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                    "100%": { backgroundPosition: "0% 50%" },
                },
                backgroundSize: "200% 200%",
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Paper
                    elevation={6}
                    sx={{ p: 4, borderRadius: 2, maxWidth: 400, width: "100%" }}
                >
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            textAlign: "center",
                            mb: 4,
                            color: "primary.main",
                        }}
                    >
                        🔐 Log In
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </Grid>
                            <Grid
                                item
                                xs={4}
                                sx={{ display: "flex", alignItems: "center" }}
                            >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    Log In
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    fullWidth
                                    onClick={() => router.push("/signpage")}
                                >
                                    Sign Up
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </motion.div>
        </Box>
    );
}
