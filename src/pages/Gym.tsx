import { Dumbbell } from "lucide-react";
import { IndustryPage } from "@/components/IndustryPage";
import heroImg from "@/assets/industry-gym.jpg";

const Gym = () => (
  <IndustryPage
    slug="gym-growth"
    industry="Gyms & Studios"
    industrySingular="Gym"
    heroImg={heroImg}
    Icon={Dumbbell}
    tagline="Convert every trial pass into a long-term member, reactivate your lapsed list, and fill every class — without hiring a single new salesperson."
    intro="NavAura AI deploys a high-performance growth agent for boutique fitness, CrossFit boxes, F45, and luxury studios — nurturing leads through the proven trial-to-member journey."
    pains={[
      { title: "Trial Leads That Ghost", desc: "8 out of 10 trial sign-ups never show up. Manual follow-up calls eat your front-desk's time and still convert at under 20%." },
      { title: "Lapsed Members Forgotten", desc: "Your CRM is a graveyard of 500+ former members worth $40K+ annually — but no one has time to call them all back." },
      { title: "Half-Empty Classes", desc: "Prime-time slots fill, but 6am and 8pm classes sit at 40% capacity. Coaches are paid the same; revenue is left on the table." },
    ]}
    solutions={[
      { title: "Trial-to-Member Nurture Agent", desc: "Texts, emails, and calls every trial lead with the right message at the right moment — books their first class, follows up after, and presents the membership offer at peak motivation." },
      { title: "Lapsed Member Reactivation", desc: "Mines your old CRM, segments by drop-off reason, and runs personalized win-back campaigns with limited-time founder offers — typically reactivates 12-18% of cold lists." },
      { title: "Class Booking & Fill Automation", desc: "Auto-promotes under-booked classes to your most likely attendees, manages waitlists, and sends smart reminders — pushing class fill above 85%." },
    ]}
    cities={["Los Angeles, CA", "Miami, FL", "Austin, TX", "Denver, CO", "Brooklyn, NY", "Nashville, TN"]}
    localCopy="We deploy hyper-local landing pages for every studio location, automate Google review collection from every PR, and run geo-targeted nurture funnels — so 'best gym near me' searches in your area always lead to your door."
    seoTitle="Gym Lead Management AI · Fitness Growth · NavAura AI"
    seoDescription="NavAura AI converts trials to members, reactivates lapsed lists, and fills every class with AI growth agents engineered for boutique gyms, CrossFit, and luxury fitness studios."
    seoKeywords="Gym Lead Management, fitness AI, trial to member conversion, gym CRM automation, boutique fitness AI, class booking AI, NavAura AI"
    chatGreeting="Hi! I am NavAura AI. Ready to 2x your gym's lead conversion?"
    chatSuggestions={[
      "💪 Convert trials to members",
      "🔥 Reactivate lapsed members",
      "📅 Fill empty class slots",
    ]}
  />
);

export default Gym;
