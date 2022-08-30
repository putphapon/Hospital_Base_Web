import { useEffect, useState } from "react"
import { useNavigate, useLocation } from 'react-router-dom'
import NumberFormat from "react-number-format";
import axios from "axios";

import {
    Container,
    Grid,
    Box,
    Typography,
    FormControl,
    TextField,
    Stack,
    Button,
    FormHelperText,
    Divider,
    IconButton,
    InputAdornment
} from '@mui/material'

import {
    baseUrlApi,
    Footer,
    CalBMI,
    Logout
} from './componen'

// icon
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import "../App.css";

import { 
    DataGrid, 
    GridToolbarQuickFilter
} from '@mui/x-data-grid';

const Dashboard = () => {
    
    let navigate = useNavigate()
    let accessType = useLocation().state.accessType
    // console.log('accessType : ', accessType)

    let [rows, setRows] = useState([])

    let handleMouseDown = (event) => {
        event.preventDefault();
      }

    let handleSubmit = (event) => {
        let userId = event.target.id
        // console.log("id : ", typeof userId)

        if (userId !== '') {
            if (window.confirm(`ต้องการลบ ${userId} จริงๆ`) === true) {
                axios.delete(`${baseUrlApi}profile/${parseInt(userId)}/`)
                .then(res => { 
                    // console.log('res', res) 
                
                    axios.get(`${baseUrlApi}dashboard/`)
                    .then(res => { 
                        // console.log("res", res.data)
                        setRows(res.data)
                    })
                })
            }
        }
    }

    // useState
    let [pageSize, setPageSize] = useState(10);
    const QuickSearchToolbar = () => {
      return (
        <Box
          sx={{
            p: 0.5,
            pb: 0,
          }}
        >
          <GridToolbarQuickFilter />
        </Box>
      );
    }

    useEffect(()=> {
        axios.get(`${baseUrlApi}dashboard/`)
        .then(res => { 
            // console.log("res", res.data)
            setRows(res.data)
        })
    },[])

    // DataGrid
    let columns = [
        {
            field: 'id',
            headerName: 'รหัสผู้ป่วย',
            flex: 0, 
            sortable: true, 
            hide: false,
            renderCell: (params: GridActionsCellItem) => {
                return (
                    <>
                        <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="stretch"
                        divider={<Divider orientation="vertical" flexItem />}
                        >
                            <IconButton onClick={() => { navigate("/profile", { state: { accessType: accessType, id: params.row.id }}) }}> <EditIcon/> </IconButton>
                            <IconButton id={params.row.id} onClick={handleSubmit} onMouseDown={handleMouseDown}> <DeleteForeverIcon  id={params.row.id}/> </IconButton>
                        </Stack>
                    </>
                )
            }
        },
        {   field: "first_name", 
            headerName: "ชื่อผู้ป่วย", 
            flex: 1, 
            sortable: true, 
            hide: false,
            renderCell: (params: GridActionsCellItem) => {
                return (
                    <>
                        {params.row.first_name} {params.row.last_name}
                    </>
                )
            } 
        },
        {   field: "height", 
            headerName: "ความสูง", 
            flex: 1, 
            sortable: true, 
            hide: false,
            renderCell: (params: GridActionsCellItem) => {
                return (
                    <>
                        {params.row.height}
                    </>
                )
            } 
        },
        {   field: "weight", 
            headerName: "น้ำหนัก", 
            flex: 1, 
            sortable: true, 
            hide: false,
            renderCell: (params: GridActionsCellItem) => {
                return (
                    <>
                        {params.row.weight}
                    </>
                )
            } 
        },
        {   field: "pressure", 
            headerName: "ความดัน", 
            flex: 1, 
            sortable: true, 
            hide: false,
            renderCell: (params: GridActionsCellItem) => {
                return (
                    <>
                        {params.row.pressure}
                    </>
                )
            } 
        },
        {   field: "bmi", 
            headerName: "bmi", 
            flex: 1, 
            sortable: true, 
            hide: false,
            renderCell: (params: GridActionsCellItem) => {
                return (
                    <>
                        <NumberFormat
                            value={CalBMI(params.row.height, params.row.weight)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={""}
                            decimalScale={2}
                        />
                    </>
                )
            } 
        },
    ]


    return (
        <Container maxWidth="xl" style={{ paddingTop: "50px" }}>
            {/* Header */}
            <Grid container direction="row" justifyContent="center" alignItems="center" style={{ paddingBottom: "20px" }}>
                <Grid container item xs direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item xs>
                        <Typography variant="h2" component="span"> Dashboard</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="subtitle1" component="span" style={{ fontFamily: "Noto Sans Thai, Roboto, sans-serif" }}>ประเภทผู้ใช้งาน {accessType === '0' ? 'แพทย์' : 'ผู้ป่วย'} </Typography>
                        <Logout></Logout>
                    </Grid>
                    <Divider variant="fullWidth" style={{ padding: "10px 0" }}/>
                </Grid>
            </Grid>

            {/* Body */}
            <Grid container direction="row" justifyContent="center" alignItems="flex-start">
                <Grid item xs>
                    <DataGrid
                        pagination
                        rows={rows}
                        columns={columns}
                        pageSize={pageSize}
                        rowsPerPageOptions={[5, 10, 25, 50, 100]}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        autoHeight={true}
                        initialState={{
                            sorting: {
                                sortModel: [{ field: 'id', sort: 'asc' }],
                            },
                        }}
                        isRowSelectable={() => false}
                    />
                </Grid>
            </Grid>

            {/* Footer */}
            <Footer></Footer>
        </Container>
    )
}

export default Dashboard