import {useState} from "react";
import {signOut, useSession} from "next-auth/react";
import axios from "axios";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Code,
  Heading,
  Spinner,
  Text
} from "@chakra-ui/react";

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
      <Card>
        <CardHeader>
          <Heading size="md">User profile</Heading>
        </CardHeader>
        <CardBody py={0}>
          <Text>Username: {session.user.username}</Text>
          <Text>Email: {session.user.email ?? "Not specified"}</Text>
          <Text>PK: {session.user.pk}</Text>
          <Code>
            {response}
          </Code>
        </CardBody>
        <CardFooter>
          <ButtonGroup>
            <Button colorScheme="blue" onClick={() => getUserDetails(true)}>
              Make authenticated request
            </Button>
            <Button colorScheme="orange" onClick={() => getUserDetails(false)}>
              Make unauthenticated request
            </Button>
            <Button colorScheme="red" onClick={() => signOut({callbackUrl: "/"})}>
              Sign out
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    );
  }

  return <></>;
}
