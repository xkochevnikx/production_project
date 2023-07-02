import React, { InputHTMLAttributes, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './input.module.scss';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    placeholder: string;
    readonly?: boolean;
    type?: string;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        placeholder,
        value,
        onChange,
        type = 'text',
        readonly,
        ...otherProps
    } = props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <div
            className={classNames(cls.Input, { [cls.readonly]: readonly }, [
                className,
            ])}
        >
            {placeholder && <span>{`${placeholder}`}</span>}

            <input
                type={type}
                value={value}
                onChange={onChangeHandler}
                readOnly={readonly}
                className={cls.input}
                {...otherProps}
            />
        </div>
    );
});
