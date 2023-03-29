import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { Select } from 'shared/UI/Select/Select';
import { Currency } from 'entities/Current/modal/types/currency';

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
    label?: string;
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
        className, value, onChange, readonly, label,
    }: CurrencySelectProps) => {
        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as Currency);
            },
            [onChange],
        );

        return (
            <Select
                readonly={readonly}
                className={classNames('', {}, [className])}
                label={label}
                options={options}
                value={value}
                onChange={onChangeHandler}
            />
        );
    },
);
