# Content & Asset Tracking

Running list of placeholders and pending items from the homepage rewrite (and
what's still queued for the rest of the site). Update this as things land.

## Homepage — done, but with open threads

- [ ] **Stories & Publications** (`/stories/`): page exists with a real
      "coming soon" state for all four categories per the latest copy doc
      (Stories, Field Notes, Publications, Newsletters — renamed from an
      earlier draft's "Reports"), linked from the homepage and with a
      dedicated newsletter signup CTA. Needs real content — PDFs,
      write-ups, images — once available.
- [ ] **Newsletter PDFs**: `assets/newsletters/` exists (empty, with a
      `.gitkeep`) ready to hold static newsletter PDF files. The
      Newsletters section on `/stories/` has a commented-out example of
      the `<ul class="newsletter-list">` markup to use once issues exist
      — swap the placeholder text for that list.
- [ ] **Donate page** (`/donate/`): bank transfer details + registration
      numbers only, since there's no payment gateway yet. If a UPI/card
      gateway gets set up later, add it here and to the homepage Support
      section.
- [ ] **Five communities — naming inconsistency across pages.** The
      homepage's "Community Ownership in Action" section (per the new copy
      doc) names them as *Hajong, Garo, Dalu, Koch and Bengali-speaking*.
      The Roots & Belonging sections already published on What We Do and
      Programs (from an earlier session) name them as *Hajong, Dalu, Garo,
      Bengali Hindu and others*. Worth reconciling to one definitive list
      across the site — flag which is correct.
- [ ] **CML (Tata Trust) and Snehjori** are now named as Apollo Library
      partners on the homepage, but not yet added to the Partners grid on
      What We Do (`/what-we-do/#partners`, currently: SELCO Foundation,
      Free Library Network, TISS, IIT Guwahati, Krishi Vigyan Kendra).
- [ ] **"How We Work"** hero button currently anchors to `#approach` on the
      homepage itself (the Recognise/Resource/Represent section). If this
      should instead be its own dedicated page, say so.

## Still pending real photos (currently icon placeholders)

- Pottery workshop (What We Do page card, and previously the homepage
  story-feature)
- Photography workshop (What We Do page card)

## Governance page

- Two portrait headshots exist in the gallery (`newsletter-21.jpg`,
  `newsletter-24.jpg`) but are NOT assigned to any of the six team members
  on `/governance/` — avatars still show initials. Needs confirmation of
  who's who before assigning (guessing wrong would misattribute a photo to
  the wrong person).

## Rest of the site — awaiting their own content pass

Home, Our Story, What We Do, Programs and Get Involved (now "Join Us") are
done per the new copy docs. Still using the older voice/content:

- `/governance/`
- `/contact/`

### Site-wide footer — replaced

Every page's footer was rebuilt to the new 4-column spec: brand + tagline
+ "Recognition · Resources · Representation", then Explore / Connect /
Contact columns. The old newsletter-signup box is gone from the footer
(the signup now lives on its own on `/stories/`). Two judgment calls:
- Spec listed exactly 3 social links under Connect (Instagram, LinkedIn,
  Facebook) with no page link — added a small "Get in touch →" link to
  `/contact/` under that column so the dedicated contact page stays
  reachable from the footer. Flag if that shouldn't be there.
- The Explore list doesn't include Governance or Contact (per spec) —
  Governance is still reachable from the header nav and Our Story;
  Contact now only via the Connect column's added link and the header.

### Get Involved (now "Join Us") page — notes

- Renamed from "Be an Ally" to "Join Us" / the five sections (Work,
  Volunteer, Partner, Donate, Become an Ally) all funnel into one
  contact form at the bottom, per the doc's repeated "[Scroll to Contact
  form at bottom of the page]" instruction — kept the existing
  formsubmit.co form rather than embedding an actual Google Form, to
  stay consistent with how every other form on the site works. Flag if
  a real Google Form embed is wanted instead.
- The Donate section's "[Show static donation details: Bank and QR]"
  now links to the Google Drive PDF you shared. Also added that same
  link to `/donate/` (as "View as PDF, with QR code") since the typed-out
  bank rows there don't include the QR image.
- Header nav CTA button still says "Be an Ally" (unchanged) — it's
  literally one of the five sections on this page, so it still reads
  correctly as a call to action even though the page itself is now
  titled "Join Us."

### Programs page — notes

- Added a new "Our Programs" overview section right after the hero: five
  cards (Apollo Program, Apollo Library, Creative Livelihoods, Community
  & Learning Workshops, Summer Camp) from the new doc, each linking down
  to the fuller detail on What We Do or further down this same page.
  Everything else on this page (the day-by-day Summer Camp breakdown,
  self-funding story, critical reflections, photo gallery, Roots &
  Belonging, live activity feed) is much more granular/specific than
  the new doc covers, so it was all kept as-is rather than replaced —
  the new copy reads as a menu/overview layer sitting on top of it.
- Fixed the last "₹0 external funding" stat on the site (the Summer
  Camp stat card + the self-funding story paragraph) to the accurate
  45.74% community-funded figure, matching the fix already made on the
  homepage.

### What We Do page — notes

- Restructured around the Recognition/Resources/Representation pillars
  from the new doc, with existing concrete content nested under whichever
  pillar it illustrates: Livelihood cards + Apollo Library + Partners
  under Resources (this follows the new copy's own internal references
  — it explicitly names Apollo Library and partnerships as Resources
  examples); Apollo Program + the APOLLO six-step grid under
  Representation.
- Added CML (Tata Trust) and Snehjori to the Partners grid here too, now
  that they're named as Apollo Library collaborators (previously only on
  the homepage).
- New "Our Exit Plan" section, previously not a distinct section on this
  page (there's a similar "Where We Are Going" on Our Story — these two
  are worded differently per their respective docs, both kept as-is).

### Our Story page — notes

- The old "Mission & Vision" section (separate Vision/Mission value-cards)
  was replaced by the new "Today: Recognition, Resources, Representation"
  + "Where We Are Going" sections, since they cover the same ground with
  the doc's updated framing. The old Vision/Mission copy is gone, not kept
  alongside it — flag if that should come back in some form.
- Kept "Values, in Color" and "Focus Areas" (bg-moss) as bonus sections not
  mentioned in the new copy doc, same as the homepage's precedent of
  weaving existing sections in rather than dropping them.
- Every page's footer link that pointed to `our-story/#values` labeled
  "Mission & Values" now points to `our-story/#today` labeled "Recognition,
  Resources, Representation" instead, since the old anchor content moved.

Send over content for these in the same format as the homepage doc when
ready, and flag anything that should change in the nav or footer structure
(e.g. adding Donate/Stories to the main nav, not just the footer).
