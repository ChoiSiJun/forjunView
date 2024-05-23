import Grid from '@mui/material/Grid';

import MirCreateButton from '@common/components/atoms/button/MirCreateButton';
import MirDeleteButton from '@common/components/atoms/button/MirDeleteButton';
import MirUpdateButton from '@common/components/atoms/button/MirUpdateButton';
import MirExportButton from '@common/components/atoms/button/MirExportButton';

import CardLayout from '@template/CardLayout';
import StyledCardContainer from '@template/CardContainer';

export default function TemplateButton() {
  const clickHandler = () => {
    alert('클릭동작!!');
  };

  const MirCreateButtonGuide = {
    title: '생성 버튼',
    code: `
    const clickHandler = () => {
      alert('클릭동작!!');
    };
    <MirCreateButton buttonName={} onClick={clickHandler}></MirCreateButton>
  `,
    note: ['buttonName: 버튼이름', 'onClick: 클릭이벤트'],
  };

  const MirDeleteButtonGuide = {
    title: '삭제 버튼',
    code: `
    const clickHandler = () => {
      alert('클릭동작!!');
    };
    <MirDeleteButton buttonName={} onClick={clickHandler}></MirDeleteButton>
  `,
    note: ['buttonName: 버튼이름', 'onClick: 클릭이벤트'],
  };

  const MirUpdateButtonGuide = {
    title: '수정 버튼',
    code: `
    const clickHandler = () => {
      alert('클릭동작!!');
    };
    <MirUpdateButton buttonName={} onClick={clickHandler}></MirUpdateButton>
  `,
    note: ['buttonName: 버튼이름', 'onClick: 클릭이벤트'],
  };

  const MirExportButtonGuide = {
    title: '내보내기 버튼',
    code: `
    const clickHandler = () => {
      alert('클릭동작!!');
    };
    <MirExportButton buttonName={} onClick={clickHandler}></MirExportButton>
  `,
    note: ['buttonName: 버튼이름', 'onClick: 클릭이벤트'],
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={3} width={600} height={500}>
        <StyledCardContainer>
          <CardLayout
            component={
              <MirCreateButton
                buttonName={'Create'}
                onClick={clickHandler}
              ></MirCreateButton>
            }
            title={MirCreateButtonGuide.title}
            note={MirCreateButtonGuide.note}
            copyCode={MirCreateButtonGuide.code}
          ></CardLayout>
        </StyledCardContainer>
      </Grid>

      <Grid item xs={3} width={600} height={500}>
        <StyledCardContainer>
          <CardLayout
            component={
              <MirDeleteButton
                buttonName={'Delete'}
                onClick={clickHandler}
              ></MirDeleteButton>
            }
            title={MirDeleteButtonGuide.title}
            note={MirDeleteButtonGuide.note}
            copyCode={MirDeleteButtonGuide.code}
          ></CardLayout>
        </StyledCardContainer>
      </Grid>

      <Grid item xs={3} width={600} height={500}>
        <StyledCardContainer>
          <CardLayout
            component={
              <MirUpdateButton
                buttonName={'Update'}
                onClick={clickHandler}
              ></MirUpdateButton>
            }
            title={MirUpdateButtonGuide.title}
            note={MirUpdateButtonGuide.note}
            copyCode={MirUpdateButtonGuide.code}
          ></CardLayout>
        </StyledCardContainer>
      </Grid>

      <Grid item xs={3} width={600} height={500}>
        <StyledCardContainer>
          <CardLayout
            component={
              <MirExportButton
                buttonName={'Export'}
                onClick={clickHandler}
              ></MirExportButton>
            }
            title={MirExportButtonGuide.title}
            note={MirExportButtonGuide.note}
            copyCode={MirExportButtonGuide.code}
          ></CardLayout>
        </StyledCardContainer>
      </Grid>
    </Grid>
  );
}
