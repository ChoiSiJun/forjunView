import MirToolbarContent from '@home/components/item/MirToolbarContent';
import MirSearchField from '@home/components/item/MirSearchField';
import { ItemState } from '@home/components/item/ItemState';
import Box from '@mui/material/Box';

interface RenderItemProps {
  (props: ItemState): JSX.Element;
}

export const RenderItem: Record<string, RenderItemProps> = {
  Spacer: () => (
    <Box border={1} height={50} bgcolor="gray" className="spacer" />
  ),
  SearchBar: ({ renderType, ComponentProps }) => (
    <MirSearchField renderType={renderType} ComponentProps={ComponentProps} />
  ),
  Toolbar: ({ renderType, ComponentProps }) => (
    <MirToolbarContent
      renderType={renderType}
      ComponentProps={ComponentProps}
    />
  ),
};
