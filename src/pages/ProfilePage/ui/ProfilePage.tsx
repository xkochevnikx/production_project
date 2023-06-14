import { EditableProfileCard } from 'features/EditableProfileCard';
import { Page } from 'widgets/Page/Page';
import { VStack } from 'shared/UI/Stack/VStack/VStack';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

function ProfilePage() {
    return (
        <Page>
            <VStack gap="16" max>
                <ProfilePageHeader />
                <EditableProfileCard />
            </VStack>
        </Page>
    );
}

export default ProfilePage;
