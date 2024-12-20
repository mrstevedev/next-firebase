// import styles from "./page.module.css";
"use client";
import { Box } from "@mui/material";
import { useAuth } from "@/context/authContext";

export default function Home() {
    const { currentUser } = useAuth();
    return (
        <Box component="main" padding={5}>
            <h1>Home</h1>
            <p>welcome {currentUser.email}</p>
        </Box>
    );
}
