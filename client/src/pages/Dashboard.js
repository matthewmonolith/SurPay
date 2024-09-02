import {
  Box,
  Center,
  Spinner,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  StackDivider,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import SurveyNew from "../components/surveys/SurveyNew";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFetchSurveysQuery } from "../store";
import { useDeleteSurveyMutation } from "../store";

const Dashboard = () => {
  const { userData } = useOutletContext();
  const navigate = useNavigate();
  const { data, error, isFetching } = useFetchSurveysQuery();
  const [triggerDelete] = useDeleteSurveyMutation()
  const [sort, setSort] = useState("desc");
  const [sortedData, setSortedData] = useState([]);
  console.log(data);
  

  useEffect(() => {
    if (!userData) {
      navigate("/");
    }
  }, [userData, navigate]);

  useEffect(() => {
    if (Array.isArray(data)) {
      if (sort === "desc") {
        setSortedData([...data].reverse());
      }else {
        setSortedData([...data]);
      }
    }
  }, [sort, data]);

  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {
    setShowModal(!showModal);
  };

  const handleDelete = async (id) => {
    try {
     await triggerDelete(id).unwrap()
     console.log('successfully deleted');
    } catch (error) {
      console.error('failed to delete', error)
    }
  }

  return (
    <>
      {error && (
        <Card>
          <CardBody>
            <Text>
              There was an error getting your surveys, please try again!
            </Text>
          </CardBody>
        </Card>
      )}

      {userData && !error && (
        <Box
          position="fixed"
          bottom="4"
          right="4"
          bg="#805AD5"
          width="50px"
          height="50px"
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="md"
          cursor="pointer"
          onClick={handleClick}
        >
          <AddIcon color="white" />
        </Box>
      )}

      {isFetching && (
        <Center>
          <Spinner
            margin={20}
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="purple.400"
            size="xl"
          />
        </Center>
      )}

      {data && (
        <>
          <Flex m="4" gap="4" justifyContent="center">
            <Button
              bg="#805AD5"
              color="white"
              onClick={() => setSort("desc")}
            >
              Newest
            </Button>
            <Button
              bg="#805AD5"
              color="white"
              onClick={() => setSort("asc")}
            >
              Oldest
            </Button>
          </Flex>
          <Flex
            mt="4"
            wrap="wrap"
            justify="flex-start"
            width="100%"
            px="5"
            gap="5"
          >
            {sortedData.map((survey) => (
              <Card
                key={survey._id}
                width="500px"
                minWidth="300px"
                _hover={{
                  bg: "purple.100",
                  show: true,
                }}
              >
                <CardHeader>
                  <Heading size="md" color="#805AD5">
                    {survey.title}
                  </Heading>
                  Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                </CardHeader>

                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    <Box>
                      <Heading
                        size="xs"
                        textTransform="uppercase"
                        color="#805AD5"
                      >
                        Question
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {survey.body}
                      </Text>
                    </Box>
                    <Box>
                      <Heading
                        size="xs"
                        textTransform="uppercase"
                        color="#805AD5"
                      >
                        Analysis
                      </Heading>
                      <Stack>
                        <Text pt="2" fontSize="sm">
                          Yes: {survey.yes}
                        </Text>
                        <Text fontSize="sm">No: {survey.no}</Text>
                        {/* <Text fontSize="sm">Responses: {survey.recipients.}</Text> */}
                      </Stack>
                    </Box>
                  </Stack>
                </CardBody>
                <DeleteIcon color="gray" mb="3" ms="4" cursor="pointer" onClick={() => handleDelete(survey._id)}/>
              </Card>
            ))}
          </Flex>
        </>
      )}

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <SurveyNew handleClose={handleClick} />
        </div>
      )}
    </>
  );
};

export default Dashboard;
