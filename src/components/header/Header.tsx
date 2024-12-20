"use client";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Button, List, ListItem, Typography } from "@mui/material";
import { doSignOut } from "@/services/auth";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();
    const { userLoggedIn } = useAuth();

    return (
        <AppBar position="static" sx={{ boxShadow: 0, backgroundColor: "black" }}>
            <Box
                sx={{
                    margin: "0 auto",
                    width: 410,
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <List sx={{ display: "flex", width: "100%" }}>
                    {userLoggedIn && (
                        <ListItem sx={{ width: "50%", justifyContent: "end" }}>
                            <Button
                                onClick={() =>
                                    doSignOut().then(() => {
                                        document.cookie = `token=${""}; path=/`;
                                        router.push("/login");
                                    })
                                }
                            >
                                {" "}
                                <Typography color="white" fontWeight="bold" textTransform="capitalize">
                                    Logout
                                </Typography>
                            </Button>
                        </ListItem>
                    )}

                    {!userLoggedIn && (
                        <>
                            <ListItem sx={{ width: "50%", justifyContent: "end" }}>
                                <Typography color="default" fontWeight="bold">
                                    <Link href="/login">Login</Link>
                                </Typography>
                            </ListItem>
                            <ListItem sx={{ width: "100%" }}>
                                <Typography color="default" fontWeight="bold">
                                    <Link href="/register">Register New Account</Link>
                                </Typography>
                            </ListItem>
                        </>
                    )}
                </List>
            </Box>
        </AppBar>
    );
}
