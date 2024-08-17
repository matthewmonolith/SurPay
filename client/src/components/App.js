import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../pages/Root";
import { Spinner, Center } from "@chakra-ui/react";
import { useFetchUserQuery } from "../store";

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

const App = () => {
  const { data, error, isFetching } = useFetchUserQuery();

  console.log(data);

  if (isFetching)
    return (
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
    );

  // if (error) {
  //   console.log(error);

  //   return <Center>Oops! There was an error, please try again.</Center>;
  // }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root userData={data} />,
      children: [
        { path: "/", element: <Landing /> },
        { path: "/surveys", element: <Dashboard /> },
        { path: "/surveys/new", element: <SurveyNew /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
