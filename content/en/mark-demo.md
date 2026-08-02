---
title: Mark shortcode demo
description: "Temporary page for tuning the hand-drawn annotation shapes."
draft: true
---

## Underline

One word: {{< mark >}}engineer{{< /mark >}}.

Three words: I'm a {{< mark >}}software engineer based{{< /mark >}} in Brazil.

Long phrase: {{< mark >}}a considerably longer phrase to stress the stretch{{< /mark >}}.

Inside a link and bold: {{< mark >}}**bold text** and a [link](/about){{< /mark >}}.

## Circle {{< mark shape="circle" >}}in a heading{{< /mark >}}

One word: {{< mark shape="circle" >}}engineer{{< /mark >}}.

Three words: I'm a {{< mark shape="circle" >}}software engineer based{{< /mark >}} in Brazil.

Long phrase: {{< mark shape="circle" >}}a considerably longer phrase to stress the stretch{{< /mark >}}.

## Marker

One word: {{< mark shape="marker" >}}engineer{{< /mark >}}.

Three words: I'm a {{< mark shape="marker" >}}software engineer based{{< /mark >}} in Brazil.

Long phrase: {{< mark shape="marker" >}}a considerably longer phrase to stress the stretch{{< /mark >}}.

## Box

One word: {{< mark shape="box" >}}engineer{{< /mark >}}.

Three words: I'm a {{< mark shape="box" >}}software engineer based{{< /mark >}} in Brazil.

Long phrase: {{< mark shape="box" >}}a considerably longer phrase to stress the stretch{{< /mark >}}.

## Colours

{{< mark color="primary" >}}primary{{< /mark >}},
{{< mark color="secondary" >}}secondary{{< /mark >}},
{{< mark color="warning" >}}warning{{< /mark >}},
{{< mark color="error" >}}error{{< /mark >}},
{{< mark >}}accent (default){{< /mark >}}.

{{< mark shape="marker" color="primary" >}}marker + primary{{< /mark >}} and
{{< mark shape="circle" color="error" >}}circle + error{{< /mark >}}.
