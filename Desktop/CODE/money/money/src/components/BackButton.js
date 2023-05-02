import { LeftOutlined } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';

function BackButton(props) {

    const navigate = useNavigate()

    const clickNavigate = () => {
        navigate(props.url);
    }

    return (
        <div>
            <LeftOutlined onClick={clickNavigate} style={{fontSize:24}}/>
        </div>
    )
}

export default BackButton;