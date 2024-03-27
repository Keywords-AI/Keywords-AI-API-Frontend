import React, { useEffect } from "react";
import { useHotkeys, useHotkeysContext } from "react-hotkeys-hook";
import { useNavigate } from "react-router-dom";
import {
  AlphanumericKey,
  Delete,
  PlaygroundIcon,
  Pencil,
  SideBar,
  SideBarActive,
  SideBarActiveLeft,
  SideBarLeft,
  Dice1,
  Dice2,
} from "src/components";
import { CodeViewer } from "src/components/CodeViewer";
import {
  Button,
  ButtonGroup,
  ButtonGroupSmall,
  DotsButton,
} from "src/components/Buttons";
import { Modal } from "src/components/Dialogs";
import Tooltip from "src/components/Misc/Tooltip";
import useForwardRef from "src/hooks/useForwardRef";
import { getKeys } from "src/store/actions";
import {
  ResetPlayground,
  setChannelMode,
  setModelOptions,
  toggleLeftPanel,
  toggleRightPanel,
} from "src/store/actions/playgroundAction";
import store, { useTypedDispatch, useTypedSelector } from "src/store/store";
import { BCrumb } from "src/components/Sections/BreadCrumb/BreadCrumb";

export function TopBar() {
  const isLeftPanelOpen = useTypedSelector(
    (state) => state.playground.isLeftPanelOpen
  );
  const isRightPanelOpen = useTypedSelector(
    (state) => state.playground.isRightPanelOpen
  );
  const isStreaming = store
    .getState()
    .streamingText.some((item) => item.isLoading);
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
  const { enableScope, disableScope } = useHotkeysContext();
  useEffect(() => {
    enableScope("playground_topBar");
    return () => {
      disableScope("playground_topBar");
    };
  }, []);
  useHotkeys(
    ".",
    () => {
      if (isStreaming) return;
      dispatch(toggleRightPanel());
    },
    { scopes: "playground_topBar", preventDefault: true }
  );
  const BCItems = [
    {
      label: "Playground",
      link: "/platform/playground",
    },
  ];
  return (
    <div className="flex py-xs px-lg justify-between items-center self-stretch shadow-border-b shadow-gray-2 bg-gray-1 h-[52px] shrink-0">
      <div className="flex items-center gap-xxs">
        <BCrumb items={BCItems} />
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
              icon: PlaygroundIcon,
              onClick: () => console.log("publish"),
            },
          ]}
        /> */}
      </div>

      <div className="flex gap-xxs items-center">
        {/* <Button
          variant="small"
          text="Save"
          onClick={(e: Event) => handleSavePlaygroundState(e)}
        /> */}
        <ButtonGroupSmall
          defaultActive={
            playGroundState.modelOptions.models.includes("none") ? 0 : 1
          }
          buttons={[
            {
              icon: Dice1,
              onClick: () => {
                dispatch(setChannelMode(true));
                const previous = store.getState().playground.modelOptions;
                dispatch(
                  setModelOptions({
                    ...previous,
                    models: [previous.models[0], "none"],
                  })
                );
              },
            },
            {
              icon: Dice2,
              onClick: () => {
                dispatch(setChannelMode(false));
                const previous = store.getState().playground.modelOptions;
                dispatch(
                  setModelOptions({
                    ...previous,
                    models: [previous.models[0], "gpt-4"],
                  })
                );
              },
            },
          ]}
        />
        {/* <ViewCode /> */}
        <DotsButton
          icon={Delete}
          onClick={() => {
            if (store.getState().streamingText.some((item) => item.isLoading))
              return;
            dispatch(ResetPlayground());
          }}
        />
        <HorizontalDivier />
        <Tooltip
          side="bottom"
          sideOffset={8}
          align="end"
          delayDuration={1}
          content={
            <>
              <p className="caption text-gray-4">Open right sidebar</p>
              <AlphanumericKey value={"."} />
            </>
          }
        >
          <div>
            <DotsButton
              icon={isRightPanelOpen ? SideBarActive : SideBar}
              onClick={() => dispatch(toggleRightPanel())}
              active={isRightPanelOpen}
            />
          </div>
        </Tooltip>
      </div>
    </div>
  );
}

const HorizontalDivier = () => {
  return (
    <div
      aria-label="vertical divier"
      className="w-[1px] self-stretch rounded-xs bg-gray-2"
    ></div>
  );
};

const ViewCode = React.forwardRef<HTMLDivElement>((props: any, ref) => {
  const navigate = useNavigate();
  const localRef = useForwardRef(ref);
  const dispatch = useTypedDispatch();

  // useEffect(() => {
  //   dispatch(getKeys());
  // }, []);
  return (
    <Modal
      ref={localRef}
      trigger={<Button variant="small" text="View code" />}
      title="View code"
      subtitle="You can use the following code to start integrating your current prompt and settings into your application."
      width="w-[864px]"
    >
      <CodeViewer apikey={"your_apikey"} />
      <p className="text-sm-regular text-gray-4">
        Your API key can be found{" "}
        <a
          onClick={() => navigate("/platform/api/api-keys")}
          className="text-primary cursor-pointer"
        >
          here
        </a>
        . You should use environment variables or a secret management tool to
        expose your key to your applications.
      </p>
    </Modal>
  );
});
