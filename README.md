# connect

`connect` is a library that makes it easier to generate valid [Connect](https://docs.gandalf.network/concepts/connect) URLs that lets your users to link their accounts to Gandalf.

## Features

- Generate valid Connect URLs
- Generate valid Connect QRCodes on web
- Parameter validation

## Getting Started

This section provides a quick overview of how to integrate the library into your project.

### Prerequisites

[NodeJS](https://nodejs.org/) - version 18.x or higher

### Installation

```bash
npm install @gandalf-network/connect --save
```

### Usage

#### Import the library

```typescript
// Typescript && ESModules

import Connect from "@gandalf-network/connect";
import { Platform } from "@gandalf-network/connect/components";
```

```javascript
// CommonJS

const Connect = require("@gandalf-network/connect");
const { Platform } = require("@gandalf-network/connect/components");
```

#### Initialize Connect

```typescript
const connect = new Connect({
    publicKey: process.env.PUBLIC_KEY, 
    redirectURL: "YOUR_REDIRECT_URL",
    // The platform defaults to IOS but could be ANDROID or UNIVERSAL
    platform: Platform.ANDROID,
    services: 
    {
        uber: {
            traits: ["rating"], // At least one trait or activity is required
            activities: ["trip"],
        },
    }
})
```

#### Generate a Connect URL

```typescript
const url = await connect.generateURL()
console.log(url)
```

#### Generate a Connect QRCode

Note: This function will only work within a browser context and will fail otherwise.

```typescript
const qrCodeURL = await connect.generateQRCode()
console.log(qrCodeURL)
```

#### Extract the dataKey from the redirectURL

```typescript
const datakey = Connect.getDataKeyFromURL("REDIRECT_URL")
console.log(datakey)
```

## Contributing

Contributions are welcome, whether they're feature requests, bug fixes, or documentation improvements.
