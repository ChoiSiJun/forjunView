import MainExport from '@package/core/src/components/MainExport';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: '메인 상단',
  component: MainExport.MirTestSesim,
  tags: ['header'],
  parameters: {},
  args: {
  },
} satisfies Meta<typeof MainExport.MirSearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const open: Story = {};
