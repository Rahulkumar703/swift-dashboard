import {type FC, type ReactNode} from 'react';
import PageWrapper from "../../components/legacy/page-wrapper.tsx";
import BackButton from "../../components/legacy/back-button.tsx";
import Avatar from "../../components/legacy/avatar.tsx";
import Input from "../../components/legacy/input.tsx";
import {useProfile} from '../../context/ProfileContext.tsx'
import Skeleton from "../../components/legacy/skeleton.tsx";
import Button from "../../components/legacy/button.tsx";
import {RefreshCcw} from "lucide-react";
import type {ProfileType} from "../../types";
import {useTheme} from "../../context/ThemeContext.tsx";
import lightLegacy from '../../assets/legacy-light.png';
import darkLegacy from '../../assets/legacy-dark.png';
import lightModern from '../../assets/modern-light.png';
import darkModern from '../../assets/modern-dark.png';

const Profile: FC = () => {

    const {profile, loading, error} = useProfile();

    if (error) {
        return (
            <ErrorScreen error={error}/>
        );
    }

    if (loading || !profile) {
        return <LoadingScreen/>
    }

    return (
        <ProfileContent profile={profile}/>
    );
}


const ProfileHeader: FC<{ heading: ReactNode }> = ({heading}) => {
    return (
        <div className={'flex items-center my-4 gap-2'}>
            <BackButton/>
            <span className={'text-xl font-semibold'}>{heading}</span>
        </div>
    )
}

const LoadingScreen: FC = () => {
    return (
        <PageWrapper>
            <ProfileHeader heading={'Loading...'}/>
            <div className={'flex flex-col gap-10 shadow-lg border border-accent/30 rounded-xl p-6 flex-1'}>
                <div className={'flex sm:flex-row flex-col items-center gap-4'}>
                    <Skeleton className={'w-20 h-20 rounded-full shadow'}/>
                    <div className={'flex flex-col gap-2'}>
                        <Skeleton className={'w-32 h-5 rounded-xl'}/>
                        <Skeleton className={'w-40 h-3 rounded-xl'}/>
                    </div>
                </div>

                <div className={'grid grid-cols-1 sm:grid-cols-2 gap-6'}>
                    <div className={'flex flex-col gap-2'}>
                        <Skeleton className={'w-40 h-6 rounded-xl'}/>
                        <Skeleton className={'w-full h-11 rounded-xl'}/>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <Skeleton className={'w-40 h-6 rounded-xl'}/>
                        <Skeleton className={'w-full h-11 rounded-xl'}/>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <Skeleton className={'w-40 h-6 rounded-xl'}/>
                        <Skeleton className={'w-full h-11 rounded-xl'}/>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <Skeleton className={'w-40 h-6 rounded-xl'}/>
                        <Skeleton className={'w-full h-11 rounded-xl'}/>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <Skeleton className={'w-40 h-6 rounded-xl'}/>
                        <Skeleton className={'w-full h-11 rounded-xl'}/>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}

const ErrorScreen: FC<{ error: string }> = ({error}) => {

    const reload = () => {
        window.location.reload();
    }

    return (
        <PageWrapper>
            <ProfileHeader heading={'Error loading profile'}/>
            <div className={'flex-1 items-center justify-center flex'}>
                <div
                    className={'max-w-md text-center bg-accent/30 rounded-xl items-center w-full mx-auto p-4 flex flex-col gap-6 py-6'}>
                    <h1 className={'text-3xl font-bold'}>
                        Failed to load profile
                    </h1>
                    <p className={'text-lg text-red-500'}>
                        {error}
                    </p>
                    <Button className={"flex items-center gap-2"} onClick={reload}>
                        <RefreshCcw className={'size-5'}/>
                        Reload
                    </Button>
                </div>
            </div>
        </PageWrapper>
    )
}

const ProfileContent: FC<{ profile: ProfileType }> = ({profile}) => {
    const address = `${profile.address.suite}, ${profile.address.street}, ${profile.address.city}`
    return (
        <PageWrapper className={'h-auto'}>
            <ProfileHeader heading={`Welcome, ${profile.name}`}/>
            <div className={'flex flex-col gap-10 shadow-lg border border-accent/30 rounded-xl p-6 flex-1'}>
                <div className={'flex sm:flex-row flex-col items-center gap-4 text-3xl font-bold'}>
                    <Avatar name={profile.name} className={'w-20 h-20 bg-input shadow text-xl'}/>
                    <div className={'flex flex-col'}>
                        <p className={'text-lg font-normal'}>{profile.name}</p>
                        <p className={'text-sm text-muted font-normal'}>{profile.email}</p>
                    </div>
                </div>
                <div className={'grid grid-cols-1 sm:grid-cols-2 gap-6'}>
                    <Input disabled={true} label={'User ID'} value={profile.id}/>
                    <Input disabled={true} label={'Name'} value={profile.name}/>
                    <Input disabled={true} label={'Email ID'} value={profile.email}/>
                    <Input disabled={true} label={'Address'} value={address}/>
                    <Input disabled={true} label={'Phone'} value={profile.phone}/>
                </div>
            </div>
            <div className={'flex flex-col gap-4 mt-10 shadow-lg border border-accent/30 rounded-xl p-6 '}>
                <h2 className={'text-xl font-bold'}>Themes</h2>
                <ThemeSwitcher/>
            </div>
        </PageWrapper>
    )
}


const ThemeSwitcher: FC = () => {

    const {changeTheme} = useTheme();

    return (
        <div className={'grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-4 items-center '}>
            <div onClick={() => changeTheme({mode: 'light', theme: 'legacy'})}
                 className={'p-4 shadow-lg border border-accent/30 rounded-xl flex flex-col items-center gap-2 cursor-pointer'}>
                <img src={lightLegacy} alt={'Light Theme - Legacy'}/>
                <p className={'font-medium'}>Legacy Light</p>
            </div>
            <div onClick={() => changeTheme({mode: 'dark', theme: 'legacy'})}
                 className={'p-4 shadow-lg border border-accent/30 rounded-xl flex flex-col items-center gap-2 cursor-pointer'}>
                <img src={darkLegacy} alt={'Dark Theme - Legacy'}/>
                <p className={'font-medium'}>Legacy Dark</p>
            </div>
            <div onClick={() => changeTheme({mode: 'light', theme: 'modern'})}
                 className={'p-4 backdrop-blur-xl rounded-2xl flex flex-col items-center gap-2 cursor-pointer'}>
                <img src={lightModern} alt={'Light Theme - Modern'}/>
                <p className={'font-medium'}>Modern Light</p>
            </div>
            <div onClick={() => changeTheme({mode: 'dark', theme: 'modern'})}
                 className={'p-4 backdrop-blur-xl rounded-2xl flex flex-col items-center gap-2 cursor-pointer'}>
                <img src={darkModern} alt={'Dark Theme - Modern'}/>
                <p className={'font-medium'}>Modern Dark</p>
            </div>
        </div>
    )
}
export default Profile;