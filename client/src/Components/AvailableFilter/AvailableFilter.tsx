import * as React from "react";
import FilterButton from "./styled/FilterButton";
import FilterButtonText from "./styled/FilterButtonText";
import FilterWrapper from "./styled/FilterWrapper";

interface AvailableProps {
  availableOnly: boolean;
  toggleAvailable: () => void;
}

const AvailableFilter = ({
  availableOnly,
  toggleAvailable,
}: AvailableProps) => {
  return (
    <FilterWrapper>
      <FilterButton onPress={toggleAvailable}>
        <FilterButtonText>
          {availableOnly ? "Pokaż wszystkie" : "Pokaż tylko dostępne"}
        </FilterButtonText>
      </FilterButton>
    </FilterWrapper>
  );
};

export default AvailableFilter;
