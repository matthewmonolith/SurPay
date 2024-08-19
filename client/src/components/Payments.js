import StripeCheckout from "react-stripe-checkout";
import { Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const Payments = () => {
  return (
    <StripeCheckout
      name="SURPAY"
      description="$5 for 5 survey credits"
      amount={500} //defaulting to dollars for now, in cents
      token={(token) => console.log(token.id)} //token back from stripe - callback called after receiving auth token from stripe API
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
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
