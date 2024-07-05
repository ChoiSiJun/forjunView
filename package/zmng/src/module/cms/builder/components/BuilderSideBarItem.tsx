import { UniqueIdentifier } from '@dnd-kit/core/dist/types';

export type FieldType =
  | 'input'
  | 'textarea'
  | 'select'
  | 'text'
  | 'button'
  | 'spacer';

export interface ComponentProps {
  type: FieldType;
  title: string;
}

export interface BuilderSideBarItemsProps {
  dragId: UniqueIdentifier;
  dragType: string;
  component: ComponentProps;
}

export const BuilderSideBarItems: BuilderSideBarItemsProps[] = [
  {
    dragId: 1,
    dragType: 'input',
    component: {
      type: 'input',
      title: 'Text Input',
    },
  },
  {
    dragId: 2,
    dragType: 'select',
    component: {
      type: 'select',
      title: 'Select',
    },
  },
  {
    dragId: 3,
    dragType: 'text',
    component: {
      type: 'text',
      title: 'Text',
    },
  },
  {
    dragId: 4,
    dragType: 'button',
    component: {
      type: 'button',
      title: 'Button',
    },
  },
  {
    dragId: 5,
    dragType: 'textarea',
    component: {
      type: 'textarea',
      title: 'Text Area',
    },
  },
];

// These define how we render the field

export const renderers: Record<string, () => JSX.Element> = {
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
