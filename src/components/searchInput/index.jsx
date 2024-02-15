import {
  InputField,
  SearchContainer,
  InputContainer,
  SearchIcon,
} from "./searchInputElements";

const SearchInput = ({categories}) => {
  return (
    <SearchContainer>
      <InputContainer>
        <InputField autoFocus placeholder="Search" />
        <SearchIcon>
          <i className="fa-solid fa-magnifying-glass" />
        </SearchIcon>
      </InputContainer>
      {/* <i className="fa-solid fa-filter" onClick={() => handleSetFilter()}></i> */}
      {/* {filter && (
        <>
          <UnorderedList>
            {categories.map((ele, i) => (
              <ListItem
                key={i}
                onClick={() => handleItemClick(ele)}
                active={selectedCategory === ele ? true : false}
              >
                {ele}
              </ListItem>
            ))}
          </UnorderedList>
        </>
      )} */}
    </SearchContainer>
  );
};

export default SearchInput;
