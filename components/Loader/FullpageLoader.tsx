import { Loader, Grid, Box } from '../';

export const FullpageLoader = () => {
  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justifyContent='center'
      style={{ minHeight: '100vh' }}
    >
      <Loader />
    </Grid>
  );
};
