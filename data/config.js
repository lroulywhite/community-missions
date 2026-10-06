// Edit this file to rebrand the board, change tiers/rewards, or connect an award service.
window.MB_CONFIG = {
  brand: {
    name: "Community missions",
    tagline: "Complete missions, earn points, unlock rewards.",
    // Drop the approved reverse logo into assets/ with EXACTLY this file name. Do not edit or recreate it.
    logoUrl: "assets/momentus-logo-reverse-rgb-864px_72ppi.png",
    // Optional decorative star, shown at ~14% opacity bleeding off the header's top-right corner.
    watermarkUrl: "assets/momentus_star_watermark.png",
    // Optional: adds a "Back to the Customer Hub" link in the footer.
    hubUrl: ""
  },

  // Customer Hub design tokens (match the Digest-Monthly prototype).
  theme: {
    ink: "#1c1e61",      // headings, header gradient start, footer
    primary: "#4146e0",  // buttons, links, focus
    violet: "#9B59B6",   // outlined pills, header gradient end
    accent: "#674DE6",   // secondary accent (Elite tier color)
    page: "#e9e5e1",     // page background
    text: "#555770",     // body copy
    meta: "#68737d",     // muted/meta text
    border: "#e6e0dc",   // card borders
    divider: "#f2f2f7"   // dividers
  },

  // Default tile color per mission category (a two-color gradient). A mission with an uploaded image uses the image instead.
  categories: {
    "Get started":       { from: "#1c1e61", to: "#4146e0" },
    "Learn":             { from: "#4146e0", to: "#9B59B6" },
    "Analytics":         { from: "#674DE6", to: "#4146e0" },
    "Advocacy":          { from: "#9B59B6", to: "#674DE6" },
    "Beta and research": { from: "#1c1e61", to: "#9B59B6" }
  },

  // When set, every event is also POSTed to `${apiBase}/events` (see README + worker/).
  apiBase: null,

  segments: ["Enterprise", "Elite", "Analytics", "WeTrack", "Advocates"],

  // Tier thresholds are based on LIFETIME points (they never go down on redemption).
  tiers: [
    { id: "rookie", name: "Rookie", min: 0 },
    { id: "contributor", name: "Contributor", min: 100 },
    { id: "champion", name: "Champion", min: 300 },
    { id: "trailblazer", name: "Trailblazer", min: 600 }
  ],

  // Rewards are paid from the SPENDABLE balance. `tier` locks a reward to a minimum tier.
  rewards: [
    { id: "gc10",    title: "$10 digital gift card",    kind: "Digital",  cost: 150, tier: null },
    { id: "swag",    title: "Swag pack",                kind: "Physical", cost: 300, tier: null },
    { id: "roadmap", title: "Product roadmap session",  kind: "Benefit",  cost: 400, tier: "champion" },
    { id: "pass",    title: "Conference pass discount", kind: "Benefit",  cost: 700, tier: "trailblazer" }
  ]
};
