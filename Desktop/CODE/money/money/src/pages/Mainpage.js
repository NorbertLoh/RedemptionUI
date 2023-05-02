import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { db } from "../firebase/firebase";
import { ref, onValue } from "firebase/database";

import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, Row, Card, FloatButton, Modal, Input } from 'antd';

function Mainpage() {
    const navigate = useNavigate()

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [searchInput, setSearchInput] = useState()
    const [error, setError] = useState('')

    const [roomIDs, setRoomIDs] = useState([])

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        const roomRef = ref(db, 'rooms/' + searchInput,);
        onValue(roomRef, (snapshot) => {
            var data = snapshot.val();
            if (data == null) {
                setError('Invalid Room ID')
            } else {
                setError(false)
                let exists = roomIDs.some(row => row.includes(searchInput));
                if (!exists) {
                    let newRoomIDs = roomIDs
                    newRoomIDs.push([searchInput, data.title])

                    localStorage.setItem("room_ids", JSON.stringify(newRoomIDs));
                    setRoomIDs(newRoomIDs)
                    setSearchInput('')
                    setError('')
                    setIsModalOpen(false);
                } else {
                    setError('Room ID already Added')
                }
            }
        })
    };

    const handleCancel = () => {
        setSearchInput('')
        setError('')
        setIsModalOpen(false);
    };

    const onSearchInput = (e) => {
        setSearchInput(e.target.value)
    }

    const SearchModal = () => {
        return (
            <Modal title="Search" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Input placeholder='Room ID' value={searchInput} onChange={onSearchInput} />
                {error ? <p className='error_p'>{error}</p> : <></>}

            </Modal>
        )
    }

    const CreateNew = () => {
        return navigate("/createroom");
    }

    const navigateRoom = (idx) => {
        let id = roomIDs[idx][0]
        sessionStorage.setItem("ROOM_ID", id)
        return navigate("/room");
    }

    useEffect(() => {
        const room_ids = JSON.parse(localStorage.getItem("room_ids"))
        if (room_ids != null) {
            setRoomIDs(room_ids)
        }
    }, [])

    return (
        <>
            <Row gutter={[8, 8]} justify="center">
                {
                    roomIDs.map((room, idx) =>
                        <Col key={room} span={22}>
                            <Card size="small" onClick={() => navigateRoom(idx)}>
                                <p><b>{room[1]}</b></p>
                                <p>{room[0]}</p>
                            </Card>
                        </Col>
                    )
                }

            </Row>
            <FloatButton onClick={showModal} icon={<SearchOutlined />} type="primary" style={{ right: 24 }} />
            <FloatButton onClick={CreateNew} icon={<PlusOutlined />} type="default" style={{ right: 74 }} />
            {SearchModal()}
        </>
    )
}

export default Mainpage;