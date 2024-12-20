import { FormControl, InputLabel, TextField, Button, Typography } from "@mui/material";

export default function RegisterForm({ onSubmit, onChange, email, password, isRegistering }: any) {
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
                        input: { sx: { width: 380, borderRadius: 2, height: 40 } }
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
                    name="password"
                    variant="outlined"
                    type="password"
                    slotProps={{
                        input: { sx: { width: 380, borderRadius: 2, height: 40 } }
                    }}
                    onChange={onChange}
                />
            </FormControl>

            <InputLabel htmlFor="email" sx={{ fontWeight: 600 }}>
                Confirm Password
            </InputLabel>
            <FormControl margin="dense">
                <TextField
                    id="password_confirm"
                    name="password_confirm"
                    variant="outlined"
                    type="password"
                    slotProps={{
                        input: { sx: { width: 380, borderRadius: 2, height: 40 } }
                    }}
                    onChange={onChange}
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
                    fontWeight: 600,
                    fontSize: 16,
                    marginTop: 1,
                    cursor: isRegistering ? "not-allowed" : "pointer"
                }}
            >
                {email && password && isRegistering ? (
                    <Typography fontSize={14} fontWeight={600}>
                        Signing Up...
                    </Typography>
                ) : (
                    <Typography fontSize={14} fontWeight={600}>
                        Sign Up
                    </Typography>
                )}
            </Button>
        </form>
    );
}
