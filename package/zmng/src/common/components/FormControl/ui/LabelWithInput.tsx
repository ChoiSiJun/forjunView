import Form from 'react-bootstrap/Form';
import { forwardRef } from 'react';
import Row from 'react-bootstrap/Row';
import { InputFormControl } from '@common_components_ui';

//Form size
type SizeType = 'lg' | undefined | 'sm';

//Form Type
type formType = 'email' | 'text' | 'password';

interface LabelWithInputProps {
  className?: string;
  controlId?: string;
  size?: SizeType;
  placeholder?: string;
  type: formType;
  disabled?: boolean;
  readOnly?: boolean;
  label: string;
  labelType: 'row' | 'etc';
}

const LabelWithInput = forwardRef<HTMLInputElement, LabelWithInputProps>(
  (
    {
      className,
      type,
      size,
      placeholder = '',
      disabled = false,
      readOnly = false,
      controlId,
      label,
      labelType,
    },
    ref,
  ) => {
    if (labelType == 'row') {
      return (
        <Form>
          <Form.Group as={Row} className="mb-3" controlId={controlId}>
            <Form.Label column sm="2">
              {label}
            </Form.Label>
            <InputFormControl
              ref={ref}
              className={className}
              type={type}
              size={size}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
            ></InputFormControl>
          </Form.Group>
        </Form>
      );
    } else {
      return (
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>{label}</Form.Label>
            <Form.Control
              ref={ref}
              className={className}
              type={type}
              size={size}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
            />
          </Form.Group>
        </Form>
      );
    }
  },
);

export default LabelWithInput;
