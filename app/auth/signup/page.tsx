"use client";

import { Localities } from "@/libraries/api/AdministrativeAreaAPI";
import React, { useState } from "react";
import useSWR from "swr";
import {
  TextInput,
  PasswordInput,
  Select,
  Button,
  Stack,
  Grid,
  Group,
  Fieldset,
  Divider,
  ActionIcon,
} from "@mantine/core";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

type Props = {};

const SignupPage = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const { data: regionData, error: regionFetchError } = useSWR("Regions", () =>
    Localities.getAllRegions(),
  );

  const regionOptions =
    regionData?.map((i) => ({
      value: i.psgcCode,
      label: i.name,
    })) ?? [];

  const suffixOptions = ["N/a", "Jr.", "Sr.", "I", "II", "III", "IV", "V"];

  return (
    <form action="submit">
      <Fieldset legend="User Account">
        <Grid gutter="md">
          {/* Left Panel */}
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Stack gap="sm">
              <TextInput
                label="Email"
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                required
              />

              <Grid gutter="sm">
                <Grid.Col span={{ base: 12, lg: 6 }}>
                  <PasswordInput
                    label="Password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    visible={showPassword}
                    onVisibilityChange={() => setShowPassword((prev) => !prev)}
                    required
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                  <PasswordInput
                    label="Confirm Password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Password"
                    visible={showPassword}
                    onVisibilityChange={() => setShowPassword((prev) => !prev)}
                    required
                  />
                </Grid.Col>
              </Grid>

              <TextInput
                label="First Name"
                id="FirstName"
                name="FirstName"
                placeholder="Juan"
                required
              />

              <TextInput
                label="Middle Name"
                id="MiddleName"
                name="MiddleName"
                placeholder="Garcia"
              />

              <Grid gutter="sm">
                <Grid.Col span={{ base: 12, lg: 8 }}>
                  <TextInput
                    label="Last Name"
                    id="LastName"
                    name="LastName"
                    placeholder="Dela Cruz"
                    required
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 4 }}>
                  <Select
                    label="Suffix"
                    id="SelectSuffix"
                    name="SelectSuffix"
                    data={suffixOptions}
                    defaultValue="N/a"
                  />
                </Grid.Col>
              </Grid>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, lg: 1 }} visibleFrom="lg">
            <Divider orientation="vertical" h="100%" />
          </Grid.Col>
          <Grid.Col span={12} hiddenFrom="lg">
            <Divider my="md" />
          </Grid.Col>

          {/* Right Panel - Regions */}
          <Grid.Col span={{ base: 12, lg: 5 }}>
            <Stack gap="sm">
              <Select
                label="Regions"
                id="Regions"
                name="Regions"
                data={regionOptions}
                placeholder="Select Region"
                searchable
                nothingFoundMessage="No regions found"
              />

              <Select
                label="Province"
                id="Province"
                name="Province"
                data={regionOptions}
                placeholder="Select Province"
                searchable
                nothingFoundMessage="No provinces found"
              />

              <Select
                label="City / Municipality"
                id="City_Municipality"
                name="City_Municipality"
                data={regionOptions}
                placeholder="Select City/Municipality"
                searchable
                nothingFoundMessage="No cities found"
              />

              <Select
                label="Barangay"
                id="Barangay"
                name="Barangay"
                data={regionOptions}
                placeholder="Select Barangay"
                searchable
                nothingFoundMessage="No barangays found"
              />
            </Stack>
          </Grid.Col>
        </Grid>
      </Fieldset>

      <Group justify="flex-end" mt="md">
        <Button type="submit" size="md" w={{ base: "100%", sm: "40%" }}>
          Register
        </Button>
      </Group>
    </form>
  );
};

export default SignupPage;
