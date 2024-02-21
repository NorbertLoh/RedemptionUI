import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import {
  Space,
  Table,
  Col,
  Row,
  Typography,
  Button,
  Form,
  message,
  Input
} from 'antd';
import type { TableProps } from 'antd';

import config from '../config'

const { Title } = Typography;

interface RouteParams {
  [key: string]: string | undefined;
  id: string;
}

const RedemptionPage: React.FC<{}> = (props) => {


  interface DataType {
    redemption_id: number;
    event_id: number;
    redeemed_at: Date;
    team_name: string;
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Team Name',
      dataIndex: 'team_name',
      key: 'team_name',
      width: "65%"
    },
    {
      title: 'Redeemed At',
      dataIndex: 'redeemed_at',
      key: 'redeemed_at',
      width: "35%"
    },
  ];

  type FieldType = {
    staff_pass_id: string;
  };

  const [data, setData] = useState<DataType[] | undefined>(undefined);
  const [messageApi, contextHolder] = message.useMessage();

  const { id } = useParams<RouteParams>();

  // get events
  useEffect(() => {
    getEvents()
  }, []);

  const getEvents = () => {
    fetch(config.API_BASE_URL + "/redemption/" + id) // Replace with your API endpoint
      .then(response => response.json())
      .then(data => setData(data.response))
      .catch(error => console.error('Error:', error));
  }


  const onFinish = async (values: FieldType) => {
    const staff_pass_id = values.staff_pass_id;
    if (id !== undefined) {
      const data = {
        staff_pass_id: staff_pass_id,
        event_id: parseInt(id)
      }
      const response = await fetch(config.API_BASE_URL + "/redemption", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const json = await response.json();
      if (json.status === 201) {
        messageApi.open({
          type: 'success',
          content: json.response,
        });
        getEvents()
      } else if (json.status === 200) {
        messageApi.open({
          type: 'error',
          content: json.response,
        });
      } else {
        messageApi.open({
          type: 'error',
          content: json.message,
        });
      }
    }
  };

  return (

    <Row className="center-row" gutter={[16, 16]} justify="center">
      {contextHolder}
      <Col span={24}>

        <Row justify="center">
          <Col md={24} xs={24} sm={24} lg={12}>
            <Row>
              <Col span={24}>
                <Space direction="vertical" size="small" style={{ width: "100%" }}>

                  <Form
                    name="Add New Event"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                    autoComplete="off"
                  >
                    <Row align={"bottom"} justify={"center"} gutter={[8, 0]}>
                      <Col md={18} xs={18} sm={18} lg={12}>
                        <Form.Item<FieldType>
                          label="Staff Pass ID"
                          name="staff_pass_id"
                          rules={[{ required: true, message: 'Please input Staff Pass ID!' }]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col md={6} xs={6} sm={6} lg={4}>
                        <Form.Item>
                          <Button type="primary" htmlType="submit">
                            Submit
                          </Button>
                        </Form.Item>
                      </Col>

                    </Row>

                  </Form>
                </Space>
              </Col>
            </Row>

            <Col md={24} xs={24} sm={24} lg={24}>
              <Row>
                <Col>
                  <Title>Redemption History</Title>
                </Col>
              </Row>
              <Row>
                <Col md={24} xs={24} sm={24} lg={24}>
                  <Table pagination={{ pageSize: 5, defaultPageSize: 5 }} columns={columns} dataSource={data} />
                </Col>
              </Row>
            </Col>
          </Col>
        </Row>
      </Col>

    </Row>
  );
};

export default RedemptionPage;