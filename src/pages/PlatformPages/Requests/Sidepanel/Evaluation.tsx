import { useNavigate } from "react-router-dom";
import { SentimentTag, Tag } from "src/components/Misc";
import { useTypedSelector } from "src/store/store";
import { RootState } from "src/types";

export const Evaluation = ({
    sentimentScore = 0,
    groundnessScore = 85,
  }: {
    sentimentScore?: number;
    groundnessScore?: number;
  }) => {
    const isFreeUser = useTypedSelector((state: RootState) => {
      const planLevel = state.organization?.organization_subscription.plan_level;
      return planLevel < 2;
    });
    groundnessScore = parseFloat(groundnessScore.toFixed(2));
    const navigate = useNavigate();
    return (
      <div
        aria-label="frame 1974"
        className="flex-col  px-lg py-sm items-start gap-xs self-stretch"
      >
        {/* <div className="flex h-[24px] justify-between items-center self-stretch">
          <Tooltip
            side="right"
            sideOffset={8}
            delayDuration={1}
            skipDelayDuration={1}
            content={
              <>
                <span className="text-gray-4 caption">
                  Failure threshold = 0.85
                </span>
              </>
            }
          >
            <div className="flex items-center gap-xxs text-sm-md text-gray-5">
              Groundedness
              <Info />
            </div>
          </Tooltip>
          <div className="flex items-center gap-xxxs">
            {isFreeUser ? (
              <Tag
                text={"Upgrade"}
                backgroundColor="bg-primary/10"
                textColor="text-primary"
                border=""
              />
            ) : groundnessScore > 0 ? (
              <div className="flex items-center gap-xxxs">
                <Tag
                  text={`${groundnessScore}`}
                  backgroundColor={
                    groundnessScore >= 85 ? "bg-green/10" : "bg-red/10"
                  }
                  textColor={groundnessScore >= 85 ? "text-green" : "text-red"}
                  border=""
                />
                <Tag
                  text={` Grounded`}
                  backgroundColor={
                    groundnessScore >= 85 ? "bg-green/10" : "bg-red/10"
                  }
                  textColor={groundnessScore >= 85 ? "text-green" : "text-red"}
                  border=""
                />
              </div>
            ) : (
              <p className="text-sm-regular text-gray-4">N/A</p>
            )}
          </div>
        </div> */}
  
        <div className="flex h-[24px] justify-between items-center self-stretch">
          <div className="flex items-center gap-xxs text-sm-md text-gray-5">
            Sentiment
          </div>
  
          <div className="flex items-center gap-xxxs">
            {isFreeUser ? (
              <Tag
                text={"Upgrade"}
                backgroundColor="bg-primary/10"
                textColor="text-primary"
                border=""
                onClick={() => {
                  navigate("/platform/api/plans");
                }}
              />
            ) : sentimentScore ? (
              <SentimentTag sentiment_score={sentimentScore} />
            ) : (
              <p className="text-sm-regular text-gray-4">N/A</p>
            )}
          </div>
        </div>
      </div>
    );
  };
  