import MainExport from '@package/core/src/components/MainExport';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: '메인 검색박스',
  component: MainExport.MirSearchField,
  tags: ['main'],
  parameters: {},
  args: {
    placeholder: '스토리북 홀더',
  },
} satisfies Meta<typeof MainExport.MirSearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const open: Story = {};
