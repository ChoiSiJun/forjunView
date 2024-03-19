import Form from 'react-bootstrap/Form';

//Form size
type SizeType = 'lg' | undefined | 'sm';

//Form Type
type formType = 'email' | 'text';

interface InputFormControlProps {
  className: string;
  size?: SizeType;
  placeholder?: string;
  type: formType;
  disabled?: boolean;
  readOnly?: boolean;
  ariaLabel?: string;
  ariaDescribedby?: string;
}

function InputFormControl({
  className,
  type,
  size,
  placeholder = '',
  disabled = false,
  readOnly = false,
  ariaLabel = '',
  ariaDescribedby = '',
}: InputFormControlProps) {
  return (
    <Form.Control
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
}

export default InputFormControl;
