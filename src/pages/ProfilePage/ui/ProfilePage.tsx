import {
    EditableProfileCard,
    ProfileReducer,
} from 'features/EditableProfileCard';

import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

const reducers: ReducersList = {
    profile: ProfileReducer,
};

function ProfilePage() {
    return (
        <DynamicModuleLoader
            name='profile'
            reducers={reducers}
            removeAfterUnmount
        >
            <ProfilePageHeader />
            <EditableProfileCard />
        </DynamicModuleLoader>
    );
}

export default ProfilePage;
