// Mission catalog. Point values, limits and caps are placeholders: edit freely.
//
// type:      "event"  = completes automatically from a system signal (Learning Center, Pendo, community activity)
//            "attest" = member confirms they did it (set approval:true to require review)
//            "proof"  = member submits a link or text; always reviewed
// proof:     "url" | "text"   (only for type "proof")
// audience:  ["All"] or any of the segment names in config.js
// limit:     times one member can earn it (default 1)
// cap:       max total awards across all members (null = unlimited)
// ends:      "YYYY-MM-DD" or null for evergreen
// image:     optional image URL or path, for example "assets/missions/forums.png" (admins can also upload one in the editor)
window.MB_MISSIONS = [

  // ---- Survey missions (Zealot "Complete Survey" style: intro, questions, required, conditional logic) ----
  { id: "forum-product", title: "Join your product forums", category: "Get started", type: "survey", kind: "Complete Survey", points: 100, audience: ["All"], visibility: "registered", limit: 1, cap: null, ends: null,
    description: "Tell us which products you use and we'll add you to the right discussion forums.",
    intro: "Welcome to the community! The most valuable part of the community is learning from each other. Complete this quick form to join the right discussion forums and earn 100 points.",
    questions: [
      { id: "q1", type: "checkbox", text: "Which of our products do you use?", options: ["Enterprise", "Elite", "WeTrack", "Analytics"], required: true, logic: null },
      { id: "q2", type: "checkbox", text: "Check the box next to each product forum you would like to join.", options: ["Enterprise", "Elite", "WeTrack", "Analytics", "No, thank you"], required: true, logic: null }
    ] },
  { id: "forum-vertical", title: "Join your vertical forums", category: "Get started", type: "survey", kind: "Complete Survey", points: 100, audience: ["All"], visibility: "registered", limit: 1, cap: null, ends: null,
    description: "Pick the industry forums that fit your venue so you can meet peers with similar workflows.",
    intro: "Complete this quick form to join the discussion forums for your industry and earn 100 points.",
    questions: [
      { id: "q1", type: "checkbox", text: "Which of our products do you use?", options: ["Enterprise", "Elite", "WeTrack", "Analytics"], required: true, logic: null },
      { id: "q2", type: "checkbox", text: "Join Enterprise forums by vertical. Check the box next to each forum you would like to join.", options: ["Conference & Convention Centers", "Corporate", "University Campuses & Higher Ed", "Stadiums & Arenas", "Performing Arts Centers", "No, thank you"], required: true, logic: { q: "q1", op: "contains", value: "Enterprise" } }
    ] },
  { id: "dash-build", title: "Analytics: build a dashboard", category: "Analytics", type: "survey", kind: "Complete Survey", points: 60, audience: ["Analytics"], visibility: "segments", limit: 1, cap: null, ends: null,
    description: "Watch the walkthrough, build your own dashboard, then confirm both steps.",
    intro: "Two quick steps: learn how, then build your own.",
    questions: [
      { id: "q1", type: "ack", text: "Learn: Watch the video about building your own custom dashboard.", options: ["I have watched the video."], required: true, logic: null },
      { id: "q2", type: "ack", text: "Build: Create and save your first dashboard.", options: ["I have built and saved my dashboard."], required: true, logic: null }
    ] },
  { id: "avatar", title: "Add a profile picture", category: "Get started", type: "event", points: 10, audience: ["All"], limit: 1, cap: null, ends: null,
    description: "Upload a photo to your community profile. Completes automatically once the picture is saved." },
  { id: "intro", title: "Community connection: make your introduction", category: "Get started", type: "event", points: 15, audience: ["All"], limit: 1, cap: null, ends: null,
    description: "Post a short introduction in the welcome space: your role, what you use the product for, and one thing you want to learn." },
  { id: "tip", title: "Share your favorite product tip or trick", category: "Get started", type: "proof", proof: "url", points: 30, audience: ["All"], limit: 3, cap: null, ends: null,
    description: "Post a tip in the community, then paste the link to your post. Reviewed for quality before points are added." },

  { id: "learning-center", title: "Explore the Learning Center", category: "Learn", type: "event", points: 20, audience: ["Elite"], limit: 1, cap: null, ends: null,
    description: "Open the Learning Center and start any course. Completes automatically from Learning Center activity." },
  { id: "train-access", title: "Training: Access Management", category: "Learn", type: "event", points: 50, audience: ["Enterprise"], limit: 1, cap: null, ends: "2026-10-30",
    description: "Finish the Access Management course. Points are added when the Learning Center reports completion." },
  { id: "train-insights", title: "Training: Insights Admin 101", category: "Learn", type: "event", points: 50, audience: ["Elite"], limit: 1, cap: null, ends: "2026-11-18",
    description: "Finish the Insights Admin 101 course. Points are added when the Learning Center reports completion." },
  { id: "functions-pro", title: "Functions Pro learner", category: "Learn", type: "event", points: 60, audience: ["Enterprise"], limit: 1, cap: 300, ends: "2026-10-30",
    description: "Complete the Functions Pro learning path. Limited to the first 300 learners." },
  { id: "first-impact", title: "First impact moment", category: "Learn", type: "attest", approval: false, points: 30, audience: ["All"], limit: 1, cap: null, ends: "2026-12-31",
    description: "Tell us about the first result you got from the product. Add a sentence in the note field." },

  { id: "dash-style", title: "Analytics: dashboard styling makeover", category: "Analytics", type: "attest", approval: true, points: 40, audience: ["Analytics"], limit: 1, cap: null, ends: null,
    description: "Restyle one of your dashboards using the styling guide, then submit it for review." },
  { id: "dash-detective", title: "Analytics: dashboard detective", category: "Analytics", type: "attest", approval: true, points: 40, audience: ["Analytics"], limit: 1, cap: null, ends: null,
    description: "Use a dashboard to find an insight your team didn't know. Describe what you found in the note field." },

  { id: "li-follow", title: "Follow us on LinkedIn", category: "Advocacy", type: "proof", proof: "url", points: 10, audience: ["Advocates"], limit: 1, cap: 25000, ends: "2027-12-31",
    description: "Follow the company page, then paste a link to your LinkedIn profile as proof." },
  { id: "li-share", title: "Share our LinkedIn post with your thoughts", category: "Advocacy", type: "proof", proof: "url", points: 25, audience: ["Advocates"], limit: 1, cap: 10000, ends: null,
    description: "Share the featured post with a comment of your own, then paste a link to your post." },
  { id: "li-comment", title: "Comment on our LinkedIn post", category: "Advocacy", type: "proof", proof: "url", points: 20, audience: ["Advocates"], limit: 1, cap: 100000, ends: null,
    description: "Leave a comment on the featured post and paste a link to your comment." },
  { id: "li-repost", title: "Repost us on LinkedIn", category: "Advocacy", type: "proof", proof: "url", points: 20, audience: ["Advocates"], limit: 1, cap: 10000, ends: null,
    description: "Repost the featured post and paste a link to your repost." },
  { id: "refer", title: "Refer a friend to join our advocacy program", category: "Advocacy", type: "proof", proof: "text", points: 100, audience: ["Advocates"], limit: 5, cap: 35000, ends: null,
    description: "Tell us who you referred: their name, company and work email. Points are added once they join." },
  { id: "capterra", title: "Submit an online Capterra review", category: "Advocacy", type: "proof", proof: "url", points: 120, audience: ["Advocates"], limit: 1, cap: 30000, ends: "2026-12-31",
    description: "Write a review on Capterra and paste the link to it." },
  { id: "g2", title: "Submit an online G2 review", category: "Advocacy", type: "proof", proof: "url", points: 120, audience: ["Advocates"], limit: 1, cap: 30000, ends: "2026-12-31",
    description: "Write a review on G2 and paste the link to it." },

  { id: "beta-enterprise", title: "Opt in to the Enterprise beta program or product research", category: "Beta and research", type: "attest", approval: true, points: 80, audience: ["Enterprise"], limit: 1, cap: 300000, ends: "2026-12-31",
    description: "Complete the intake form, then confirm here. A team member checks the form before points are added." },
  { id: "beta-elite", title: "Opt in to the Elite beta program or product research", category: "Beta and research", type: "attest", approval: true, points: 80, audience: ["Elite"], limit: 1, cap: 300000, ends: "2026-12-31",
    description: "Complete the intake form, then confirm here. A team member checks the form before points are added." },
  { id: "beta-wetrack", title: "Opt in to the WeTrack beta program or product research", category: "Beta and research", type: "attest", approval: true, points: 80, audience: ["WeTrack"], limit: 1, cap: 300000, ends: "2026-12-31",
    description: "Complete the intake form, then confirm here. A team member checks the form before points are added." }
];
