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
        // For now, accept any credentials
        localStorage.setItem(
            "user",
            JSON.stringify({ loggedIn: true, name: email })
        );
        router.push("/home");
    };

    return (
        <Container
            maxWidth="sm"
            className="min-h-screen flex items-center justify-center"
        >
            <Paper elevation={4} className="p-8 rounded-2xl w-full">
                <Typography
                    variant="h4"
                    component="h1"
                    className="text-center mb-6"
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
                                Log In
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}
