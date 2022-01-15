import { FC, FormEvent, useRef, useState } from 'react';
import { NumberField, AutoComplete } from '@components/Form/.';
import { useGetListAlbumsQuery } from '@hooks/admin/useGetListAlbumsQuery';

type Props = {
  handleInputValue: (name: string, value?: unknown) => void;
  value?: SerieAlbumLink[];
};

export const SerieAlbum: FC<Props> = ({ value, handleInputValue }) => {
  const { data } = useGetListAlbumsQuery();
  const { results: albumListData } = data ?? {};
  const [startNew, setStartNew] = useState(true);
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
    <ul ref={listRef}>
      {value
        ?.sort((a, b) => a.order - b.order)
        .map((link, idx) => {
          if (!link || (!link.order && !link.albumId)) return null;
          return (
            <li key={idx}>
              <NumberField
                label='order'
                name='order'
                value={link.order}
                handleInputEvent={handleChange}
              />
              <AutoComplete
                value={link.albumId}
                label='album'
                name='albumId'
                options={albumListData}
                handleInputValue={handleChange}
              />
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
