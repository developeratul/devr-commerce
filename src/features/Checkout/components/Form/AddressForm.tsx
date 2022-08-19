import { Box, Grid, styled, Typography } from "@mui/material";

const AddressFormContainer = styled(Box)({});
export default function AddressForm() {
  // const {
  //   handleSubmit,
  //   formState: { errors },
  //   control,
  // } = useForm<Inputs>();

  // const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <AddressFormContainer>
      <Typography gutterBottom>Shipping Address</Typography>
      <Grid spacing={3} container>
        {/* <FormInput name="firstName" label="First Name" required control={control} />
        <FormInput name="lastName" label="Last Name" required control={control} />
        <FormInput name="address" label="Address" required control={control} />
        <FormInput name="email" label="Email" required control={control} />
        <FormInput name="city" label="City" required control={control} /> */}
      </Grid>
    </AddressFormContainer>
  );
}
