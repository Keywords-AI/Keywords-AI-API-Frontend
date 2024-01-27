import {
  Delete,
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
import { useTypedDispatch, useTypedSelector } from "src/store/store";

export function TopBar() {
  const isLeftPanelOpen = useTypedSelector(
    (state) => state.playground.isLeftPanelOpen
  );
  const isRightPanelOpen = useTypedSelector(
    (state) => state.playground.isRightPanelOpen
  );
  const dispatch = useTypedDispatch();
  return (
    <div className="flex py-xs px-lg justify-between items-center self-stretch shadow-border-b shadow-gray-2 bggray-1">
      <div className="flex items-center gap-xxs">
        <DotsButton
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
              icon: Pencil,
              onClick: () => console.log("publish"),
            },
          ]}
        />
      </div>
      <div className="flex gap-xxs items-start">
        <Button variant="small" text="Save" />
        <Button variant="small" text="Clear session" icon={Delete} />
        <Button variant="small" text="View code" />
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
