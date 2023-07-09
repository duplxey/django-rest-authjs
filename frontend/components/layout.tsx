import React from "react";
import NextLink from "next/link";
import {Container, Heading, Link} from "@chakra-ui/react";

export default function Layout({children}: { children: React.ReactNode }) {
  return (
    <>
      <main>
        <Container maxW="container.lg">
          <Heading my="4">
            <Link as={NextLink} href="https://github.com/duplxey/django-rest-nextauth">django-rest-nextauth</Link>
          </Heading>
          {children}
        </Container>
      </main>
    </>
  );
}