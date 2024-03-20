import Form from 'react-bootstrap/Form';
import { forwardRef } from 'react';

//Form size
type SizeType = 'lg' | undefined | 'sm';

//Form Type
type formType = 'email' | 'text' | 'password';

interface InputFormControlProps {
  className?: string;
  size?: SizeType;
  placeholder?: string;
  type: formType;
  disabled?: boolean;
  readOnly?: boolean;
  ariaLabel?: string;
  ariaDescribedby?: string;
}

const InputFormControl = forwardRef<HTMLInputElement, InputFormControlProps>(
  (
    {
      className,
      type,
      size,
      placeholder = '',
      disabled = false,
      readOnly = false,
      ariaLabel = '',
      ariaDescribedby = '',
    },
    ref,
  ) => {
    return (
      <Form.Control
        ref={ref}
        className={className}
        type={type}
        size={size}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
      />
    );
  },
);

export default InputFormControl;
