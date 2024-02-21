import React, { useEffect, useState } from 'react';

import {
  Space,
  Table,
  Col,
  Row,
  Typography,
  Button,
  Form,
  Upload,
  message,
  Modal,
  Input,
  ConfigProvider
} from 'antd';
import type { TableProps } from 'antd';

import {
  GiftOutlined
} from '@ant-design/icons';

import config from '../config'
import { useNavigate } from "react-router-dom";

const { Title } = Typography;



const MainPage: React.FC<{}> = () => {
  interface DataType {
    event_id: string;
    event_name: string;
    created_at: Date;
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Event Name',
      dataIndex: 'event_name',
      key: 'event_id',
      width: "54%"
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'event_id',
      width: "26%"
    },
    {
      title: '',
      dataIndex: '',
      key: 'event_id',
      width: "10%",
      render: (text, record) => (
        <Row justify="center">
          <GiftOutlined className="iconButton" onClick={() => goToEventPage(record.event_id)} />

        </Row>
      ),
    },
  ];

  type FieldType = {
    event_name: string;
  };

  const navigate = useNavigate();

  const [data, setData] = useState<DataType[] | undefined>(undefined);
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);


  // get events
  useEffect(() => {
    getEvents()
  }, []);

  const goToEventPage = (id: string) => {
    return navigate(`/events/${id}`);
  }

  const getEvents = () => {
    fetch(config.API_BASE_URL + "/events") // Replace with your API endpoint
      .then(response => response.json())
      .then(data => setData(data.response))
      .catch(error => console.error('Error:', error));
  }

  const upload = {
    name: 'file',
    id: 'file',
    action: config.API_BASE_URL + "/staffs/upload",
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info: any) {
      if (info.file.status === 'done') {
        let response = info.file.response
        if (response.status === 201) {
          messageApi.open({
            type: 'success',
            content: 'Staff updated successfully!!',
          });
        } else {
          messageApi.open({
            type: 'error',
            content: response.response,
          });
        }
      } else if (info.file.status === 'error') {
        messageApi.open({
          type: 'error',
          content: "File upload failed.",
        });
      }
    },
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values: FieldType) => {
    const response = await fetch(config.API_BASE_URL + "/events", {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const json = await response.json();
    if (json.status === 201) {
      messageApi.open({
        type: 'success',
        content: 'Event created successfully!!',
      });
      getEvents()
      handleCancel();
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            footerBg: "white",
          },
        },
      }}
    >
      <Row className="center-row" justify="center">
        {contextHolder}
        <Col span={24}>

          <Row justify="center">
            <Col md={24} xs={24} sm={24} lg={12}>
              <Space direction="vertical" size="small" style={{ display: 'flex' }}>
                <Row >
                  <Col>
                    <Space direction="vertical" size="small" style={{ display: 'flex' }}>
                      <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel} footer={null}>
                        <Form
                          name="Add_New_Event"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          initialValues={{ remember: true }}
                          onFinish={onFinish}
                          autoComplete="off"
                        >
                          <Form.Item<FieldType>
                            label="Event Name"
                            name="event_name"
                            rules={[{ required: true, message: 'Please input event name!' }]}
                          >
                            <Input />
                          </Form.Item>
                          <Row justify={"end"}>
                            <Form.Item>
                              <Button type="primary" htmlType="submit">
                                Submit
                              </Button>
                            </Form.Item>
                          </Row>

                        </Form>
                      </Modal>
                    </Space>
                  </Col>
                </Row>

                <Col md={24} xs={24} sm={24} lg={24}>
                  <Row gutter={[8, 8]} align={"middle"} className="title">
                    <Col md={24} xs={24} sm={14} lg={14}>
                      <Title style={{ margin: 0 }} >Redemption Events</Title>
                    </Col>
                    <Col md={24} xs={24} sm={10} lg={10} >
                      <Row className="titleButtons" gutter={[8, 0]}>
                        <Col>
                          <Upload {...upload} showUploadList={false}>
                            <Button type="primary">
                              Upload Staffs
                            </Button>
                          </Upload>
                        </Col>
                        <Col>
                          <Button type="primary" onClick={showModal}>
                            Add New Events
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={24} xs={24} sm={24} lg={24}>
                      <Table pagination={{ pageSize: 5, defaultPageSize: 5 }} columns={columns} dataSource={data} />
                    </Col>
                  </Row>
                </Col>
              </Space>
            </Col>
          </Row>
        </Col>

      </Row>
    </ConfigProvider>
  );
};

export default MainPage;