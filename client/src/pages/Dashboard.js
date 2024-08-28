import { Box, Modal } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import SurveyNew from "../components/surveys/SurveyNew";
import { useState } from "react";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <Box
        position="fixed"
        bottom="4"
        right="4"
        bg="red"
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
          <SurveyNew handleClose={handleClick}/>
        </div>
      )}
    </>
  );
};

export default Dashboard;
