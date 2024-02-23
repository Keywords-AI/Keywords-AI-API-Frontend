import React from "react";
import { WelcomeState } from "src/components/Sections";

type Props = {};

export default function DemoWelcome({}: Props) {
  return (
    <div className="flex self-stretch flex-1">
      <WelcomeState isDashboard />
    </div>
  );
}
