import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/UI/Card/Card';
import { Text } from '@/shared/UI/Text/Text';
import { VStack } from '@/shared/UI/Stack/VStack/VStack';
import { Modal } from '@/shared/UI/Modal/Modal';
import { Input } from '@/shared/UI/Input/Input';
import { HStack } from '@/shared/UI/Stack/HStack/HStack';
import { Button, ThemeButton } from '@/shared/UI/Button/Button';
import { Drawer } from '@/shared/UI/Drawer/Drawer';
import { StarRating } from '@/shared/UI/StarRaiting/StarRating';

interface RatingProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
    rate?: number;
}

// todo - сущность райтинг содаржит в себе компонент звезд и модалку которая открывается при наличии соответсвующего флага спущенного сверху. В себе она содержит состояние для открытия и закрытия модалки isModalOpen состяние для получения данных из инпута feedback , коллбэк onSelectStars который передается в ui компонет StarRaiting и забирает из него сюда в состояние starsCount номер выбранной звезд, это нужно что бы при нажатии на кнопку в модалке (отправить или отменить) вызвать одни из коллбэков и передать наврех в фичу articleRaiting выбранную звезду и фидбэк для отправки данных на бэк

export const Rating = memo((props: RatingProps) => {
    const {
        className,
        feedbackTitle,
        hasFeedback,
        onAccept,
        onCancel,
        title,
        rate = 0,
    } = props;
    const { t } = useTranslation();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [starsCount, setStarsCount] = useState(rate);

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
        [hasFeedback, onAccept],
    );
    // todo - если флаг hasFeedback передан открывается модалка или дроп для мобилок в которром у пользователя есть два варианта действий, либо написать отзыв и отправить либо просто закрыть модалку и предать число звезды
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
            <Input
                value={feedback}
                placeholder={t('Напишите отзыв')}
                onChange={setFeedback}
            />
        </>
    );

    return (
        <Card className={classNames('', {}, [className])}>
            <VStack gap="16">
                <Text title={starsCount ? t('Оценка статьи') : title} />
                <StarRating onSelect={onSelectStars} selectedStars={rate} />
            </VStack>

            <BrowserView>
                <Modal isOpen={isModalOpen}>
                    <VStack max gap="16">
                        {modalContent}
                        <HStack max gap="16" justify="end">
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
                    <VStack gap="32">
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
