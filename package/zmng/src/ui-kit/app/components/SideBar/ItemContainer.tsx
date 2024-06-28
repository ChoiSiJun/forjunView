import { Box, List } from '@mui/material';
import Item from '@ui-kit/app/components/SideBar/Item';
import Group from '@ui-kit/app/components/SideBar/Group';
import { useAppSelector } from '@config/ReduxHooks';
import React from 'react';

const ItemContainer = () => {
  //현재 패키지 Module 정보 가져오기
  const MenuInfo = useAppSelector(state => state.Menu);
  const PackageInfo = MenuInfo.packageList[MenuInfo.accessPackageIndex];

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {PackageInfo.moduleList?.map(moduleItem => (
          <React.Fragment key={moduleItem.moduleCode}>
            <Group name={moduleItem.moduleName} key={moduleItem.moduleCode} />
            {moduleItem.menuList?.map(menuItem => (
              <Item
                name={menuItem.menuName}
                path={menuItem.menuPath}
                code={menuItem.menuCode}
                accessPath={MenuInfo.accessPath}
                key={menuItem.menuCode}
              />
            ))}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};
export default ItemContainer;
