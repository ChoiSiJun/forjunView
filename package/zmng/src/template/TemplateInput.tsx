import Grid from '@mui/material/Grid';

import CreateButton from '@common/components/atoms/button/CreateButton';
import DeleteButton from '@common/components/atoms/button/DeleteButton';
import UpdateButton from '@common/components/atoms/button/UpdateButton';
import ExportButton from '@common/components/atoms/button/ExportButton';

import CardLayout from '@template/CardLayout';

export default function TemplateButton() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={3} width={600} height={500}>
        <CardLayout
          component={<CreateButton buttonName={'Create'}></CreateButton>}
          title={'생성버튼'}
          note={['buttonName: string', 'onClick?: () => void']}
          copyCode={'<CreateButton buttonName={} onClick={}></CreateButton>'}
        ></CardLayout>
      </Grid>

      <Grid item xs={3} width={600} height={500}>
        <CardLayout
          component={<DeleteButton buttonName={'Delete'}></DeleteButton>}
          title={'삭제버튼'}
          note={['buttonName: string', 'onClick?: () => void']}
          copyCode={'<DeleteButton buttonName={} onClick={}></DeleteButton>'}
        ></CardLayout>
      </Grid>

      <Grid item xs={3} width={600} height={500}>
        <CardLayout
          component={<UpdateButton buttonName={'Update'}></UpdateButton>}
          title={'수정버튼'}
          note={['buttonName: string', 'onClick?: () => void']}
          copyCode={'<UpdateButton buttonName={} onClick={}></UpdateButton>'}
        ></CardLayout>
      </Grid>

      <Grid item xs={3} width={600} height={500}>
        <CardLayout
          component={<ExportButton buttonName={'Export'}></ExportButton>}
          title={'내보내기버튼'}
          note={['buttonName: string', 'onClick?: () => void']}
          copyCode={'<ExportButton buttonName={} onClick={}></ExportButton>'}
        ></CardLayout>
      </Grid>
    </Grid>
  );
}
