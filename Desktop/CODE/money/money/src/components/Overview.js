import { useState, useEffect } from 'react'

import { Row, Col, Collapse, Space } from 'antd';

const { Panel } = Collapse;

function Overview(props) {

    const [users, setUsers] = useState([])
    const [usersOwe, setUsersOwe] = useState({})
    const [events, setEvents] = useState({})

    useEffect(() => {
        if (props.data) {
            var users = props.data.users
            var userArray = []
            for (const userKey in users) {
                let user = users[userKey]
                userArray.push(user.name)

            }
            setUsers(userArray)
        }

    }, [props.data])

    useEffect(() => {
        setEvents(props.data.events)
    }, [props.data])

    useEffect(() => {
        // build user owe
        var users_owe = {}
        for (const userKey in users) {
            var user = users[userKey]
            var user_owe_array = {}
            for (const userKey2 in users) {
                var user2 = users[userKey2]
                if (user !== user2) {
                    user_owe_array[user2] = 0
                }
            }
            users_owe[user] = user_owe_array
        }

        for (const eventKey in events) {
            var event = events[eventKey]
            const paid_by = event['paid_by']
            var items = event['items']
            let tax = event['tax']
            for (const itemKey in items) {
                var item = items[itemKey]
                const ppu = item['ppu']

                for (const userKey in users) {
                    var user = users[userKey]

                    if (user !== paid_by) {
                        var amount = (item[user] * ppu) * (1 + (tax)/100)
                        users_owe[user][paid_by] += amount 
                    }
                }
            }
        }
        setUsersOwe(users_owe)
    }, [props.data, users])


    const renderPay = (element) => {
        let owe = usersOwe[element]
        if (owe) {
            return Object.keys(owe).map((key)=>{
                return <p>{key} - ${(owe[key]).toFixed(2)}</p>
            })
        }
        
        // return usersOwe[element].map((ele2, idx2) => {
        //     return <p>ele2</p>
        // }) 
    }

    const renderOwe = () => {
        return users.map((element, idx) => {
            return <Collapse><Panel header={element} key={idx}>
                {renderPay(element)}
            </Panel></Collapse>

        })
    }

    if (usersOwe && users) {
        return (
            <div>
                <Row justify={'center'}>
                    <Col span={22}>
                        <Space direction='vertical' style={{
                            display: 'flex',
                        }}>

                            {renderOwe()}

                        </Space>
                    </Col>
                </Row>
            </div>
        )
    } else {
        return <></>
    }

}

export default Overview;