import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

function UpdateSettingsForm() {
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' value={2} />
      </FormRow>
      <FormRow label='Maximum hours/booking'>
        <Input type='number' id='max-nights' value={3} />
      </FormRow>
      {/* <FormRow label='Maximum user/booking'>
        <Input type='number' id='max-guests' />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' />
      </FormRow> */}
    </Form>
  );
}

export default UpdateSettingsForm;
