import Grid from '@mui/material/Grid';

import CreateButton from '@common/components/atoms/button/CreateButton';

import CardLayout from '@template/CardLayout';
import StyledCardContainer from '@template/CardContainer';

export default function TemplateModal() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={3} width={600} height={500}>
          <StyledCardContainer>
            <CardLayout
              component={<CreateButton buttonName={'Create'}></CreateButton>}
              title={'생성버튼'}
              note={['buttonName: string', 'onClick?: () => void']}
              copyCode={
                '<CreateButton buttonName={} onClick={}></CreateButton>'
              }
            ></CardLayout>
          </StyledCardContainer>
        </Grid>
        <Grid item xs={3} width={600} height={500}>
          <StyledCardContainer>
            <CardLayout
              component={<CreateButton buttonName={'Create'}></CreateButton>}
              title={'생성버튼'}
              note={['buttonName: string', 'onClick?: () => void']}
              copyCode={
                '<CreateButton buttonName={} onClick={}></CreateButton>'
              }
            ></CardLayout>
          </StyledCardContainer>
        </Grid>

        <Grid item xs={3} width={600} height={500}>
          <StyledCardContainer>
            <CardLayout
              component={<CreateButton buttonName={'Create'}></CreateButton>}
              title={'생성버튼'}
              note={['buttonName: string', 'onClick?: () => void']}
              copyCode={
                '<CreateButton buttonName={} onClick={}></CreateButton>'
              }
            ></CardLayout>
          </StyledCardContainer>
        </Grid>
      </Grid>

      <MainModal></MainModal>
    </>
  );
}
