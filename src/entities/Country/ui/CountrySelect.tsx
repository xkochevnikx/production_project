import { memo, useCallback, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBox } from '@/shared/UI/Popups/ui/ListBox/ListBox';
import { Country } from '../modal/types/country';

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

export const CountrySelect = memo(
    ({
        className, value, onChange, readonly,
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
