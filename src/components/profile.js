import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// components
import {
    Container,
    Grid,
    Typography,
    FormControl,
    TextField,
    Stack,
    Button,
    Divider,
    IconButton,
    InputAdornment 
} from '@mui/material'

import {
    baseUrlApi,
    Footer,
    CalBMI,
    handleDateFormat,
    Logout
} from './componen'

// icon
import EditIcon from '@mui/icons-material/Edit'
import EditOffIcon from '@mui/icons-material/EditOff'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { style } from "@mui/system";



const Profile = () => {

    let accessType = useLocation().state.accessType
    // console.log('accessType : ', accessType)
    
    let navigate = useNavigate()
    let idPatient = useLocation().state.id
    // console.log('id : ', idPatient)

    let [height , setHeight] = useState('')
    let [showHeight, setShowHeight] = useState(true)

    let [weight , setWeight] = useState('0')
    let [showWeight, setShowWeight] = useState(true)

    let [pressure , setPressure] = useState('0')
    let [showPressure, setShowPressure] = useState(true)

    let [bmi , setBMI] = useState(CalBMI(height,weight))


    let [email, setEmail] = useState('')
    let [birthDate, setBD] = useState(new Date())

    let [firstName, setFirstName] = useState('')
    let [baseFirstName, setBaseFirstName] = useState(firstName)
    let [showFirsName, setShowFirsName] = useState(true)

    let [lastName, setLastName] = useState('')
    let [baseLastName, setBaseLastName] = useState(lastName)
    let [showLastName, setShowLastName] = useState(true)
    
    let [address, setAddress] = useState('')
    let [baseAddress, setBaseAddress] = useState(address)
    let [showAddress, setShowAddress] = useState(true)

    let [subdistrict, setSubdistrict] = useState('')
    let [baseSubdistrict, setBaseSubdistrict] = useState(subdistrict)
    let [showSubistrict, setShowSubistrict] = useState(true)

    let [district, setDistrict] = useState('')
    let [baseDistrict, setBaseDistrict] = useState(district)
    let [showDistrict, setShowDistrict] = useState(true)

    let [province, setProvince] = useState('')
    let [baseProvince, setBaseProvince] = useState(province)
    let [showProvince, setShowProvince] = useState(true)

    let [postcode, setPostcode] = useState('')
    let [basePostcode, setBasePostcode] = useState(postcode)
    let [showPostcode, setShowPostcode] = useState(true)

    let handleEditHidden = (flag) => {
        let show = flag === accessType? 'visible' : 'hidden'
        return show
    }

    let [showAllDoctor, setShowAllDoctor] = useState(true)
    let handleEditShowAllDoctor = () => {
        setShowAllDoctor(!showAllDoctor)
        setShowHeight(!showAllDoctor)
        setShowWeight(!showAllDoctor)
        setShowPressure(!showAllDoctor)
    }

    let [showAllPatient, setShowAllPatient] = useState(true)
    let handleEditShowAllPatient = () => {
        setShowAllPatient(!showAllPatient)
        setShowFirsName(!showAllPatient)
        setShowLastName(!showAllPatient)
        setShowAddress(!showAllPatient)
        setShowSubistrict(!showAllPatient)
        setShowDistrict(!showAllPatient)
        setShowProvince(!showAllPatient)
        setShowPostcode(!showAllPatient)
    }

    let handleMouseDown = (event) => {
        event.preventDefault();
      }
      
    let handleReset = (event) => {
        setFirstName(baseFirstName)
        setLastName(baseLastName)
        setAddress(baseAddress)
        setSubdistrict(baseSubdistrict)
        setDistrict(baseDistrict)
        setProvince(baseProvince)
        setPostcode(basePostcode)
    }

    let handleSubmit = (event) => {

        if (accessType === '0') {
            // console.log(
            //     'Doctor',
            //     height,
            //     weight,
            //     pressure,
            //     setBMI(CalBMI(height,weight))
            // )
            setShowAllDoctor(true)
                
        } else if (accessType === '1') {
            // console.log(
            //     'Patient',
            //     firstName,
            //     lastName,
            //     handleDateFormat(birthDate),
            //     address,
            //     district,
            //     subdistrict,
            //     province,
            //     postcode
            // )
            setShowAllPatient(true)
        }

        let data = {
            id: parseInt(idPatient),
            first_name: firstName,
            last_name: lastName,
            address: address,
            sub_district: subdistrict,
            district: district,
            province: province,
            postcode: postcode,
            height: height,
            weight: weight,
            pressure: pressure
        }
        // console.log(data)

        axios.put(`${baseUrlApi}profile/`, data)
        .then(res => {
            // console.log('res', res)
            
            // reShow
            setShowHeight(true)
            setShowWeight(true)
            setShowPressure(true)
    
            setShowFirsName(true)
            setShowLastName(true)
            setShowAddress(true)
            setShowSubistrict(true)
            setShowDistrict(true)
            setShowProvince(true)
            setShowPostcode(true)
        })


    }

    useEffect(() => {

        axios.get(`${baseUrlApi}profile/${idPatient}`)
        .then(res => { 
            
            setEmail(res.data[0].username)
            setFirstName(res.data[0].first_name)
            setLastName(res.data[0].last_name)
            // console.log(res.data[0].date_of_birth)
            setBD(res.data[0].date_of_birth)
            setAddress(res.data[0].address)
            setSubdistrict(res.data[0].sub_district)
            setDistrict(res.data[0].district)
            setProvince(res.data[0].province)
            setPostcode(res.data[0].postcode)
            setHeight(res.data[0].height)
            setWeight(res.data[0].weight)
            setPressure(res.data[0].pressure)
            setBMI(CalBMI(res.data[0].height,res.data[0].weight))

            setBaseFirstName(res.data[0].first_name)
            setBaseLastName(res.data[0].last_name)
            setBaseAddress(res.data[0].address)
            setBaseSubdistrict(res.data[0].sub_district)
            setBaseDistrict(res.data[0].district)
            setBaseProvince(res.data[0].province)
            setBasePostcode(res.data[0].postcode)
        })
    },[])

    return (
        <Container maxWidth="xl" style={{ paddingTop: "50px" }}>
            {/* Header */}
            <Grid container direction="row" justifyContent="flex-start" alignItems="flex-end" style={{ paddingBottom: "20px" }}>
                {
                    accessType === '0' ?
                    <Grid item xs={1}>
                    <IconButton
                        onClick={() => { navigate("/dashboard", { state: { accessType: accessType }}) }}
                        edge="end"
                        >
                        <ArrowBackIcon fontSize="large"/>
                    </IconButton>
                    <Divider variant="fullWidth" style={{ padding: "10px 0" }}/>
                </Grid> : null}
                <Grid container item xs direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item xs>
                        <Typography variant="h2" component="span"> Profile</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="subtitle1" component="span" style={{ fontFamily: "Noto Sans Thai, Roboto, sans-serif" }}>ประเภทผู้ใช้งาน {accessType === '0' ? 'แพทย์' :'ผู้ป่วย'} </Typography>
                        <Logout></Logout>
                    </Grid>
                    <Divider variant="fullWidth" style={{ padding: "10px 0" }}/>
                </Grid>
            </Grid>


            {/* Body */}
            <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={2}>
                {/* heath */}
                <Grid item xs>
                    {/* title */}
                    <Typography variant="h5" component="span" style={{ fontFamily: "Noto Sans Thai, Roboto, sans-serif" }}>ข้อมูลสุขภาพ</Typography>
                    {/* button show all */}
                    <IconButton
                        style={{ float: 'right', visibility: handleEditHidden('0') }}
                        onClick={handleEditShowAllDoctor}
                        edge="end"
                        >
                        { showAllDoctor ? <EditIcon fontSize="large"/> : <EditOffIcon fontSize="large"/>}
                    </IconButton>

                    <FormControl fullWidth>
                        {/* height */}
                        <TextField label="Height" type="number" margin="normal" value={height} onChange={ (event) => { setHeight(event.target.value)} }  disabled={showHeight? true: false}
                            InputProps={{
                                endAdornment:(
                                    <InputAdornment position="end" style={{ visibility: handleEditHidden('0') }}>
                                        <IconButton
                                        onClick={() => { 
                                            setShowHeight(!showHeight)
                                            setShowAllDoctor(false)
                                            setBMI(CalBMI(height,weight))
                                        }}
                                        edge="end"
                                        >
                                        {showHeight ? <EditIcon /> : <EditOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                inputProps: { 
                                    min: 50, max: 220 
                                }
                            }}
                        />

                        {/* weight */}
                        <TextField label="Weight" type="number" margin="normal" value={weight} onChange={ (event) => { setWeight(event.target.value)} }  disabled={showWeight? true: false}
                            InputProps={{
                                endAdornment:(
                                    <InputAdornment position="end" style={{ visibility: handleEditHidden('0') }}>
                                        <IconButton
                                        onClick={() => { 
                                            setShowWeight(!showWeight)
                                            setShowAllDoctor(false)
                                            setBMI(CalBMI(height,weight))
                                        }}
                                        edge="end"
                                        >
                                        {showWeight ? <EditIcon /> : <EditOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                inputProps: { 
                                    min: 50, max: 220 
                                }
                            }}
                        />

                        {/* pressure */}
                        <TextField label="Pressure" type="number" margin="normal" value={pressure} onChange={ (event) => { setPressure(event.target.value)} }  disabled={showPressure? true: false}
                            InputProps={{
                                endAdornment:(
                                    <InputAdornment position="end" style={{ visibility: handleEditHidden('0') }}>
                                        <IconButton
                                        onClick={() => { 
                                            setShowPressure(!showPressure)
                                            setShowAllDoctor(false)
                                        }}
                                        edge="end"
                                        >
                                        {showPressure ? <EditIcon /> : <EditOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                inputProps: { 
                                    min: 50, max: 220 
                                }
                            }}
                        />

                        {/* Body Mass Index (BMI) */}
                        <TextField label="Body Mass Index (BMI)" type="number" margin="normal" value={bmi} disabled={true}/>

                    </FormControl>

                    <Divider variant="fullWidth" style={{ padding: "10px 0", visibility: handleEditHidden('0') }}/>

                    {/* button */}
                    <Stack direction="row" spacing={2} style={{ paddingTop: "15px", visibility: handleEditHidden('0') }}>
                        <Button variant="contained" size="large" fullWidth onClick={handleSubmit} onMouseDown={handleMouseDown}>Update</Button>
                        <Button variant="outlined" size="large" fullWidth onClick={() => navigate("/dashboard")}>Cancel</Button>
                    </Stack>


                </Grid>

                <Divider orientation="vertical" flexItem style={{ padding: "10px" }}></Divider>

                {/* profile */}
                <Grid item xs={5} >
                    {/* title */}
                    <Typography variant="h5" component="span" style={{ fontFamily: "Noto Sans Thai, Roboto, sans-serif" }}>ข้อมูลทั่วไป</Typography>
                    {/* button show all */}
                    <IconButton
                        style={{ float: 'right', visibility: handleEditHidden('1') }}
                        onClick={handleEditShowAllPatient}
                        edge="end"
                        >
                        { showAllPatient ? <EditIcon fontSize="large"/> : <EditOffIcon fontSize="large"/>}
                    </IconButton>

                    <FormControl fullWidth>
                        {/* email */}
                        <TextField label="Email" type="email" margin="normal" value={email} disabled/>
                    </FormControl>

                    <Divider variant="fullWidth" style={{ padding: "10px 0" }}/>

                    {/* profile */}
                    <FormControl fullWidth>
                        {/* first name */}
                        <TextField label="first name" type="text" margin="normal" value={firstName} onChange={ (event) => { setFirstName(event.target.value)} } disabled={showFirsName? true: false}
                            InputProps={{
                                endAdornment:(
                                    <InputAdornment position="end" style={{ visibility: handleEditHidden('1') }}>
                                        <IconButton
                                            onClick={() => { 
                                                setShowFirsName(!showFirsName)
                                                setShowAllPatient(false)
                                            }}
                                            edge="end"
                                        >
                                        {showFirsName ? <EditIcon /> : <EditOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        {/* last name */}
                        <TextField label="last name" type="text" margin="normal" value={lastName} onChange={ (event) => { setLastName(event.target.value)} } disabled={showLastName? true: false}
                            InputProps={{
                                endAdornment:(
                                    <InputAdornment position="end" style={{ visibility: handleEditHidden('1') }}>
                                        <IconButton
                                            onClick={() => { 
                                                setShowLastName(!showLastName)
                                                setShowAllPatient(false)
                                            }}
                                            edge="end"
                                        >
                                        {showLastName ? <EditIcon /> : <EditOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }} 
                        />
                        
                        {/* date of birth */}
                        <TextField label="date of birth" type="text" margin="normal" value={birthDate} disabled/>
                        
                        {/* address */}
                        <TextField label="address" type="text" margin="normal" value={address} onChange={ (event) => { setAddress(event.target.value)} } disabled={showAddress? true: false}
                            InputProps={{
                                endAdornment:(
                                    <InputAdornment position="end" style={{ visibility: handleEditHidden('1') }}>
                                        <IconButton
                                            onClick={() => { 
                                                setShowAddress(!showAddress)
                                                setShowAllPatient(false)
                                            }}
                                            edge="end"
                                        >
                                        {showAddress ? <EditIcon /> : <EditOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        
                        {/* sub district */}
                        <TextField label="sub district" type="text" margin="normal" value={subdistrict} onChange={ (event) => { setSubdistrict(event.target.value)} } disabled={showSubistrict? true: false}
                            InputProps={{
                                endAdornment:(
                                    <InputAdornment position="end" style={{ visibility: handleEditHidden('1') }}>
                                        <IconButton
                                            onClick={() => { 
                                                setShowSubistrict(!showSubistrict)
                                                setShowAllPatient(false)
                                            }}
                                            edge="end"
                                        >
                                        {showSubistrict ? <EditIcon /> : <EditOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        
                        {/* district */}
                        <TextField label="district" type="text" margin="normal" value={district} onChange={ (event) => { setDistrict(event.target.value)} } disabled={showDistrict? true: false}
                            InputProps={{
                                endAdornment:(
                                    <InputAdornment position="end" style={{ visibility: handleEditHidden('1') }}>
                                        <IconButton
                                            onClick={() => { 
                                                setShowDistrict(!showDistrict)
                                                setShowAllPatient(false)
                                            }}
                                            edge="end"
                                        >
                                        {showDistrict ? <EditIcon /> : <EditOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        
                        {/* province */}
                        <TextField label="province" type="text" margin="normal" value={province} onChange={ (event) => { setProvince(event.target.value)} } disabled={showProvince? true: false}
                            InputProps={{
                                endAdornment:(
                                    <InputAdornment position="end" style={{ visibility: handleEditHidden('1') }}>
                                        <IconButton
                                            onClick={() => { 
                                                setShowProvince(!showProvince)
                                                setShowAllPatient(false)
                                            }}
                                            edge="end"
                                        >
                                        {showProvince ? <EditIcon /> : <EditOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        
                        {/* postcode */}
                        <TextField label="postcode" type="text" margin="normal" value={postcode} onChange={ (event) => { setPostcode(event.target.value)} } disabled={showPostcode? true: false}
                            InputProps={{
                                endAdornment:(
                                    <InputAdornment position="end" style={{ visibility: handleEditHidden('1') }}>
                                        <IconButton
                                            onClick={() => { 
                                                setShowPostcode(!showPostcode)
                                                setShowAllPatient(false)
                                            }}
                                            edge="end"
                                        >
                                        {showPostcode ? <EditIcon /> : <EditOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                    </FormControl>

                    <Divider variant="fullWidth" style={{ padding: "10px 0", visibility: handleEditHidden('1') }}/>

                    {/* button */}
                    <Stack direction="row" spacing={2} style={{ paddingTop: "15px", visibility: handleEditHidden('1') }}>
                        <Button variant="contained" size="large" fullWidth onClick={handleSubmit} onMouseDown={handleMouseDown}>Update</Button>
                        <Button variant="outlined" size="large" fullWidth onClick={handleReset} onMouseDown={handleMouseDown} >Cancel</Button>
                    </Stack>
                </Grid>
            </Grid>

            {/* Footer */}
            <Footer></Footer>
        </Container>
    )
}

export default Profile