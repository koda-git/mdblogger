---
title: "Setting up the Mikrotik hAP ax³"
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

After dealing with inconsistent wireless performance and an aging Linksys Velop AC running OpenWrt, I finally decided to upgrade to a MikroTik hAP ax³. It’s a pretty serious little router with solid build quality, Wi-Fi 6 support, and way more control than your average consumer gear. Since this router is a bit more advanced than my last setup, I wanted to write a quick post walking through the install and setup experience in my current living situation.

## First Impressions

- The router supports 802.11ax (Wi-Fi 6), which is a notable jump from my previous 802.11ac setup.
- Build quality is excellent — it feels like a prosumer-grade device.
- The web UI is decent but looks complicated, **WinBox** is a nice client app as a bonus that gives you total control (with a learning curve).

## Environment: A Rented Room, A floor down from main AP
 
I’m currently renting a bedroom, and the main modem/router is on the second floor. That matters because:

- No ethernet ports in my room ?!?! , an aging coaxial cabling exists but I'm renting and don't want mess with setting up a whole new MoCA setup.
- My desktop’s built-in Wi-Fi struggles with 5GHz signal from upstairs.
- 2.4GHz is noisy due to interference from microwaves and nearby IoT devices.
- I wanted my own private, isolated network with its own DNS, DHCP, and firewall.
- No double NAT — god the amount of problems that causes...

## Setup Steps

### 1. Connecting via WinBox

The MikroTik router ships with a default config that assumes direct WAN connection to a modem. That’s not my use case, so I used the recommended [**WinBox**](https://mikrotik.com/download) app to log in and start setting things up manually with a dedicated client app on supported platforms (Windows & macOS in my case).

### 2. Enabling DHCP Client on 5GHz Radio

To get internet access, I enabled the DHCP client on the 5GHz radio. This allowed the router to pull an IP from the second floor modem/router via Wi-Fi. With the integrated high-gain 6dB antennas, signal quality was much better than the built-in Wi-Fi card in my PC.

### 3. Switching the 2.4GHz Radio Mode

I configured the 2.4GHz radio on the MikroTik to operate in **AP mode only** and added it to the main bridge interface along with other LAN ports. This allows the router to act as a wireless AP for basic wireless devices.

This decision wasn’t just due to microwave or IoT interference — the 2.4GHz band also lacked the speed and low latency needed for a reliable WAN connection to my desktop. Prioritizing 5GHz for primary traffic provided much better performance.

### 4. Enabling DMZ and Assigning a Static IP

On the second floor Bell modem/router:

- I enabled **DMZ** and assigned a **Static IP** to the MikroTik router.
- This gives the MikroTik a public IP (or full exposure through NAT), allowing it to run its own firewall and private LAN while staying isolated from the rest of the house network.

### 5. Optimizing the Second Floor Router

To make the 5GHz connection more stable:

- I set the upstream router’s 5GHz channel to an unused one using NetSpot.
- Switched the channel bandwidth to 40MHz — a good balance between stability and speed.

### 6. DHCP + DNS Server Setup on MikroTik

Now that the MikroTik had internet access:

- I set up the DHCP server with the subnet `192.168.88.x`.
- DNS is handled by my **AdGuard Home** instance running on a local mini PC.
- DNS fallback order:
  1. Local **AdGuard Home**
  2. 2nd floor modem/router
  3. **Cloudflare (1.1.1.1)**

The default firewall rules after reviewed by me were solid out of the box, no changes needed. (Thankfully)

## Final Thoughts

So far, the MikroTik hAP ax³ has been rock solid. Signal strength is significantly better than the OpenWrt Velop I was using before. Having full control over firewall, DHCP, and DNS in one box while avoiding double NAT is a huge win, especially in a shared living setup + my roommates can't access my subnet. 

TODO: might add a VLAN for the sketchy IoT devices later...

I’m planning to explore more of the MikroTik feature set over time, especially around VLANs, queues, and scripting. Will update this post if anything major changes.
