import { useState } from "react";
import { type NextPage } from "next";
import Image from "next/image";
import { SignUpButton, useUser } from "@clerk/nextjs";
import { toast } from "react-hot-toast";

import {
  LoadingPage,
  LoadingSpinner,
  PageLayout,
  PostView,
} from "~/components";
import { api } from "~/utils/api";

const CreatePostWizard = () => {
  const [input, setInput] = useState("");

  const { user } = useUser();
  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.posts.getAll.invalidate();
    },
    onError: (error) => {
      const errorMessage = error.data?.zodError?.fieldErrors.content;

      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to post! Please try again later.");
      }
    },
  });

  if (!user) return null;

  return (
    <div className="flex w-full gap-4">
      <Image
        src={user.profileImageUrl}
        alt="Profile Image"
        className="h-12 w-12 rounded-full"
        width={32}
        height={32}
        placeholder="blur"
        blurDataURL={user.profileImageUrl}
      />

      <input
        type="text"
        placeholder="Type some emojis!"
        className="grow bg-transparent"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isPosting}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input !== "") {
              mutate({ content: input });
            }
          }
        }}
      />

      <div className="flex items-center justify-center">
        {isPosting ? (
          <LoadingSpinner size={20} />
        ) : (
          <>
            {input !== "" && (
              <button onClick={() => mutate({ content: input })}>Post</button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading) return <LoadingPage />;

  if (!data) return <div>Something went wrong.</div>;

  return (
    <div className="flex flex-col">
      {data.map((postData) => (
        <PostView key={postData.post.id} {...postData} />
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  // Start fetching ASAP; response will be cached and used in Feed component
  api.posts.getAll.useQuery();

  // Return empty div if user isn't loaded yet
  if (!userLoaded) return <div />;

  return (
    <PageLayout>
      <div className="flex border-b border-slate-400 p-4">
        {!isSignedIn && (
          <div className="flex justify-center">
            <SignUpButton />
          </div>
        )}

        {isSignedIn && <CreatePostWizard />}
      </div>

      <Feed />
    </PageLayout>
  );
};

export default Home;
