import Connect from "../src/connect";
import { ActivityType, InputData, TraitLabel, Platform } from "../src/types";

const publicKey = "0x0297bb4f88a65b82c08fd20afb1259b7027dc996c8941e0c5917a452d538cd0da9";
const redirectURL = "https://example.com"
const platform = Platform.ANDROID;

const services: InputData = {
    uber: {
        traits: [TraitLabel.Plan],
        activities: [ActivityType.Trip],
    },
    gandalf: {
        traits: ["email"]
    }
}

async function example() {
    const connect = new Connect({ publicKey, redirectURL, services, platform })

    // Generate the Connect URL
    const url = await connect.generateURL()
    console.log(url)

    // Generate a QRCode linking to the Connect
    const qrCodeURL = await connect.generateQRCode()
    console.log(qrCodeURL)

    // Extract the datakey from the redirectURL
    const datakey = Connect.getDataKeyFromURL("REDIRECT_URL")
    console.log(datakey)
}

example()