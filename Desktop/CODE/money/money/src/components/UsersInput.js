import React from 'react';

import { Col, Row, List } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

function UsersInput(props) {

    const OnClick = () => {
        props.removeUser(props.index)
    }

    return (
        // title
        // users
        <>
            <Row gutter={[8,8]} align="middle">
                <Col span={22}>
                    <List.Item>{props.value}</List.Item>
                </Col>
                <Col span={2}>
                    <MinusCircleOutlined id={props.index} onClick={OnClick} style={{ fontSize: '24px' }}/>
                </Col>
            </Row>
        </>
    )
}

export default UsersInput;