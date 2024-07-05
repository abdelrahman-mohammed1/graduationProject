
import { useForm } from "react-hook-form";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Form from "../ui/Form";
import FormRow from '../ui/FormRow';
import Input from "../ui/Input";
import Button from "../ui/Button";
import SpinnerMini from '../ui/SpinnerMini';
import { useState } from "react";
import { Slide, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useData } from "../context/useDate";

// Function to make API call
const addGovernorate = async (name, token) => {
    const response = await fetch('https://we-care-server-seven.vercel.app/api/v1/governorates/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name })
    });

    if (!response.ok) {
        throw new Error(`Failed to submit form: ${response.statusText}`);
    }

    return response.json();
};

function AddGovernorate() {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm();
    const { token } = useData();

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            await addGovernorate(data.name, token);
            setIsLoading(false);
            reset(); // Reset form fields after successful submission
            toast.success('Governorate added successfully!', {
                transition: Slide,
                autoClose: 2000,
                delay: 1000,
                pauseOnHover: false
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            setIsLoading(false);
            toast.error('An error occurred while submitting the form. Please try again later.', {
                transition: Slide,
                autoClose: 2000,
                delay: 1000,
                pauseOnHover: false
            });
        }
    };

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Add Governorate</Heading>
            </Row>
            <Row>
                <Form onSubmit={handleSubmit(onSubmit)} control={control} action="" method="post">
                    <FormRow label="Governorate Name" error={errors.name?.message}>
                        <Input kind="form" type="text" id="name" {...register("name", { required: "This field is required" })} />
                    </FormRow>
                    <FormRow>
                        <Button variation="secondary" type="reset" disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button variation='basic' type="submit" disabled={isLoading}>
                            {isLoading ? <SpinnerMini /> : 'Add new governorate'}
                        </Button>
                    </FormRow>
                </Form>
            </Row>
        </>
    );
}

export default AddGovernorate;
