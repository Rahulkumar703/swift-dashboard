import {type FC} from 'react';
import {Link} from "react-router-dom";
import Button from "../../components/modern/button.tsx";
import {Home} from "lucide-react";
import PageWrapper from "../../components/modern/page-wrapper.tsx";

const NotFound: FC = () => {
    return (
        <PageWrapper className={'flex items-center justify-center'}>
            <div
                className={'glass max-w-md text-center items-center w-full mx-auto p-4 flex flex-col gap-6 py-6'}>
                <h1 className={'text-3xl font-bold'}>
                    404 - Page Not Found (Modern)
                </h1>
                <p className={'text-lg'}>
                    The page you are looking for does not exist.
                </p>
                <Link to={'/'}>
                    <Button className={"flex items-center gap-2"}>
                        <Home className={'size-5'}/>
                        Home
                    </Button>
                </Link>
            </div>
        </PageWrapper>
    );
}

export default NotFound;