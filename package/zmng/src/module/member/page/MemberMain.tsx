import React, { useState } from 'react';

import {
  RootContainer,
  InsertButton,
  SubContainer,
} from '@common_components_ui';

import { useAppSelector } from '@config/ReduxHooks';

//Member Test data
const MemberInit = [
  {
    id: '01',
    name: '최시준',
    loc: '미르테크',
  },
  {
    id: '02',
    name: '최시준',
    loc: '미르테크',
  },
  {
    id: '01',
    name: '최시준',
    loc: '미르테크',
  },
];

function MembetMain() {
  const id = useAppSelector(state => state.Member.id);
  const name = useAppSelector(state => state.Member.name);
  const email = useAppSelector(state => state.Member.email);

  const [memberList, setMemberList] = useState('[]');

  return (
    <RootContainer>
      <SubContainer>
        <table></table>
      </SubContainer>
      <SubContainer>
        <InsertButton>테스트중</InsertButton>
      </SubContainer>
    </RootContainer>
  );
}

export default MembetMain;
