import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { PageContent, PageParagraph } from 'src/components/Sections'
import { SmallPricingCard } from 'src/components/Cards'
import { createPaymentSession } from 'src/services/stripe'

const starterPlanKey = import.meta.env.VITE_STRIPE_STATER_LOOKUP_KEY;
const teamPlanKey = import.meta.env.VITE_STRIPE_TEAM_LOOKUP_KEY;

const mapStateToProps = (state) => ({
    userSubscription: state.user.user_subscription,
    organization: state.organization,

})

const mapDispatchToProps = {

};


const Subheading = connect(mapStateToProps, mapDispatchToProps)(({
    userCount = 3,
    price = 29,
    newMonth = "January 11, 2024",
}) => {
    return (
        <div>
            {"You’re currently on the Team Monthly plan. Your organization of "}
            <span>
                {userCount}
            </span>
            {" users costs $"}{price} {" per month, and will renew on "}
            <span>
                {newMonth}
            </span>
        </div>
    )
});

export const PlansPage = connect(mapStateToProps, mapDispatchToProps)(({         userSubscription,
    organization
}) => {

    const cards = [
        {
            title: "Starter",
            plan: "starter",
            subtitle: "Best for solo builders.",
            price: 0,
            downgradeText: "Downgrade to Starter",
            downgradeParams: {
                buttonText: "Downgrade to Custom",
                buttonVariant: "r4-black",
            },
            buttonParams: {
                buttonText: "Get started",
                buttonVariant: "r4-primary",
            },
            buttonOnClick: () => { 
                createPaymentSession([starterPlanKey])
            },
        },
        {
            title: "Team",
            plan: "team",
            subtitle: "Best for startups and teams.",
            price: 29,
            downgradeParams: {
                buttonText: "Downgrade to team",
                buttonVariant: "r4-black",
            },
            buttonParams: {
                buttonText: "Upgrade to team",
                buttonVariant: "r4-primary",
            },
            buttonOnClick: () => {
                createPaymentSession([teamPlanKey])
             },
        },
        {
            title: "Custom",
            plan: "custom",
            subtitle: "For large teams",
            downgradeParams: {
                buttonText: "Book a demo",
                buttonVariant: "r4-black",
            },
            buttonParams: {
                buttonText: "Book a demo",
                buttonVariant: "r4-black",
            },
            buttonOnClick: () => {
                // To update to the correct link
                window.open("https://keywordsai.co", "_blank")
            },
        }
    ]
    const currIndex = cards.indexOf(cards.find(card => card.plan === userSubscription?.plan))
    const displayParams = (index, downgradeParams, buttonParams) => {
        if (index < currIndex) {
            return downgradeParams
        } else if (index === currIndex) {
            return {
                buttonText: "Current plan",
                buttonVariant: "r4-black",
            }
        } else {
            return buttonParams
        }
    }
    return (
        <PageContent
            title="Plans"
            subtitle={<Subheading
                price={cards[currIndex]?.price}
                userCount={organization?.users?.length}
            />}
        >
            <div className="flex flex-row gap-sm self-stretch">
                {cards.map((card, index) => {
                    return (
                        <SmallPricingCard
                            key={index}
                            title={card.title}
                            subtitle={card.subtitle}
                            price={card.price}
                            {...displayParams(index, card.downgradeParams, card.buttonParams)}
                            buttonOnClick={card.buttonOnClick}
                        />
                    )
                }
                )}
            </div>
        </PageContent>
    )
})
