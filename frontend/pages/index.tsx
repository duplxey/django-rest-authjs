import {useRouter} from "next/router";
import {signIn, useSession} from "next-auth/react";
import {Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Heading, Spinner, Text} from "@chakra-ui/react";

export default function Home() {

  const router = useRouter();
  const {data: session, status} = useSession();

  if (status == "loading") {
    return <Spinner size="lg"/>;
  }

  // If the user is authenticated redirect to `/profile`
  if (session) {
    router.push("profile");
    return;
  }

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Not authenticated</Heading>
      </CardHeader>
      <CardBody py={0}>
        <Text>You are not authenticated.</Text>
      </CardBody>
      <CardFooter>
        <ButtonGroup>
          <Button colorScheme="blue" onClick={() => signIn(undefined, {callbackUrl: "/profile"})}>
            Sign in
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
