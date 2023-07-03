import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Raiting.module.scss';
import { memo, useCallback, useState } from 'react';
import { Card } from '@/shared/UI/Card/Card';
import { Text } from '@/shared/UI/Text/Text';
import { StarRaiting } from '@/shared/UI/StarRaiting/StarRaiting';
import { VStack } from '@/shared/UI/Stack/VStack/VStack';
import { Modal } from '@/shared/UI/Modal/Modal';
import { Input } from '@/shared/UI/Input/Input';
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/UI/Stack/HStack/HStack';
import { Button, ThemeButton } from '@/shared/UI/Button/Button';
import { BrowserView, MobileView } from 'react-device-detect';
import { Drawer } from '@/shared/UI/Drawer/Drawer';

interface RaitingProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
}

export const Raiting = memo((props: RaitingProps) => {
    const { className, feedbackTitle, hasFeedback, onAccept, onCancel, title } =
        props;
    const { t } = useTranslation();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [starsCount, setStarsCount] = useState(0);

    const [feedback, setFeedback] = useState('');

    const onSelectStars = useCallback(
        (selectedStarsCount: number) => {
            setStarsCount(selectedStarsCount);
            if (hasFeedback) {
                setIsModalOpen(true);
            } else {
                onAccept?.(selectedStarsCount);
            }
        },
        [hasFeedback, onAccept]
    );

    const onAcceptHandler = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [onAccept, starsCount, feedback]);

    const onCancelHandler = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
        <>
            <Text title={feedbackTitle} />
            <Input placeholder={t('Напишите отзыв')} />
        </>
    );

    return (
        <Card className={classNames(cls.Raiting, {}, [className])}>
            <VStack gap='16'>
                <Text title={title} />
                <StarRaiting onSelect={onSelectStars} />
            </VStack>

            <BrowserView>
                <Modal isOpen={isModalOpen}>
                    <VStack max gap='16'>
                        {modalContent}
                        <HStack max gap='16' justify='end'>
                            <Button
                                onClick={onCancelHandler}
                                theme={ThemeButton.OUTLINE_RED}
                            >
                                {t('Закрыть')}
                            </Button>
                            <Button onClick={onAcceptHandler}>
                                {t('Отправить')}
                            </Button>
                        </HStack>
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isModalOpen} onClose={onCancelHandler}>
                    <VStack gap='32'>
                        {modalContent}
                        <Button fullWidth onClick={onAcceptHandler}>
                            {t('Отправить')}
                        </Button>
                    </VStack>
                </Drawer>
            </MobileView>
        </Card>
    );
});
