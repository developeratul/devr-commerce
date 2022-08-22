import * as Mui from "@mui/material";
import { ButtonProps } from "../../types";

const Button = (props: ButtonProps) => {
  const { children, ...restProps } = props;
  return (
    <Mui.Grid item xs={12} sm={6}>
      <Mui.FormControl margin="dense" fullWidth>
        <Mui.Button {...restProps}>{children}</Mui.Button>
      </Mui.FormControl>
    </Mui.Grid>
  );
};

export default Button;
