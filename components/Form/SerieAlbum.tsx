import { FC, useRef, useState } from 'react';
import { NumberField, AutoComplete } from '@components/Form/.';
import { Grid } from '@components/.';
import { useGetListAlbumsQuery } from '@hooks/admin/useGetListAlbumsQuery';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
}));

type Props = {
  handleInputValue: (name: string, value?: unknown) => void;
  value?: SerieAlbumLink[];
};

export const SerieAlbum: FC<Props> = ({ value, handleInputValue }) => {
  const classes = useStyles();
  const { data } = useGetListAlbumsQuery();
  const { results: albumListData } = data ?? {};
  const [startNew, setStartNew] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const handleChange = () => {
    if (listRef.current) {
      const albumIds = listRef.current.querySelectorAll(
        'input[name="albumId"]'
      ) as NodeListOf<HTMLInputElement>;
      const orders = listRef.current.querySelectorAll(
        'input[name="order"]'
      ) as NodeListOf<HTMLInputElement>;
      const albumIdArray = Array.from(albumIds);
      const orderArray = Array.from(orders);

      const valueArray = albumIdArray.map((el, idx) => {
        return {
          albumId: el.value,
          order: orderArray[idx].value,
        };
      });
      setStartNew(false);
      handleInputValue('albums', valueArray);
    }
  };

  return (
    <ul ref={listRef} className={classes.list}>
      {value
        ?.sort((a, b) => a.order - b.order)
        .map((link, idx) => {
          if (!link || (!link.order && !link.albumId)) return null;
          return (
            <li key={idx}>
              <Grid container>
                <Grid sm={3} xs={12}>
                  <NumberField
                    label='order'
                    name='order'
                    value={link.order}
                    handleInputEvent={handleChange}
                  />
                </Grid>
                <Grid sm={9} xs={12}>
                  <AutoComplete
                    value={link.albumId}
                    label='album'
                    name='albumId'
                    options={albumListData}
                    handleInputValue={handleChange}
                  />
                </Grid>
              </Grid>
            </li>
          );
        })}

      {startNew ? (
        <li>
          <NumberField label='order' value={0} name='order' handleInputEvent={handleChange} />
          <AutoComplete
            options={albumListData}
            label='album'
            name='albumId'
            handleInputValue={handleChange}
          />
        </li>
      ) : (
        <button onClick={() => setStartNew(true)}>new</button>
      )}
    </ul>
  );
};
