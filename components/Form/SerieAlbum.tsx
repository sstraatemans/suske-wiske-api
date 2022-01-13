import { FC, FormEvent, useRef, useState } from 'react';
import { NumberField } from '@components/Form/.';

type Props = {
  handleInputValue: (name: string, value?: unknown) => void;
  value?: SerieAlbumLink[];
};

export const SerieAlbum: FC<Props> = ({ value, handleInputValue }) => {
  const [startNew, setStartNew] = useState(true);
  const listRef = useRef<HTMLUListElement>(null);
  const handleChange = (e: FormEvent) => {
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

      const newAlbumId = listRef.current.querySelector(
        'input[name="NewAlbumId"]'
      ) as HTMLInputElement;
      const newOrder = listRef.current.querySelector('input[name="NewOrder"]') as HTMLInputElement;

      if (newAlbumId || newOrder) {
        valueArray.push({
          albumId: newAlbumId.value,
          order: newOrder.value,
        });

        setStartNew(false);
      }

      handleInputValue('albums', valueArray);
    }
  };

  return (
    <ul ref={listRef}>
      {value?.map((link, idx) => {
        if (!link || (!link.order && !link.albumId)) return null;
        return (
          <li key={idx}>
            <NumberField
              label='order'
              name='order'
              value={link.order}
              handleInputEvent={handleChange}
            />
            <NumberField
              label='album'
              name='albumId'
              value={link.albumId}
              handleInputEvent={handleChange}
            />
          </li>
        );
      })}

      {startNew ? (
        <li>
          <NumberField label='new order' name='NewOrder' handleInputEvent={handleChange} />
          <NumberField label='new album' name='NewAlbumId' handleInputEvent={handleChange} />
        </li>
      ) : (
        <button onClick={() => setStartNew(true)}>new</button>
      )}
    </ul>
  );
};
