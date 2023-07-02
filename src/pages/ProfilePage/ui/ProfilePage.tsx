import { useParams } from 'react-router-dom';
import { EditableProfileCard } from '@/features/EditableProfileCard';
import { Page } from '@/widgets/Page/ui/Page';
import { VStack } from '@/shared/UI/Stack/VStack/VStack';

function ProfilePage() {
    //! при первом рендеринге компонента на странице смотрим если есть айди то запрашиваем данные
    const { id } = useParams<{ id: string }>();

    return (
        <Page>
            <VStack gap="16" max>
                <EditableProfileCard id={id} />
            </VStack>
        </Page>
    );
}

export default ProfilePage;
