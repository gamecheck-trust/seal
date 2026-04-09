# Gamecheck SEAL Loader Script

**Official Repository for the SEAL Loader Script**

---

## Purpose

This script is made **public and generic** to allow our partners and clients to:

- Verify the **transparency** of the script's functionality
- Validate the **change log** with every update
- Confirm that the script operates strictly within its documented scope

---

## What This Script Does

This script has **one single responsibility**: it injects the Gamecheck SEAL into the client's specified container element:

```html
<div id="trust-seal-container"></div>
```

That's it. Nothing more.

---

## What This Script Does NOT Do

To ensure full transparency, this script **categorically does not** read, write, access, or interact with any of the following client-side storage or data mechanisms:

- **Cookies** — does not read, set, or modify any cookies
- **Local Storage** (`localStorage`) — no read or write operations
- **Session Storage** (`sessionStorage`) — no read or write operations
- **IndexedDB** — no database creation, reading, or writing
- **Web SQL** (deprecated) — no interaction whatsoever
- **Cache API** (`CacheStorage`) — does not cache or retrieve any resources
- **Service Workers** — does not register, install, or communicate with any service workers
- **Shared Workers / Web Workers** — does not spawn or interact with any background workers
- **WebSockets** — does not open or listen on any WebSocket connections
- **Broadcast Channel API** — does not send or receive any cross-tab messages
- **Window.postMessage** — does not send or listen for cross-origin messages
- **Clipboard API** — does not read from or write to the clipboard
- **Geolocation API** — does not request or access location data
- **Camera / Microphone** (`getUserMedia`) — does not request or access any media devices
- **Notification API** — does not request permission or send notifications
- **Browser Fingerprinting** — does not collect canvas, WebGL, audio, or font fingerprinting data
- **DOM outside scope** — does not read, modify, or interact with any part of your page outside the `trust-seal-container` element

---

## Safety Guarantee

Even in the unlikely event that this script encounters an error or breaks due to any issue:

> **It will not harm, disrupt, or interfere with your website in any way.**

The script is fully sandboxed to its target container. A failure in the script will not cause side effects, layout shifts, console errors propagating to your application, or any degradation of your site's performance or functionality.

---

## Integration

Add the following container element where you want the SEAL to appear:

```html
<div id="trust-seal-container"></div>
```

Then include the loader script as directed in your integration guide.

---

## Change Log

All changes to this script are tracked in this repository. Partners and clients are encouraged to review commits and releases to verify updates.

---

## Questions or Concerns

If you have any questions regarding this script's behaviour or scope, please reach out to your Gamecheck account representative or open an issue in this repository.
