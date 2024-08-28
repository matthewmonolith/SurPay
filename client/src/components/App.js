import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";
import SurveyNew from "../components/surveys/SurveyNew"
import { Spinner, Center } from "@chakra-ui/react";
import { useFetchUserQuery } from "../store";

// const Landing = () => <h2>Landing</h2>;

const App = () => {
  const { data, isFetching } = useFetchUserQuery();

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
