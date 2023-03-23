import { useState, useRef } from 'react';
import { LatLng } from '../../interfaces';
import { getLatLngFromCity, reverseGeocode } from '../../apis/opencage';
import styles from './styles.module.css';

interface SearchBarProps {
  onSearch: (coordinates: LatLng, cityData: any) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async (searchValue: string) => {
    if (searchValue.trim() === '') {
      return;
    }

    try {
      const coordinates = await getLatLngFromCity(searchValue);
      if (!coordinates) {
        throw new Error('Coordinates not found.');
      }

      const cityData = await reverseGeocode(coordinates.latitude, coordinates.longitude);
      if (!cityData) {
        throw new Error('City data not found.');
      }

      if (onSearch) {
        onSearch(coordinates, cityData);
      }
    } catch (error) {
      console.error('City not found. Please try again.', error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputRef.current) {
      const cityName = inputRef.current.value;
      handleSearch(cityName);
      inputRef.current.value = '';
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
};

export default SearchBar;
