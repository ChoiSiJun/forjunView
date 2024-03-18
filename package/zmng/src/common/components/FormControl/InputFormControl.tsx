import Form from 'react-bootstrap/Form';

//Form size
type SizeType = 'lg' | undefined | 'sm';

//Form Type
type TypeType = 'email' | 'text';

interface InputFormControlProps {
  className: string;
  controlId: string;
  size: SizeType;
  label: string;
  placeholder?: string;
  type: TypeType;
  disabled?: boolean;
  readOnly?: boolean;
}

function InputFormControl({
  className,
  controlId,
  label,
  type,
  size,
  placeholder = '',
  disabled = false,
  readOnly = false,
}: InputFormControlProps) {
  return (
    <Form.Group className={className} controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        size={size}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
      />
    </Form.Group>
  );
}

export default InputFormControl;
