import * as Babel from '@babel/standalone';

export const getComponentSource = (component: React.FC<any>): string => {
  const componentString = component.toString();
  const transformed = Babel.transform(componentString, {
    presets: ['typescript', 'react'],
  }).code;
  return transformed || '';
};
