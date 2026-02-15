"use client";

import React, { useEffect, useState } from "react";
import { Tabs, Card, Button, Text, Group, TextInput, Stack, useMantineTheme } from "@mantine/core";
import TrainingAPI from "@/libraries/api/TrainingAPI";
import AdminDengueAPI from "@/libraries/api/AdminDengueAPI";
import WeatherSummaryAPI from "@/libraries/api/WeatherSummaryAPI";
import { showNotification } from "@mantine/notifications";
import AuthAPI, { getStoredUser, decodeJwt, storeUser } from "@/libraries/api/Auth";
import { useRouter } from "next/dist/client/components/navigation";


export default function AdminPage() {
  const router = useRouter();
  const theme = useMantineTheme();


  const [modelInfo, setModelInfo] = useState<any>(null);
  const [psgc, setPsgc] = useState("");
  const [date, setDate] = useState("");
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    TrainingAPI.getAdvanceModelInfo()
      .then((d) => setModelInfo(d))
      .catch(() => {});
  }, []);

   useEffect(() => {

      
      const checkAuthentication = () => {
        
          // Use the utility function from Auth.ts to get stored user
          const userData = getStoredUser();
          console.info("Stored user data:", userData);
          
          if (!userData) {
                router.push("/auth/signin");
            return;
          }
      }
      
      checkAuthentication();
    }, [router]);


  const appendLog = (text: string) => setLogs((s) => [text, ...s]);

  // Ensure access token is refreshed using backend refresh endpoint (backend sets refresh token cookie)
  const ensureFreshAccess = async () => {
    try {
      const stored = getStoredUser();
      if (!stored) return;
      // Call refresh - backend reads refresh token cookie and returns new access token
      const res: any = await AuthAPI.refresh({ refreshToken: "" }).catch(() => null);
      if (res && res.success && res.accessToken) {
        // Persist updated token
        storeUser({ ...(stored || {}), accessToken: res.accessToken });
      }
    } catch (e) {
      // ignore
    }
  };

  const handleTrainBasic = async () => {
    appendLog("Starting basic training...");
    await ensureFreshAccess();
    try {
      await TrainingAPI.trainBasicModel();
      appendLog("Basic training started");
      showNotification({ title: "Training", message: "Basic training started" });
    } catch (e) {
      appendLog("Basic training failed");
      showNotification({ title: "Error", message: "Basic training failed" });
    }
  };

  const handleTrainAdvance = async () => {
    appendLog("Starting advanced training...");
    await ensureFreshAccess();
    try {
      await TrainingAPI.trainAdvanceModel();
      appendLog("Advanced training started");
      showNotification({ title: "Training", message: "Advanced training started" });
    } catch (e) {
      appendLog("Advanced training failed");
      showNotification({ title: "Error", message: "Advanced training failed" });
    }
  };

  const handlePredict = async () => {
    appendLog(`Triggering prediction for ${psgc} ${date}`);
    await ensureFreshAccess();
    try {
      const res = await AdminDengueAPI.manualAdvancePrediction(psgc, date);
      appendLog("Prediction request submitted");
      showNotification({ title: "Prediction", message: "Prediction requested" });
      appendLog(JSON.stringify(res));
    } catch (e) {
      appendLog("Prediction request failed");
      showNotification({ title: "Error", message: "Prediction failed" });
    }
  };

  const handleCreateBulk = async () => {
    appendLog("Creating CSV for bulk prediction...");
    await ensureFreshAccess();
    try {
      await AdminDengueAPI.createBulkCsvForPrediction({});
      appendLog("Create-bulk triggered");
      showNotification({ title: "Bulk", message: "Create bulk triggered" });
    } catch (e) {
      appendLog("Create-bulk failed");
      showNotification({ title: "Error", message: "Create bulk failed" });
    }
  };

  const handleYearlyLagged = async () => {
    appendLog("Triggering yearly-lagged advance...");
    await ensureFreshAccess();
    try {
      await AdminDengueAPI.createYearlyLaggedAdvance({});
      appendLog("Yearly-lagged triggered");
      showNotification({ title: "Yearly", message: "Yearly-lagged triggered" });
    } catch (e) {
      appendLog("Yearly-lagged failed");
      showNotification({ title: "Error", message: "Yearly-lagged failed" });
    }
  };

  const handleTestDateExtraction = async () => {
    appendLog("Running date extraction test...");
    try {
      const r = await AdminDengueAPI.testDateExtraction();
      appendLog("Test result: " + JSON.stringify(r));
      showNotification({ title: "Test", message: "Date extraction completed" });
    } catch (e) {
      appendLog("Test failed");
      showNotification({ title: "Error", message: "Test failed" });
    }
  };

  const fetchWeather = async () => {
    try {
      const current = await WeatherSummaryAPI.getCurrentWeek();
      appendLog("Weather current-week: " + JSON.stringify(current));
      const lagged = await WeatherSummaryAPI.getLagged2Week();
      appendLog("Weather lagged-2week: " + JSON.stringify(lagged));
    } catch (e) {
      appendLog("Weather fetch failed");
    }
  };

  return (
    <Card shadow="sm" padding="md">
      <Text size="xl" fw={700} style={{ marginBottom: theme.spacing.md }}>
        Admin
      </Text>

      <Tabs defaultValue="model">
        <Tabs.List>
          <Tabs.Tab value="model">Model</Tabs.Tab>
          <Tabs.Tab value="predictions">Predictions</Tabs.Tab>
          <Tabs.Tab value="weather">Weather</Tabs.Tab>
          <Tabs.Tab value="utilities">Utilities</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="model" style={{ paddingTop: theme.spacing.xs }}>
          <Stack gap="sm">
            <Text fw={600}>Model Info</Text>
            <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(modelInfo, null, 2)}</pre>
            <Group>
              <Button onClick={handleTrainBasic}>Train Basic</Button>
              <Button onClick={handleTrainAdvance}>Train Advanced</Button>
            </Group>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="predictions" style={{ paddingTop: theme.spacing.xs }}>
          <Stack gap="sm">
            <Text fw={600}>Manual Predictions</Text>
            <TextInput label="PSGC Code" value={psgc} onChange={(e) => setPsgc(e.target.value)} />
            <TextInput label="Date (yyyy-MM-dd)" value={date} onChange={(e) => setDate(e.target.value)} />
            <Group>
              <Button onClick={handlePredict}>Run Prediction</Button>
              <Button onClick={handleCreateBulk}>Create Bulk CSV</Button>
              <Button onClick={handleYearlyLagged}>Yearly Lagged</Button>
            </Group>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="weather" style={{ paddingTop: theme.spacing.xs }}>
          <Stack gap="sm">
            <Text fw={600}>Weather Summaries</Text>
            <Button onClick={fetchWeather}>Fetch Weather Summaries</Button>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="utilities" style={{ paddingTop: theme.spacing.xs }}>
          <Stack gap="sm">
            <Text fw={600}>Utilities</Text>
            <Button onClick={handleTestDateExtraction}>Test Date Extraction</Button>
          </Stack>
        </Tabs.Panel>
      </Tabs>

      <Text fw={600} style={{ marginTop: theme.spacing.md }}>
        Logs
      </Text>
      <div style={{ maxHeight: 240, overflow: "auto" }}>
        {logs.map((l, i) => (
          <pre key={i} style={{ margin: 0 }}>
            {l}
          </pre>
        ))}
      </div>
    </Card>
  );
}
