import type { ReactNode } from "react";
import LectureWrapper from "../../components/LectureWrapper";
import {
  LayersIcon,
  PencilIcon,
  PersonIcon,
  ScreenIcon,
} from "../../components/Icons";
import Roadmap from "../../components/content/Roadmap";
import PartHeading from "../../components/content/PartHeading";
import Callout from "../../components/content/Callout";
import StatGrid from "../../components/content/StatGrid";
import ChallengeBlock from "../../components/content/ChallengeBlock";
import KeyIdea from "../../components/content/KeyIdea";
import ChoicePicker from "../../components/content/ChoicePicker";
import Quiz from "../../components/content/Quiz";
import ElementSteps from "../../components/content/ElementSteps";
import Checklist from "../../components/content/Checklist";

const img = (n: number) => `/lectures/04/image${n}.png`;

interface Shot {
  n: number;
  alt: string;
}

const shotCols = ["", "", "sm:grid-cols-2", "sm:grid-cols-3"];

/** Ad screenshots shown whole (not cropped). They are small, so there is no full-size viewer. */
const Shots = ({ shots, caption }: { shots: Shot[]; caption?: string }) => (
  <figure className="my-6">
    <div className={`grid items-center gap-4 ${shotCols[shots.length] ?? "sm:grid-cols-3"}`}>
      {shots.map(({ n, alt }) => (
        <img
          key={n}
          src={img(n)}
          alt={alt}
          loading="lazy"
          className="mx-auto block h-auto max-h-[26rem] w-auto max-w-full rounded-lg border border-line bg-white"
        />
      ))}
    </div>
    {caption && (
      <figcaption className="mt-3 font-display text-sm text-muted">
        {caption}
      </figcaption>
    )}
  </figure>
);

