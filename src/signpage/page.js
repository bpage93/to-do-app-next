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
} from "@mui/material";

export default function SignupPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // If user is already logged in, send them straight to /home
    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored && JSON.parse(stored).loggedIn) {
            router.push("/home");
        }
    }, [router]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // For now, accept any credentials; in a real app you’d call an API.
        localStorage.setItem(
            "user",
            JSON.stringify({ loggedIn: true, name, email })
        );
        router.push("/home");
    };

    return (
        <Container
            maxWidth="sm"
            className="min-h-screen flex flex-col justify-center"
        >
            <Paper elevation={4} className="p-8 rounded-2xl shadow-lg w-full">
                <Typography
                    variant="h4"
                    component="h1"
                    className="text-center mb-6"
                >
                    🆕 Sign Up
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Full Name"
                                type="text"
                                fullWidth
                                required
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
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
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                required
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Create Account
                            </Button>
                        </Grid>
                    </Grid>
                </form>

                <Typography
                    variant="body2"
                    className="text-center mt-6 text-gray-500"
                >
                    Already have an account?&nbsp;
                    <a
                        href="/login"
                        className="text-blue-600 underline"
                        onClick={(e) => {
                            e.preventDefault();
                            router.push("/login");
                        }}
                    >
                        Log In
                    </a>
                </Typography>
            </Paper>
        </Container>
    );
}
