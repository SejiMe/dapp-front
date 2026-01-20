"use client";
import React, { forwardRef } from "react";
import { Box, Container, Title, Text, Stack, Grid } from "@mantine/core";

const AboutUs = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <Box
      id="about-us"
      ref={ref}
      component="section"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container size="xl" py="xl">
        <Grid gutter="xl" align="center">
          <Grid.Col span={{ base: 12, lg: 8 }}>
            <Stack gap="lg">
              <Title order={2} size="3.5rem">
                About Us
              </Title>
              <Text size="lg" lh={1.7} c="dimmed">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Perferendis sed assumenda excepturi dignissimos officiis.
                Facilis recusandae eum sapiente, quasi nesciunt dolores
                expedita, natus unde laborum in fugiat quo, veritatis qui.
              </Text>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, lg: 4 }} visibleFrom="lg">
            <Box
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "33%",
                height: "100%",
                backgroundImage: "url('/blob.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex: -1,
              }}
            />
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
});

AboutUs.displayName = "AboutUs";

export default AboutUs;
