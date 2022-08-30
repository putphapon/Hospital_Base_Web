import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";

import {
    Container,
    Grid,
    Typography,
    FormControl,
    TextField,
    Stack,
    Button,
    FormHelperText,
    Divider
} from '@mui/material'

import {
    baseUrlApi,
    Footer,
    handleDateFormat
} from './componen'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import "../App.css";

const Register = () => {

    let navigate = useNavigate()
    let accessType = '1'

    let [email, setEmail] = useState('')
    let handleChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    let [password, setPassword] = useState('')
    let handleChangePassword = (event) => {
        setPassword(event.target.value)
    }

    let [confirmPassword, setConfirmPassword] = useState('')
    let handleChangeConfirmPassword = (event) => {
        setConfirmPassword(event.target.value)
    }

    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName] = useState('')
    let [address, setAddress] = useState('1-2 ')
    let [subdistrict, setSubistrict] = useState('Rat Burana')
    let [district, setDistrict] = useState('Rat Burana')
    let [province, setProvince] = useState('Bangkok')
    let [postcode, setPostcode] = useState('10140')

    let today = new Date()
    let [birthDate, setBirthDate] = useState(new Date())
    let handleChangeSetBirthDate = (newValue) => {
        setBirthDate(newValue)
    }

    let handleMouseDown = (event) => {
    event.preventDefault();
      }

    let handleSubmit = (event) => {

        if (confirmPassword === '' & password !== confirmPassword) {
            // console.log("in")
        } else {
            // console.log(handleDateFormat(new Date(birthDate)))
            let data = {
                username: email,
                password: password,
                type: '1',
                first_name: firstName,
                last_name: lastName,
                date_of_birth: handleDateFormat(new Date(birthDate)),
                address: address,
                sub_district: subdistrict,
                district: district,
                province: province,
                postcode: province,
                height:  '170',
                weight: '60',
                pressure: '90',
            }
            
            axios.post(`${baseUrlApi}register/`, data)
            .then(res => { 
                // console.log("res", res)
                
                navigate('/login');
            })
        }
    }
    
    return (
        <Container maxWidth="xl" style={{ paddingTop: "50px" }}>
            {/* Header */}
            <Grid container direction="row" justifyContent="center" alignItems="center" style={{ paddingBottom: "20px" }}>
                <Grid item xs>
                    <Typography variant="h2" component="h6">Register</Typography>
                    <Divider variant="fullWidth" style={{ padding: "10px 0" }}/>
                </Grid>
            </Grid>


            {/* Body */}
            <Grid container direction="row" justifyContent="center" alignItems="flex-start">
                <Grid item xs></Grid>
                <Grid item xs={6}>
                    {/* username */}
                    <FormControl fullWidth>
                        {/* email */}
                        <TextField label="Email" type="email" margin="normal" required value={email} onChange={handleChangeEmail}/>

                        {/* password */}
                        <TextField label="Password" type="password" margin="normal" required error={password !== confirmPassword ? true : false} value={password} onChange={handleChangePassword}/>
                        
                        {/* confirm password */}
                        <TextField label="Confirm Password" type="password" margin="normal" required error={password !== confirmPassword ? true : false} value={confirmPassword} onChange={handleChangeConfirmPassword}/>

                        {/* label warning */}
                        {
                            password === confirmPassword | password === '' ?
                            <FormHelperText style={{ color: 'green' }}>Right</FormHelperText> :
                            <FormHelperText style={{ color: 'red' }}>Error</FormHelperText>
                        }
                    </FormControl>

                    <Divider variant="fullWidth" style={{ padding: "10px 0" }}/>

                    {/* profile */}
                    <FormControl fullWidth>
                        {/* first name */}
                        <TextField label="first name" type="text" margin="normal" required value={firstName} onChange={ (event) => { setFirstName(event.target.value)} }/>

                        {/* last name */}
                        <TextField label="last name" type="text" margin="normal" required value={lastName} onChange={ (event) => { setLastName(event.target.value)} }/>
                        
                        {/* date of birth */}
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="date of birth"
                                value={birthDate}
                                onChange={handleChangeSetBirthDate}
                                minDate={today.setFullYear(today.getFullYear() - 100)}
                                maxDate={new Date()}
                                inputProps={{ readOnly: true }}
                                renderInput={(params) => <TextField {...params} margin="normal"/>}
                            />
                        </LocalizationProvider>
                        
                        {/* address */}
                        <TextField label="address" type="text" margin="normal" value={address} onChange={ (event) => { setAddress(event.target.value)} }/>
                        
                        {/* district */}
                        <TextField label="district" type="text" margin="normal" value={district} onChange={ (event) => { setDistrict(event.target.value)} }/>
                        
                        {/* sub district */}
                        <TextField label="sub district" type="text" margin="normal" value={subdistrict} onChange={ (event) => { setSubistrict(event.target.value)} }/>
                        
                        {/* province */}
                        <TextField label="province" type="text" margin="normal" value={province} onChange={ (event) => { setProvince(event.target.value)} }/>
                        
                        {/* postcode */}
                        <TextField label="postcode" type="text" margin="normal" value={postcode} onChange={ (event) => { setPostcode(event.target.value)} }/>

                    </FormControl>

                    <Divider variant="fullWidth" style={{ padding: "10px 0" }}/>

                    {/* button */}
                    <Stack direction="row" spacing={2} style={{ paddingTop: "15px" }}>
                        <Button variant="contained" size="large" fullWidth onClick={handleSubmit} onMouseDown={handleMouseDown}>Register</Button>
                        <Button variant="outlined" size="large" fullWidth onClick={() => { navigate("/login") }} >Login</Button>
                    </Stack>
                </Grid>
                <Grid item xs></Grid>
            </Grid>

            {/* Footer */}
            <Footer></Footer>
        </Container>
    )
}

export default Register