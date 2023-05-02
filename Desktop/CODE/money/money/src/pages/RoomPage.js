import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Overview from "../components/Overview";
import Eventsview from "../components/Eventsview";

import { db } from "../firebase/firebase";
import { ref, onValue } from "firebase/database";

import { Col, Row, Typography, Segmented } from 'antd';

import BackButton from '../components/BackButton';

function RoomPage() {
    const navigate = useNavigate()

    const { Title } = Typography;

    const [segValue, setSegValue] = useState('Overview');
    const [data, setData] = useState();

    useEffect(() => {
        let room_id = sessionStorage.getItem("ROOM_ID");
        if (room_id != null) {
            const roomRef = ref(db, 'rooms/' + room_id);
            onValue(roomRef, (snapshot) => {
                var data = snapshot.val();
                setData(data)
            })
        } else {
            navigate("/");
        }

    }, [])

    const renderSection = () => {
        if (segValue == "Overview") {
            return <Col span={24}><Overview data={data}/></Col>
        } else {
            return <Col span={24}><Eventsview data={data}/></Col>
        }
    }

    if (data) {
        return (
            <div>
                <Row gutter={[8,8]} justify={'center'}>
                    <Col span={22}>
                        <Row align="middle" className='title_margin'>
                            <Col>
                                <BackButton url={'/'}/>
                            </Col>
                            <Col>
                                <Title level={4} style={{margin:0}}>{data.title}</Title>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Segmented block options={['Overview', 'Events']} value={segValue} onChange={setSegValue} />
                    </Col>
                    {renderSection()}
                </Row>

            </div>
        )
    } else {
        return (
            <div>
                <h1>loading</h1>
            </div>
        )
    }

}

export default RoomPage;