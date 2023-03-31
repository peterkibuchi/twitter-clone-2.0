import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import relativeTime from "dayjs/plugin/relativeTime";

import type { RouterOutputs } from "~/utils/api";

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

export default function PostView(props: PostWithUser) {
  const { post, author } = props;

  return (
    <Link href={`/post/${post.id}`}>
      <div key={post.id} className="flex gap-4 border-b border-slate-400 p-4">
        <Link href={`/@${author.username}`}>
          <Image
            src={author.profileImageUrl}
            alt={`@${author.username}'s Profile Picture`}
            className="h-12 w-12 rounded-full"
            width={32}
            height={32}
            placeholder="blur"
            blurDataURL={author.profileImageUrl}
          />
        </Link>

        <div className="flex flex-col">
          <div className="flex gap-1 text-slate-300">
            <Link href={`/@${author.username}`}>
              <span>{`@${author.username}`}</span>
            </Link>

            <span className="font-light">
              {`· ${dayjs(post.createdAt).fromNow()}`}
            </span>
          </div>
          <span>{post.content}</span>
        </div>
      </div>
    </Link>
  );
}
