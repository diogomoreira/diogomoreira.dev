---
title: Polaroid shortcode demo
description: "Temporary page for tuning the polaroid photo frame."
draft: true
---

## Default

No params beyond `src` — natural ratio, 340px wide, centred, slight right lean.

{{< polaroid src="/images/pages/about.jpg" alt="A wide landscape photo" >}}

## Tilt

Left:

{{< polaroid src="/images/picks/luv-sic.jpg" alt="Square album art" tilt="left" caption="tilt=\"left\"" >}}

Right (default):

{{< polaroid src="/images/picks/luv-sic.jpg" alt="Square album art" tilt="right" caption="tilt=\"right\" (default)" >}}

Straight:

{{< polaroid src="/images/picks/luv-sic.jpg" alt="Square album art" tilt="0" caption="tilt=\"0\"" >}}

Arbitrary degrees:

{{< polaroid src="/images/picks/luv-sic.jpg" alt="Square album art" tilt="-7" caption="tilt=\"-7\"" >}}

## Ratio

Natural (default) — a tall source stays tall:

{{< polaroid src="/images/picks/paprika.jpg" alt="Paprika poster" caption="natural, 1000×1500 source" >}}

Square — the same tall source, centre-cropped:

{{< polaroid src="/images/picks/paprika.jpg" alt="Paprika poster" ratio="square" caption="ratio=\"square\"" >}}

Portrait (4:5), from a wide source:

{{< polaroid src="/images/pages/about.jpg" alt="A wide landscape photo" ratio="portrait" caption="ratio=\"portrait\"" >}}

Landscape (3:2), from a square source:

{{< polaroid src="/images/profile/profile.jpg" alt="Profile photo" ratio="landscape" caption="ratio=\"landscape\"" >}}

## Width

{{< polaroid src="/images/picks/luv-sic.jpg" alt="Square album art" width="200" caption="width=\"200\"" >}}

{{< polaroid src="/images/picks/luv-sic.jpg" alt="Square album art" width="340" caption="width=\"340\" (default)" >}}

{{< polaroid src="/images/picks/luv-sic.jpg" alt="Square album art" width="480" caption="width=\"480\"" >}}

## Captions

None (the bottom strip should still be there):

{{< polaroid src="/images/picks/luv-sic.jpg" alt="Square album art" >}}

Short:

{{< polaroid src="/images/picks/luv-sic.jpg" alt="Square album art" caption="Nujabes, 2005" >}}

With markdown — bold and a link:

{{< polaroid src="/images/picks/luv-sic.jpg" alt="Square album art" caption="**Luv(sic)** — see [picks](/picks)" >}}

Long enough to wrap several times:

{{< polaroid src="/images/picks/luv-sic.jpg" alt="Square album art" width="240" caption="A deliberately long caption to check how the strip grows, whether the text balances across lines, and that the frame stays put while it does" >}}

## Float

Text should wrap cleanly beside the print, with no rotated corner cutting into a line.

{{< polaroid src="/images/picks/paprika.jpg" alt="Paprika poster" align="left" width="220" caption="align=\"left\"" >}}

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

{{< polaroid src="/images/picks/paprika.jpg" alt="Paprika poster" align="right" width="220" caption="align=\"right\"" >}}

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.

Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.

Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.

## Group

Three prints — leans should alternate and the frames should overlap slightly:

{{< polaroid-group >}}
{{< polaroid src="/images/picks/luv-sic.jpg" alt="Square album art" ratio="square" caption="One" >}}
{{< polaroid src="/images/picks/paprika.jpg" alt="Paprika poster" ratio="square" caption="Two" >}}
{{< polaroid src="/images/profile/profile.jpg" alt="Profile photo" ratio="square" caption="Three" >}}
{{< /polaroid-group >}}

Five, to force the row to wrap:

{{< polaroid-group >}}
{{< polaroid src="/images/picks/luv-sic.jpg" alt="Square album art" ratio="square" >}}
{{< polaroid src="/images/picks/paprika.jpg" alt="Paprika poster" ratio="square" >}}
{{< polaroid src="/images/profile/profile.jpg" alt="Profile photo" ratio="square" >}}
{{< polaroid src="/images/pages/about.jpg" alt="A wide landscape photo" ratio="square" >}}
{{< polaroid src="/images/pages/uses.jpg" alt="Desk photo" ratio="square" >}}
{{< /polaroid-group >}}

A group with an explicit `tilt` on one member — that one should keep its own angle
while the rest alternate:

{{< polaroid-group >}}
{{< polaroid src="/images/picks/luv-sic.jpg" alt="Square album art" ratio="square" >}}
{{< polaroid src="/images/picks/paprika.jpg" alt="Paprika poster" ratio="square" tilt="0" caption="tilt=\"0\"" >}}
{{< polaroid src="/images/profile/profile.jpg" alt="Profile photo" ratio="square" >}}
{{< /polaroid-group >}}

## Edge cases

Narrow print, floated left, beside a short paragraph:

{{< polaroid src="/images/picks/luv-sic.jpg" alt="Square album art" align="left" width="200" ratio="square" >}}

Short paragraph. Below 40rem this should stop floating and centre itself instead.

Very wide `width` — capped by the 65ch measure, not by the value:

{{< polaroid src="/images/pages/about.jpg" alt="A wide landscape photo" width="900" caption="width=\"900\"" >}}
