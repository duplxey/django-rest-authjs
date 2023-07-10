import {useRouter} from "next/router";
import {signIn, useSession} from "next-auth/react";
import {Box, Button, Spinner, Text, VStack} from "@chakra-ui/react";

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
    <Box m={8}>
      <VStack>
        <Text>You are not authenticated.</Text>
        <Button colorScheme="blue" onClick={() => signIn(undefined, {callbackUrl: "/profile"})}>
          Sign in
        </Button>
      </VStack>
    </Box>
  );
}
