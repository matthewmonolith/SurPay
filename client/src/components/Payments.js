import StripeCheckout from "react-stripe-checkout";
import { useHandleTokenMutation } from "../store";
import { Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const Payments = () => {
  const [triggerHandleToken] = useHandleTokenMutation();

  const handleSubmit = async (token) => {
    try {
      const res = await triggerHandleToken(token).unwrap();
      if (res) {
        console.log("successfully added credits to account!", res);
      }
    } catch (error) {
      console.error("failed to add credits", error);
    }
  };

  return (
    <StripeCheckout
      name="SURPAY"
      description="£5 for 5 survey credits"
      amount={500} //defaulting to dollars for now, in cents
      token={(token) => handleSubmit(token)} //token back from stripe - callback called after receiving auth token from stripe API
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
      currency="GBP"
    >
      <Button
        variant={"solid"}
        colorScheme={"purple"}
        size={"sm"}
        mr={4}
        leftIcon={<AddIcon />}
      >
        Add Credits
      </Button>
    </StripeCheckout>
  );
};

export default Payments;
