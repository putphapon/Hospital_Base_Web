import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { fetchToken, setToken } from "./auth"
import axios from "axios";

import {
    Container,
    Grid,
    Typography,
    FormControl,
    TextField,
    Stack,
    Button,
    Divider
} from '@mui/material'

import {
    baseUrlApi,
    Footer,
    Logout
} from './componen'

import "../App.css";

const Login = () => {

    let navigate = useNavigate()

    let [email, setEmail] = useState('')
    let handleChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    let [password, setPassword] = useState('')
    let handleChangePassword = (event) => {
        setPassword(event.target.value)
    }

    let handleSubmit = (event) => {

        if (email === "" & password === "") {
        } 
        else {

            let data = {
                username: email,
                password: password,
            }

            axios.post(`${baseUrlApi}login`, data)
            .then((res) => {

                if (res.data.message.type !== '-1') {
                    setToken(res.data)

                    if (res.data.message.type === '0') {
                        navigate("/dashboard", { state: { type: res.data.message.type}})
                    }
                    else {
                        navigate("/profile", { state: { id: res.data.message.id, type: res.data.message.type}})
                    }
                }
            })
            .catch((error) => { console.log(error) })
        }
    }

    return (
        <Container maxWidth="xl" style={{ paddingTop: "50px" }}>
            {/* Header */}
            <Grid container direction="row" justifyContent="center" alignItems="center" style={{ paddingBottom: "20px" }}>
                <Grid item xs>
                    <Typography variant="h2" component="h6">{fetchToken() ? 'Logged': 'Login'}</Typography>
                    <Divider variant="fullWidth" style={{ padding: "10px 0" }}/>
                </Grid>
            </Grid>


            {/* Body */}
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid item xs></Grid>

                {
                    fetchToken() ? (
                        <Grid item xs={6}>
                            <Logout></Logout>
                        </Grid>
                    ) : (
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                {/* email */}
                                <TextField label="Email" type="email" required  margin="normal"value={email} onChange={handleChangeEmail}/>

                                {/* password */}
                                <TextField label="Password" type="password" required margin="normal" value={password} onChange={handleChangePassword}/>
                            </FormControl>

                            <Divider variant="fullWidth" style={{ padding: "10px 0" }}/>

                            {/* button */}
                            <Stack direction="row" spacing={2} style={{ paddingTop: "15px" }}>
                                <Button variant="contained" size="large" fullWidth onClick={handleSubmit}>Login</Button>
                                <Button variant="outlined" size="large" fullWidth onClick={() => { navigate("/register") }} >Register</Button>
                            </Stack>
                        </Grid>
                    )
                }
                
                <Grid item xs></Grid>
            </Grid>

            {/* Footer */}
            <Footer></Footer>
        </Container>
    )
}

export default Login