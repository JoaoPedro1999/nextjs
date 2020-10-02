import { GetServerSideProps } from 'next';

import Link from 'next/link';
import PrismicDOM from 'prismic-dom';
import Prismic from 'prismic-javascript';
import { Document } from 'prismic-javascript/types/documents';

import SEO from '@/components/SEO';
import { client } from '@/lib/prismic';
import { Title } from '@/styles/pages/Home';

interface HomeProps {
  posts: Document[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <div>
      <SEO title="Home" shouldExcludeTitleSuffix image="boost.png" />
      <Title>Posts</Title>

      <ul>
        {posts.map((post) => (
          <Link href={`posts/${post.uid}`}>
            <a key={post.uid}>{PrismicDOM.RichText.asText(post.data.title)}</a>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const posts = await client().query([
    Prismic.Predicates.at('document.type', 'post'),
  ]);

  return {
    props: {
      posts: posts.results,
    },
  };
};
