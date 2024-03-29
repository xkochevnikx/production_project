import { useParams } from 'react-router-dom';
import { EditableProfileCard } from '@/features/EditableProfileCard';
import { VStack } from '@/shared/UI/Stack';
import { Page } from '@/widgets/Page';

function ProfilePage() {
    //! при первом рендеринге компонента на странице смотрим если есть айди то запрашиваем данные
    const { id } = useParams<{ id: string }>();

    return (
        <Page data-testid="ProfilePage">
            <VStack gap="16" max>
                <EditableProfileCard id={id} />
            </VStack>
        </Page>
    );
}

export default ProfilePage;
