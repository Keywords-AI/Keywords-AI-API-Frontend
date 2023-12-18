import React from 'react'
import { connect } from 'react-redux'
import { VendorCard } from 'src/components/Cards/VendorCard'
import { IntegrationCard, TitleCard } from './components';
import { PageContent, PageParagraph } from 'src/components/Sections';
import { OpenAI, Anthropic, Labs, Google, Cohere } from 'src/components/Icons';
import { Button, IconButton } from 'src/components/Buttons'
import { Modal } from "src/components/Dialogs";


export const IntegrationsPage = () => {
    const [openRequest, setOpenRequest] = React.useState(false);
    const [openOpenAI, setOpenOpenAI] = React.useState(false);

    return (
        <PageContent
            title="Integrations"
            subtitle="Securely store and manage external models and API keys. "
        >
            <PageParagraph
                heading="LLM providers"
                subheading="You can choose to add your provider API keys for direct integration, utilizing your own credits. By default, you will be using our provider API keys when calling our API.">
                <div className='flex-row items-start content-start gap-md self-stretch flex-wrap'>
                    <Modal
                        open={openOpenAI}
                        setOpen={setOpenOpenAI}
                        title={<TitleCard companyName="OpenAI" modelCount="3/5 " companyLogo={<OpenAI />} />}
                        subtitle="We'll get back to you within 24 hours."
                        trigger={<VendorCard setOpen={setOpenOpenAI} company_name="OpenAI" model_count="3/5 " company_logo={<OpenAI />} />}
                    >
                        <IntegrationCard
                            companyName="OpenAI"
                            companyLogo={<OpenAI />}
                            modelCount="3/5"
                        />
                    </Modal>
                    <VendorCard company_name="Anthropic" model_count="3/4 " company_logo={<Anthropic />} />
                    <VendorCard company_name="AI21 Labs" model_count="0/3 " company_logo={<Labs />} />
                    <VendorCard company_name="Cohere" model_count="1/1 " company_logo={<Cohere />} />
                    <VendorCard company_name="Google" model_count="1/1 " company_logo={<Google />} />
                </div>
                <Button variant="r4-primary" text="Request model" onClick={() => { setOpenRequest(!openRequest); }} />
            </PageParagraph>


        </PageContent>
    )
}