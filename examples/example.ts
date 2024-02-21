import Connect from "../src/connect";

const publicKey = "0x0297bb4f88a65b82c08fd20afb1259b7027dc996c8941e0c5917a452d538cd0da9";
const redirectURL = "https://medium.com/bynder-tech/creating-a-sdk-from-scratch-2809ded9fa8a"
const services = {"netflix": true, "amazon": true}

async function example() {
    const connect = new Connect(publicKey, redirectURL, services)

    const url = await connect.generateURL()

    const qrCode = await connect.outputQRCode()
}

example()