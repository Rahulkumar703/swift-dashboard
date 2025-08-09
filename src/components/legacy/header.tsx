import type {FC} from "react";
import {Link} from "react-router-dom";
import logo from '../../assets/logo.svg'
import Avatar from "./avatar.tsx";
import {useProfile} from "../../context/ProfileContext.tsx";
import Skeleton from "./skeleton.tsx";

const Header: FC = () => {
    const {profile, loading} = useProfile();


    return (
        <header className={'w-full h-20 bg-primary flex items-center p-4 sticky top-0 left-0 z-10'}>
            <div className={'mx-auto max-w-6xl w-full flex justify-between'}>
                <Link to={'/'}>
                    <img src={logo} className={'w-28'} alt={"Swift"}/>
                </Link>
                {
                    loading ? (
                        <div className={'flex items-center gap-2'}>
                            <Skeleton className={'w-10 h-10 rounded-full'}/>
                            <Skeleton className={'w-32 h-7 sm:block hidden rounded-xl'}/>
                        </div>
                    ) : (
                        profile &&
                        (
                            <Link to={'/profile'} className={'flex items-center gap-2'}>
                                <Avatar name={profile.name} className={'bg-background'}/>
                                <span className={'text-[#fefefe] text-lg font-normal sm:block hidden'}>
                                    {profile.name}
                                </span>
                            </Link>
                        )
                    )
                }
            </div>
        </header>
    );
};


export default Header;
