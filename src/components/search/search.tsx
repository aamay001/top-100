import { useState } from 'react';
import { debounce } from 'es-toolkit';
import { Card, XStack, H2, SizableText, YStack, Button, Tooltip, Paragraph } from 'tamagui';
import { LuInfo } from 'react-icons/lu';

import { SEARCH_INFO_TEXT, SEARCH_INPUT_PLACEHOLDER } from '../../constants/strings';
import { useAlbumData } from '../../hooks/use-album-data';
import { dedupAndSort } from '../../utility/dedup-and-sort-array';

import '../../styles/search.scss';

interface SearchFormProps {
  data: Album[],
  dataKey: keyof Album,
  onSearch: (results: Album[] | null) => void, 
  className?: string,
}

interface SearchFilters {
  category: string,
  artist: string,
  year: string,
}

const initialFilters: SearchFilters = {
  artist: '',
  category: '',
  year: '',
};

const filterResults = (
  arr: Album[], 
  key: keyof Album, 
  search: string, 
  callback: (a: Album[] | null) => void
) => {
  console.log('search called')
  if (search.length >= 3) {
    const results = arr.filter((d: Album) => {
      if ((d[key] as string).toLowerCase().includes(search.toLowerCase())){
          return true;
      }
      return false;
    });

    callback(results);
  } else {
    callback(null);
  }
};

const debouncedFilter = debounce(filterResults, 250);

const Search: React.FC<SearchFormProps> = ({
  data,
  dataKey,
  onSearch,
  className,
}) => {
  const [query, setQuery] = useState<string>('');
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const { categories, artists, releaseYears } = useAlbumData();
  const [currentResults, setCurrentResults] = useState<Album[] | null>(null);

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  }

  const onResultsFiltered = (results: Album[] | null) => {
    onSearch(results);
    setCurrentResults(results);
  }

  const onInputChanged: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { currentTarget: { value } } = e;
    setQuery(value);
    setFilters({
      year: '',
      category: '',
      artist: '',
    });
    setCurrentResults(null);
    debouncedFilter(data, dataKey, value, onResultsFiltered);
  }

  const onFilterChanged = (filter: keyof Album, value: string) => {
    let results: Album[] = value === ''
      ? data
      : currentResults || data;

    const updatedFilters: SearchFilters = {
      ...filters,
      [filter]: value,
    };

    if (updatedFilters.artist) {
      results = results.filter(d => {
        return (updatedFilters.artist &&
          d.artist === updatedFilters.artist);
      });
    }

    if (updatedFilters.category) {
      results = results.filter(d => {
        return (updatedFilters.category &&
          d.category === updatedFilters.category);
      });
    }

    if (updatedFilters.year) {
      results = results.filter(d => {
        return (updatedFilters.year &&
          d.year === updatedFilters.year);
      });
    }

    setFilters(updatedFilters);
    if (updatedFilters.artist === '' && 
      updatedFilters.category === '' && 
      updatedFilters.year === '') {
      setCurrentResults(null);
    } else {
      setCurrentResults(results);
    }
    onSearch(results);
  }

  return (
    <Card padding="$5" paddingBottom="$7" marginTop="$5" className={className}>
      <Card.Header
        padding="0"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="baseline"
      >
        <H2 size="$7">Search</H2>
        <Tooltip placement="left" delay={10}>
          <Tooltip.Trigger>
            <Button icon={<LuInfo size={30} />} circular size="$3" />
          </Tooltip.Trigger>
          <Tooltip.Content size="$4" maxWidth="90VW">
            <Tooltip.Arrow />
            <Paragraph whiteSpace="pre-line">
              {SEARCH_INFO_TEXT}
            </Paragraph>
          </Tooltip.Content>
        </Tooltip>
      </Card.Header>
      <XStack justifyContent="center">
        <form onSubmit={onFormSubmit} style={{ width: '100%' }}>
          <SizableText size="$6" flex={1} width="100%">
            <input 
              type="text" 
              minLength={2} 
              onChange={onInputChanged} 
              value={query}
              style={{ 
                margin: 0,
                padding: 5,
                width: '98%',
                borderRadius: 5
              }}
              placeholder={SEARCH_INPUT_PLACEHOLDER}
            />
          </SizableText>
        </form>
      </XStack>
      <XStack marginTop={10} justifyContent="space-between" flexWrap="wrap">
        <YStack flex={1} className="search-select-container">
          <SizableText size="$6">
            <label htmlFor="artist-select">Artist</label>
          </SizableText>
            <select 
              id="artist-select" 
              className="search-select"
              value={filters.artist} 
              onChange={({ currentTarget: { value }}) =>
                onFilterChanged('artist', value)}
            >
              <option value=""></option>
              {(dedupAndSort(currentResults?.map(a => a.artist)) || artists).map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
        </YStack>
        <YStack flex={1} className="search-select-container">
          <SizableText size="$6">
            <label htmlFor="category-select">Category</label>
          </SizableText>
          <select 
            id="category-select" 
            className="search-select"
            value={filters.category} 
            onChange={({ currentTarget: { value }}) =>
              onFilterChanged('category', value)}
          >
            <option value=""></option>
            {(dedupAndSort(currentResults?.map(a => a.category)) || categories).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </YStack>
        <YStack flex={1} className="search-select-container">
          <SizableText size="$6">
            <label htmlFor="year-select">Year</label>
          </SizableText>
          <select 
            id="year-select" 
            className="search-select" 
            value={filters.year} 
            onChange={({ currentTarget: { value }}) =>
              onFilterChanged('year', value)}
          >
            <option value=""></option>
            {(dedupAndSort(currentResults?.map(a => a.year)) || releaseYears).map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </YStack>
      </XStack>
    </Card>
  );
}

export default Search;