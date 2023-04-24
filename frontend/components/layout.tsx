import Head from "next/head";
import React from "react";
import {Container, Heading, Link} from "@chakra-ui/react";
import NextLink from "next/link";

export default function Layout({children}: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>django-drf-nextauth</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main>
        <Container maxW="container.lg">
          <Heading as="h1" my="4">
            <Link as={NextLink} href="https://github.com/duplxey/django-drf-nextauth">django-drf-nextauth</Link>
          </Heading>
          {children}
        </Container>
      </main>
    </>
  );
}