"use client";

import { Paper, Checkbox, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";

export default function TodoItem({
    item,
    index,
    toggleTask,
    handleDeleteTask,
}) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
        >
            <Paper
                className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                    item.completed ? "bg-green-100" : "bg-white"
                }`}
                elevation={1}
            >
                <div className="flex items-center gap-4">
                    <Checkbox
                        checked={item.completed}
                        onChange={() => toggleTask(index)}
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
                    onClick={() => handleDeleteTask(index)}
                >
                    Delete
                </Button>
            </Paper>
        </motion.div>
    );
}
