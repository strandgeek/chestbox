![GitHub](https://img.shields.io/github/license/strandgeek/chestbox) ![GitHub issues](https://img.shields.io/github/issues/strandgeek/chestbox) ![GitHub last commit](https://img.shields.io/github/last-commit/strandgeek/chestbox) [![npm version](https://badge.fury.io/js/@strandgeek%2Fchestbox-sdk.svg)](https://badge.fury.io/js/@strandgeek%2Fchestbox-sdk)

# ChestBox

--------

## Quick Links
- [📹 Video Presentation](https://www.youtube.com/watch?v=OmNInFomYCE)
- [📕 Pitch Deck](https://drive.google.com/file/d/1vr0QT6FYsGOv1YaIOY6d-YWmxAO3dneU/view?usp=sharing)
- [⚡️ ChestBox Platform](https://chestbox.io/)
- [👾 ChestBox Live Game Demo](https://demo.chestbox.io/)

--------

## Table of Contents
1. [About](#about)
2. [Setup](#setup)


--------

## About

ChestBox is an out-of-the-box solution for Game Designers that makes easy the creation and management of game assets on the Algorand Blockchain.

It is a tool designed for those who want to create an RPG game, card game, or any game in which the player has ownership of an asset.

![App Screenshot](docs/app-screenshot.png)

## Setup

To setup the project environment, follow these steps:

1 - Clone this repository

2 - Go to the api and install dependencies

```
cd api
npm i
```

3 - Create `.env` file for the API.

Example:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:55432/chestbox?schema=public"
APP_BASE_URL=https://chestbox.io

PURESTAKE_SERVER=
PURESTAKE_TOKEN=

JWT_SECRET=my-super-secret

AWS_S3_REGION=us-east-1
AWS_S3_BUCKET=your-s3-bucket
AWS_KEY_ID=
AWS_ACCESS_KEY=
```

5 - Push db tables using prisma:

```
npx prisma db push
```

4 - Start the API:

```
npm run dev
```

5 - Go to the webapp in another terminal and install dependencies:

```
cd webapp
npm i
```


6 - Start the webapp:

```
npm run start
```

The application should be running on http://localhost:3000
