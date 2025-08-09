import {type FC} from 'react';
import Button from "./button.tsx";
import {ArrowLeft} from "lucide-react";
import {useNavigate} from "react-router-dom";

const BackButton:FC = ()=> {
    const navigate = useNavigate()
    const goBack = ()=>{
        navigate('/');
    }
    return (
        <Button variant={'ghost'} className={'flex items-center'} onClick={goBack}>
            <ArrowLeft/>
        </Button>
    );
}

export default BackButton;