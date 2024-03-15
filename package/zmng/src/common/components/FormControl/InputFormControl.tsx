import Form from 'react-bootstrap/Form';

//Form size
type FormSize_type = 'lg' | 'md' | 'sm';

//Form Type
type FormType_type = 'email' | 'text';

//Class 정의
type FormClassName_type = Exclude<string, FormSize_type>;

interface InputFormControlProps {
  FormClassName: FormClassName_type;
  FormControlId: string;
  FormSize: FormSize_type;
  FormLabel: string;
  FormPlaceholder?: string;
  FormType: FormType_type;
}

function InputFormControl({
  FormClassName,
  FormControlId,
  FormPlaceholder,
  FormSize,
  FormType,
}: InputFormControlProps) {
  const _className = `${FormClassName} ${FormSize}`;

  return (
    <Form.Group className={_className} controlId={FormControlId}>
      <Form.Label>{FormClassName}</Form.Label>
      <Form.Control type={FormType} placeholder={FormPlaceholder} />
    </Form.Group>
  );
}

export default InputFormControl;
