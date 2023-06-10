import {
    EditableProfileCard,
    ProfileReducer,
} from 'features/EditableProfileCard';

import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from 'widgets/Page/Page';
import { VStack } from 'shared/UI/Stack/VStack/VStack';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

const reducers: ReducersList = {
    profile: ProfileReducer,
};

function ProfilePage() {
    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page>
                <VStack gap="16" max>
                    <ProfilePageHeader />
                    <EditableProfileCard />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
}

export default ProfilePage;
