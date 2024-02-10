import React, { forwardRef } from 'react';
import Select, {
  DropdownIndicatorProps,
  components,
  Props as ReactSelectProps,
  ClearIndicatorProps,
} from 'react-select';

import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OptionsType {
  value: number | string;
  label: string;
  type?: string;
}

interface InputSelectProps {
  placeholder: string;
  isClearable?: boolean;
  isMulti?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  options?: OptionsType[];
  variant?: any;
  size?: 'small' | 'medium';
  height?: 'sm' | 'md';
  borderRadius?: 'xs' | 'sm' | 'md';
  className?: string;
  containerClassname?: string;
  onHandleChange?: (val: any) => void;
  dropdownIndicatorClassname?: string;
  placeholderClassName?: string;
  controlClassname?: string;
}

type CombineProps = InputSelectProps & ReactSelectProps;

const DropdownIndicator: React.FC<DropdownIndicatorProps> = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg
        width='10'
        height='9'
        viewBox='0 0 10 9'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M9.9 0.88L9.9 3.18L5.32 8.02L0.72 3.18L0.72 0.879999L5.32 5.72L9.9 0.88Z'
          fill='#66707C'
        />
      </svg>
    </components.DropdownIndicator>
  );
};

const ClearIndicator: React.FC<ClearIndicatorProps> = (props) => {
  return (
    <components.ClearIndicator {...props}>
      <X className='text-gray1 w-[15px] h-[15px]' strokeWidth='3' />
    </components.ClearIndicator>
  );
};

const InputSelect: React.FC<CombineProps> = (
  {
    placeholder,
    isClearable = true,
    isMulti = false,
    disabled = false,
    isLoading = false,
    options,
    variant,
    size = 'small',
    height = 'sm',
    borderRadius = 'sm',
    className,
    containerClassname,
    controlClassname,
    onHandleChange,
    dropdownIndicatorClassname,
    placeholderClassName,
    ...rest
  },
  ref
) => (
  <Select
    options={options}
    isClearable={isClearable}
    placeholder={placeholder}
    unstyled={true}
    isDisabled={isLoading || disabled}
    closeMenuOnSelect={!isMulti}
    classNames={{
      container: () => cn(' ', containerClassname),
      control: ({ isFocused, isDisabled }) =>
        cn(
          'rounded-md px-[24px] py-[17px] border border-input1 bg-white text-sm w-full',
          {
            'outline-none ring-2 ring-ring ring-offset-2': isFocused,
            'opacity-70 cursor-not-allowed': isDisabled,
            'py-[16.5px] min-h-[56px]': isMulti,
            'py-[10.5px] min-h-[56px] ':
              isMulti && (rest.value as any)?.length > 0,
            'h-[56px]': !isMulti,
          },
          controlClassname
        ),
      placeholder: () => cn('text-gray1', placeholderClassName),
      option: ({ isFocused, isSelected }) =>
        cn('bg-white px-[15px] text-base py-2 capitalize rounded-md', {
          'bg-accent': isSelected || isFocused,
        }),
      menuList: () =>
        cn('p-2 bg-white border border-input1 rounded-md mt-[10px] z-50'),
      noOptionsMessage: () => 'py-4 text-sm',
      valueContainer: () => 'px-0 flex gap-2',
      input: () => 'overflow-auto m-0 capitalize',
      indicatorSeparator: () => 'hidden',
      singleValue: () => 'capitalize',
      multiValue: () =>
        'border border-input1 rounded-4 capitalize overflow-hidden pl-3 flex items-center',
      multiValueRemove: () => 'text-base px-2 py-2 ml-1 hover:bg-input',
      multiValueLabel: () => 'text-sm',
      indicatorsContainer: () => 'flex gap-3',
      dropdownIndicator: () => cn('', dropdownIndicatorClassname),
      clearIndicator: () => 'cursor-pointer',
    }}
    isLoading={isLoading}
    isMulti={isMulti}
    components={{ DropdownIndicator, ClearIndicator }}
    // onChange={(val: any) => {
    // 	onHandleChange(val);
    // }}
    closeMenuOnScroll={true}
    {...rest}
  />
);

InputSelect.displayName = 'InputSelect';

export default InputSelect;
