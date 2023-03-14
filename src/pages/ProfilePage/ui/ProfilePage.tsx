import { ProfileReducer } from 'entities/Profile';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const reducers: ReducersList = {
    profile: ProfileReducer,
};

interface ProfilePageProps {
    className?: string;
}

function ProfilePage({ className }: ProfilePageProps) {
    const { t } = useTranslation();

    return (
        <DynamicModuleLoader
            name="profile"
            reducers={reducers}
            removeAfterUnmount
        >
            <div className={classNames('', {}, [className])}>
                {t('Profile Page')}
            </div>
        </DynamicModuleLoader>
    );
}

export default ProfilePage;
