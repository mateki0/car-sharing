import * as React from 'react';
import DetailBoxTitle from './styled/DetailBoxTitle';
import DetailBoxValue from './styled/DetailBoxValue';
import SingleDetailBoxContainer from './styled/SingleDetailBoxContainer';

type DetailBoxProps = {
  valueName:string;
  value:string;
}

const DetailSmallBox = ({valueName,value}:DetailBoxProps) => {
  return(
    <SingleDetailBoxContainer>
      <DetailBoxValue>{value}</DetailBoxValue>
      <DetailBoxTitle>{valueName}</DetailBoxTitle>
    </SingleDetailBoxContainer>
  )
}

export default DetailSmallBox;