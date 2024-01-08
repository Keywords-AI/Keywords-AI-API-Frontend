import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { PageContent, PageParagraph } from 'src/components/Sections'

const mapStateToProps = (state) => ({
    user: state.user,
})

const mapDispatchToProps = {

};

const Subheading = connect(mapStateToProps, mapDispatchToProps)(({
    userCount=3,
    newMonth="January 11, 2024"
}) => {
    return (
        <div>
            {"You’re currently on the Team Monthly plan. Your organization of"}
            <span>
                {userCount}
            </span>
            {"users costs $29 per month, and will renew on "}
            <span>
                {newMonth}    
            </span>
        </div>
    )
});

export const PlansPage = connect(mapStateToProps, mapDispatchToProps)(({ billings }) => {

    return (
        <PageContent
            title="Billing"
            subtitle="Manage your billing information and invoices. For questions about billing, contact team@keywordsai.co."
        >
            <PageParagraph
                heading="Payment history"
                subheading={<Subheading />}
            >
            </PageParagraph>
        </PageContent>
    )
})
