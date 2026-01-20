"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Anchor,
  Button,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";

type Props = {};

const LoginPage = (props: Props) => {
  const router = useRouter();

  const HandleTemp = () => {
    router.push("/app/");
  };

  return (
    <form action="submit">
      <Stack gap="sm">
        <TextInput
          type="email"
          id="email"
          name="email"
          label="Email"
          placeholder="Email"
          required
        />

        <PasswordInput
          id="password"
          name="password"
          label="Password"
          placeholder="Password"
          required
        />

        <Group justify="space-between" wrap="wrap">
          <Anchor component={Link} href="#" underline="hover" size="sm">
            Forgot password?
          </Anchor>

          <Text size="sm" c="dimmed">
            No account?{" "}
            <Anchor component={Link} href="/auth/signup" underline="hover">
              Sign up
            </Anchor>
          </Text>
        </Group>

        <Button type="button" onClick={HandleTemp} mt="xs">
          Login
        </Button>
      </Stack>
    </form>
  );
};

export default LoginPage;
