import { FormControl, InputLabel, TextField, Button, Typography } from "@mui/material";

export default function ResetForm({ onSubmit, onChange, isSigningIn, email }: any) {
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
                {email && isSigningIn ? (
                    <Typography fontSize={14} fontWeight={600}>
                        Resetting...
                    </Typography>
                ) : (
                    <Typography fontSize={14} fontWeight={600}>
                        Reset
                    </Typography>
                )}
            </Button>
        </form>
    );
}
