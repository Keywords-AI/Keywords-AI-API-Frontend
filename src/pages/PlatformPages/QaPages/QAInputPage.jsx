import react from "react";
import { Search } from "src/components/Icons/iconsDS";
import { TextInput } from "src/components/Inputs";
import { NavBar, PageContent, PageParagraph } from 'src/components/Sections';


export const QAInputPage = () => {
    return (
        <PageContent title="Input Field Wall">
            <PageParagraph heading="Text Input">
            </PageParagraph>

            <PageParagraph heading="">
                <TextInput  
                    titte="Text Input"
                    icon={<Search size="md"/>}
                />
                <div className="flex-col h-[100px] self-stretch bg-gray-white justify-center">

                <div className={"flex-row self-stretch text-sm shadow-border shadow-gray-3 text-gray-black"}>
                    Hello world
                </div>
                </div>
            </PageParagraph>
        </PageContent>
    )


}