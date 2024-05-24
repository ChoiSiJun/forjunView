import Grid from '@mui/material/Grid';
import CardLayout from '@template/CardLayout';
import StyledCardContainer from '@template/CardContainer';

import MirButton, {
  MirButtonGuide,
} from '@common/components/atoms/button/MirButton';

export default function TemplateButton() {
  const clickHandler = () => {
    alert('클릭동작!!');
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={6} minWidth={600}>
        <StyledCardContainer>
          <CardLayout
            component={[
              {
                note: 'default',
                component: (
                  <MirButton
                    ButtonType={'default'}
                    buttonName={'기본'}
                    onClick={clickHandler}
                  />
                ),
              },
              {
                note: 'create',
                component: (
                  <MirButton
                    ButtonType={'create'}
                    buttonName={'create'}
                    onClick={clickHandler}
                  />
                ),
              },
              {
                note: 'read',
                component: (
                  <MirButton
                    ButtonType={'read'}
                    buttonName={'read'}
                    onClick={clickHandler}
                  />
                ),
              },
              {
                note: 'delete',
                component: (
                  <MirButton
                    ButtonType={'delete'}
                    buttonName={'delete'}
                    onClick={clickHandler}
                  />
                ),
              },
              {
                note: 'update',
                component: (
                  <MirButton
                    ButtonType={'update'}
                    buttonName={'update'}
                    onClick={clickHandler}
                  />
                ),
              },
              {
                note: 'export',
                component: (
                  <MirButton
                    ButtonType={'export'}
                    buttonName={'export'}
                    onClick={clickHandler}
                  />
                ),
              },
              {
                note: 'etc',
                component: (
                  <MirButton
                    ButtonType={'etc'}
                    buttonName={'etc'}
                    onClick={clickHandler}
                  />
                ),
              },
            ]}
            title={MirButtonGuide.title}
            requireNote={MirButtonGuide.requireNote}
            optionNote={MirButtonGuide.optionNote}
            copyCode={MirButtonGuide.code}
          ></CardLayout>
        </StyledCardContainer>
      </Grid>
    </Grid>
  );
}
