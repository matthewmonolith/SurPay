"use client";
import { useLogoutUserMutation } from "../store";
import { useNavigate, Link } from "react-router-dom";
import Payments from "./Payments";
import surpayLogo from "../assets/surpay3.png";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Image,
} from "@chakra-ui/react";

import { CloseIcon, HamburgerIcon, UnlockIcon } from "@chakra-ui/icons";

// const Links = [];

// const NavLink = (props) => {
//   const { children } = props;
//   return (
//     <Box
//       as="a"
//       px={2}
//       py={1}
//       rounded={"md"}
//       _hover={{
//         textDecoration: "none",
//         bg: "gray.200",
//       }}
//       href={"#"}
//     >
//       {children}
//     </Box>
//   );
// };

const Header = ({ userData }) => {
  console.log(userData);

  const [triggerLogout] = useLogoutUserMutation();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await triggerLogout().unwrap();
      console.log("Successfully logged out!");
      navigate("/");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg="gray.50" px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Link to={"/"}>
                <Image
                  style={{ width: "130px", height: "58px" }}
                  src={surpayLogo}
                  objectFit="fill"
                />
              </Link>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {userData && (
                <Link to={"/surveys"}>
                  <Button
                    variant={"solid"}
                    colorScheme={"purple"}
                    size={"sm"}
                    mr={4}
                  >
                    My Surveys
                  </Button>
                </Link>
              )}
            </HStack>
          </HStack>
          <Flex alignItems={"center"} gap="6">
            {userData && (
              <>
                <Box>Credits: {userData.credits}</Box>
                <Payments />
                <Button
                  variant={"solid"}
                  colorScheme={"red"}
                  size={"sm"}
                  mr={4}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}

            {!userData && (
              <Button
                variant={"solid"}
                colorScheme={"purple"}
                size={"sm"}
                mr={4}
                leftIcon={<UnlockIcon />}
              >
                <a href="/auth/google">Login With Google</a>
              </Button>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {/* {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))} */}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Header;
