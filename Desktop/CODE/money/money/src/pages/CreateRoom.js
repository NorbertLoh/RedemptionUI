import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Col, Row, Input, Typography, List, Button } from 'antd';

import UsersInput from "../components/UsersInput";

import { PlusCircleOutlined } from '@ant-design/icons';

import { db } from "../firebase/firebase";
import { ref, onValue, update, push, child, remove, set } from "firebase/database";

function CreateRoom() {
    const navigate = useNavigate()

    const { Title } = Typography;

    const [users, setUsers] = useState([])

    const [title, setTitle] = useState('')
    const [newName, setNewName] = useState('')

    const [error, setError] = useState('')
    const [submitError, setSubmitError] = useState('')

    const OnChangeUsers = (e) => {
        setNewName(e.target.value)
    }

    const OnChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    const addUser = () => {
        if (newName != "") {
            if (!users.includes(newName)) {
                let newUsers = [...users]
                newUsers.push(newName)
                
                setUsers(newUsers)
                setNewName('')
                setError("")
            } else {
                setError("Cannot have duplicate names.")
            }
            
        }
    }

    const removeUser = (idx) => {
        let newUsers = [...users]
        newUsers.splice(idx, 1)

        setUsers(newUsers)
    }

    const createRoomRequest = () => {

        const newRoomData = {
          title: title,
          events: {},
          users: {}
        }
    
        const newRoomKey = push(child(ref(db), 'rooms')).key;
    
        var updates = {}
        updates['rooms/' + newRoomKey] = newRoomData
        update(ref(db), updates)

        for (const userKey in users) {
            const user = users[userKey]
      
            const newUserData = {
              name: user,
            }
      
            const newUserKey = push(child(ref(db), 'rooms/' + newRoomKey + '/users/')).key;
            const updates = {}
            updates['rooms/' + newRoomKey + '/users/' + newUserKey] = newUserData
            update(ref(db), updates)
          }
        
        // update local storage
        var room_ids = JSON.parse(localStorage.getItem("room_ids"))
        if(room_ids != null){
            room_ids.push([newRoomKey, title])
        } else {
            room_ids = [[newRoomKey, title]]
        }
        
        localStorage.setItem("room_ids", JSON.stringify(room_ids));
        return navigate("/");

        // return newRoomKey;
      }

    const submit = () => {
        if(title != "") {
            if(users.length != 0) {
                setSubmitError("")

                createRoomRequest()

            } else {
                setSubmitError("Require at least 1 user!")
            }
        } else {
            setSubmitError("Title is required!")
        }
    }

    const RenderUsers = () => {
        return users.map((value, index) => {
            return (
                <div key={"div" + index}>
                    <div className='divider' ></div>
                    <Col span={24}><UsersInput value={value} index={index} removeUser={removeUser} /></Col>
                </div>
            )
        })
    }

    const InputAdd = () => {
        return (

            <Row gutter={[8, 8]} align="middle">
                <Col span={22}><Input value={newName} onChange={OnChangeUsers} placeholder='New User Name' /></Col>
                <Col span={2}>
                    <PlusCircleOutlined onClick={addUser} style={{ fontSize: '24px' }} />
                </Col>
            </Row>

        )
    }


    return (
        // title
        // users
        <>
            <Row gutter={[8, 8]} justify="center">
                <Col span={22}>
                    <Title level={5}>Title<span className='asterisks'>*</span></Title>
                    <Input value={title} onChange={OnChangeTitle} placeholder='Title' />
                </Col>
                <Col span={22}>
                    {InputAdd()}
                    {error ? <p className='error_p'>{error}</p> : <></>}
                </Col>
                <Col span={22}>
                    <List>
                        {RenderUsers()}
                    </List>
                </Col>
                <Col span={22}>
                    
                    <Button onClick={submit} type="primary" block>Submit</Button>
                    {submitError ? <p className='error_p'>{submitError}</p> : <></>}
                </Col>



            </Row>

        </>
    )
}

export default CreateRoom;