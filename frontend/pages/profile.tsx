import {useState} from "react";
import {signOut, useSession} from "next-auth/react";
import {Box, Button, Code, HStack, Spinner, Text, VStack} from "@chakra-ui/react";
import axios from "axios";

export default function Home() {

  const {data: session, status} = useSession({required: true});
  const [response, setResponse] = useState("{}");

  const getUserDetails = async (useToken: boolean) => {
    try {
      const response = await axios({
        method: "get",
        url: process.env.NEXT_PUBLIC_BACKEND_URL + "auth/user/",
        headers: useToken ? {Authorization: "Bearer " + session?.access_token} : {},
      });
      setResponse(JSON.stringify(response.data));
    } catch (error) {
      setResponse(error.message);
    }
  };

  if (status == "loading") {
    return <Spinner size="lg"/>;
  }

  if (session) {
    return (
      <Box m={8}>
        <VStack>
          <Text>PK: {session.user.pk}</Text>
          <Text>Username: {session.user.username}</Text>
          <Text>Email: {session.user.email || "Not provided"}</Text>
          <Code>
            {response}
          </Code>
        </VStack>
        <HStack justifyContent="center" mt={4}>
          <Button colorScheme="blue" onClick={() => getUserDetails(true)}>
            User details (with token)
          </Button>
          <Button colorScheme="orange" onClick={() => getUserDetails(false)}>
            User details (without token)
          </Button>
          <Button colorScheme="red" onClick={() => signOut({callbackUrl: "/"})}>
            Sign out
          </Button>
        </HStack>
      </Box>
    );
  }

  return <></>;
}
