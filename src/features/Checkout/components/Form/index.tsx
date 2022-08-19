import { Loader } from "@/components";
import { useCheckoutStateContext } from "@/features/Checkout";
import { Paper, Step, StepLabel, Stepper, styled } from "@mui/material";
import { useState } from "react";
import AddressForm from "./AddressForm";
import Confirmation from "./Confirmation";
import PaymentForm from "./PaymentForm";

const steps = [
  { label: "Shipping address", component: AddressForm },
  { label: "Payment details", component: PaymentForm },
  { label: "Confirmation", component: Confirmation },
];

const CheckoutFormContainer = styled(Paper)({
  width: "100%",
  maxWidth: 700,
  padding: 50,
});
const StyledStepper = styled(Stepper)({
  marginBottom: 30,
});

export default function CheckoutForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const { isLoading } = useCheckoutStateContext();
  const StepArea = steps[currentStep].component;

  const nextStep = () => {
    if (currentStep + 1 < steps.length) {
      setCurrentStep((pre) => (pre += 1));
    }
  };

  const prevStep = () => {
    if (currentStep - 1 >= 0) {
      setCurrentStep((pre) => (pre -= 1));
    }
  };

  if (isLoading) return <Loader />;

  return (
    <CheckoutFormContainer sx={{ boxShadow: 4 }}>
      <StyledStepper activeStep={currentStep}>
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </StyledStepper>
      <StepArea />
    </CheckoutFormContainer>
  );
}
