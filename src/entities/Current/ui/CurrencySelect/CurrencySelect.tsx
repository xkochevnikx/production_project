import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ListBox } from '@/shared/UI/Popups/ui/ListBox/ListBox';
import { Currency } from '../../modal/types/currency';

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

const options = [
    {
        value: Currency.RUB,
        content: Currency.RUB,
    },
    {
        value: Currency.EUR,
        content: Currency.EUR,
    },
    {
        value: Currency.USD,
        content: Currency.USD,
    },
];

export const CurrencySelect = memo(
    ({
        className, value, onChange, readonly,
    }: CurrencySelectProps) => {
        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as Currency);
            },
            [onChange],
        );

        return (
            <ListBox
                readonly={readonly}
                className={classNames('', {}, [className])}
                items={options}
                value={value}
                onChange={onChangeHandler}
            />
        );
    },
);
