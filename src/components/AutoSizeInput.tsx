import React, { useState, forwardRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { useSpring, animated } from 'react-spring';
import TextareaAutosize from 'react-textarea-autosize';

interface IAutoSizeInputProps {
  tabIndex?: string;
  ref?: any;
  label?: string;
  defaultValue?: string;
  value?: string;
  autoFocus?: boolean;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onClick?: () => void;
  onBlur?: () => void;
}

//@ts-ignore
const StyledLabel = styled(animated.label)`
  position: absolute;
  height: 28px;
  left: 10px;
  opacity: 0.6;
  color: white;
  z-index: -1;
`;

const StyledTextareaAutosize = styled(TextareaAutosize)(
  // @ts-ignore
  ({ isLongContent }) => ({
    width: '100%',
    padding: '5px 0',
    background: 'transparent',
    fontSize: isLongContent ? '14px' : '22px',

    border: '2px solid transparent',
    borderBottom: '2px solid white',
    color: 'white',

    resize: 'none',
    outline: 'none',
  })
);

const AutoSizeInputWrapper = styled.div`
  width: 350px;

  position: relative;
  padding: 10px 10px 20px 10px;
  margin-bottom: 20px;
  z-index: 0;
`;

export const AutoSizeInput: React.FC<IAutoSizeInputProps> = forwardRef(
  (
    {
      defaultValue,
      value,
      label,
      tabIndex,
      autoFocus,
      onFocus,
      onClick,
      onBlur,
      onChange,
    },
    ref
  ) => {
    const textAreaProps = { value, defaultValue, autoFocus, tabIndex };
    const [areaValue, setAreaValue] = useState(value);
    const [isFocused, setIsFocused] = useState(autoFocus);
    const [wasChanged, setWasChanged] = useState(false);
    const [isLongContent, setIsLongContent] = useState(false);

    useEffect(() => {
      if (value) setIsLongContent(value.length >= 40);
      if (!value && defaultValue) setIsLongContent(defaultValue.length >= 40);
      // eslint-disable-next-line
    }, []);

    const onAreaFocus = () => {
      setIsFocused(true);
      if (onFocus) onFocus();
    };

    const onAreaBlur = () => {
      setIsFocused(false);
      if (onBlur) onBlur();
    };

    const onAreaChange = (event: any) => {
      setIsLongContent(event.target.value.length >= 40);
      setAreaValue(event.target.value);
      setWasChanged(true);
      if (onChange) {
        onChange(event.target.value);
      }
    };

    const manageKeyboardEvents = (keyCode: number) => {
      if (keyCode === 27) {
        (ref as any).current.blur();
      }
    };

    const showLabelBottom = Boolean(
      isFocused || areaValue || (!wasChanged && defaultValue)
    );

    const animProps = useSpring({
      config: { duration: 150 },
      bottom: showLabelBottom ? '-11px' : '30px',
      fontSize: showLabelBottom ? '14px' : '22px',
    });

    return (
      <AutoSizeInputWrapper>
        {label && <StyledLabel style={animProps}>{label}</StyledLabel>}
        <StyledTextareaAutosize
          onFocus={() => onAreaFocus()}
          onBlur={() => onAreaBlur()}
          {...textAreaProps}
          onChange={onAreaChange}
          onKeyUp={(e) => manageKeyboardEvents(e.keyCode)}
          // @ts-ignore
          isLongContent={isLongContent}
          ref={(tag) => ((ref as any).current = tag)}
        />
      </AutoSizeInputWrapper>
    );
  }
);
