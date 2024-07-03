export type FieldType =
  | 'input'
  | 'textarea'
  | 'select'
  | 'text'
  | 'button'
  | 'spacer';

export interface BuilderSideBarItemsProps {
  id: number | string;
  type: FieldType;
  title: string;
}

export const BuilderSideBarItems: BuilderSideBarItemsProps[] = [
  {
    id: 1,
    type: 'input',
    title: 'Text Input',
  },
  {
    id: 2,
    type: 'select',
    title: 'Select',
  },
  {
    id: 3,
    type: 'text',
    title: 'Text',
  },
  {
    id: 4,
    type: 'button',
    title: 'Button',
  },
  {
    id: 5,
    type: 'textarea',
    title: 'Text Area',
  },
];

// These define how we render the field

export const renderers: Record<FieldType, () => JSX.Element> = {
  input: () => <input type="text" placeholder="This is a text input" />,
  textarea: () => <textarea rows={5} />,
  select: () => (
    <select>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
  ),
  text: () => (
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </p>
  ),
  button: () => <button>Button</button>,
  spacer: () => <div>sdfd</div>,
};
