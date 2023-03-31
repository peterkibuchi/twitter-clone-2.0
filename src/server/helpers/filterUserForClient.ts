import type { User } from "@clerk/nextjs/dist/api";

const filterUserForClient = (user: User) => ({
  id: user.id,
  username: user.username,
  profileImageUrl: user.profileImageUrl,
});

export default filterUserForClient;
