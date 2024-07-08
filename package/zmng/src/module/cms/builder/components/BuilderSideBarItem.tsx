import { UniqueIdentifier } from '@dnd-kit/core/dist/types';
import { ReactNode, useEffect, useState } from 'react';
import MainExport from '@package/core/src/components/MainExport';

export interface BuilderItemsProps {
  dragId: UniqueIdentifier;
  dragType: string;
  displayTitle: string;
  component?: ReactNode;
}

export const BuilderItems: BuilderItemsProps[] = [
  {
    dragId: 1,
    dragType: 'SearchBar',
    displayTitle: 'SearchBar',
    component: MainExport.MirSearchField,
  },
  {
    dragId: 2,
    dragType: 'Toolbar',
    displayTitle: 'Toolbar',
    component: MainExport.MirToolbarContent,
  },
];

// These define how we render the field

interface RenderersProps {
  (props: Record<string, any>): JSX.Element;
}

export const renderers: Record<string, RenderersProps> = {
  SearchBar: props => <MainExport.MirSearchField {...props} />,
  Toolbar: props => <MainExport.MirToolbarContent {...props} />,
};

interface RenderComponentProps {
  type: string;
  initialProps?: Record<string, any>;
}

export const RenderComponent = ({
  type,
  initialProps = {},
}: RenderComponentProps) => {
  const [componentProps, setComponentProps] =
    useState<Record<string, any>>(initialProps);

  useEffect(() => {
    // setComponentProps(initialProps);
  }, [initialProps]);

  if (renderers[type]) {
    return renderers[type](componentProps);
  }

  return <div>Unknown component type: {type}</div>;
};
