---
title: "Reviewing the Mikrotik hAP ax3"
excerpt: "My experience with a new Mikrotik Router"
date: 2024-11-08
author: koda
tags: [hardware, networking]
categories: [Blog]
layout: single
header:
  teaser: "/assets/images/sample-teaser.jpg"
  overlay_image: "/assets/images/sample-header.jpg"
---

## Starting the setup

I recently purchased a Mikrotik hAP ax3 router to replace my old Linksys Velop running a custom operating system called OpenWrt. The Mikrotik router is a bit more advanced than my previous router, so I wanted to document my experience setting it up.

## Initial Impressions

The router has 802.11ax support, which is a nice upgrade from my previous 802.11ac router. The build quality is solid, and the router has a sleek design. The router has a lot of features and feels like a professional-grade networking device.

## Current conditions to consider

Currently, I am living in a rented bedroom and the main modem/router is located on the second floor. The 5Ghz signal is unreliable on my Desktop's integrated WiFi card and the 2.4Ghz is unusable with the interference from other devices like microwaves and IoT devices. I mainly want to use the Mikrotik router as it's own private network with it's own firewall and DNS server and relay the internet connection from the 2nd floor modem/router without any downsides of double NAT.

## Setting up the Mikrotik Router

The hAP ax3 comes with a default configuration that assumes you are connecting it to a modem directly via it's WAN port. I had to download the recommended WinBox software to connect to the router and configure it manually.

### Enabling the DHCP Client on the 5GHz Radio

The first thing I did was to enable the DHCP client on the 5GHz radio. This allows the router to obtain an IP address from the main modem/router on the second floor with increased signal strength from the integrated 5Ghz radio and external 6db antennas.

### Disabling the 2.4GHz Radio

I disabled the 2.4GHz radio since there is no use for it in my current setup.

### Enabling DMZ on the 2nd Floor Modem/Router and setting a static IP for the Mikrotik from the 2nd floor modem/router

I enabled the DMZ on the 2nd floor modem/router and set a static IP for the Mikrotik router. This allows the Mikrotik router to have a public IP address and be accessible from the internet with it's own firewall having it's own private network that is isolated from my housemates.

### 2nd Floor Modem/Router Configuration

After setting up DMZ and setting a static IP for the Mikrotik router, I switched the 2nd floor modem/router's 5Ghz band to run at an uncontested channel and run it at 40Mhz bandwidth to increase reliability over speed.

### Setting up the DNS and DHCP server on the Mikrotik Router

I setup the DHCP server on the Mikrotik router on the subnet 192.168.88.x and set the DNS server to my local Adguard Home DNS server running on my Mini PC. I set the Mikrotik router to use the Adguard Home DNS server as the first DNS server, the 2nd floor modem/router as the 2nd DNS server, and the Cloudflare DNS server as the 3rd DNS server in cases of failure.

### Done!

## Everything is working as expected and I am happy with the performance of the Mikrotik router. The signal strength is much better than my previous router with 802.11ax support and the 6db antennas. The router has a lot of features and I am looking forward to exploring them further. I will update this post with more information as I continue to use the router.

![A sample image](https://via.placeholder.com/800x400)
