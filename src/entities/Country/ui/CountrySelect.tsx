import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useMemo } from 'react';
import { Select } from 'shared/UI/Select/Select';
import { Country } from '../modal/types/country';

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean;
    label?: string;
}

export const CountrySelect = memo(
    ({
        className, value, onChange, readonly, label,
    }: CountrySelectProps) => {
        const options = useMemo(
            () => [
                {
                    value: Country.Ingermanland,
                    content: Country.Ingermanland,
                },
                {
                    value: Country.Ukraine,
                    content: Country.Ukraine,
                },
                {
                    value: Country.Belarus,
                    content: Country.Belarus,
                },
            ],
            [],
        );
        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as Country);
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
