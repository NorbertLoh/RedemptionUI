import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Col, Row, Modal, Collapse, Space, FloatButton, Input, InputNumber, Typography, Select } from 'antd';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';

import { db } from "../firebase/firebase";
import { ref, update, push, child } from "firebase/database";

const { Panel } = Collapse;
const { Title } = Typography;

function Eventsview(props) {
    const navigate = useNavigate()

    const [events, setEvents] = useState();
    const [users, setUsers] = useState([])
    const [usersOptions, setUsersOptions] = useState([])
    const [selectedUser, setSelectedUser] = useState()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [titleInput, setTitleInput] = useState()
    const [tax, setTaxInput] = useState(0)
    const [error, setError] = useState('')

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {

        if (titleInput != "" && tax != null && selectedUser != undefined) {
            console.log("sumitted")
            setError("")
            addEvents()
            setIsModalOpen(false);
        } else {
            setError("Please fill in all fields!")
        }
    };

    const addEvents = () => {
        let room_id = sessionStorage.getItem("ROOM_ID");
        if (room_id != null) {
            const newEventData = {
                name: titleInput,
                paid_by: selectedUser,
                tax: tax
            }

            const newEventKey = push(child(ref(db), 'rooms/' + room_id + '/events/')).key;
            const updates = {}
            updates['rooms/' + room_id + '/events/' + newEventKey] = newEventData
            update(ref(db), updates)

            return newEventKey
        } else {
            navigate("/");
        }
    }

    const handleCancel = () => {
        setTitleInput('')
        setTaxInput(0)
        setSelectedUser(undefined)
        setError('')
        setIsModalOpen(false);
    };

    const onTitleInput = (e) => {
        setTitleInput(e.target.value)
    }

    const onTaxInput = (value) => {
        console.log(value)
        setTaxInput(value)
    }

    const selectChange = (value) => {
        console.log(value)
        setSelectedUser(value)
    }


    const AddEventModal = () => {
        return (
            <Modal title="Add Event" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Title level={5}>Event Name<span className='asterisks'>*</span></Title>
                <Input placeholder='Event Name' value={titleInput} onChange={onTitleInput} />

                <Title level={5}>Tax (%)<span className='asterisks'>*</span></Title>
                <InputNumber defaultValue={0} placeholder='Tax (%)' value={tax} onChange={onTaxInput} />

                <Title level={5}>Paid By<span className='asterisks'>*</span></Title>
                <Select
                    onChange={selectChange}
                    options={usersOptions}
                    style={{
                        width: '100%',
                    }}
                    value={selectedUser}
                />
                {error ? <p className='error_p'>{error}</p> : <></>}

            </Modal>
        )
    }

    useEffect(() => {
        console.log(props.data.events)
        setEvents(props.data.events)
    }, [props.data])



    useEffect(() => {
        if (props.data) {
            var users = props.data.users
            console.log(users)
            var userArray = []
            var userOptions = []
            for (const userKey in users) {
                let user = users[userKey]
                userArray.push(user.name)
                userOptions.push({ value: user.name, label: user.name })

            }
            console.log(userOptions)
            setUsersOptions(userOptions)
            setUsers(userArray)
        }

    }, [props.data])

    const renderEventItemList = (items) => {
        if (items) {
            return Object.entries(items).map((item, idx) => {
                let items = item[1]
                console.log(items)
                let ppu = items['ppu']
                return (
                    <Col span={24} key={idx}>
                        <Collapse>
                            <Panel header={items.name + " - $" + items.price} key={idx + "panel"}>
                                {
                                    users.map((user, idx) => {
                                        return <p key={idx}>{user} - ${ppu * items[user]}</p>
                                    })
                                }
                            </Panel>
                        </Collapse>
                    </Col>

                )
            })
        } else {
            return <></>
        }

    }

    const settings = (eventid) => {

        return <SettingOutlined
            onClick={(event) => {
                // If you don't want click extra trigger collapse, you can prevent this:
                console.log(eventid)
                sessionStorage.setItem("EVENT_ID", eventid)
                event.stopPropagation();
                return navigate("/event");
            }}
        />
    }

    const renderEventList = () => {
        return Object.entries(events).reverse().map((item, idx) => {
            console.log(item)
            return (
                <Collapse key={item[0]} expandIconPosition={'start'}>
                    <Panel header={item[1].name} key={item[0] + "panel"} extra={settings(item[0])}>
                        <Row gutter={[8, 8]}>
                            <Col span={24}>
                                <p>Paid by: {item[1].paid_by}</p>
                                <p>Tax: {item[1].tax}%</p>
                            </Col>
                            {renderEventItemList(item[1].items)}
                        </Row>
                        {/* {renderPay(element)} */}
                    </Panel>
                </Collapse>
            )
        })

    }

    if (events) {
        return (
            <div>
                <Row justify={'center'}>
                    <Col span={22}>
                        <Space direction='vertical' style={{
                            display: 'flex',
                        }}>
                            {renderEventList()}
                        </Space>
                    </Col>
                </Row>
                <FloatButton icon={<PlusOutlined />} onClick={showModal} type="primary" style={{ right: 24 }} />
                {AddEventModal()}
            </div>
        )
    } else {
        return <>
            <FloatButton icon={<PlusOutlined />} onClick={showModal} type="primary" style={{ right: 24 }} />
            {AddEventModal()}
        </>
    }

}

export default Eventsview;