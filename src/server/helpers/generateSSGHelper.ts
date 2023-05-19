import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";

import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";

const generateSSGHelper = () =>
  createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson, // optional - adds superjson serialization
  });

export default generateSSGHelper;
