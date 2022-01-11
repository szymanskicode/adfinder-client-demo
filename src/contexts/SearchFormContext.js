import React, { createContext, useState, useContext } from 'react';

export const SearchFormContext = createContext();

const SearchFormContextProvider = (props) => {
  const [form, setForm] = useState({
    state: 'all',
    city: '',
    transaction: 'all',
    category: 'all',
    subcategory: 'all',
    rooms: 'all',
    surfaceFrom: '',
    surfaceTo: '',
    priceFrom: '',
    priceTo: '',
    phrase: '',
    checkDsc: false,
    searchAll: true,
    startDate: new Date(),
    endDate: new Date(),
  });

  return (
    <SearchFormContext.Provider value={{ form, setForm }}>
      {props.children}
    </SearchFormContext.Provider>
  );
};

export default SearchFormContextProvider;

// CUSTOM HOOK - Get & Set SearchForm
export const useGetSearchForm = () => {
  const { form, setForm } = useContext(SearchFormContext);

  function setVal(val) {
    const key = Object.keys(val)[0];
    setForm((prev) => {
      return { ...prev, [key]: val[key] };
    });
  }

  const cleanForm = {
    state: 'all',
    city: '',
    transaction: 'all',
    category: 'all',
    subcategory: 'all',
    rooms: 'all',
    surfaceFrom: '',
    surfaceTo: '',
    priceFrom: '',
    priceTo: '',
    phrase: '',
    checkDsc: false,
    searchAll: true,
    startDate: new Date(),
    endDate: new Date(),
  };

  function resetForm() {
    setForm(cleanForm);
  }

  return { form, setVal, resetForm };
};
