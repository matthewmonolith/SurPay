"use client";

import { useState } from "react";
import {
  Center,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormHelperText,
  FormErrorMessage,
  CloseButton
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { usePostSurveyMutation } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { updateSurveyForm } from "../../store";
import { validateEmails } from "./validateEmails";

const Form1 = ({
  surveyTitle,
  surveySubject,
  surveyRecipients,
  surveyBody,
  errors,
}) => {
  const dispatch = useDispatch();

  const handleSurveyFormChange = (event) => {
    const { value, id } = event.target;
    dispatch(updateSurveyForm({ value, id }));
  };

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        New Survey
      </Heading>
      <Flex>
        <FormControl mr="5%" isInvalid={errors.surveyTitle}>
          <FormLabel htmlFor="surveyTitle" fontWeight={"normal"}>
            Survey Title
          </FormLabel>
          <Input
            id="surveyTitle"
            placeholder="Title"
            onChange={handleSurveyFormChange}
            value={surveyTitle}
          />
        </FormControl>

        <FormControl isInvalid={errors.surveySubject}>
          <FormLabel htmlFor="surveySubject" fontWeight={"normal"}>
            Email Subject
          </FormLabel>
          <Input
            id="surveySubject"
            placeholder="Subject"
            onChange={handleSurveyFormChange}
            value={surveySubject}
          />
        </FormControl>
      </Flex>
      <FormControl mt="3%" mb="3%" isInvalid={errors.surveyRecipients}>
        <FormLabel htmlFor="surveyRecipients" fontWeight={"normal"}>
          Recipients
        </FormLabel>
        <Input
          id="surveyRecipients"
          placeholder="you@example.com"
          onChange={handleSurveyFormChange}
          value={surveyRecipients}
        />
        {!errors.surveyRecipients ? (
          <FormHelperText>
            Please separate each email with a comma.
          </FormHelperText>
        ) : (
          <FormErrorMessage>{errors.surveyRecipients}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl id="surveyBody" mt={1} isInvalid={errors.surveyBody}>
        <FormLabel
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
        >
          Body
        </FormLabel>
        <Textarea
          placeholder="Do you like the new theme for our website?"
          rows={3}
          shadow="sm"
          focusBorderColor="brand.400"
          fontSize={{
            sm: "sm",
          }}
          onChange={handleSurveyFormChange}
          value={surveyBody}
        />
        <FormHelperText>Enter your survey questions in here.</FormHelperText>
      </FormControl>
    </>
  );
};

const Form2 = ({
  surveyTitle,
  surveySubject,
  surveyRecipients,
  surveyBody,
}) => {
  return (
    <>
      <Heading w="100%" textAlign="center" fontWeight="normal" mb="2%">
        Submit your survey?
      </Heading>

      <Flex>
        <FormControl mr="5%">
          <FormLabel fontWeight="normal">Survey Title</FormLabel>
          <Input isReadOnly value={surveyTitle} />
        </FormControl>

        <FormControl>
          <FormLabel fontWeight="normal">Email Subject</FormLabel>
          <Input isReadOnly value={surveySubject} />
        </FormControl>
      </Flex>

      <FormControl mt="3%" mb="3%">
        <FormLabel fontWeight="normal">Recipients</FormLabel>
        <Input isReadOnly value={surveyRecipients} />
      </FormControl>

      <FormControl mt={1}>
        <FormLabel
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{ color: "gray.50" }}
        >
          Body
        </FormLabel>
        <Textarea
          isReadOnly
          value={surveyBody}
          rows={3}
          shadow="sm"
          focusBorderColor="brand.400"
          fontSize={{ sm: "sm" }}
        />
      </FormControl>
    </>
  );
};

export default function SurveyNew({handleClose}) {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  const toast = useToast();
  const { surveyTitle, surveySubject, surveyRecipients, surveyBody } =
    useSelector((state) => state.survey.surveyForm);

  const [triggerPostSurvey] = usePostSurveyMutation();

  const handleClick = () => {
    // Calculate errors locally
    const errs = {};
    if (!surveyTitle || surveyTitle.length < 2) {
      errs.surveyTitle = "Required";
    }
    if (!surveySubject || surveySubject.length < 2) {
      errs.surveySubject = "Required";
    }
    if (!surveyRecipients) {
      errs.surveyRecipients = "At least one recipient required";
    } else if (typeof validateEmails(surveyRecipients) === "object") {
      errs.surveyRecipients = `Invalid email format, invalid email(s): ${validateEmails(
        surveyRecipients
      )}`;
    }
    if (!surveyBody || surveyBody.length < 5) {
      errs.surveyBody = "Required";
    }

    // Update the errors state
    setErrors(errs);

    // Check for errors and move to the next step if no errors
    if (!Object.values(errs).some((err) => !!err)) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await triggerPostSurvey({
        surveyTitle,
        surveySubject,
        surveyRecipients,
        surveyBody,
      }).unwrap();
      if (res) {
        console.log("successfully posted a survey!", res);
        toast({
          title: "Survey Posted",
          description:
            "Survey has successfully be posted and sent out to your recipients!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        handleClose()
      }
    } catch (error) {
      console.error("failed to post survey!", error);
    }
  };

  const checkStep = (step) => {
    if (step === 1) {
      return (
        <Form1
          surveyTitle={surveyTitle}
          surveySubject={surveySubject}
          surveyRecipients={surveyRecipients}
          surveyBody={surveyBody}
          errors={errors}
          handleClose={handleClose}
        />
      );
    } else {
      return (
        <Form2
          surveyTitle={surveyTitle}
          surveySubject={surveySubject}
          surveyRecipients={surveyRecipients}
          surveyBody={surveyBody}
        />
      );
    }
  };

  return (
    <Center>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        p={6}
        m="10px auto"
        as="form"
        minW="750px"
        maxWidth="800px"
        background="white"
         position="relative"
      >
          <CloseButton
        position="absolute"
        top="10px"
        right="10px"
        onClick={handleClose} // Add your function to handle the close action
      />
        {checkStep(step)}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                }}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 2}
                onClick={handleClick}
                colorScheme="teal"
                variant="outline"
              >
                Next
              </Button>
            </Flex>
            {step === 2 ? (
              <Button
                w="7rem"
                colorScheme="purple"
                variant="solid"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </Center>
  );
}
