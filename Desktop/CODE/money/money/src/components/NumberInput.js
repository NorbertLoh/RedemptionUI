import { useState, useEffect } from 'react'

import { InputNumber } from 'antd';

import {
    PlusOutlined,
    MinusOutlined
  } from '@ant-design/icons';

function NumberInput(props) {

    const [value, setValue] = useState()

    const minus = () => {
        props.minus(props.index)
    }

    const add = () => {
        props.add(props.index)
    }

    const AddOnBefore = () => {
        return <MinusOutlined onClick={minus}/>
    }

    const AddOnAfter = () => {
        return <PlusOutlined onClick={add}/>
    }

    return (
        <InputNumber value={props.value[props.index]} addonBefore={<AddOnBefore />} addonAfter={<AddOnAfter />}/>
    )
}

export default NumberInput;