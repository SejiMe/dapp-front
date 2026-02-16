"use client";

import React, { useEffect, useState } from "react";
import { Tabs, Card, Button, Text, Group, TextInput, Stack, useMantineTheme, Select, Alert, Divider } from "@mantine/core";
import TrainingAPI from "@/libraries/api/TrainingAPI";
import AdminDengueAPI from "@/libraries/api/AdminDengueAPI";
import WeatherSummaryAPI from "@/libraries/api/WeatherSummaryAPI";
import { Localities } from "@/libraries/api/AdministrativeAreaAPI";
import { WeatherPoolingData } from "@/libraries/api/WeatherPoolingAPI";
import { showNotification } from "@mantine/notifications";
import AuthAPI, { getStoredUser, decodeJwt, storeUser } from "@/libraries/api/Auth";
import { useRouter } from "next/dist/client/components/navigation";
import { MantineCalendar } from "@/libraries/ui/MantineCalendar";
import { AdvisoryManagement } from "./AdvisoryManagement";


export default function AdminPage() {
  const router = useRouter();
  const theme = useMantineTheme();


  const [modelInfo, setModelInfo] = useState<any>(null);
  const [psgc, setPsgc] = useState("");
  const [date, setDate] = useState("");
  const [barangays, setBarangays] = useState<Array<{ value: string; label: string }>>([]);
  const [selectedBarangay, setSelectedBarangay] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const municipalityPsgcCode = "0931700000";

    (async () => {
      try {
        const list: any[] = await Localities.getAllBarangaysByPsgccode(municipalityPsgcCode);
        if (!mounted) return;
        setBarangays(
          list.map((b) => ({
            value: b.psgcCode,
            label: b.name,
          })),
        );
      } catch (e) {
        console.error("Failed to load barangays", e);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

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


  const appendLog = (text: string) => {

};

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
    console.log("Creating CSV for bulk prediction...");
    await ensureFreshAccess();
    try {
      const response = await AdminDengueAPI.createBulkCsvForPrediction({}) as any;
      console.log("Create-bulk triggered");
      showNotification({ 
        title: "Bulk CSV Created", 
        message: "Bulk CSV file has been created successfully and is ready for download." 
      });
      
      // Create a downloadable link if the response contains a file URL
      if (response && response.fileUrl) {
        const link = document.createElement('a');
        link.href = response.fileUrl;
        link.download = 'bulk_prediction.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (e) {
      console.log("Create-bulk failed");
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



  const fetchWeather = async () => {
    try {
      const current = await WeatherSummaryAPI.getCurrentWeek();
      console.log("Weather current-week: " + JSON.stringify(current));
      const lagged = await WeatherSummaryAPI.getLagged2Week();
      console.log("Weather lagged-2week: " + JSON.stringify(lagged));
    } catch (e) {
      console.log("Weather fetch failed");
    }
  };

  const handleManualWeatherPooling = async () => {
    try {
      await WeatherPoolingData.manualTriggerWeatherPooling();
      showNotification({ 
        title: "Weather Pooling", 
        message: "Weather pooling job has been manually triggered successfully." 
      });
    } catch (e) {
      console.log("Weather pooling manual trigger failed");
      showNotification({ 
        title: "Error", 
        message: "Failed to trigger weather pooling job." 
      });
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
          <Tabs.Tab value="advisories">Advisories</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="model" style={{ paddingTop: theme.spacing.xs }}>
          <Stack gap="sm">
            <Text fw={600}>Model Info</Text>
            <Alert variant="light" color="blue" title="Disclaimer">
              <Text size="sm">
                Use the Train Advanced button to retrain the prediction model with the latest data. 
                This process may take several minutes to complete. Ensure you have sufficient data 
                before initiating training.
              </Text>
            </Alert>
            <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(modelInfo, null, 2)}</pre>
            <Group>
              <Button onClick={handleTrainAdvance}>Train Advanced</Button>
            </Group>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="predictions" style={{ paddingTop: theme.spacing.xs }}>
          <Stack gap="sm">
            <Text fw={600}>Manual Predictions</Text>
            <Alert variant="light" color="blue" title="Disclaimer">
              <Text size="sm">
                Select a barangay from the dropdown and enter a date in yyyy-MM-dd format to run predictions. 
                The Run Prediction button generates dengue case predictions for the selected location and date. 
                Create Bulk CSV generates a template file for batch predictions. Yearly Lagged processes 
                historical data for improved model accuracy.
              </Text>
            </Alert>
            <Select
              label="Select Barangay"
              placeholder="Choose a barangay"
              data={barangays}
              value={selectedBarangay}
              onChange={(value) => {
                setSelectedBarangay(value);
                setPsgc(value || "");
              }}
              searchable
            />
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
            <Alert variant="light" color="blue" title="Disclaimer">
              <Text size="sm">
                Use the Fetch Weather Summaries button to manually retrieve the latest weather data. 
                This data is essential for accurate dengue predictions as weather conditions significantly 
                impact mosquito breeding and disease transmission patterns. The Manual Weather Pooling 
                button triggers the job that fetches weather data from external APIs.
              </Text>
            </Alert>
            <Group>
              <Button onClick={fetchWeather}>Fetch Weather Summaries</Button>
              <Button onClick={handleManualWeatherPooling}>Manual Weather Pooling</Button>
            </Group>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="advisories" style={{ paddingTop: theme.spacing.xs }}>
          <AdvisoryManagement />
        </Tabs.Panel>


      </Tabs>


    </Card>
  );
}
