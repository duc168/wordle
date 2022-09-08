import React from "react";
import styled from "styled-components";
import Letter from "./Letter";
import { ILetter } from "@/interfaces";

interface Props {
  data: ILetter[];
}

const Container = styled.div`
  display: flex;
  column-gap: 5px;
  padding-block: 2.5px;
`;

const Row: React.FC<Props> = ({ data }) => {
  return (
    <Container>
      {data.map((record, idx) => (
        <Letter key={idx} letter={record.letter} type={record.type} />
      ))}
    </Container>
  );
};

export default Row;
