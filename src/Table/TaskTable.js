import { Box, Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import Cookie from "js-cookie"
import { useEffect, useState } from 'react'
import axios from 'axios'


const TaskTable = () => {
    const [task, settask] = useState([])
    const [editTaskId, setEditTaskId] = useState(null);
    const [updatedTask, setUpdatedTask] = useState({});


const handleEdit=(id,crT)=>{
    setEditTaskId(id)
    setUpdatedTask(crT)
}


    useEffect(() => {
        getTaskList()
    }, [])

    let token = Cookie.get("AuthToken")
    const getTaskList = async () => {
        try {
            let response = await axios.get(`http://127.0.0.1:5000/user/getAlltask`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            settask(response.data.data[0].taskList)
        } catch (error) {
            console.log(error.message)
        }
    }

    const TaskUpdate=(id,crTask)=>{
     console.log(id)
     console.log(crTask)
    }
    return (
        <>
            <div>
                <Container maxWidth="lg">
                    <Box sx={{
                        backgroundColor: "whitesmoke",
                        boxShadow: 2,
                        borderRadius: 2,
                        margin: 2,
                        padding: 2
                    }}
                    >
                        <Typography variant='h5' align='center' gutterBottom> TaskList</Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>TaskName</TableCell>
                                    <TableCell>TaskAssignUser</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Priority</TableCell>
                                    <TableCell>Auther_id</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {task.map((ele, ind, arr) => {
                                    return (
                                        <TableRow>
                                            <TableCell>{ele.taskname}</TableCell>
                                            <TableCell>{ele.taskUserAssign}</TableCell>
                                            <TableCell>{ele.status}</TableCell>
                                            <TableCell>{ele.priority}</TableCell>
                                            <TableCell>{ele.Auther_id}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleEdit(ele._id, ele)}>Update</Button>
                                                <Button>Delete</Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </Box>
                </Container>
            </div>
        </>
    )
}

export default TaskTable