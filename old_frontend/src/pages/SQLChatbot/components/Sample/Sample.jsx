import React, { useEffect, useState } from "react";
import "./static/css/style.css";

const topic = [
  "Recommend a podcast",
  "Explain inflation",
  "Draft a tweet",
  "Teach me basic phrases",
  "Help me set goals",
  "Analyze a poem",
  "Create a playlist",
  "Give me a recipe",
  "Suggest team-building exercises",
  "Explain machine learning",
  "Plan a day",
  "Describe minimalism",
  "Help me calculate",
  "Recommend a smartphone",
  "Write a review",
  "Discuss the benefits",
  "Provide a packing list",
  "Suggest hobbies",
  "Help me create",
  "Describe yoga poses",
  "Explain SEO",
  "Write an Instagram caption",
  "Offer cooking tips",
  "Discuss job opportunities",
  "Recommend a workout",
  "Explain net neutrality",
  "Craft a LinkedIn invitation",
  "List types of coffees",
  "Give me study tips",
  "Recommend charities",
  "Explain meditation techniques",
  "Suggest picnic spots",
  "Help me troubleshoot",
  "Recommend a career path",
  "Provide a synopsis",
  "Suggest gift ideas",
  "Explain the basics",
  "Give me tips",
  "Help me write",
  "Describe places",
  "Suggest virtual date ideas",
  "Explain the history",
  "Recommend a laptop",
  "Provide email templates",
  "Teach me a card trick",
  "Give me a summary",
  "Suggest apps",
  "Help me plan",
  "Recommend skincare products",
  "Plan a trip",
  "Explain the stock market",
  "Recommend a book",
  "Help me prepare",
  "Suggest a movie",
  "Describe cloud computing",
  "Propose a fitness plan",
  "Craft an email",
  "Advise on wine",
  "Teach me basic chords",
  "Develop a study plan",
  "Explain solar energy",
  "Guide me through",
  "Provide conversation starters",
  "Give a beginner's guide",
  "List essential items",
  "Help me compose",
  "Summarize the plot",
  "Debate the merits",
  "Draft a cover letter",
  "Recommend a pet",
  "Analyze the theme",
  "Help me troubleshoot",
  "Explain photosynthesis",
  "Guide me on choosing",
  "Offer tips",
  "Suggest a vacation spot",
  "Explain Bitcoin",
  "Provide a recipe",
  "Help me outline",
  "Discuss investment strategies",
  "Give self-care ideas",
  "Detail the steps",
  "Describe the water cycle",
  "Suggest a workout",
  "Help me draft",
  "Recommend a skincare routine",
  "Give me gardening tips",
  "List best practices",
  "Provide a guide",
  "Help me understand",
  "Debate",
  "Plan a meal",
  "Recommend an app",
  "Explain gravity",
  "Offer a checklist",
  "Advise on a subject",
  "Teach me a dance move",
  "Give relationship advice",
  "Provide storage solutions",
];

const description = [
  "for learning about history",
  "to someone new to economics",
  "for announcing a product launch",
  "in French for a trip to Paris",
  "for a healthy lifestyle",
  "by Robert Frost",
  "for a road trip",
  "for a quick breakfast",
  "for a remote team",
  "to a data science beginner",
  "at a theme park",
  "to someone interested in downsizing",
  "my daily caloric intake",
  "for photography enthusiasts",
  "of the latest iPhone",
  "of reading regularly",
  "for a winter vacation",
  "to take up during lockdown",
  "a budget for the month",
  "for back pain relief",
  "for a small business website",
  "for a travel photo",
  "for beginners",
  "in the field of AI",
  "for losing weight",
  "to someone unfamiliar with it",
  "to a potential employer",
  "for a coffee shop newbie",
  "for an online course",
  "to donate to",
  "for stress relief",
  "for a sunny day",
  "a problem in a Python code",
  "for someone in IT",
  "of the latest Marvel movie",
  "for a tech-savvy person",
  "of graphic design",
  "on pet care for new dog owners",
  "an online dating profile",
  "to visit in New York City",
  "during quarantine",
  "of jazz music",
  "for video editing",
  "for customer service",
  "for impressing my friends",
  "of quantum physics",
  "for learning a new language",
  "an at-home date night",
  "for oily skin",
  "for a weekend getaway to a nearby beach",
  "to a teenager interested in finance",
  "for someone who just started their own business",
  "for a job interview in the tech industry",
  "for a date night at home",
  "to a non-tech-savvy individual",
  "for someone working a 9-to-5 desk job",
  "to negotiate a higher salary with my boss",
  "for a romantic dinner",
  "to start learning the guitar",
  "for a college student during finals",
  "to someone considering solar panels for their home",
  "a homemade pizza recipe",
  "for a networking event",
  "to meditation",
  "for a camping trip in a forest",
  "a thank-you note after a job interview",
  "of 'Moby Dick' for a book club discussion",
  "of electric cars vs. gasoline cars",
  "for an entry-level marketing position",
  "for a small apartment",
  "in the movie 'Inception'",
  "a Wi-Fi connection issue",
  "to a group of elementary school students",
  "a laptop for graphic design work",
  "for improving my public speaking",
  "for a family with young kids",
  "to someone unfamiliar with cryptocurrencies",
  "for gluten-free brownies",
  "a presentation on renewable energy",
  "for a retirement fund",
  "for a stressful workweek",
  "to publish my own book",
  "to a group of 5th graders",
  "for upper body strength",
  "a complaint letter to a service provider",
  "for dry skin",
  "for growing tomatoes",
  "for email marketing",
  "for writing a compelling blog post",
  "the basics of machine learning algorithms",
  "organic vs conventional farming",
  "for a vegan dinner party",
  "for tracking daily expenses",
  "to someone who doesn't believe in it",
  "for setting up a new office space",
  "to major in college",
  "suitable for a wedding",
  "for long-distance couples",
  "for small living spaces",
];

export default function Sample() {
  const [n, setN] = useState([]);
  React.useEffect(() => {
    for (var i = 0; i < 4; i++) {
      setN((n) => [...n, Math.floor(Math.random() * 100)]);
    }
  }, []);
  return (
    <div className="sample-container">
      <div className="sample-grid">
        <div className="sample-text-container">
          <div className="self-stretch">{topic[n[0]]}</div>
          <div className="text-md text-gray4">{description[n[0]]}</div>
        </div>
        <div className="sample-text-container">
          <div className="self-stretch">{topic[n[1]]}</div>
          <div className="text-md text-gray4">
            {description[n[1]]}
          </div>
        </div>
      </div>
      <div className="sample-grid">
        <div className="sample-text-container">
          <div className="self-stretch">{topic[n[2]]}</div>
          <div className="text-md">{description[n[2]]}</div>
        </div>

        <div className="sample-text-container">
          <div className="self-stretch">{topic[n[3]]}</div>
          <div className="text-md">{description[n[3]]}</div>
        </div>
      </div>
    </div>
  );
}