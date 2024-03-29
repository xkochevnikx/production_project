import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Button, ThemeButton } from '@/shared/UI/Button';
import { Text } from '@/shared/UI/Text';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getProfileReadonly } from '../../modal/selectors/getProfileReadonly/getProfileReadonly';
import { ProfileActions } from '../../modal/slice/ProfileSlice';
import { updateProfileData } from '../../modal/services/updateProfileData/updateProfileData';
import { getUserAuthData } from '@/entities/User';
import { getProfileData } from '../../modal/selectors/getProfileData/getProfileData';
import { HStack } from '@/shared/UI/Stack';

interface ProfilePageHeaderProps {
    className?: string;
}

export const ProfilePageHeader = memo(
    ({ className }: ProfilePageHeaderProps) => {
        const readonly = useSelector(getProfileReadonly);

        const dispatch = useAppDispatch();

        const userData = useSelector(getUserAuthData);

        const profile = useSelector(getProfileData);

        //! редактирование доступно по этому флагу.
        const canEdit = userData?.id === profile?.id;
        //! по умолчанию в слайсе поле редонли тру, это поле вытаскиваем тут и на этом основании отрисовываем разные кнопки
        const onEdit = useCallback(() => {
            dispatch(ProfileActions.setReadonly(false));
        }, [dispatch]);

        const onSave = useCallback(() => {
            dispatch(updateProfileData());
        }, [dispatch]);

        //! вызываем экшн отмены редактирования
        const onCancelEdit = useCallback(() => {
            dispatch(ProfileActions.cancelEdit());
        }, [dispatch]);

        const { t } = useTranslation('profile');

        // todo - на кнопках тестовые айди для тестирования editableProfileCard, на них буду наживать в тестах
        return (
            <HStack justify="between" max>
                <Text title={t('Профиль')} />
                {canEdit && (
                    <>
                        {readonly ? (
                            <Button
                                onClick={onEdit}
                                theme={ThemeButton.OUTLINE}
                                data-testid="EditableProfileCardHeader.EditButton"
                            >
                                {t('Редактировать')}
                            </Button>
                        ) : (
                            <HStack gap="8">
                                <Button
                                    onClick={onCancelEdit}
                                    theme={ThemeButton.OUTLINE_RED}
                                    data-testid="EditableProfileCardHeader.CancelButton"
                                >
                                    {t('Отменить')}
                                </Button>
                                <Button
                                    onClick={onSave}
                                    theme={ThemeButton.OUTLINE}
                                    data-testid="EditableProfileCardHeader.SaveButton"
                                >
                                    {t('Сохранить')}
                                </Button>
                            </HStack>
                        )}
                    </>
                )}
            </HStack>
        );
    },
);
