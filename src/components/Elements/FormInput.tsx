import { Grid, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

type FormInputProps = {
  name: string;
  label: string;
  required: boolean;
  control: Control<any, any>;
};
export default function FormInput(props: FormInputProps) {
  const { name, label, required, control } = props;
  return (
    <Grid item xs={12} sm={6}>
      <Controller
        name={name}
        defaultValue=""
        rules={{ required }}
        render={({ field }) => (
          <TextField {...field} variant="standard" fullWidth label={label} required={required} />
        )}
        control={control}
      />
    </Grid>
  );
}
