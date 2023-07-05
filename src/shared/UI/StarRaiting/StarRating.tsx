import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StarRaiting.module.scss';
import Star from '../../assets/icons/starRaiting.svg';
import { Icon } from '../Icon/Icon';

interface StarRatingProps {
    className?: string;
    onSelect?: (starsCount: number) => void;
    size?: number;
    selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

// todo - массив звезд выше просто для отрисовки пяти иконок, пропсами сверху компонет принимает размер который я просто разворачиваю в компонент icon как и любые другие пропсы. функция onSelect сохраняет выбранный номер звезды для оправки его на бэк. selectStars это данные с бэка о колличестве выбранных звезд. когда рейтинг уже есть он хардкодится и уже на основании наличия этого флага не буду отрабатывать функции анимации onHover/onLeave. Функция onHover вызывается на событие onMouseEnter и замыкает в себе номер звезды выбранной в данный момент, внутри себя она изменяет состояние текущей выбранной звезды currentStartCount и в результате этого навешиваются стили таком образом - если текущий номер элемента меньше или равен записанному в currentStartCount то этот элемент и все ему предшествующие считаются выбранными и подсвечивают. А у остальных класс normal. Всё это делается чтобы определить направили сейчас на звезду или нет. Так же на элементе есть функция onClick которая замыкает в себе текщий номер и при вызове в себе она вызывает спущенную сверху функцию сохранения выбранного значения после сохраняте значение текущей выбранной звезды в currentStarsCount и флаг isSelected делает тру тем самым хардкодя стили на элементах. с флагом  isSelected они уже не будут отрабатывать

export const StarRating = memo(
    ({
        className,
        size = 30,
        selectedStars = 0,
        onSelect,
    }: StarRatingProps) => {
        const [currentStarsCount, setCurrentStarsCurrent] = useState(selectedStars);
        // todo - если с бэка прилетает выбранное колличество звезд то сюда прилетить число которое преобразуестя с булеан и флаг isSelected становиться тру что не даст обрабатывать сообытия выбора на элементах и просто захардкодит стили
        const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

        const onHover = (startsCount: number) => {
            if (!isSelected) {
                setCurrentStarsCurrent(startsCount);
            }
        };

        // todo - при условии что я ничего не выбрал и ничего не спустилось сюда сверху при событии выхода с элемента мышкой будет отрабаьтывать эта функция которая будет делать состояние currentStars в 0 состояние вызывает перерисовку компонета в стили обновляются и навешивается дефолтный класс на все элементы.
        const onLeave = () => {
            if (!isSelected) {
                setCurrentStarsCurrent(0);
            }
        };

        // todo -  при онклике аргументом принимаю номер элемента и передаю его наверх в вызове onSelect, далее сохраняю выбранный номер в currentStarsCount и флаг isSelect делаю true это уже сделает выбор звезды не возможным и в стилях уберет cursor pointer
        const onClick = (starNumber: number) => {
            if (!isSelected) {
                onSelect?.(starNumber);
                setCurrentStarsCurrent(starNumber);
                setIsSelected(true);
            }
        };

        return (
            <div className={classNames(cls.StarRaiting, {}, [className])}>
                {stars.map((star) => (
                    <Icon
                        className={classNames(
                            cls.star,
                            { [cls.selected]: isSelected },
                            [
                                currentStarsCount >= star
                                    ? cls.hovered
                                    : cls.normal,
                            ],
                        )}
                        Svg={Star}
                        key={star}
                        onMouseLeave={onLeave}
                        onMouseEnter={() => onHover(star)}
                        width={size}
                        height={size}
                        onClick={() => onClick(star)}
                    />
                ))}
            </div>
        );
    },
);
