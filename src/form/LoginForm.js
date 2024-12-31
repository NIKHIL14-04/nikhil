import React from 'react'
import * as yup from "yup"
import { useFormik } from "formik"
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import axios from 'axios'
import Cookie from "js-cookie"

const LoginSchema = yup.object({
    email: yup.string().email("invalid email").required("email is required..!"),
    password: yup.string().min(6, "minimum 6 digit is required").required("password is required")
})

const LoginForm = () => {
    const { errors, values, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        validationSchema: LoginSchema,
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: async (values, { resetForm }) => {
            let respons = await axios.post(`http://127.0.0.1:5000/user/Login`,values)
            console.log(respons.data.message)
            let token =respons.data.AC
             Cookie.set("AuthToken",token,{
                expires:1,
                secure:true
             })
            resetForm()
        }
    })
    return (
        <>
            <div>
                <Container maxWidth="sm">
                    <Box
                        sx={{
                            backgroundColor: "whitesmoke",
                            padding: 2,
                            borderRadius: 2,
                            boxShadow: 2,
                            mt: 2
                        }}
                    >
                        <form onSubmit={handleSubmit}>
                            <Typography variant='h5' align="center" gutterBottom>
                                LoginForm
                            </Typography>
                            <TextField
                                fullWidth
                                label="Email"
                                id="email"
                                name="email"
                                value={values.email}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                margin="normal"
                            ></TextField>

                            <TextField
                                fullWidth
                                label="Password"
                                id="password"
                                name="password"
                                type="password"
                                value={values.password}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                margin="normal"
                            ></TextField>
                            <Button sx={{ mt: 2 }} variant="contained" color="success" type="submit">Submit</Button>
                        </form>
                    </Box>
                </Container>
            </div>
        </>
    )
}

export default LoginForm