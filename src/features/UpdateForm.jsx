

import { useEffect, useState } from 'react';
import Form from '../ui/Form';
import FormRow from '../ui/FormRow';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useForm } from 'react-hook-form';
import { Slide, toast } from 'react-toastify';
import SpinnerMini from '../ui/SpinnerMini';

// function UpdateForm({ nurse, setUpdateForm }) {
//     console.log('Nurse data:', nurse?._id);
//     const [loading, setLoading] = useState(false);
//     const { register, handleSubmit } = useForm();

//     const onSubmit = async (data) => {
//         try {
//             setLoading(true);
//             const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjY3Njk5NjE0NGMzMzJiM2EwZDM1MWEiLCJpYXQiOjE3MTgxNTU3NDUsImV4cCI6MTcyMDc0Nzc0NX0.EmkoBLjkfI4QexdX3TC95mqlMcLxjhJ7KnI76PakkXs";

//             // Logging the data being sent to the server
//             console.log('Submitting form with data:', data);

//             const requestBody = {
//                 name: data.name,
//                 // governorate: nurse.governorate._id, // Use governorate ID instead of an object
//                 governorate: data.governorate,
//                 yearsOfExperience: data.experience,
//                 specialization: data.major
//             };

//             // Logging the request body
//             console.log('Request body:', requestBody);

//             const response = await fetch(`https://we-care-server-seven.vercel.app/api/v1/nurses/${nurse?._id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify(requestBody)
//             });

//             // Logging the response status
//             console.log('Response status:', response.status);
//             console.log('Response statusText:', response.statusText);

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 console.error('Error response data:', errorData);
//                 throw new Error(`Failed to submit form: ${response.statusText}`);
//             }

//             const responseData = await response.json();
//             console.log('Response data:', responseData);

//             toast.success('Nurse Update successfully!', {
//                 transition: Slide,
//                 autoClose: 2000,
//                 delay: 1000,
//                 pauseOnHover: false
//             });
//             setUpdateForm(false)
//         } catch (error) {
//             console.error('Error submitting form:', error);
//             toast.error('An error occurred while submitting the form. Please try again later.', {
//                 transition: Slide,
//                 autoClose: 2000,
//                 delay: 1000,
//                 pauseOnHover: false
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Form onSubmit={handleSubmit(onSubmit)}>
//             <FormRow label='Name'>
//                 <Input type='text' id='name' {...register("name")} defaultValue={nurse.name} />
//             </FormRow>
//             <FormRow label='Major'>
//                 <Input type='text' id='major' {...register("major")} defaultValue={nurse.specialization} />
//             </FormRow>
//             <FormRow label='Experience Years'>
//                 <Input type='number' id='experience' {...register("experience")} defaultValue={nurse.yearsOfExperience} />
//             </FormRow>
//             <FormRow label='Email'>
//                 <Input type='email' disabled={true} id='email' {...register("email")} defaultValue={nurse.email} />
//             </FormRow>
//             <FormRow label='Governorate'>
//                 <Input type='text' id='governorate' {...register("governorate")} defaultValue={nurse.governorate.name} />
//             </FormRow>
//             <FormRow>
//                 <Button variation="secondary" type="reset">
//                     Cancel
//                 </Button>
//                 <Button type='submit'>
//                     {loading ? <SpinnerMini /> : "Edit nurse"}
//                 </Button>
//             </FormRow>
//         </Form>
//     );
// }

// export default UpdateForm;  


function UpdateForm({ nurse, setUpdateForm }) {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        if (nurse) {
            setValue("name", nurse.name);
            setValue("major", nurse.specialization);
            setValue("experience", nurse.yearsOfExperience);
            setValue("email", nurse.email);
            setValue("governorate", nurse.governorate.name || ''); // Ensure governorate ID is set
        }
    }, [nurse, setValue]);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjY3Njk5NjE0NGMzMzJiM2EwZDM1MWEiLCJpYXQiOjE3MTgxNTU3NDUsImV4cCI6MTcyMDc0Nzc0NX0.EmkoBLjkfI4QexdX3TC95mqlMcLxjhJ7KnI76PakkXs"; // Ensure your token is correctly set and valid

            // Ensure governorate is not an empty string
            if (!data.governorate) {
                throw new Error('Governorate ID is required.');
            }

            // Create a payload object without the photo field
            const payload = {
                name: data.name,
                governorate: '66675da81688195ae74e914e', // Sending ID instead of name
                yearsOfExperience: data.experience,
                specialization: data.major,
            };

            const response = await fetch(`https://we-care-server-seven.vercel.app/api/v1/nurses/${nurse?._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response data:', errorData);
                throw new Error(`Failed to submit form: ${errorData.message || response.statusText}`);
            }

            const responseData = await response.json();
            console.log('Response data:', responseData);

            toast.success('Nurse updated successfully!', {
                transition: Slide,
                autoClose: 2000,
                delay: 1000,
                pauseOnHover: false
            });
            setUpdateForm(false);
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error(`An error occurred: ${error.message}`, {
                transition: Slide,
                autoClose: 2000,
                delay: 1000,
                pauseOnHover: false
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label='Name'>
                <Input type='text' id='name' {...register("name")} />
            </FormRow>
            <FormRow label='Major'>
                <Input type='text' id='major' {...register("major")} />
            </FormRow>
            <FormRow label='Experience Years'>
                <Input type='number' id='experience' {...register("experience")} />
            </FormRow>
            <FormRow label='Email'>
                <Input type='email' disabled={true} id='email' {...register("email")} />
            </FormRow>
            <FormRow label='Governorate'>
                <Input type='text' id='governorate' {...register("governorate")} />
            </FormRow>
            <FormRow>
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button type='submit'>
                    {loading ? <SpinnerMini /> : "Edit nurse"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default UpdateForm;