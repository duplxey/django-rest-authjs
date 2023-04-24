import {signIn, useSession} from "next-auth/react";
import React from "react";
import {Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Heading, Spinner, Text} from "@chakra-ui/react";
import {useRouter} from "next/router";

export default function Home() {

  const router = useRouter();
  const {data: session, status} = useSession();

  if (status == "loading") {
    return <Spinner size="lg"/>;
  }

  if (session) {
    router.push("profile");
    return;
  }

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Not authenticated</Heading>
      </CardHeader>
      <CardBody>
        <Text>You are not authenticated.</Text>
      </CardBody>
      <CardFooter verticalAlign="center">
        <ButtonGroup>
          <Button variant="solid" colorScheme="blue" onClick={() => signIn(undefined, {callbackUrl: "/profile"})}>
            Sign in
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
