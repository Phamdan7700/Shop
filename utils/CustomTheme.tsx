import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#15161d",
        },
        secondary: {
            main: "#FFF",
        },
    },
    components: {
        MuiLink: {
            defaultProps: {
                underline: "none",
            },
        },
    },
});
