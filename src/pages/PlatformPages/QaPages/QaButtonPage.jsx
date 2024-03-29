import react from "react";
import { connect } from "react-redux";
import { PageContent, PageParagraph } from "src/components/Sections";
import { Button, ButtonGroup, IconButton } from "src/components/Buttons";
import { Delete, Logo, Right, Rocket, Speed } from "src/components/Icons";
import { HeaderLogo } from "src/components/BrandAssets";
import { DotsButton } from "src/components/Buttons/DotsButton";

export const QaButtonPage = () => {
  const buttons = [
    { text: "Day", onClick: () => setSummaryType("daily") },
    { text: "Week", onClick: () => setSummaryType("weekly") },
    { text: "Month", onClick: () => setSummaryType("monthly") },
    { text: "Year", onClick: () => setSummaryType("yearly") },
  ];
  return (
    <PageContent title="Button Wall">
      <PageParagraph heading="R4 Buttons">
        <div className="flex flex-row gap-sm flex-wrap">
          <Button variant="r4-gray-2" text="button-r4-gray-2" />
          <Button variant="r4-primary" text="button-r4-primary" />
          <Button variant="r4-red" text="button-r4-red" />
          <Button
            variant="r4-gray-2"
            text="button-r4-gray-2"
            icon={Speed}
            iconPosition="left"
          />

          <Button variant="small" text="button-small" icon={Rocket} />
          <Button variant="icon" icon={Rocket} />
          <Button variant="text" text="text-button" icon={Delete} />
          <DotsButton />
          <ButtonGroup buttons={buttons} />
        </div>
      </PageParagraph>

      <PageParagraph heading="R18 Buttons">
        <div className="flex flex-row gap-sm flex-wrap">
          <Button variant="r18-white" text="button-r18-white" icon={Right} />
          <Button variant="r18-black" text="button-r18-black" icon={Right} />
        </div>
      </PageParagraph>

      <PageParagraph heading="Transparent Buttons">
        <div className="flex flex-row gap-sm flex-wrap">
          <Button variant="header" text="button-header" />
          <Button variant="footer" text="button-footer" />
          <Button variant="careers" text="button-careers" icon={Rocket} />
          <Button variant="panel" text="button-panel" />
        </div>
      </PageParagraph>
      <PageParagraph heading="Other Buttons">
        <div className="flex flex-row gap-sm flex-wrap">
          <IconButton icon={Logo} />
        </div>
      </PageParagraph>
    </PageContent>
  );
};
