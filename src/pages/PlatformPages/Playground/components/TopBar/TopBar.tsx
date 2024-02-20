import { useNavigate } from "react-router-dom";
import {
  Delete,
  IconPlayground,
  Pencil,
  SideBar,
  SideBarActive,
  SideBarActiveLeft,
  SideBarLeft,
} from "src/components";
import { Button, ButtonGroup, DotsButton } from "src/components/Buttons";
import {
  toggleLeftPanel,
  toggleRightPanel,
} from "src/store/actions/playgroundAction";
import store, { useTypedDispatch, useTypedSelector } from "src/store/store";

export function TopBar() {
  const isLeftPanelOpen = useTypedSelector(
    (state) => state.playground.isLeftPanelOpen
  );
  const isRightPanelOpen = useTypedSelector(
    (state) => state.playground.isRightPanelOpen
  );

  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const playGroundState = useTypedSelector((state) => state.playground);
  const handleSavePlaygroundState = (e: Event) => {
    e.preventDefault();
    const isStreaming =
      store.getState().streamingText[0].isLoading ||
      store.getState().streamingText[1].isLoading;
    if (isStreaming) return;
    const time_stamp = new Date().getTime();
    const messages = playGroundState.messages.map((message) => {
      const { isActive, ...rest } = message;
      return rest;
    });
    const user_prompt = playGroundState.prompt;
    const saveObj = {
      messages,
      user_prompt,
      time_stamp,
    };
  };

  return (
    <div className="flex py-xs px-lg justify-between items-center self-stretch shadow-border-b shadow-gray-2 bggray-1">
      <div className="flex items-center gap-xxs">
        {/* <DotsButton
          icon={isLeftPanelOpen ? SideBarActiveLeft : SideBarLeft}
          onClick={() => dispatch(toggleLeftPanel())}
        />
        <HorizontalDivier />
        <ButtonGroup
          buttons={[
            {
              text: "Logs",
              icon: Pencil,
              onClick: () => console.log("save"),
            },
            {
              text: "Saved",
              icon: IconPlayground,
              onClick: () => console.log("publish"),
            },
          ]}
        /> */}
      </div>
      <div className="flex gap-xxs items-start">
        <Button
          variant="small"
          text="Save"
          onClick={(e: Event) => handleSavePlaygroundState(e)}
        />

        <Button variant="small" text="View code" />
        <DotsButton icon={Delete} onClick={() => navigate(0)} />
        <HorizontalDivier />
        <DotsButton
          icon={isRightPanelOpen ? SideBarActive : SideBar}
          onClick={() => dispatch(toggleRightPanel())}
        />
      </div>
    </div>
  );
}

const HorizontalDivier = () => {
  return (
    <div
      aria-label="vertical divier"
      className="w-[1px] h-full rounded-xs bg-gray-2"
    ></div>
  );
};
