import { Options } from 'qr-code-styling';

const base64EncodedIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KICAgIDxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8xMzNfMjgzOTYpIj4KICAgICAgICA8cGF0aCBkPSJNMjQgMTJDMjQgMTguNjI3NCAxOC42Mjc0IDI0IDEyIDI0QzUuMzcyNTggMjQgMCAxOC42Mjc0IDAgMTJDMCA1LjM3MjU4IDUuMzcyNTggMCAxMiAwQzE4LjYyNzQgMCAyNCA1LjM3MjU4IDI0IDEyWiIgZmlsbD0iIzY2MTBGMiI+PC9wYXRoPgogICAgICAgIDxwYXRoIGQ9Ik05LjIxODIzIDI5LjM4OTRMOC44OTYyMSAzMy43NDc0TDkuNDM2MzMgMzMuODIxNUwxMC4yOTg1IDI5LjUzNzVMOS4yMTgyMyAyOS4zODk0WiIgZmlsbD0id2hpdGUiPjwvcGF0aD4KICAgICAgICA8cGF0aCBkPSJNOS4yNTUzNiAyOS4xMTkzTDEwLjI4MDUgMTkuNjMwMUwxMS45MDA5IDE5Ljg1MjFMMTAuMzM1NiAyOS4yNjczTDkuMjU1MzYgMjkuMTE5M1oiIGZpbGw9IndoaXRlIj48L3BhdGg+CiAgICAgICAgPHBhdGggZD0iTTExLjkzNzggMTkuNTgyMUwxMC4zMTc0IDE5LjM2MDFMMTAuNDgwNCAxNC4xNTQ5TDE0LjY2ODMgMTEuNzAyM0wxMy41NzcxIDkuNjI2NzlMMTAuOTk4NSAxMC4zNzRMMTAuOTI0NSAxMC45MTQxTDExLjQ2NDYgMTAuOTg4MUwxMS45MzA3IDExLjYwMjNMMTAuODk4NSAxMy4xMTE2TDkuMDgyMDUgMTIuMzEyNUw5LjI5MzA3IDguNzY0NjNMMTQuMTgwMiA3LjIzMzIyTDE2LjgyODggMTEuOTk4M0wxMi40OTI5IDE1LjUzMTJMMTEuOTM3OCAxOS41ODIxWiIgZmlsbD0id2hpdGUiPjwvcGF0aD4KICAgICAgICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEyIDIyLjY5MzNDMTcuOTA1NyAyMi42OTMzIDIyLjY5MzMgMTcuOTA1NyAyMi42OTMzIDEyQzIyLjY5MzMgNi4wOTQyNSAxNy45MDU3IDEuMzA2NyAxMiAxLjMwNjdDNi4wOTQyNSAxLjMwNjcgMS4zMDY3IDYuMDk0MjUgMS4zMDY3IDEyQzEuMzA2NyAxNy45MDU3IDYuMDk0MjUgMjIuNjkzMyAxMiAyMi42OTMzWk0xMiAyNEMxOC42Mjc0IDI0IDI0IDE4LjYyNzQgMjQgMTJDMjQgNS4zNzI1OCAxOC42Mjc0IDAgMTIgMEM1LjM3MjU4IDAgMCA1LjM3MjU4IDAgMTJDMCAxOC42Mjc0IDUuMzcyNTggMjQgMTIgMjRaIiBmaWxsPSJ3aGl0ZSI+PC9wYXRoPgogICAgPC9nPgogICAgPGRlZnM+CiAgICAgICAgPGNsaXBQYXRoIGlkPSJjbGlwMF8xMzNfMjgzOTYiPgogICAgICAgICAgICA8cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHJ4PSIxMCIgZmlsbD0id2hpdGUiPjwvcmVjdD4KICAgICAgICA8L2NsaXBQYXRoPgogICAgPC9kZWZzPgo8L3N2Zz4K';
const qrCodeStyle = (url: string): Partial<Options> => ({
  width: 300,
  height: 300,
  data: url,
  margin: 0,
  qrOptions: {
    typeNumber: 0,
    mode: 'Byte',
    errorCorrectionLevel: 'Q',
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.5,
    margin: 4,
  },
  dotsOptions: {
    type: 'classy',
    color: '#6610f3',
  },
  backgroundOptions: {
    color: '#ffffff',
  },
  image: base64EncodedIcon,
  cornersDotOptions: {
    color: '#6a0ff3',
  },
  cornersSquareOptions: {
    type: 'extra-rounded',
    color: '#6610f3',
  },
});

export default qrCodeStyle;
