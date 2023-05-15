import {
    EditableProfileCard,
    ProfileReducer,
} from 'features/EditableProfileCard';

import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from 'widgets/Page/Page';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

const reducers: ReducersList = {
    profile: ProfileReducer,
};

function ProfilePage() {
    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page>
                <ProfilePageHeader />
                <EditableProfileCard />
            </Page>
        </DynamicModuleLoader>
    );
}

export default ProfilePage;
