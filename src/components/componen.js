import { createContext } from "react"
import { useNavigate } from "react-router-dom";

// components
import {
    Grid,
    Stack,
    Typography,
    Divider,
    Button
} from '@mui/material'

export const baseUrlApi = "http://localhost:8000/api/"
export const AuthContext = createContext('-1')

export const Logout = () => {

    let navigate = useNavigate()
    let handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <Button variant="contained" color="error" onClick={handleLogout}>Log out</Button>
            </Stack>
        </>
    )
}


export const Footer = () => {
    return (
        <Grid container direction="row" justifyContent="flex-start" alignItems="center" style={{ height: "10vh", marginTop: "30px" }}>
            <Grid item xs={12}>
                <Divider variant="fullWidth" style={{ padding: "10px 0" }}/>
                <Typography variant="subtitle1" component="h6">Footer</Typography>
            </Grid>
        </Grid>
    )
}

export const CalBMI = (H, W) => {
    let h_ = parseFloat(H)/100
    let w_ = parseFloat(W)

    return w_/(h_*h_)
}

export const handleDateFormat = (datetime) => {
    let date = new Date(datetime)
    let year = date.getFullYear()
    let month = String(date.getMonth() + 1).padStart(2, '0')
    let day = String(date.getDate()).padStart(2, '0')
  
    return `${year}-${month}-${day}`
  }