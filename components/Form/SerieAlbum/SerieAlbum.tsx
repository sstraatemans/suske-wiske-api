import { FC, useRef, useState, useCallback } from 'react';
import { useGetListAlbumsQuery } from '@hooks/admin/useGetListAlbumsQuery';
import { makeStyles } from '@material-ui/core/styles';
import { Option } from './Option';

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

  const createValueArray = (): SerieAlbumLink[] | undefined => {
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
          order: parseInt(orderArray[idx].value, 10),
        };
      });

      return valueArray as SerieAlbumLink[];
    }
  };

  const handleChange = useCallback(() => {
    const valueArray = createValueArray();

    setStartNew(false);
    handleInputValue('albums', valueArray);
  }, []);

  const handleDelete = useCallback((link: SerieAlbumLink | undefined) => {
    if (!link) return;
    const valueArray = createValueArray();
    console.log(valueArray, link);
    const filteredArray = valueArray?.filter(
      (val) => !(val.albumId === link.albumId && val.order === link.order)
    );

    handleInputValue('albums', filteredArray);
  }, []);

  return (
    <ul ref={listRef} className={classes.list}>
      {value
        ?.sort((a, b) => a.order - b.order)
        .map((link, idx) => {
          if (!link || (!link.order && !link.albumId)) return null;
          return (
            <Option
              key={link.order + link.albumId}
              link={link}
              handleChange={handleChange}
              handleDelete={handleDelete}
              listData={albumListData}
            />
          );
        })}

      {startNew ? (
        <Option
          link={{ order: 99999999, albumId: '' }}
          handleChange={handleChange}
          handleDelete={handleDelete}
          listData={albumListData}
        />
      ) : (
        <button onClick={() => setStartNew(true)}>new</button>
      )}
    </ul>
  );
};
