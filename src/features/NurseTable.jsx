
import styled from "styled-components";
import NurseRow from "./NurseRow";
import { useEffect, useMemo, useState } from "react";
import Spinner from "../ui/Spinner";
import { useData } from "../context/useDate";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: auto;
`;

const TableHeader = styled.header`
 
  
  
  display: grid;
  grid-template-columns: 0.5fr 1.5fr 0.8fr 1.2fr 1fr 1.5fr 0.5fr;
  
  align-items: center;
  text-transform: uppercase;
  font-weight: 600;
  background-color: var(--color-grey-50);
  gap: 1rem;
  border-bottom: 1px solid var(--color-grey-100);
  padding: 1rem 2rem;
  letter-spacing: 0.4px;
  color: var(--color-grey-600);
`;

const Empty = styled.div`
  grid-column: 1;
`;

const Name = styled.div`
  grid-column: 2;
  word-spacing: -7px;
`;

const Major = styled.div`
  grid-column: 3;
`;

const Rating = styled.div`
  grid-column: 4;
`;

const City = styled.div`
  grid-column: 5;
`;

const Email = styled.div`
  grid-column: 6;
`;



export default function NurseTable({ searchName, selectedCity, selectedGoverment, sortExperience, sortRate }) {


  const { nurses } = useData();


  const filteredNurses = useMemo(() => {
    let result = nurses;

    if (searchName) {
      result = result.filter(nurse => nurse?.name?.toLowerCase().includes(searchName.toLowerCase()));
    }

    if (selectedCity) {
      result = result.filter(nurse => nurse?.city?.name?.toLowerCase().includes(selectedCity.toLowerCase()));
    }

    if (selectedGoverment) {
      result = result.filter(nurse => nurse?.governorate?.name?.toLowerCase().includes(selectedGoverment.toLowerCase()));
    }

    if (sortExperience) {
      result = result.slice().sort((a, b) => b.yearsOfExperience - a.yearsOfExperience);
    }

    if (sortRate) {
      result = result.slice().sort((a, b) => b.ratingsAverage - a.ratingsAverage);
    }

    return result;
  }, [nurses, searchName, selectedCity, selectedGoverment, sortExperience, sortRate]);


  return (
    <>
      {nurses?.length === 0 ? <Spinner /> :
        <Table role="table">
          <TableHeader role="row">

            <Empty></Empty>
            <Name>Name</Name>
            <Major>Major</Major>
            <Rating>Experience</Rating>
            <City>City</City>
            <Email>Email</Email>


          </TableHeader>
          {filteredNurses.map((nurse, i) => <NurseRow nurse={nurse} key={i} />)}
        </Table>
      }
    </>
  );
}