/** Two-column (or more) table that scrolls sideways on narrow screens. */
const DataTable = ({ head, rows }: { head: string[]; rows: ReactNode[][] }) => (
  <div className="overflow-x-auto">
    <table>
      <thead>
        <tr>
          {head.map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri}>
            {row.map((cell, ci) => (
              <td key={ci} className={ci === 0 ? "font-semibold text-navy-900" : undefined}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const metaObjectives = [
  {
    name: "Awareness",
    goal: "Introduce a business, product, service, or brand to as many relevant people as possible. Useful for new businesses, product launches, and brand promotion.",
    example:
      "A new restaurant wants people in Tbilisi to discover its brand and learn about its location.",
  },
  {
    name: "Traffic",
    goal: "Encourage people to visit a website, online store, landing page, or another online destination.",
    example:
      "An online clothing store wants Instagram users to click an ad and visit its website to explore a new collection.",
  },
  {
    name: "Engagement",
    goal: "Encourage people to interact with content or a business: likes, comments, shares, saves, video views, or responses to an event.",
    example:
      "A beauty salon wants users to comment on a post, share it with friends, and interact with its Instagram content.",
  },
  {
    name: "Leads (lead generation)",
    goal: "Collect contact information from potential customers, such as names, phone numbers, and email addresses, through instant forms on Facebook and Instagram or a website form.",
    example:
      "A language school wants to collect phone numbers from people interested in English courses.",
  },
  {
    name: "Sales (conversions)",
    goal: "Encourage users to complete a valuable action, such as purchasing a product, making a booking, or completing an online order.",
    example:
      "An online electronics store wants customers to purchase smartphones through its website.",
  },
  {
    name: "App promotion",
    goal: "Encourage people to install a mobile app or take specific actions inside it.",
    example:
      "A food delivery company wants more people to download its mobile app.",
  },
];

const metaFormats = [
  {
    name: "Image ads",
    detail:
      "A single image with text and a call-to-action button. Commonly used to promote products, services, special offers, and events.",
  },
  {
    name: "Video ads",
    detail:
      "Video that demonstrates products, explains services, tells brand stories, or presents customer experiences.",
  },
  {
    name: "Stories ads",
    detail:
      "Full-screen vertical ads shown between users' Stories. Suitable for promotions, announcements, and quick calls to action.",
  },
  {
    name: "Carousel ads",
    detail:
      "Several images or videos that users swipe through. Each card can present a different product, feature, or part of a story.",
  },
  {
    name: "Reels ads",
    detail:
      "Vertical video ads shown within Reels. Useful for creative storytelling, product demonstrations, and reaching people through short-form video.",
  },
  {
    name: "Collection ads",
    detail:
      "A main image or video combined with a selection of products. Users who tap the ad can explore the products in a mobile shopping experience.",
  },
];

const channels = [
  "Google Search",
  "Google Display",
  "YouTube",
  "Facebook",
  "Instagram",
  "TikTok",
  "WhatsApp",
  "Email",
  "X",
];

const pricingModels = ["CPC", "CPM", "CPA", "CPL", "CPV"];

const Lecture04 = () => (
  <LectureWrapper
    id="04"
    intro={
      <Roadmap
        steps={[
          {
            title: "What agencies do",
            detail: "Services, organic vs. paid, fee vs. budget",
            icon: PersonIcon,
          },
          {
            title: "Digital advertising channels",
            detail: "Google, Meta, WhatsApp, email, X, TikTok",
            icon: ScreenIcon,
          },
          {
            title: "How digital advertising works",
            detail: "Objectives, metrics, and pricing models",
            icon: LayersIcon,
          },
          {
            title: "Homework: real client campaign",
            detail: "Plan and pitch a full campaign strategy",
            icon: PencilIcon,
          },
        ]}
      />
    }
  >
    <p className="mt-10 text-xl leading-relaxed">
      Imagine you own a new clothing brand. You want to attract more customers,
      increase brand awareness, and generate sales.
    </p>
    <p>Who can help you achieve these goals?</p>

    {/* 01 */}
    <section id="agencies">
      <PartHeading number="01">What does a digital marketing agency do?</PartHeading>
      <p>
        A <strong>digital marketing agency</strong> helps businesses attract
        customers, communicate with audiences, generate leads, and increase
        sales through digital channels.
      </p>
      <p>Agencies usually provide several services:</p>
      <DataTable
        head={["Agency service", "What does it do?"]}
        rows={[
          ["Social media management", "Creates posts, Stories, and Reels and manages social media accounts."],
          ["Paid advertising – Meta", "Creates and manages paid advertising campaigns on Facebook and Instagram."],
          ["Google Ads", "Helps businesses appear in Google Search and other Google advertising placements."],
          ["Content marketing", "Creates useful articles, videos, and other content."],
          ["SEO (search engine optimization)", "Improves visibility in organic search results."],
          ["Email marketing", "Sends newsletters, promotions, and automated emails."],
          ["Influencer marketing", "Collaborates with content creators to promote brands."],
          ["Creative production", "Designs banners, videos, animations, and other advertising materials."],
          ["Analytics and reporting", "Measures campaign results and recommends improvements."],
        ]}
      />

      <h3>Organic marketing vs. paid marketing</h3>
      <p>
        Before working with advertising campaigns, it is important to understand
        the difference between organic and paid marketing.
      </p>

      <p>
        <strong>Organic marketing</strong> attracts audiences without paying
        advertising platforms for individual placements or clicks. Businesses
        use content, social media activity, SEO, and community engagement to
        build relationships with their audiences.
      </p>
      <p className="mb-1 font-semibold">Examples:</p>
      <ul>
        <li>Publishing Instagram posts and Reels without boosting them.</li>
        <li>Creating TikTok videos.</li>
        <li>Writing blog articles that appear in organic Google search results.</li>
        <li>Publishing Facebook posts and interacting with followers.</li>
        <li>
          Sending newsletters to existing subscribers (although email software
          may have a subscription cost).
        </li>
      </ul>
      <p className="mb-1 font-semibold">Main benefits:</p>
      <ul>
        <li>Builds long-term relationships with customers.</li>
        <li>Increases brand recognition.</li>
        <li>Develops credibility and trust.</li>
        <li>Creates long-term visibility.</li>
      </ul>

      <p>
        <strong>Paid marketing</strong> means investing money to promote
        content, products, or services through advertising platforms. Businesses
        pay platforms such as Google, Meta, and TikTok to show ads to selected
        audiences.
      </p>
      <p className="mb-1 font-semibold">Examples:</p>
      <ul>
        <li>Paying Google to display a sponsored search result.</li>
        <li>Promoting an Instagram Reel to reach more people.</li>
        <li>Running Facebook lead generation campaigns.</li>
        <li>Advertising products through TikTok video ads.</li>
        <li>
          Displaying banners on websites through the Google Display Network.
        </li>
      </ul>

      <Callout type="warning" title="Agency fee vs. advertising budget">
        <p>These are two different expenses:</p>
        <ul>
          <li>
            <strong>Agency fee:</strong> what the client pays the agency for
            its services and work.
          </li>
          <li>
            <strong>Advertising budget:</strong> what goes to the advertising
            platforms to show the ads.
          </li>
        </ul>
      </Callout>
      <p>Example: a client pays</p>
      <StatGrid
        stats={[
          {
            value: "€1,500",
            label: "Agency fee",
            detail: "Paid to the agency for campaign management.",
          },
          {
            value: "€3,500",
            label: "Advertising budget",
            detail: "Paid to the platforms to show the ads.",
          },
          {
            value: "€5,000",
            label: "Total marketing investment",
            detail: "Two separate expenses added together.",
          },
        ]}
      />

      <ChallengeBlock title="Mini task 1: what would you sell to Starbucks?">
        <p>
          <strong>Scenario:</strong> Starbucks opens a new location in Tbilisi.
          It has a limited marketing budget and wants to attract young
          professionals working nearby.
        </p>
        <p>
          Imagine that you own a digital marketing agency. Identify at least{" "}
          <strong>three digital marketing services</strong> that your agency
          would offer to Starbucks. For each service, explain:
        </p>
        <ol>
          <li>What would your agency do?</li>
          <li>Which digital channel would you use?</li>
          <li>What result would Starbucks expect?</li>
        </ol>
      </ChallengeBlock>
    </section>

    {/* 02 */}
    <section id="advertising-channels">
      <PartHeading number="02">Digital advertising channels</PartHeading>

      <h3>Google Ads</h3>
      <p>
        Google Ads is Google's online advertising platform. It lets businesses
        promote products and services across Google Search, YouTube, websites,
        apps, and other placements.
      </p>
      <p>
        It helps businesses reach people who are actively searching for
        specific products or services, as well as audiences who may be
        interested in what they offer.
      </p>

      <h3>Google Search Ads</h3>
      <p>
        Search Ads are text ads that appear on Google search results pages when
        people search for specific keywords.
      </p>
      <p>
        <strong>Example:</strong> when someone searches for “English courses in
        Tbilisi”, language schools can show sponsored ads at the top of the
        search results.
      </p>
      <Shots
        shots={[
          {
            n: 1,
            alt: "Google Search ad marked Sponsored, from examplelanguage.ge: “English Courses in Tbilisi | Enrol Today”, with a short description and the line “Beginner to Advanced · Online and Offline”.",
          },
        ]}
      />
      <p>
        <strong>Main objectives:</strong> website traffic, lead generation,
        online sales, customer acquisition.
      </p>
      <p>
        <strong>Payment models:</strong> commonly CPC (cost per click). Other
        bidding strategies, including conversion-based bidding, are also
        available.
      </p>

      <h3>Google Display Ads</h3>
      <Shots
        shots={[
          {
            n: 2,
            alt: "Phone showing an AP news article with a display banner in the middle: “Donut shop now open!” with an Order Now button.",
          },
        ]}
      />
      <p>
        Display Ads are visual ads that appear on websites, mobile apps, and
        other placements in Google's Display Network. They usually contain
        images, text, logos, and calls to action.
      </p>
      <p>
        Display advertising is often used to increase brand awareness, promote
        special offers, and remind previous website visitors about products
        they viewed.
      </p>
      <Callout type="reflect" title="Example: remarketing">
        <p>
          A person visits an online clothing store but does not buy anything.
          Later, while reading a news article online, they see an ad from the
          same clothing brand. This is remarketing.
        </p>
      </Callout>
      <p>
        <strong>Main objectives:</strong> brand awareness, consideration,
        website traffic, remarketing.
      </p>
      <p>
        <strong>Common payment model:</strong> CPM (cost per thousand
        impressions).
      </p>

      <h3>YouTube Ads</h3>
      <p>
        YouTube Ads are video ads shown on YouTube and eligible video
        placements. The main formats:
      </p>
      <ol>
        <li>
          <strong>Skippable in-stream ads:</strong> users can skip them after
          the required first seconds.
        </li>
        <li>
          <strong>Non-skippable in-stream ads:</strong> users must watch them
          before the video continues.
        </li>
        <li>
          <strong>Bumper ads:</strong> short, non-skippable video ads.
        </li>
        <li>
          <strong>In-feed video ads:</strong> shown in YouTube discovery and
          browsing placements.
        </li>
        <li>
          <strong>YouTube Shorts ads:</strong> vertical video ads between Shorts.
        </li>
      </ol>
      <Shots
        caption="Left: a skippable in-stream ad. Right: a 6-second bumper ad."
        shots={[
          {
            n: 3,
            alt: "YouTube video playing an Adidas Samba ad, with a headline and call-to-action overlay and a Skip Ad button.",
          },
          {
            n: 4,
            alt: "Bumper ad for the Google Pixel 2 XL offering $300 off, with the timer at 0:03 of 0:06.",
          },
        ]}
      />
      <Shots
        caption="An in-feed video ad at the start of the YouTube home feed."
        shots={[
          {
            n: 5,
            alt: "YouTube home page with a sponsored video ad highlighted in red as the first item of the feed.",
          },
        ]}
      />
      <p>
        <strong>Main objectives:</strong> brand awareness, video views, product
        promotion.
      </p>

      <h3>Google Shopping Ads</h3>
      <p>
        Shopping Ads show products directly in Google Search and shopping
        placements. They typically include a product image, title, price, store
        name, and other product information.
      </p>
      <p>
        They are especially useful for e-commerce businesses that want to
        promote individual products to people searching for items to buy.
      </p>
      <Shots
        shots={[
          {
            n: 6,
            alt: "Google results for an iPhone search with a Sponsored Products row: phone photos, product titles, prices, and store names.",
          },
        ]}
      />

      <h3>Facebook and Instagram advertising (Meta Ads)</h3>
      <p>
        Facebook and Instagram ads are managed in Meta Ads Manager. Businesses
        use them to reach specific audiences, promote products and services,
        attract potential customers, increase engagement, and generate sales.
      </p>
      <p>A Meta campaign comes down to two choices:</p>
      <ol>
        <li>
          <strong>Advertising objective:</strong> what does the business want
          to achieve?
        </li>
        <li>
          <strong>Advertising format:</strong> how does the ad look?
        </li>
      </ol>

      <h3>Objectives: what does the business want to achieve?</h3>
      <p>
        When creating a campaign, a business first chooses its objective. The
        objective decides what result Meta will try to get by showing the ads.
      </p>
      <ol>
        {metaObjectives.map((o) => (
          <li key={o.name}>
            <strong>{o.name}.</strong> {o.goal}
            <br />
            <em>Example:</em> {o.example}
          </li>
        ))}
      </ol>

      <h3>Formats: how does the ad look?</h3>
      <Shots
        caption="Meta ad examples on Facebook and Instagram."
        shots={[
          {
            n: 7,
            alt: "Three Instagram image ads for a clothing brand, each showing a single product photo.",
          },
          {
            n: 8,
            alt: "Three phones with Meta ads: a cosmetics image ad and a sandals carousel on Facebook, and a skincare ad on Instagram.",
          },
          {
            n: 9,
            alt: "Three Instagram ad cards for a menswear suit promotion priced from €299.",
          },
        ]}
      />
      <p>
        After choosing the objective, the business chooses the format. The
        format decides how the ad is presented to the audience.
      </p>
      <ol>
        {metaFormats.map((f) => (
          <li key={f.name}>
            <strong>{f.name}.</strong> {f.detail}
          </li>
        ))}
      </ol>

      <h3>One business, different objectives and formats</h3>
      <p>
        Imagine a new fitness centre in Tbilisi. It can use Facebook and
        Instagram ads in several ways:
      </p>
      <DataTable
        head={["Campaign objective", "Advertising format", "Expected result"]}
        rows={[
          ["Awareness", "Reels video", "More people discover the gym."],
          ["Traffic", "Image ad", "More website visits."],
          ["Engagement", "Video or carousel", "More likes, comments, and shares."],
          ["Leads", "Stories with an instant form", "Collect contact details."],
          ["Sales", "Image or video ad", "Sell monthly memberships."],
        ]}
      />
      <p className="mt-6">
        The objective and the format are not the same thing. A video ad, for
        example, can be used to generate leads, increase engagement, drive
        website traffic, or promote sales.
      </p>
      <KeyIdea>
        The format describes the creative; the objective describes the business
        result.
      </KeyIdea>

      <ChallengeBlock title="Practical task 2: plan a Meta campaign for Axis Towers (10 minutes)">
        <p>
          <strong>Scenario:</strong> a new coworking space called Axis Towers
          is opening in Tbilisi. It offers modern workstations, private
          offices, meeting rooms, and comfortable working areas for
          freelancers, entrepreneurs, and small businesses. The company wants
          to attract new members through Facebook and Instagram ads.
        </p>
        <p className="font-semibold">Your task:</p>
        <ol>
          <li>Choose the main advertising objectives for Axis Towers.</li>
          <li>
            Select two advertising formats:
            <ul>
              <li>one to increase brand awareness;</li>
              <li>one to generate leads.</li>
            </ul>
          </li>
          <li>
            Decide where the ads should appear: Facebook Feed, Instagram Feed,
            Stories, or Reels.
          </li>
          <li>Write a short headline to attract potential members.</li>
          <li>Write the ad copy.</li>
          <li>
            Create a call to action (CTA), such as <em>Book a Tour</em>,{" "}
            <em>Learn More</em>, or <em>Send Message</em>.
          </li>
          <li>Explain how Axis Towers will measure the campaign's success.</li>
          <li>
            Explain how the objectives, formats, and messages differ between
            the two ads.
          </li>
        </ol>
      </ChallengeBlock>

      <h3>WhatsApp marketing</h3>
      <p>
        WhatsApp marketing lets businesses talk to customers directly on
        WhatsApp. It is useful for sharing promotions, announcing new products,
        answering questions, providing support, and keeping customer
        relationships.
      </p>
      <p className="mb-1 font-semibold">Main types:</p>
      <ol>
        <li>
          <strong>Promotional messages:</strong> discounts, special offers, and
          new products.
        </li>
        <li>
          <strong>Business updates:</strong> company news, events, and new
          services.
        </li>
        <li>
          <strong>Product catalogues:</strong> product photos, descriptions,
          and prices shared through WhatsApp Business.
        </li>
        <li>
          <strong>Customer support messages:</strong> answering questions and
          helping customers with their orders.
        </li>
        <li>
          <strong>Automated messages:</strong> automatic greetings, away
          messages, and quick replies.
        </li>
        <li>
          <strong>Broadcast messages:</strong> the same message sent to many
          customers who agreed to receive it.
        </li>
      </ol>
      <p>
        <strong>Example:</strong> a clothing store sends customers a WhatsApp
        message announcing a new collection and a 15% weekend discount.
      </p>

      <h3>Email marketing</h3>
      <p>
        Email marketing lets businesses communicate with customers by email. It
        is useful for promoting products, sharing company news, announcing
        special offers, and building long-term customer relationships.
      </p>
      <p className="mb-1 font-semibold">Main types:</p>
      <ol>
        <li>
          <strong>Promotional emails:</strong> discounts, special offers, and
          product sales.
        </li>
        <li>
          <strong>Newsletters:</strong> regular company updates, useful
          information, and industry news.
        </li>
        <li>
          <strong>Welcome emails:</strong> introduce the business to new
          subscribers.
        </li>
        <li>
          <strong>Product announcement emails:</strong> introduce new products,
          services, or collections.
        </li>
        <li>
          <strong>Abandoned cart emails:</strong> remind customers who added
          products to their cart but did not complete the purchase.
        </li>
        <li>
          <strong>Transactional emails:</strong> automatic messages such as
          order confirmations, payment receipts, and delivery updates.
        </li>
      </ol>
      <Shots
        shots={[
          {
            n: 10,
            alt: "Sephora email inviting mobile users to download its app, with three benefit blocks and a holiday gift guide banner.",
          },
        ]}
      />
      <Callout type="warning" title="Get consent first">
        <p>
          WhatsApp and email both keep businesses in direct contact with
          customers. Send relevant messages, and get the customer's consent
          before sending marketing communications.
        </p>
      </Callout>

      <h3>X advertising</h3>
      <p>
        X Ads lets businesses promote content, products, and services through
        paid ads on X. It is often used for brand awareness, event promotion,
        public conversations, product announcements, and reaching people
        interested in specific topics.
      </p>
      <p className="mb-1 font-semibold">Main formats:</p>
      <ol>
        <li>
          <strong>Promoted posts:</strong> paid posts in users' feeds and other
          eligible placements.
        </li>
        <li>
          <strong>Image ads:</strong> visual content with accompanying text.
        </li>
        <li>
          <strong>Video ads:</strong> video that grabs attention and carries a
          brand message.
        </li>
        <li>
          <strong>Carousel ads:</strong> several images or videos users can
          browse.
        </li>
        <li>
          <strong>Vertical video ads:</strong> full-screen vertical video.
        </li>
      </ol>
      <p>
        <strong>Example:</strong> a technology company launches a new
        smartphone and promotes the announcement, demo videos, and launch
        information on X.
      </p>
      <Shots
        shots={[
          {
            n: 11,
            alt: "Promoted X post from Gadget Shopping in the For You feed, with a carousel of tech accessories on a yellow background.",
          },
        ]}
      />

      <h3>TikTok Ads</h3>
      <p>
        TikTok Ads lets businesses promote products and services through
        short-form video and other formats. It suits brands that want to reach
        people through creative video, product demos, entertainment, and
        creator-style ads.
      </p>

      <p>
        <strong>1. In-Feed Ads</strong> appear in the TikTok For You feed and
        look like regular TikTok videos. They can contain a video, caption,
        call-to-action button, and destination link.
      </p>
      <Shots
        shots={[
          {
            n: 12,
            alt: "TikTok In-Feed ad playing in the For You feed, with a call-to-action button under the caption.",
          },
        ]}
      />

      <p>
        <strong>2. TopView Ads</strong> are premium video placements that
        appear prominently when users open TikTok. This is not a standard ad
        available to every advertiser: TikTok says TopView is currently
        available only to qualified customers, often through a TikTok sales
        representative. It is not necessarily shown to every user every time
        they open the app; delivery depends on targeting, booking, and
        available inventory.
      </p>
      <Shots
        shots={[
          {
            n: 13,
            alt: "TikTok TopView ad: a full-screen video with the TikTok logo shown as the app opens, with “Swipe up to skip” at the bottom.",
          },
        ]}
      />

      <p>
        <strong>3. Lead Generation Ads</strong> let businesses collect
        potential customers' details through lead forms.
      </p>
      <Shots
        shots={[
          {
            n: 14,
            alt: "TikTok lead generation flow on three screens: the In-Feed ad, an instant form with email, name, and phone number, and a thank-you page.",
          },
        ]}
      />

      <p>
        <strong>4. Shopping Ads:</strong> in supported markets, TikTok offers
        shopping-related formats and integrations that connect ads with
        shopping experiences.
      </p>
      <Shots
        shots={[
          {
            n: 15,
            alt: "TikTok shopping flow: a video with a product link, the product detail page with Add to cart and Buy now, and the size selection screen.",
          },
        ]}
      />
      <Callout type="warning" title="TikTok and the Georgian market">
        <p>
          TikTok's currently published list of TikTok Shop markets does not
          include Georgia. Georgian businesses should not assume they can use
          TikTok Shop Ads. Instead, they can run campaigns that send customers
          to their own websites or online stores.
        </p>
      </Callout>

      <h3>Quick comparison of digital advertising channels</h3>
      <DataTable
        head={["Channel", "Particularly useful for"]}
        rows={[
          ["Google Search", "Reaching people actively searching for products or services."],
          ["Google Display", "Brand awareness and remarketing."],
          ["YouTube", "Video storytelling and brand awareness."],
          ["Facebook", "Broad audiences, leads, and sales."],
          ["Instagram", "Visual brands, engagement, and sales."],
          ["TikTok", "Short videos, discovery, and product promotion."],
          ["WhatsApp", "Conversations and customer enquiries."],
          ["Email", "Customer retention, promotions, and repeat sales."],
          ["X", "Conversations, news, and topical campaigns."],
        ]}
      />

      <h3>Mini task 3: choose the right advertising platform (5 minutes)</h3>
      <p>
        Individual or pair activity. Read each business situation and pick the
        most suitable digital advertising channel.
      </p>
      <ChoicePicker
        storageKey="04-channel-pick"
        options={channels}
        items={[
          "Someone is searching for a dentist.",
          "A fashion brand launches a new collection.",
          "A university wants to generate student applications.",
          "An online shop wants previous customers to buy again.",
          "A car dealer wants to promote a new car model.",
        ]}
      />
      <Callout type="reflect" title="Explain your choices">
        <p>
          There is no single right answer. Be ready to explain why you selected
          each platform.
        </p>
      </Callout>
    </section>

    {/* 03 */}
    <section id="how-advertising-works">
      <PartHeading number="03">How digital advertising works</PartHeading>

      <h3>Digital advertising objectives</h3>
      <p>
        Every campaign is created to reach specific business and marketing
        objectives. Choosing the right objective matters: it shapes how the
        campaign is designed, who sees the ad, and how success is measured.
      </p>

      <p>
        <strong>1. Brand awareness</strong> introduces a brand, product, or
        service to a wider audience, so more people recognise and remember the
        business.
      </p>
      <ul>
        <li>
          <em>Common formats:</em> Instagram Reels, TikTok videos, YouTube ads,
          Google Display banners, Facebook video ads.
        </li>
      </ul>

      <p>
        <strong>2. Traffic</strong> brings visitors to a website, landing page,
        or other digital destination, by getting people to click an ad and
        explore the company's products or services.
      </p>
      <ul>
        <li>
          <em>Common formats:</em> Google Search Ads, Instagram Feed ads,
          Facebook ads, TikTok In-Feed ads, Display ads.
        </li>
      </ul>

      <p>
        <strong>3. Engagement</strong> gets people to interact with social
        media content: likes, comments, shares, saves, and other
        platform-defined interactions.
      </p>
      <ul>
        <li>
          <em>Example:</em> a restaurant runs a Facebook ad featuring a new
          menu and asks users to comment on their favourite dish.
        </li>
        <li>
          <em>Main KPIs:</em> engagements, engagement rate, cost per
          engagement.
        </li>
      </ul>

      <p>
        <strong>4. Lead generation</strong> attracts people interested in a
        product or service and collects their contact details. Businesses use
        it to build a database of potential customers for future sales.
      </p>
      <ul>
        <li>
          <em>Common formats:</em> Facebook Instant Forms, Instagram Lead Ads,
          Google Search Ads leading to a form, TikTok Lead Generation Ads,
          landing page campaigns.
        </li>
        <li>
          <em>Main KPIs:</em> number of leads, cost per lead (CPL), lead
          quality.
        </li>
      </ul>

      <p>
        <strong>5. Sales and conversions</strong> generate purchases,
        bookings, registrations, or other valuable actions. Businesses measure
        results with tracking tools such as Meta Pixel, Google tag, and
        conversion tracking.
      </p>
      <ul>
        <li>
          <em>Common formats:</em> Google Search Ads, Google Shopping Ads, Meta
          sales campaigns, TikTok sales campaigns, remarketing ads.
        </li>
        <li>
          <em>Main KPIs:</em> purchases, cost per acquisition (CPA), conversion
          rate, revenue, return on ad spend (ROAS).
        </li>
      </ul>

      <h3>The most important advertising metrics</h3>
      <p>
        To know whether a campaign is working, marketers measure its
        performance.
      </p>
      <DataTable
        head={["Term", "Meaning", "Simple example"]}
        rows={[
          ["Impression", "One time an ad is displayed.", "An ad is shown 10,000 times."],
          ["Reach", "Number of unique people who saw the ad.", "7,000 people see the ad."],
          ["Frequency", "Average number of times each person saw the ad.", "Each person sees the ad 1.43 times on average."],
          ["Click", "A user clicks the ad.", "300 clicks."],
          ["CTR (click-through rate)", "Percentage of impressions that lead to a click.", "3%."],
          ["Engagement", "Interactions with content.", "Likes, comments, shares, and saves."],
          ["Conversion", "A desired action is completed.", "A purchase or registration."],
          ["Lead", "A potential customer's details or enquiry.", "Someone submits a form."],
        ]}
      />

      <h3>How much do advertisers pay? Pricing models</h3>
      <p>
        Platforms offer different pricing and bidding models. The five terms to
        know are CPC, CPM, CPA, CPL, and CPV.
      </p>
      <DataTable
        head={["Model", "What it means", "Example"]}
        rows={[
          [
            "CPC – cost per click",
            "You pay for each qualifying ad click.",
            <>
              €0.50 per click × 100 clicks = <strong>€50</strong>
            </>,
          ],
          [
            "CPM – cost per mille (1,000 impressions)",
            "You pay for every 1,000 ad impressions.",
            <>
              10,000 impressions ÷ 1,000 × €5 = <strong>€50</strong>
            </>,
          ],
          [
            "CPA – cost per acquisition / action",
            "What it costs to get a defined action, such as a completed purchase or booking.",
            <>
              €200 spent ÷ 10 purchases = <strong>€20 per purchase</strong>
            </>,
          ],
          [
            "CPL – cost per lead",
            "What each potential customer costs.",
            <>
              €300 spent ÷ 30 leads = <strong>€10 per lead</strong>
            </>,
          ],
          [
            "CPV – cost per view",
            "Used for video ads: you pay for qualifying video views.",
            "2,000 billable views: the total depends on the agreed cost per view.",
          ],
        ]}
      />

      <h3>Practical task 4: choose the right pricing model</h3>
      <p>
        Match each business situation with the most appropriate pricing model.
      </p>
      <Quiz
        questions={[
          {
            question:
              "A company wants to pay for every 1,000 times its banner ad is displayed.",
            options: pricingModels,
            answer: 1,
          },
          {
            question:
              "An online shop wants to measure how much it spends for each completed purchase.",
            options: pricingModels,
            answer: 2,
          },
          {
            question:
              "A university wants to collect contact details from students interested in its programmes.",
            options: pricingModels,
            answer: 3,
          },
          {
            question:
              "A business wants to pay when users click its Google Search ad.",
            options: pricingModels,
            answer: 0,
          },
          {
            question:
              "A brand wants to promote a TikTok video and pay for qualifying views.",
            options: pricingModels,
            answer: 4,
          },
        ]}
      />
    </section>

    {/* 04 */}
    <section id="homework">
      <PartHeading number="04">Homework: real client campaign</PartHeading>
      <ChallengeBlock title="Campaign planning project">
        <p>
          <strong>Your role:</strong> imagine that you are a digital marketing
          agency. A client comes to you because they want to promote their
          business, attract new customers, and increase sales.
        </p>
        <p>
          Your agency must prepare a campaign strategy and present it to the
          client.
        </p>
      </ChallengeBlock>

      <h3>Required elements of the campaign</h3>
      <ElementSteps
        elements={[
          {
            name: "Client and business overview",
            question:
              "Introduce the business, its products or services, and its target audience. Explain its main marketing challenge.",
          },
          {
            name: "Campaign objectives",
            question:
              "What does the client want to achieve: brand awareness, website traffic, leads, or more sales?",
          },
          {
            name: "Digital advertising channels",
            question:
              "Choose the most suitable platforms, explain why they fit, and say where the ads will appear.",
          },
          {
            name: "Creative concepts",
            question:
              "Develop at least two ad concepts: headlines and copy, suitable formats, example visuals, videos or banners, and calls to action.",
          },
          {
            name: "Advertising budget",
            question:
              "Decide the total ad budget, split it across the platforms, and explain why you chose that split.",
          },
          {
            name: "KPIs and campaign measurement",
            question:
              "Explain how success will be measured. Select KPIs such as reach, impressions, clicks, CTR, leads, CPL, purchases, CPA, and ROAS.",
          },
          {
            name: "Final presentation and client pitch",
            question:
              "Pitch it as to a real client: what you propose, why it fits, how it will work, what results to expect, and how the budget will be used.",
          },
        ]}
      />

      <h3>Before you hand it in</h3>
      <Checklist
        storageKey="04-homework-check"
        items={[
          "The client, its products, audience, and marketing challenge are introduced.",
          "The campaign objectives are clear.",
          "The channels are chosen and justified, with where the ads appear.",
          "At least two creative concepts, with headlines, copy, formats, visuals, and CTAs.",
          "The total budget and its split across platforms are explained.",
          "The KPIs are selected and explained.",
          "The pitch covers what, why, how, expected results, and budget use.",
        ]}
      />

      <KeyIdea>
        Final deliverable: a complete campaign strategy with creative concepts,
        budget, channels, and KPIs, presented as a professional agency pitch.
      </KeyIdea>
    </section>
  </LectureWrapper>
);

export default Lecture04;
