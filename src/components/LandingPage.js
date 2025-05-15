"use client";

import {
    Button,
    Container,
    Typography,
    TextField,
    Paper,
    Grid,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function LandingPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("user", JSON.stringify({ loggedIn: true }));
        router.push("/home");
    };

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user && JSON.parse(user).loggedIn) {
            router.push("/home");
        }
    }, [router]);

    return (
        <Container
            maxWidth="md"
            className="min-h-screen flex flex-col justify-center"
        >
            <Paper elevation={4} className="p-10 rounded-2xl shadow-lg w-full">
                <Typography variant="h3" className="text-center mb-8 font-bold">
                    {isLogin
                        ? "Login to My To-Do App"
                        : "Welcome to My To-Do App"}
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {!isLogin && (
                            <Grid item xs={12}>
                                <TextField
                                    label="Full Name"
                                    fullWidth
                                    required
                                    variant="outlined"
                                />
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                required
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                required
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                {isLogin ? "Log In" : "Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>

                <Typography
                    variant="body2"
                    className="text-center mt-6 text-gray-500"
                >
                    {isLogin ? (
                        <>
                            Don't have an account?{" "}
                            <button
                                type="button"
                                onClick={() => setIsLogin(false)}
                                className="text-blue-600 underline"
                            >
                                Sign Up
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={() => setIsLogin(true)}
                                className="text-blue-600 underline"
                            >
                                Log In
                            </button>
                        </>
                    )}
                </Typography>
            </Paper>
        </Container>
    );
}
