---
title: "Using Moonlight and Apollo to Turn an iPad Pro into a Virtual Display"
excerpt: "A look into solving my ultrawide fullscreen multitasking issue with Apollo and Moonlight, avoiding costly and underperforming alternatives."
date: 2025-03-06
author: koda
tags: [moonlight, iPad, Apollo, virtual display, gaming, streaming]
categories: [Tech]
layout: single
header:
  teaser: "/assets/images/sample-teaser.jpg"
  overlay_image: "/assets/images/sample-header.jpg"
---

## Solving My Fullscreen Multitasking Issue  

I’ve been using an ultrawide monitor for a while now, and while it’s great for productivity, I’ve run into an issue when running fullscreen applications. There are times when I need to keep an eye on a second app—whether it's monitoring logs, keeping chat open, or referencing documentation—but fullscreen mode locks me into a single application.  

Splitting the screen isn’t always ideal, and running apps in borderless windowed makes multitasking impossible. I needed a solution that would let me have a second display without sacrificing fullscreen immersion on my main monitor. 

I've used Apple's sidecar on my Macbook but it's not available on Windows. I wanted to find a use for my M1 iPad Pro which I only use for notetaking anyways and make some value out of it...

---

## Searching for a Second Display Solution  

I looked on the AppStore and found **Duet Display**, but it required an account, subscription and a constant connection to their servers just to use it. I then tried spacedesk, which was free, but the performance wasn’t great. Display was running at around 600-720p and had high latency and noticeable compression artifacts.  

My PC has an RTX 4070 Super with **NVENC** and an , I wanted something that could take advantage of **H.265 (HEVC) encoding** for low-latency, high-quality streaming. The iPad Pro also has a **120Hz display**, so any solution locked to 60Hz wasn’t going to cut it.  

After digging through the internet to find some FOSS options instead, I found a fork of Sunlight, **Apollo** which open-source virtual display driver combined with Sunlight (Server App). Combined with **Moonlight** (The Client App) on the App Store, the setup seemed feasible.

---

## Setting Up Apollo and Moonlight  

### 1. Install Apollo on Windows  

Apollo acts as a virtual display driver, creating a second screen that Windows recognizes as a real monitor.  

- Remove any existing virtual display drivers for conflict prevention.
- Download and install **Apollo** from [GitHub](https://github.com/ClassicOldSong/Apollo).  
- Go to **Windows Display Settings** and ensure the virtual monitor is detected.  


### 2. Enable Moonlight for Streaming  

Moonlight is an open-source client for Sunshine, originally designed for gaming but perfect for low-latency desktop streaming.  

- Install Moonlight on the iPad from the App Store.  
- Ensure that Apollo is running and the virtual display is detected.
- Ensure both the **PC and iPad are on the same network** (Gigabit Wired LAN for the PC, low-latency Wi-Fi 6 for the iPad).  

---

## Optimizing the Experience on iPad  

To make Moonlight work seamlessly as a virtual display, I adjusted a few settings on the iPad side:  

- **Turned on "Allow Play Audio on PC"** to prevent unnecessary audio redirection.  
- **Disabled on-screen controls** to keep the virtual display clean.  
- Clicked the **"Virtual Desktop"** icon in Moonlight to start streaming the Apollo display.  

The iPad now acts as a **wireless 120Hz secondary display**, perfect for monitoring applications while keeping my main ultrawide display dedicated to fullscreen tasks.  

---

## Performance and Final Thoughts  

Using Apollo and Moonlight together resulted in **near-native performance**, with **no noticeable input delay**. The **H.265/HEVC support** ensures minimal compression artifacts, and **120Hz streaming** makes the experience feel incredibly smooth.  

Compared to **Duet Display** and **spacedesk**, this setup is:  

- **Completely free** with no paywalls or subscriptions + free and open-source software.
- **Higher performance**, thanks to NVIDIA's NVENC and Apple's HEVC decoding.  
- **More flexible**, allowing for a **true virtual display experience** rather than just mirroring.  

If you have an **M1 iPad Pro** and a **NVIDIA GPU**, this is one of the best ways to get a high-quality, high-refresh-rate second display without any additional hardware.  

---
