# PigeonGamer - Game Deals Tracker

A full-stack web application that allows users to track video game deals using the CheapShark API. The app supports anonymous users, persistent watchlists, and cached pricing data to handle external API rate limits.

## Tech Stack
- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB
- External API: CheapShark API

## Features
- Anonymous user tracking using UUIDs (no authentication required)
- Create and manage multiple watchlists
- Add and remove game deals from watchlists
- Search games by title
- Server-side caching with timed refresh to reduce API calls

## Architecture Notes
- RESTful API design for watchlist and deal management
- Cached pricing data refreshed every 30 minutes to mitigate rate limiting
- MongoDB used for persistent storage of users, watchlists, and deals

## Status
Core functionality is complete. Notifications are planned next.

## Future Improvements
- Price change notifications
- Authentication support
- Deployment and environment configuration
