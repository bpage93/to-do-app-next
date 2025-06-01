"use client";

import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function RootLayout({ children }) {
    const theme = createTheme({
        palette: {
            mode: "light",
            primary: {
                main: "#6B21A8", // deep purple
            },
            secondary: {
                main: "#3B82F6", // blue
            },
        },
        typography: {
            fontFamily: '"Poppins", sans-serif',
            h4: {
                fontWeight: 600,
            },
            h6: {
                fontWeight: 500,
            },
            body1: {
                fontSize: "1rem",
            },
        },
        components: {
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(8px)",
                        borderRadius: "16px",
                        boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: "none",
                        borderRadius: "8px",
                        fontWeight: 500,
                    },
                },
            },
        },
    });

    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>My To-Do App</title>
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen">
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
