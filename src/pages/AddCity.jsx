


import { useForm } from "react-hook-form";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Form from "../ui/Form";
import FormRow from '../ui/FormRow';
import Input from "../ui/Input";
import Button from "../ui/Button";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Spinner from '../ui/Spinner';
import SpinnerMini from '../ui/SpinnerMini';
import { Slide, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useData } from "../context/useData";

const Select = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid  #097B94 ; 
    ${(props) =>
        props.type === "white"
            ? "var(--color-grey-100)"
            : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

const fetchGovernorates = async () => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}governorates`);
    if (!res.ok) throw new Error('Failed to fetch governorates');
    const data = await res.json();
    return data.data;
};

const addCity = async (cityData, token) => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}cities/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(cityData)
    });
    if (!res.ok) throw new Error('Failed to submit form');
    return res.json();
};

function AddCity() {
    const [isLoading, setIsLoading] = useState(false);
    const [governorates, setGovernorates] = useState([]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const token = JSON.parse(localStorage.getItem('access_token'))
    console.log(token)
    useEffect(() => {
        const loadGovernorates = async () => {
            try {
                setIsLoading(true);
                const data = await fetchGovernorates();
                setGovernorates(data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                toast.error('Error fetching governorates', {
                    transition: Slide,
                    autoClose: 2000,
                    delay: 1000,
                    pauseOnHover: false
                });
            }
        };

        loadGovernorates();
    }, []);

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            await addCity({ name: data.city, governorate: data.governorate }, token);
            setIsLoading(false);
            reset();
            toast.success('City added successfully!', {
                transition: Slide,
                autoClose: 2000,
                delay: 1000,
                pauseOnHover: false
            });
        } catch (error) {
            setIsLoading(false);
            toast.error('Error submitting form', {
                transition: Slide,
                autoClose: 2000,
                delay: 1000,
                pauseOnHover: false
            });
        }
    };

    return (
        <>
            {isLoading ? <Spinner /> : (
                <>
                    <Row type="horizontal">
                        <Heading as="h1">Add City</Heading>
                    </Row>
                    <Row>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <FormRow label="Select Governorate" error={errors.governorate?.message}>
                                <Select id='governorate' {...register("governorate", { required: "This field is required" })} disabled={isLoading}>
                                    <option value="">Select governorate</option>
                                    {governorates.map((gov) => (
                                        <option key={gov._id} value={gov._id}>{gov.name}</option>
                                    ))}
                                </Select>
                            </FormRow>
                            <FormRow label="City Name" error={errors.city?.message}>
                                <Input kind="form" type='text' id='city' {...register("city", { required: "This field is required" })} disabled={isLoading}></Input>
                            </FormRow>
                            <FormRow>
                                <Button variation="secondary" type="reset" disabled={isLoading}>
                                    Cancel
                                </Button>
                                <Button variation='basic' type="submit" disabled={isLoading}>
                                    {isLoading ? <SpinnerMini /> : 'Add new City'}
                                </Button>

                            </FormRow>
                        </Form>
                    </Row>
                </>
            )}
        </>
    );
}

export default AddCity;
