import { type User } from "@clerk/nextjs/dist/types/server";

const filterUserForClient = (user: User) => ({
  id: user.id,
  username: user.username,
  profileImageUrl: user.imageUrl,
});

export default filterUserForClient;
