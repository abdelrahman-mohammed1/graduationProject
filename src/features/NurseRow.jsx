import styled from "styled-components";
import { HiMiniTrash, HiMiniCheckCircle, HiXCircle } from "react-icons/hi2";
import { useEffect, useState } from "react";
import Model from "../ui/Model";
import DeleteForm from "./DeleteForm";

import { HiEye } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/useData";
import { toast } from "react-toastify";
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1.5fr 1fr 1fr 1fr 1.5fr 0.5fr;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  grid-column: 1;
  display: block;
  width: 5.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Btns = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto;
`;

const DeleteIcon = styled(HiMiniTrash)`
  font-size: 17px;
  cursor: pointer;
  color: var(--color-brand-500);
  grid-column: 7;
`;

const ActiveIcon = styled(HiMiniCheckCircle)`
  font-size: 20px;
  cursor: pointer;
  color: var(--color-brand-500);
  grid-column: 8;
`;

const UnActiveIcon = styled(HiXCircle)`
  font-size: 20px;
  cursor: pointer;
  color: var(--color-brand-500);
  grid-column: 8;
`;
const StyledIcon = styled(HiEye)`
  cursor: pointer;
  color: var(--color-brand-500);
  font-size: 20px;
`;
export default function CabinRow({ nurse }) {
  const [deleteForm, setDeleteForm] = useState(false);
  const [isActive, setIsActive] = useState(nurse.active);
  const token = JSON.parse(localStorage.getItem("access_token"));
  console.log(token);
  const naviagte = useNavigate();
  const {
    _id,
    name,
    photo,
    specialization,
    yearsOfExperience,
    city,
    governorate: { name: governorateName },
    email,
  } = nurse;
  // useEffect(() => {
  //   console.log(nurse);
  // }, [isActive, nurse]);

  async function handleActive() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}v1/nurses/activate/${_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ active: true }),
        }
      );
      if (response.ok) {
        setIsActive(true);
        toast.success("nurse Activate Successfully");
      } else {
        const errorData = await response.json();
        console.error("Failed to activate nurse", errorData);
      }
    } catch (error) {
      console.error("Failed to activate nurse", error);
    }
  }

  async function handleInActive() {
    try {
      const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}v1/nurses/deactivate/${_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ active: false }),
        }
      );
      if (response.ok) {
        setIsActive(false);
        toast.success("nurse Deactivate Successfully");
      } else {
        const errorData = await response.json();
        console.error("Failed to deactivate nurse", errorData);
      }
    } catch (error) {
      console.error("Failed to deactivate nurse", error);
    }
  }
  return (
    <TableRow role="row">
      <Img src={photo} alt="image" />
      <div>{name}</div>
      <div>{specialization}</div>
      <div>{yearsOfExperience}</div>
      <div>{city?.name || "egypt"}</div>
      <div>{email}</div>
      <Btns>
        <StyledIcon title="see Details" onClick={() => naviagte(`${_id}`)} />
        <DeleteIcon
          title="delete nurse"
          onClick={() => setDeleteForm(!deleteForm)}
        />
        {isActive ? (
          <ActiveIcon title="Deactivate nurse" onClick={handleInActive} />
        ) : (
          <UnActiveIcon title="Activate nurse" onClick={handleActive} />
        )}
      </Btns>

      {deleteForm && (
        <Model>
          <DeleteForm
            nurse={nurse}
            deleteForm={deleteForm}
            setDeleteForm={setDeleteForm}
          />
        </Model>
      )}
    </TableRow>
  );
}
