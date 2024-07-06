
import { useEffect, useState, useCallback } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from '../../ui/FormRow';
import Input from "../../ui/Input";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { useForm, useController } from "react-hook-form";
import { useData } from "../../context/useData";
import { Slide, toast } from "react-toastify";
import SpinnerMini from "../../ui/SpinnerMini";
import Heading from "../../ui/Heading";

import styled from "styled-components";
const Select = styled.select`
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #d7d7d7;  
    background-color: var(--color-grey-0);
    &:focus {
      border: 1px solid #097B94;
      outline: none;
    }
  `



const IconStyle = {
  position: 'relative',
  fontSize: '18px',
  left: '-52px',
  cursor: 'pointer',
  color: ' #097B94',
}
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function SignupForm() {
  const { register, control, handleSubmit, getValues, formState: { errors } } = useForm();
  const [passShow, setPassShow] = useState(false);
  const [reppassShow, setRepPassShow] = useState(false);
  const [governorateId, setGovernorateId] = useState("");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCity, setLoadingCity] = useState(false);
  const { data: governorate } = useData();
  const token = JSON.parse(localStorage.getItem('access_token'))
  console.log(token)
  const { field: governorateField } = useController({
    name: 'governorate',
    control,
    defaultValue: '',
    rules: { required: "This field is required" }
  });

  const fetchCities = useCallback(async () => {
    if (!governorateId) return;
    setLoadingCity(true);
    try {
      const res = await fetch(`https://we-care-server-seven.vercel.app/api/v1/governorates/${governorateId}/cities`);
      const data = await res.json();
      setCities(data.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
      toast.error('Error fetching cities', { transition: Slide });
    } finally {
      setLoadingCity(false);
    }
  }, [governorateId]);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  const toggleShowPass = () => setPassShow(prev => !prev);
  const togglerepShowPass = () => setRepPassShow(prev => !prev);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch('https://we-care-server-seven.vercel.app/api/v1/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Failed to submit form: ${response.statusText}`);
      }

      toast.success('Admin Added successfully!', {
        transition: Slide,
        autoClose: 2000,
        delay: 1000,
        pauseOnHover: false
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred while submitting the form. Please try again later.', { transition: Slide });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Heading>Add new Admin</Heading>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Full name" error={errors.name?.message}>
          <Input kind="form" type="text" id="name" {...register("name", { required: "This field is required" })} />
        </FormRow>

        <FormRow label="Email address" error={errors.email?.message}>
          <Input kind="form" type="email" id="email" {...register("email", {
            required: "This field is required",
            pattern: {
              value: emailPattern,
              message: 'Not a valid email address'
            }
          })} />
        </FormRow>

        <FormRow label="Password (min 8 characters)" error={errors.password?.message}>
          <Input kind="form" type={passShow ? 'text' : 'password'} id="password" {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: 'Minimum length is 8 characters',
            }
          })} />
          {passShow ? <HiEye style={IconStyle} onClick={toggleShowPass} /> : <HiEyeSlash style={IconStyle} onClick={toggleShowPass} />}
        </FormRow>

        <FormRow label="Repeat password" error={errors.passwordConfirm?.message}>
          <Input kind="form" type={reppassShow ? 'text' : 'password'} id="passwordConfirm" {...register("passwordConfirm", {
            required: "This field is required",
            validate: value => value === getValues("password") || "Passwords do not match"
          })} />
          {reppassShow ? <HiEye style={IconStyle} onClick={togglerepShowPass} /> : <HiEyeSlash style={IconStyle} onClick={togglerepShowPass} />}
        </FormRow>

        <FormRow label="Date of Birth" error={errors.dateOfBirth?.message}>
          <Input kind="form" type="date" id="dateOfBirth" {...register("dateOfBirth", { required: "This field is required" })} />
        </FormRow>

        <FormRow label="Gender" error={errors.gender?.message}>
          <Select id="gender" {...register("gender", { required: "This field is required" })}>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
        </FormRow>

        <FormRow label="Governorate" error={errors.governorate?.message}>
          <Select id="governorate" {...governorateField} onChange={(e) => {
            governorateField.onChange(e);
            setGovernorateId(e.target.value);
          }}>
            <option value="">Select government</option>
            {governorate?.data?.map(gover => <option value={gover?._id} key={gover?._id}>{gover?.name}</option>)}
          </Select>
        </FormRow>

        {governorateId && (
          <FormRow label="City" error={errors.city?.message}>
            <Select disabled={loadingCity} id="city" {...register("city", { required: "This field is required" })}>
              <option value="">Select city</option>
              {cities?.map(city => <option value={city?._id} key={city?._id}>{city?.name}</option>)}
            </Select>
          </FormRow>
        )}

        <FormRow>
          <Button variation="secondary" type="reset">
            Cancel
          </Button>
          <Button variation='basic' type='submit' disabled={loading}>
            {loading ? <SpinnerMini /> : 'Create new Admin'}
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default SignupForm;
