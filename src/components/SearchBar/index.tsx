import { useState, useRef } from 'react';
import { LatLng } from '../../interfaces';
import { getLatLngFromCity } from '../../apis/opencage';
import styles from './styles.module.css';

interface SearchBarProps {
  onSearch: (coordinates: LatLng) => void;
}

const SearchBar: React.FC<SearchBarProps> = (({ onSearch }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputRef.current) {
      const cityName = inputRef.current.value;
      try {
        const coordinates = await getLatLngFromCity(cityName);
        onSearch(coordinates);
        inputRef.current.value = '';
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <div className={styles.container}>
        <input
          ref={inputRef}
          type="text"
          className={styles.input}
          placeholder="Enter city to get prayer times..."
          autoComplete="off"
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </div>
    </form>
  );
});

export default SearchBar;
