import React from "react";
import {
  DengueRiskAssessment,
  RiskAssessmentResult,
  RiskLevel,
  getRiskLevelText,
  getAlertMessage,
} from "@/libraries/risk-assessment/DengueRiskAssessment";

interface RiskAssessmentCardProps {
  riskResult: RiskAssessmentResult;
  barangayName?: string;
  showDetails?: boolean;
  showSuggestions?: boolean;
}

const RiskAssessmentCard: React.FC<RiskAssessmentCardProps> = ({
  riskResult,
  barangayName,
  showDetails = true,
  showSuggestions = true,
}) => {
  const {
    riskLevel,
    riskPercentage,
    config,
    suggestions,
    preventiveMeasures,
    urgencyLevel,
  } = riskResult;

  // Get DaisyUI alert class based on risk level
  const getAlertClass = () => {
    switch (riskLevel) {
      case RiskLevel.LOW:
        return "alert-success";
      case RiskLevel.MODERATE:
        return "alert-warning";
      case RiskLevel.HIGH:
      case RiskLevel.CRITICAL:
        return "alert-error";
      default:
        return "alert-info";
    }
  };

  // Get urgency badge class
  const getUrgencyBadgeClass = () => {
    switch (urgencyLevel) {
      case "low":
        return "badge-success";
      case "medium":
        return "badge-warning";
      case "high":
        return "badge-error";
      case "critical":
        return "badge-error badge-lg";
      default:
        return "badge-info";
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Risk Level Display */}
      <div className={`alert ${getAlertClass()} shadow-lg`}>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">
                {getRiskLevelText(riskLevel)}
              </h3>
              <p className="text-sm">
                {getAlertMessage(riskLevel, barangayName)}
              </p>
            </div>
            <div className={`badge ${getUrgencyBadgeClass()} uppercase`}>
              {urgencyLevel} urgency
            </div>
          </div>
        </div>
      </div>

      {/* Risk Visualization */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Risk Assessment</h2>

          {/* Progress Bar */}
          <div className="flex flex-col items-center space-y-2">
            <div
              className={`radial-progress ${config.color.replace("text-", "")}`}
              style={
                {
                  "--value":
                    DengueRiskAssessment.getProgressValue(riskPercentage),
                  "--size": "12rem",
                  "--thickness": "1rem",
                } as React.CSSProperties
              }
              role="progressbar"
              aria-valuenow={riskPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <span className="text-2xl font-bold">
                {riskPercentage.toFixed(2)}%
              </span>
            </div>
            <p className="text-sm opacity-70">
              Probability of Dengue Transmission
            </p>
          </div>

          {showDetails && <div className="divider">Details</div>}

          {showDetails && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="stat">
                <div className="stat-title">Risk Level</div>
                <div className={`stat-value ${config.color}`}>
                  {getRiskLevelText(riskLevel)}
                </div>
                <div className="stat-desc">{config.description}</div>
              </div>

              <div className="stat">
                <div className="stat-title">Risk Score</div>
                <div className={`stat-value ${config.color}`}>
                  {riskResult.riskScore.toFixed(2)}/100
                </div>
                <div className="stat-desc">Adjusted risk score</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Suggestions */}
      {showSuggestions && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Recommended Actions</h2>

            {/* <div className="tabs tabs-boxed">
              <a className="tab">All</a>
              <a className="tab">Personal</a>
              <a className="tab">Community</a>
              <a className="tab">Environmental</a>
            </div> */}

            <div className="mt-4 space-y-4">
              <div>
                <h4 className="font-semibold text-base-content/80 mb-2">
                  Immediate Actions
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {suggestions.map((suggestion, index) => (
                    <li key={index} className="text-sm">
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-base-content/80 mb-2">
                  Preventive Measures
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {preventiveMeasures.slice(0, 3).map((measure, index) => (
                    <li key={index} className="text-sm">
                      {measure}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskAssessmentCard;
