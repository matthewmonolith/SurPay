import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Container } from "@chakra-ui/react";

const Root = () => {
  return (
    <div>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};

export default Root;
