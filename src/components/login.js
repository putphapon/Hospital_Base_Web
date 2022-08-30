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
            // console.log( email, password )

            let data = {
                username: email,
                password: password,
            }

            axios.post(`${baseUrlApi}login`, data)
            .then((res) => {

            // console.log("token", res.data)
            if (res.data.message.type !== '-1') {
                setToken(res.data.message)

                if (res.data.message.type === '0') {
                    navigate("/dashboard", { state: { accessType: res.data.message.type}})
                } else {
                    navigate("/profile", { state: { accessType: res.data.message.type, id: res.data.message.id}})
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
                    <Typography variant="h2" component="h6">Login</Typography>
                    <Divider variant="fullWidth" style={{ padding: "10px 0" }}/>
                </Grid>
            </Grid>


            {/* Body */}
            <Grid container direction="row" justifyContent="center" alignItems="flex-start">
                <Grid item xs></Grid>

                {
                    fetchToken() ? (
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" component="h3" style={{ textTransform: 'uppercase' }}>logged</Typography>
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