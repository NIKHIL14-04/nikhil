import React from 'react'
import * as yup from "yup"
import { useFormik } from "formik"
import { Container, Box, Typography, TextField, Button } from "@mui/material"
import axios from "axios"
const phoneRegex = RegExp(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
);
const userSchema = yup.object({
    name: yup.string().required("name is required..!"),
    email: yup.string().email("invalide email").required("email is required..!"),
    phone: yup.string().matches(phoneRegex, "invalide phone number").required("number is required..!"),
    address: yup.string().required("address is required..!"),
    password: yup.string().min(6, "minimum 6 latter should be add").required("password is required"),
    user: yup.string().required("avatar image should be required")
})
const Registerform = () => {
    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
            password: "",
            user: "",
        },
        validationSchema: userSchema,
        onSubmit: async (values, { resetForm }) => {
            let { user, name, email, password, address, phone } = values
            user = user.replace("C:\\fakepath\\", "")
            console.log(user)
            const formData = new FormData();
            formData.append("name", name)
            formData.append("user", user)
            formData.append("email", email)
            formData.append("password", password)
            formData.append("address", address)
            formData.append("phone", phone)
            try {
                let response = await axios.post(`http://127.0.0.1:5000/user/Register`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data", // Ensure the correct content type
                    },
                })
                console.log(response.data.message)
                resetForm()
                console.log(values)
            } catch (error) {
                console.log(error.message)
            }

        }
    })
    return (
        <>
            <div>
                <Container maxWidth="sm">
                    <Box sx={{
                        backgroundColor: "whitesmoke",
                        padding: 3,
                        borderRadius: 2,
                        boxShadow: 2,
                        mt: 2
                    }}>
                        <Typography variant="h5" align="center" gutterBottom>
                            Registerform
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Name"
                                id='Name'
                                name='name'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                                margin="normal"
                            ></TextField>
                            <TextField
                                fullWidth
                                label="Email"
                                id="email"
                                name='email'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                margin="normal"
                            ></TextField>
                            <TextField
                                fullWidth
                                label="Phone"
                                id="phone"
                                name="phone"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.phone}
                                margin="normal"
                                error={touched.phone && Boolean(errors.phone)}
                                helperText={touched.phone && errors.phone}
                            ></TextField>
                            <TextField
                                fullWidth
                                label="Address"
                                id="address"
                                name="address"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.address}
                                margin="normal"
                                error={touched.address && Boolean(errors.address)}
                                helperText={touched.address && errors.address}
                            ></TextField>
                            <TextField
                                fullWidth
                                label="Image"
                                id="user"
                                name="user"
                                value={values.user}
                                type="file"
                                inputProps={{
                                    accept: "image/*", // Restrict file types to images
                                }}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={touched.user && Boolean(errors.user)}
                                helperText={touched.user && errors.user}
                            ></TextField>
                            <TextField
                                fullWidth
                                label="Password"
                                id='password'
                                name='password'
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

export default Registerform