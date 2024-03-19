import Form from 'react-bootstrap/Form';

//Form size
type SizeType = 'lg' | undefined | 'sm';

interface InputFormControlProps {
  className: string;
  controlId: string;
  size?: SizeType;
  label: string;
  disabled?: boolean;
  multiple?: boolean;
}

function InputFormControl({
  className,
  controlId,
  label,
  size,
  multiple = false,
  disabled = false,
}: InputFormControlProps) {
  return (
    <Form.Group className={className} controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="file"
        size={size}
        multiple={multiple}
        disabled={disabled}
      />
    </Form.Group>
  );
}

export default InputFormControl;
