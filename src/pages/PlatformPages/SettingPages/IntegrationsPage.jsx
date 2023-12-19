import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { IntegrationModal, vendors } from './components';
import { PageContent, PageParagraph } from 'src/components/Sections';
import { Button } from 'src/components/Buttons'
import useFetch from 'src/hooks/useFetch';

export const IntegrationsPage = () => {
    const [openRequest, setOpenRequest] = React.useState(false);
    const { data, error, loading } = useFetch({ path: 'vendor_integration/integrations', domain: "http://localhost:8000/" });
    useEffect(() => {
        console.log(data);
     }, [data]);
return (
    <PageContent
        title="Integrations"
        subtitle="Securely store and manage external models and API keys. "
    >
        <PageParagraph
            heading="LLM providers"
            subheading="You can choose to add your provider API keys for direct integration, utilizing your own credits. By default, you will be using our provider API keys when calling our API.">
            <div className='flex-row items-start content-start gap-md self-stretch flex-wrap'>
                {Object.keys(vendors).map((vendor, index) => (
                    <IntegrationModal
                        key={index}
                        companyName={vendor}
                    />
                ))
                }
            </div>
            <Button variant="r4-primary" text="Request model" onClick={() => { setOpenRequest(!openRequest); }} />
        </PageParagraph>


    </PageContent>
)
}