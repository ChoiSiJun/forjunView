import MainExport from '@package/core/src/components/MainExport';
import { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Example/Button',
  component: MainExport.MirSearchField,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text', defaultValue: 'Button' },
    variant: { control: 'select' },
    onClick: { action: 'clicked', type: 'function' },
  },
} satisfies Meta<typeof MainExport.MirSearchField>;

export default meta;
type Story = StoryObj<typeof MainExport.MirSearchField>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    variant: 'default',
    children: 'Button',
  },
};
