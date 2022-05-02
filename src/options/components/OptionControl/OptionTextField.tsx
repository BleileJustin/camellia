import type { FC } from 'react';
import { useOption } from '../../../api/options/hook';
import { useEffect, useState } from 'react';
import { LabeledTextField } from '../TextField/LabeledTextField';
import debounce from 'lodash.debounce';
import type { StringOptionKey } from '../../../api/options/options';

export const OptionTextField: FC<{
  description: string;
  label: string;
  optionKey: StringOptionKey;
  pattern?: string | undefined;
  placeholder: string;
  spellCheck: boolean;
  type: 'number' | 'url';
  validate?: ((value: string) => string | undefined) | undefined;
}> = (props) => {
  const [optionValue, setOptionValue] = useOption(props.optionKey);
  const [isLoading, setIsLoading] = useState<boolean>(optionValue === undefined);

  useEffect(() => {
    setIsLoading(optionValue === undefined);
  }, [optionValue]);

  return (
    <LabeledTextField
      changeHandler={debounce((newValue): void => {
        if (optionValue === newValue) {
          return;
        }

        setIsLoading(true);

        setTimeout(() => {
          setOptionValue(newValue);
        }, 500);
      }, 1000)}
      description={props.description}
      disabled={false}
      label={props.label}
      loading={isLoading}
      pattern={props.pattern}
      placeholder={props.placeholder}
      spellCheck={props.spellCheck}
      type={props.type}
      validate={props.validate}
      value={optionValue}
    />
  );
};
