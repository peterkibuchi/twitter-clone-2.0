import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { LoadingPage, PageLayout, PostView } from "~/components";
import { generateSSGHelper } from "~/server/helpers";
import { api } from "~/utils/api";

const ProfileFeed = (props: { userId: string }) => {
  const { data, isLoading: postsLoading } = api.posts.getPostsByUserId.useQuery(
    { userId: props.userId },
  );

  if (postsLoading) return <LoadingPage />;

  if (!data || data.length === 0) return <div>User has no posts</div>;

  return (
    <div className="flex flex-col">
      {data.map((postData) => (
        <PostView key={postData.post.id} {...postData} />
      ))}
    </div>
  );
};

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data } = api.profile.getUserByUsername.useQuery({
    username,
  });

  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{data.username}</title>
      </Head>

      <PageLayout>
        <div className=" relative h-36 bg-slate-600">
          <Image
            src={data.profileImageUrl}
            alt={`${data.username ?? ""}'s Profile Picture`}
            width={128}
            height={128}
            className="absolute bottom-0 left-0 -mb-16 ml-4 rounded-full border-4 border-black bg-black"
          />
        </div>

        <div className="mt-12 p-4 text-2xl font-bold">
          {`@${data.username ?? ""}`}
        </div>

        <div className="border-b border-slate-400"></div>

        <ProfileFeed userId={data.id} />
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("No slug");

  const username = slug.replace("@", "");

  await ssg.profile.getUserByUsername.prefetch({ username });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      username,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default ProfilePage;
