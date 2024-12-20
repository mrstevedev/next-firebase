import { FormControl, InputLabel, TextField, Button, Typography } from "@mui/material";

export default function LoginForm({ onSubmit, onChange, setPassword, isSigningIn, email, password }: any) {
    return (
        <form onSubmit={onSubmit}>
            <InputLabel htmlFor="email" sx={{ fontWeight: 600 }}>
                Email
            </InputLabel>
            <FormControl margin="dense">
                <TextField
                    id="email"
                    name="email"
                    variant="outlined"
                    type="email"
                    slotProps={{
                        input: {
                            sx: { width: 380, borderRadius: 2, height: 40 }
                        }
                    }}
                    onChange={onChange}
                />
            </FormControl>

            <InputLabel htmlFor="email" sx={{ fontWeight: 600 }}>
                Password
            </InputLabel>
            <FormControl margin="dense">
                <TextField
                    id="password"
                    variant="outlined"
                    type="password"
                    slotProps={{
                        input: {
                            sx: { width: 380, borderRadius: 2, height: 40 }
                        }
                    }}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </FormControl>
            <Button
                variant="contained"
                type="submit"
                color="info"
                sx={{
                    width: 380,
                    borderRadius: 2,
                    height: 40,
                    textTransform: "none",
                    fontSize: 16,
                    marginTop: 1,
                    cursor: isSigningIn ? "not-allowed" : "pointer"
                }}
            >
                {email && password && isSigningIn ? (
                    <Typography fontSize={14} fontWeight={600}>
                        Signing In...
                    </Typography>
                ) : (
                    <Typography fontSize={14} fontWeight={600}>
                        Sign In
                    </Typography>
                )}
            </Button>
        </form>
    );
}
