import React, { useEffect, useState } from "react";
import { useCalendar } from "@/app/app/CalendarContext";
import { useBarangaySelection } from "@/app/app/prediction/BarangaySelectionContext";
import { format, subWeeks, addWeeks } from "date-fns";
import {
  useDengueRiskAssessment,
  useBatchRiskAssessment,
  useRiskAnalytics,
} from "@/libraries/hooks/useDengueRiskAssessment";
import { RiskLevel } from "@/libraries/risk-assessment/DengueRiskAssessment";
import RiskAssessmentCard from "./RiskAssessmentCard";

interface DengueRiskDashboardProps {
  showTrendAnalysis?: boolean;
  showBatchComparison?: boolean;
  showAnalytics?: boolean;
}

const DengueRiskDashboard: React.FC<DengueRiskDashboardProps> = ({
  showTrendAnalysis = true,
  showBatchComparison = false,
  showAnalytics = false,
}) => {
  const { getWeekDateRangeString } = useCalendar();
  const { SelectedBarangay } = useBarangaySelection();

  // Individual risk assessment
  const {
    riskResult,
    isLoading,
    error,
    refetch,
    riskTrend,
    isTrendLoading,
    fetchRiskTrend,
    quickAssess,
  } = useDengueRiskAssessment({
    psgccode: SelectedBarangay?.PsgcCode,
    selectedDate: getWeekDateRangeString()?.split(" ")[0],
    enableCache: true,
    includeHistoricalContext: true,
    autoRefresh: false,
  });

  // Batch assessment for comparison
  const {
    results: batchResults,
    isLoading: isBatchLoading,
    error: batchError,
    assessMultiple,
    clearResults,
  } = useBatchRiskAssessment();

  // Analytics
  const { analytics, calculateAnalytics, clearAnalytics } = useRiskAnalytics();

  // Local state for demo data
  const [demoValue, setDemoValue] = useState<number>(50);
  const [showDemo, setShowDemo] = useState<boolean>(false);

  // Fetch trend data when component mounts
  useEffect(() => {
    if (showTrendAnalysis && SelectedBarangay?.PsgcCode) {
      const startDate = format(subWeeks(new Date(), 8), "yyyy-MM-dd");
      const endDate = format(addWeeks(new Date(), 4), "yyyy-MM-dd");
      fetchRiskTrend(startDate, endDate);
    }
  }, [SelectedBarangay?.PsgcCode, showTrendAnalysis, fetchRiskTrend]);

  // Calculate analytics when batch results are available
  useEffect(() => {
    if (showAnalytics && batchResults.length > 0) {
      const validResults = batchResults
        .filter((item) => item.result !== null)
        .map((item) => item.result!);

      if (validResults.length > 0) {
        calculateAnalytics(validResults);
      }
    }
  }, [batchResults, showAnalytics, calculateAnalytics]);

  // Handle demo assessment
  const handleDemoAssessment = () => {
    if (showDemo) {
      setShowDemo(false);
    } else {
      setShowDemo(true);
    }
  };

  // Get risk level color for badges
  const getRiskBadgeClass = (riskLevel: RiskLevel) => {
    switch (riskLevel) {
      case RiskLevel.LOW:
        return "badge-success";
      case RiskLevel.MODERATE:
        return "badge-warning";
      case RiskLevel.HIGH:
        return "badge-error";
      case RiskLevel.CRITICAL:
        return "badge-error badge-lg";
      default:
        return "badge-ghost";
    }
  };

  // Handle batch assessment demo
  const handleBatchAssessment = () => {
    // Sample barangay data for demonstration
    const sampleBarangayData = [
      {
        psgccode: "0931700001",
        selectedDate: format(new Date(), "yyyy-MM-dd"),
      },
      {
        psgccode: "0931700002",
        selectedDate: format(new Date(), "yyyy-MM-dd"),
      },
      {
        psgccode: "0931700003",
        selectedDate: format(new Date(), "yyyy-MM-dd"),
      },
    ];

    assessMultiple(sampleBarangayData);
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dengue Risk Assessment Dashboard</h2>
        <div className="flex gap-2">
          <button
            className="btn btn-outline btn-sm"
            onClick={() => refetch()}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : null}
            Refresh
          </button>
          <button
            className="btn btn-outline btn-sm"
            onClick={handleDemoAssessment}
          >
            {showDemo ? "Hide Demo" : "Show Demo"}
          </button>
        </div>
      </div>

      {/* Error Display */}
      {(error || batchError) && (
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error || batchError}</span>
        </div>
      )}

      {/* Main Risk Assessment */}
      {riskResult && (
        <RiskAssessmentCard
          riskResult={riskResult}
          barangayName={SelectedBarangay?.Name}
          showDetails={true}
          showSuggestions={true}
        />
      )}

      {/* Loading State */}
      {isLoading && !riskResult && (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Demo Section */}
      {showDemo && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title">Risk Assessment Demo</h3>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Prediction Value (0-100)</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={demoValue}
                onChange={(e) => setDemoValue(Number(e.target.value))}
                className="range"
              />
              <div className="flex justify-between text-xs px-2">
                <span>0</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100</span>
              </div>
              <div className="text-center mt-2">
                <span className="text-lg font-bold">{demoValue}%</span>
              </div>
            </div>

            <div className="divider"></div>

            <RiskAssessmentCard
              riskResult={quickAssess(demoValue)}
              barangayName="Demo Barangay"
              showDetails={true}
              showSuggestions={false}
            />
          </div>
        </div>
      )}

      {/* Trend Analysis */}
      {showTrendAnalysis && riskTrend && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title">Risk Trend Analysis</h3>

            {isTrendLoading ? (
              <div className="flex justify-center items-center h-32">
                <span className="loading loading-spinner loading-md"></span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Risk Level</th>
                      <th>Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riskTrend.slice(-8).map((item, index) => (
                      <tr key={index}>
                        <td>{format(new Date(item.date), "MMM dd, yyyy")}</td>
                        <td>
                          <span
                            className={`badge ${getRiskBadgeClass(
                              item.riskLevel as RiskLevel
                            )}`}
                          >
                            {item.riskLevel}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              item.trend === "improving"
                                ? "badge-success"
                                : item.trend === "worsening"
                                ? "badge-error"
                                : "badge-ghost"
                            }`}
                          >
                            {item.trend}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Batch Comparison */}
      {showBatchComparison && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h3 className="card-title">Barangay Comparison</h3>
              <button
                className="btn btn-outline btn-sm"
                onClick={handleBatchAssessment}
                disabled={isBatchLoading}
              >
                {isBatchLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : null}
                Assess Multiple
              </button>
            </div>

            {batchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {batchResults.map((item, index) => (
                  <div key={index} className="stat">
                    <div className="stat-title">Barangay {item.psgccode}</div>
                    <div
                      className={`stat-value text-2xl ${
                        item.result
                          ? getRiskBadgeClass(item.result.riskLevel).replace(
                              "badge-",
                              "text-"
                            )
                          : ""
                      }`}
                    >
                      {item.result ? `${item.result.riskPercentage}%` : "N/A"}
                    </div>
                    <div className="stat-desc">
                      {item.result ? item.result.riskLevel : "No data"}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                Click "Assess Multiple" to compare risk levels across barangays
              </div>
            )}
          </div>
        </div>
      )}

      {/* Analytics */}
      {showAnalytics && analytics && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title">Risk Analytics</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="stat">
                <div className="stat-title">Total Assessments</div>
                <div className="stat-value">{analytics.totalAssessments}</div>
              </div>

              <div className="stat">
                <div className="stat-title">Average Risk Score</div>
                <div className="stat-value">
                  {analytics.averageRiskScore.toFixed(1)}
                </div>
              </div>

              <div className="stat">
                <div className="stat-title">High Risk Areas</div>
                <div className="stat-value">
                  {analytics.highRiskAreas.length}
                </div>
              </div>

              <div className="stat">
                <div className="stat-title">Critical Risk</div>
                <div className="stat-value text-error">
                  {analytics.riskLevelDistribution[RiskLevel.CRITICAL] || 0}
                </div>
              </div>
            </div>

            <div className="divider"></div>

            <div>
              <h4 className="font-semibold mb-2">Risk Level Distribution</h4>
              <div className="space-y-2">
                {Object.entries(analytics.riskLevelDistribution).map(
                  ([level, count]) => (
                    <div
                      key={level}
                      className="flex items-center justify-between"
                    >
                      <span className="capitalize">{level}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-base-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              level === RiskLevel.LOW
                                ? "bg-success"
                                : level === RiskLevel.MODERATE
                                ? "bg-warning"
                                : "bg-error"
                            }`}
                            style={{
                              width: `${
                                (count / analytics.totalAssessments) * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm">{count}</span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DengueRiskDashboard;
