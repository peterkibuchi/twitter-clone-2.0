import { type NextPage } from "next";
import Head from "next/head";

import { PageLayout } from "~/components";

const SinglePostPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Post</title>
      </Head>

      <PageLayout>Post View</PageLayout>
    </>
  );
};

export default SinglePostPage;
