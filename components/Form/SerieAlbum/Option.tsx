import { FC } from 'react';
import { NumberField, AutoComplete } from '@components/Form/.';
import { Grid } from '@components/.';

type Props = {
  link?: SerieAlbumLink;
  handleChange: () => void;
  listData: Album[] | undefined;
};

export const Option: FC<Props> = ({ link, handleChange, listData }) => {
  return (
    <li>
      <Grid container>
        <Grid sm={3} xs={12}>
          <NumberField
            label='order'
            name='order'
            value={link?.order}
            handleInputEvent={handleChange}
          />
        </Grid>
        <Grid sm={9} xs={12}>
          <AutoComplete
            value={link?.albumId}
            label='album'
            name='albumId'
            options={listData}
            handleInputValue={handleChange}
          />
        </Grid>
      </Grid>
    </li>
  );
};
