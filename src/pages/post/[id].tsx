import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import { PageLayout, PostView } from "~/components";
import { generateSSGHelper } from "~/server/helpers";
import { api } from "~/utils/api";

const SinglePostPage: NextPage<{ postId: string }> = ({ postId }) => {
  const { data } = api.posts.getById.useQuery({
    postId,
  });

  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{`Tweet by @${data.author.username}`}</title>
      </Head>

      <PageLayout>
        <PostView {...data} />
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const postId = context.params?.id;

  if (typeof postId !== "string") throw new Error("No postId");

  await ssg.posts.getById.prefetch({ postId });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      postId,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default SinglePostPage;
