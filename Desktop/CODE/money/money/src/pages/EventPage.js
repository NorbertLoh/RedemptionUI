import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import { db } from "../firebase/firebase";
import { ref, onValue, update, push, child, remove, set } from "firebase/database";

import BackButton from '../components/BackButton';

import {
    Col,
    Row,
    Typography,
    Collapse,
    Space,
    FloatButton,
    Modal,
    Input,
    InputNumber,
    Popconfirm,
    Select
} from 'antd';
import { PlusOutlined, SettingOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

import NumberInput from "../components/NumberInput";

const { Panel } = Collapse;

function EventPage() {

    const navigate = useNavigate()
    const { Title } = Typography;

    const [data, setData] = useState()
    const [users, setUsers] = useState()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState('')
    const [itemName, setItemName] = useState('')
    const [itemPrice, setItemPrice] = useState()

    const [userCount, setUserCount] = useState()

    const [editing, setEditing] = useState(false)
    const [itemid, setItemid] = useState('')

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editTitle, setEditTitle] = useState('')
    const [editTax, setEditTax] = useState(0)
    const [usersOptions, setUsersOptions] = useState([])
    const [selectedUser, setSelectedUser] = useState()

    const showEditModal = () => {
        setEditTitle(data.name)
        setEditTax(data.tax)
        setSelectedUser(data.paid_by)
        setIsEditModalOpen(true);
    };

    const handleEditCancel = () => {
        setEditTitle('')
        setEditTax(0)
        setSelectedUser(undefined)
        setError('')
        setIsEditModalOpen(false);
    };

    const handleEditOk = () => {
        updateEvent()
        handleEditCancel()
    }

    const updateEvent = () => {
        let room_id = sessionStorage.getItem("ROOM_ID");
        let eventid = sessionStorage.getItem("EVENT_ID");

        if (room_id != null && eventid != null) {
            const newItemData = {
                name: editTitle,
                tax: editTax,
                paid_by: selectedUser,
            }
    
            update(ref(db, 'rooms/' + room_id + '/events/' + eventid + "/"), newItemData)
        } else {
            navigate("/");
        }
    }

    const onEditTitle = (e) => {
        setEditTitle(e.target.value)
    }

    const onEditTax = (value) => {
        setEditTax(value)
    }

    const selectChange = (value) => {
        setSelectedUser(value)
    }

    const deleteEvent = () => {
        let room_id = sessionStorage.getItem("ROOM_ID");
        let eventid = sessionStorage.getItem("EVENT_ID");

        if (room_id != null && eventid != null) {
            remove(ref(db, 'rooms/' + room_id + '/events/' + eventid))
            navigate("/room");
        } else {
            navigate("/");
        }
    }

    const EditEventModal = () => {
        return (
            <Modal title="Edit Event" open={isEditModalOpen} onOk={handleEditOk} onCancel={handleEditCancel}>
                <Popconfirm
                    title="Delete event?"
                    onConfirm={deleteEvent}
                    okText="Yes"
                    cancelText="No"
                >
                    <DeleteOutlined style={{ fontSize: 24, color: "red" }} />
                </Popconfirm>
                <Title level={5}>Event Name<span className='asterisks'>*</span></Title>
                <Input placeholder='Event Name' value={editTitle} onChange={onEditTitle} />

                <Title level={5}>Tax (%)<span className='asterisks'>*</span></Title>
                <InputNumber defaultValue={0} placeholder='Tax (%)' value={editTax} onChange={onEditTax} />

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





    const showModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setItemName('')
        setItemPrice()
        setError("")
        setItemid('')
        setEditing(false)

        let userCountObj = { ...userCount }

        Object.keys(userCountObj).map((key) => {
            userCountObj[key] = 0
        })

        setUserCount(userCountObj)

        setIsModalOpen(false);
    };

    const handleCancel = () => {
        closeModal();
    };

    const handleOk = () => {
        if (itemName != "" && itemPrice != null) {

            if (!editing) {
                addItem()
            } else {
                updateItem()
            }
            closeModal();
        } else {
            setError("Please fill in all fields!")
        }
    };

    const addItem = () => {
        let room_id = sessionStorage.getItem("ROOM_ID");
        let eventid = sessionStorage.getItem("EVENT_ID");
        if (room_id != null && eventid != null) {
            const newItemData = {
                name: itemName,
                price: itemPrice
            }

            var unitCount = 0

            for (const userKey in users) {
                let user = users[userKey]
                newItemData[user] = userCount[user]
                unitCount += userCount[user]
            }

            var ppu = 0;
            if (unitCount != 0) {
                ppu = (itemPrice / unitCount).toFixed(2)
            }

            newItemData['ppu'] = Number(ppu)

            const newItemKey = push(child(ref(db), 'rooms/' + room_id + '/events/' + eventid + '/items/')).key;
            const updates = {}
            updates['rooms/' + room_id + '/events/' + eventid + '/items/' + newItemKey] = newItemData
            update(ref(db), updates)
        } else {
            navigate("/");
        }
    }

    const updateItem = () => {
        let room_id = sessionStorage.getItem("ROOM_ID");
        let eventid = sessionStorage.getItem("EVENT_ID");
        if (room_id != null && eventid != null) {
            const newItemData = {
                name: itemName,
                price: itemPrice
            }

            var unitCount = 0

            for (const userKey in users) {
                let user = users[userKey]
                newItemData[user] = userCount[user]
                unitCount += userCount[user]
            }

            var ppu = 0;
            if (unitCount != 0) {
                ppu = (itemPrice / unitCount).toFixed(2)
            }

            newItemData['ppu'] = Number(ppu)

            const updates = {}
            updates['rooms/' + room_id + '/events/' + eventid + '/items/' + itemid] = newItemData
            update(ref(db), updates)
        } else {
            navigate("/");
        }

    }

    const removeItem = () => {
        let room_id = sessionStorage.getItem("ROOM_ID");
        let eventid = sessionStorage.getItem("EVENT_ID");
        if (room_id != null && eventid != null) {
            remove(ref(db, 'rooms/' + room_id + '/events/' + eventid + '/items/' + itemid))
        } else {
            navigate("/");
        }
    }

    const deleteItem = () => {
        removeItem()
        closeModal();
    }

    const handleItemName = (e) => {
        setItemName(e.target.value)
    }

    const handleItemPrice = (val) => {
        setItemPrice(val)
    }

    const addCount = (user) => {
        let userCountObj = { ...userCount }
        userCountObj[user] += 1
        setUserCount(userCountObj)
    }

    const minusCount = (user) => {
        if (userCount[user] > 0) {
            let userCountObj = { ...userCount }
            userCountObj[user] -= 1
            setUserCount(userCountObj)
        }

    }


    const AddItemModal = () => {
        let title = "Add Item"
        if (editing) {
            title = "Edit Item"
        }
        return (
            <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {editing ?
                    <Popconfirm
                        title="Delete item?"
                        onConfirm={deleteItem}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined style={{ fontSize: 24, color: "red" }} />
                    </Popconfirm> : <></>}

                <Title level={5} style={{ marginTop: 0 }}>Item Name<span className='asterisks'>*</span></Title>
                <Input placeholder='Item Name' value={itemName} onChange={handleItemName} />

                <Title level={5}>Price<span className='asterisks'>*</span></Title>
                <InputNumber style={{ width: "100%" }} placeholder='Price' value={itemPrice} onChange={handleItemPrice} />

                <Title level={5}>Users<span className='asterisks'>*</span></Title>

                {
                    Object.entries(users).map((user, idx) => {
                        return (
                            <>
                                <Title level={5}>{user[1]}</Title>
                                <NumberInput value={userCount} index={user[1]} add={addCount} minus={minusCount} />
                            </>
                        )
                    })
                }

                {error ? <p className='error_p'>{error}</p> : <></>}

            </Modal>
        )
    }

    const settings = (itemid) => {
        return <SettingOutlined
            onClick={(event) => {
                // If you don't want click extra trigger collapse, you can prevent this:
                setItemid(itemid)
                setEditing(true)
                showModal()
                let item = data['items'][itemid]

                // set items
                setItemName(item.name)
                setItemPrice(item.price)

                let userCountObj = { ...userCount }
                users.forEach(user => {
                    userCountObj[user] = item[user]
                });
                setUserCount(userCountObj)

                event.stopPropagation();
                // return navigate("/event");
            }}
        />
    }

    const renderEventItemList = () => {
        if (data.items && users) {
            let items = data.items
            return Object.entries(items).reverse().map((item, idx) => {
                let items = item[1]
                let ppu = items['ppu']
                return (
                    <Collapse key={idx}>
                        <Panel header={items.name + " - $" + items.price} key={idx + "panel"} extra={settings(item[0])}>
                            {
                                users.map((user, idx) => {
                                    return <p key={idx}>{user} - ${ppu * items[user]}</p>
                                })
                            }
                        </Panel>
                    </Collapse>
                )
            })
        } else {
            return <></>
        }

    }


    useEffect(() => {
        let room_id = sessionStorage.getItem("ROOM_ID");
        let eventid = sessionStorage.getItem("EVENT_ID");
        if (room_id != null && eventid != null) {
            const roomRef = ref(db, 'rooms/' + room_id + "/users/");
            onValue(roomRef, (snapshot) => {
                var data = snapshot.val();
                var userArray = []

                // build user count object
                var userObj = {}
                var userOptions = []

                for (const userKey in data) {
                    let user = data[userKey]
                    userArray.push(user.name)
                    userObj[user.name] = 0
                    userOptions.push({ value: user.name, label: user.name })
                }
                setUsers(userArray)
                setUserCount(userObj)
                setUsersOptions(userOptions)
            })

            const eventRef = ref(db, 'rooms/' + room_id + "/events/" + eventid + "/");
            onValue(eventRef, (snapshot) => {
                var data = snapshot.val();
                setData(data)
            })
        } else {
            navigate("/");
        }

    }, [])


    if (data) {
        return (
            <>
                <Row gutter={[8, 0]} justify='center'>
                    <Col span={22}>
                        <Row align="middle" className='title_margin'>
                            <Col>
                                <BackButton url={'/room'}/>
                            </Col>
                        </Row>
                        <Title level={5}>Event: {data.name}</Title>
                        <Title level={5}>Paid By: {data.paid_by}</Title>
                        <Title level={5}>Tax: {data.tax}%</Title>
                        <div className='divider'></div>
                    </Col>
                    <Col span={22}>
                        <Title level={5}>Items:</Title>
                        <Space direction='vertical' style={{
                            display: 'flex',
                        }}>
                            {renderEventItemList()}
                        </Space>
                    </Col>
                </Row>
                {AddItemModal()}
                {EditEventModal()}
                <FloatButton icon={<PlusOutlined />} onClick={showModal} type="primary" style={{ right: 24 }} />
                <FloatButton icon={<EditOutlined />} onClick={showEditModal} type="default" style={{ right: 74 }} />
            </>
        )
    } else {
        return <></>
    }

}

export default EventPage;