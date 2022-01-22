import { FC } from 'react';
import { NumberField, AutoComplete } from '@components/Form/.';
import { Grid } from '@components/.';
import { IconButton } from '@material-ui/core';
import { DeleteIcon } from '@components/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  item: {
    display: 'flex',
  },
}));

type Props = {
  link?: SerieAlbumLink;
  handleChange: () => void;
  handleDelete: (link: SerieAlbumLink | undefined) => void;
  listData: Album[] | undefined;
};

export const Option: FC<Props> = ({ link, handleChange, handleDelete, listData }) => {
  const classes = useStyles();
  return (
    <li>
      <Grid container>
        <Grid item sm={3} xs={11}>
          <NumberField
            label='order'
            name='order'
            value={link?.order}
            handleInputEvent={handleChange}
          />
        </Grid>
        <Grid item sm={8} xs={11}>
          <AutoComplete
            value={link?.albumId}
            label='album'
            name='albumId'
            options={listData}
            handleInputValue={handleChange}
          />
        </Grid>
        <Grid
          item
          sm={1}
          xs={1}
          alignContent='center'
          alignItems='center'
          classes={{ item: classes.item }}
        >
          <IconButton onClick={() => handleDelete(link)}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </li>
  );
};
