# Big Picture

To deliver personalized game watchlists efficiently, this application will use an anonymous persistent user model, storing a unique client-side ID in Local Storage. This provides a seamless user experience without the overhead of a full authentication system. A future version could expand this by implementing one to allow users to sync watchlists across devices."

## Notes

- For this project, I implemented anonymous user-scoped watchlists. When a user first visits, I generate a random UUID (no email/password needed) and store it in localStorage. That ID is passed to the backend with each request, and the watchlists are stored per-user in MongoDB. This let me demonstrate user-specific data, CRUD operations, and backend routing without collecting any personal information.