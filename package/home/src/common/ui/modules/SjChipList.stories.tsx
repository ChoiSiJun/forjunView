import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import SjChipList from './SjChipList';

const meta: Meta<typeof SjChipList> = {
  title: 'Common/UI/Modules/SjChipList',
  component: SjChipList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof SjChipList>;

export const Default: Story = {
  render: () => {
    const [items, setItems] = useState(['React', 'TypeScript', 'Material-UI']);
    
    const handleDelete = (index: number) => {
      setItems(items.filter((_, i) => i !== index));
    };
    
    return <SjChipList dataList={items} onDelete={handleDelete} />;
  },
};

export const Empty: Story = {
  render: () => {
    const [items, setItems] = useState<string[]>([]);
    
    const handleDelete = (index: number) => {
      setItems(items.filter((_, i) => i !== index));
    };
    
    return (
      <div>
        <p style={{ marginBottom: '10px' }}>빈 리스트</p>
        <SjChipList dataList={items} onDelete={handleDelete} />
      </div>
    );
  },
};

export const ManyItems: Story = {
  render: () => {
    const [items, setItems] = useState([
      'React',
      'TypeScript',
      'Material-UI',
      'Vite',
      'Storybook',
      'Redux',
      'React Query',
      'Axios',
      'Formik',
      'Yup',
    ]);
    
    const handleDelete = (index: number) => {
      setItems(items.filter((_, i) => i !== index));
    };
    
    return (
      <div style={{ width: '400px' }}>
        <SjChipList dataList={items} onDelete={handleDelete} />
      </div>
    );
  },
};




