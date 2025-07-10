

import NurseTable from "../features/NurseTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Input from '../ui/Input';
import { useState, useEffect } from "react";
import Button from "../ui/Button";
import styled from "styled-components";


const Select = styled.select`
    width: 20.4rem;
    padding: 5px 3px;
    border-radius: 5px;  
    background-color: var(--color-grey-0); 
    &:focus{
      border: 1px solid #097B94; 
      outline: none;
    }
`;

const ButtonRow = styled.div`
    display: flex;
    gap: 8px;
    align-content: space-between;
    align-items: center;
`;

function Nurses() {
  const [searchName, setSearchName] = useState("");
  const [sortExperience, setSortExperience] = useState(false);
  const [sortRate, setSortRate] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [allCities, setAllCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGoverment, setSelectedGoverment] = useState("");
  const [loadingGoverment, setLoadingGoverment] = useState(false);
  const [goverments, setGoverments] = useState([]);


  useEffect(function () {
    async function getGoverments() {
      setLoadingGoverment(true);
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}governorates`);
      const data = await res.json();
      setLoadingGoverment(false)
      setGoverments(data.data);
    }
    getGoverments();
  }, []);
  const governorateId = selectedGoverment?.split(',')[1];
  const governorateName = selectedGoverment?.split(',')[0];

  useEffect(function () {
    async function getCitiesSpecific() {
      if (!governorateId) return;
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}governorates/${governorateId}/cities`);
      const data = await res.json();
      setLoading(false);
      setAllCities(data?.data)
    }
    getCitiesSpecific();
  }, [governorateId])
  const handleGovernmentChange = (e) => {
    setSelectedGoverment(e.target.value);
    setSelectedCity("");
  };

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All nurses</Heading>
        <ButtonRow>
          {governorateName?.length > 0 && (
            <Select disabled={loading} value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
              <option value="">Select a city</option>
              {allCities?.map((city, i) => (
                <option value={city.name} key={i}>{city.name}</option>
              ))}
            </Select>
          )}
          <Select
            disabled={loadingGoverment}
            value={selectedGoverment}
            onChange={handleGovernmentChange}
          >
            <option value="">Select a government</option>
            {goverments?.map((government, i) => (
              <option value={`${government.name},${government._id}`} key={i}>
                {government.name}
              </option>
            ))}
          </Select>
          <Button
            variation={sortRate ? 'basic' : 'secondary'}
            onClick={() => { setSortExperience(false); setSortRate(true); }}
          >
            Sort by rate
          </Button>
          <Button
            variation={sortExperience ? 'basic' : 'secondary'}
            onClick={() => { setSortRate(false); setSortExperience(true); }}
          >
            Sort by experience
          </Button>
          <Input
            placeholder="Search by name"
            kind="form"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </ButtonRow>
      </Row>

      <Row>
        <NurseTable
          searchName={searchName}
          selectedCity={selectedCity}
          selectedGoverment={governorateName}
          sortRate={sortRate}
          sortExperience={sortExperience}
        />
      </Row>
    </>
  );
}

export default Nurses;
