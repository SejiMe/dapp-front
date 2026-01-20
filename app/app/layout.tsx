"use client";
import React from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  AppShell,
  Burger,
  Group,
  NavLink,
  Image,
  Text,
  ActionIcon,
  Box,
  useComputedColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggleActionIcon } from "@/components/app/ThemeToggleActionIcon";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();
  const router = useRouter();
  const theme = useMantineTheme();
  // Avoid SSR/CSR mismatch when user has a persisted scheme in localStorage.
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const isDark = computedColorScheme === "dark";

  const navItems = [
    { href: "/app/home", label: "Home", icon: "🏠" },
    { href: "/app/prediction", label: "Prediction", icon: "📊" },
  ];

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{
        width: 220,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      {/* Header */}
      <AppShell.Header
        style={{
          backgroundColor: isDark ? theme.colors.dark[7] : theme.white,
          borderBottom: `1px solid ${
            isDark ? theme.colors.dark[4] : theme.colors.gray[2]
          }`,
        }}
      >
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Image
              src="/logo/mosquito.svg"
              alt="Dengue App Logo"
              h={50}
              w="auto"
              fit="contain"
            />
            <Text size="xl" fw={700} c={isDark ? "gray.0" : "dark"}>
              D-APP
            </Text>
          </Group>

          <Group gap="xs">
            <ThemeToggleActionIcon />
            <ActionIcon
              variant="subtle"
              size="lg"
              onClick={() => router.push("/app/calendar")}
              aria-label="Calendar"
            >
              <span className="material-symbols-outlined">calendar_month</span>
            </ActionIcon>
            {/* <ActionIcon variant="subtle" size="lg" aria-label="Notifications">
              <span className="material-symbols-outlined">notifications</span>
            </ActionIcon>
            <ActionIcon variant="subtle" size="lg" aria-label="Account">
              <span className="material-symbols-outlined">account_circle</span>
            </ActionIcon> */}
          </Group>
        </Group>
      </AppShell.Header>

      {/* Navbar / Sidebar */}
      <AppShell.Navbar
        p="md"
        style={{
          backgroundColor: isDark ? theme.colors.dark[8] : theme.white,
          borderRight: `1px solid ${
            isDark ? theme.colors.dark[4] : theme.colors.gray[2]
          }`,
        }}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            leftSection={<span>{item.icon}</span>}
            active={pathname.startsWith(item.href)}
            onClick={(e) => {
              e.preventDefault();
              router.push(item.href);
              if (opened) toggle();
            }}
            mb="xs"
          />
        ))}
      </AppShell.Navbar>

      {/* Main Content */}
      <AppShell.Main>
        <Box mih="100%" bg={isDark ? "dark.9" : "gray.0"}>
          {children}
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
