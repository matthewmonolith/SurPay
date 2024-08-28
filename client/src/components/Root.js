import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Container } from "@chakra-ui/react";

const Root = ({userData}) => {
  
  
  return (
    <div>
      <Header userData={userData}/>
      <Container>
        <Outlet  context={{userData}}/>
      </Container>
    </div>
  );
};

export default Root;
