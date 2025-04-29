---
title: "Setting up the Mikrotik hAP ax3"
excerpt: "A Solid Well-Built Upgrade from OpenWrt"
date: 2024-11-08
author: koda
tags: [hardware, networking]
categories: [Blog]
layout: single
# header:
#   teaser: "/assets/images/sample-teaser.jpg"
#   overlay_image: "/assets/images/sample-header.jpg"
---
## Introduction

After dealing with inconsistent wireless performance and an aging Linksys Velop running OpenWrt, I finally decided to upgrade to a MikroTik hAP ax³. It’s a pretty serious little router — solid build quality, Wi-Fi 6 support, and way more control than your average consumer gear. Since this router is a bit more advanced than my last setup, I wanted to write a quick post walking through the install and setup experience in my current living situation.

## First Impressions

- The router supports 802.11ax (Wi-Fi 6), which is a notable jump from my previous 802.11ac setup.
- Build quality is excellent — feels like a prosumer-grade device.
- The web UI is basic, but WinBox gives you total control, albeit with a learning curve.

## Environment: A Rented Room, 2 Floors Down

I’m currently renting a bedroom, and the main modem/router is on the second floor. That matters because:

- My desktop’s built-in Wi-Fi struggles with 5GHz signal from upstairs.
- 2.4GHz is a disaster due to interference from household devices and IoT noise.
- I wanted my own private, isolated network with its own DNS, DHCP, and firewall.
- No double NAT — that was a must.

## Setup Steps

### 1. Connecting via WinBox

The MikroTik router ships with a default config that assumes direct WAN connection to a modem. That’s not my use case, so I used the recommended [WinBox](https://mikrotik.com/download) app to log in and start setting things up manually. Definitely worth using over the web interface.

### 2. Enabling DHCP Client on 5GHz Radio

To get internet access, I enabled the DHCP client on the 5GHz radio. This allowed the router to pull an IP from the second-floor modem/router via Wi-Fi. With the integrated high-gain 6dB antennas, signal quality was much better than the built-in Wi-Fi card in my PC.

### 3. Disabling 2.4GHz Radio

Since 2.4GHz is basically unusable in my situation (too much interference), I just disabled it outright.

### 4. Enabling DMZ and Assigning a Static IP

On the second-floor Bell modem/router:

- I enabled **DMZ** and assigned a **static IP** to the MikroTik router.
- This gives the MikroTik a public IP (or more accurately, full exposure through NAT), allowing it to run its own firewall and private LAN while staying isolated from the rest of the house network.

### 5. Optimizing the Second-Floor Router

To make the 5GHz connection more stable:

- I set the upstream router’s 5GHz channel to an **uncontested channel**.
- Switched the bandwidth to **40MHz** — a good balance between stability and speed.

### 6. DHCP + DNS Server Setup on MikroTik

Now that I had internet on the MikroTik:

- I set up the **DHCP server** with the subnet `192.168.88.x`.
- DNS is handled by my **AdGuard Home instance** running on a local mini PC.
- DNS order:
  1. Local AdGuard Home
  2. 2nd floor modem/router
  3. Cloudflare (1.1.1.1) as a fallback

The default firewall rules were already solid — didn’t need to change anything there.

## Final Thoughts

So far, the MikroTik hAP ax³ has been rock solid. Signal strength is significantly better than the OpenWrt Velop I was using before. Having full control over firewall, DHCP, and DNS in one box while avoiding double NAT is a huge win — especially in a shared living setup.

I’m planning to explore more of the MikroTik feature set over time, especially around VLANs, queues, and scripting. Will update this post if anything major changes.
