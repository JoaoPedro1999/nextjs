import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import PrismicDOM from 'prismic-dom';
import { useRouter } from 'next/router';
import Prismic from 'prismic-javascript';
import { Document } from 'prismic-javascript/types/documents';

import SEO from '@/components/SEO';
import { client } from '@/lib/prismic';

// import { Container } from './styles';

interface PostsProps {
  post: Document;
}

export default function Post({ post }: PostsProps) {
  const { query, isFallback } = useRouter();

  if (isFallback) {
    return <h1>Carregando...</h1>;
  }

  return (
    <div>
      <SEO title={String(query.slug)} shouldExcludeTitleSuffix />
      <h1>{query.slug}</h1>

      <ul></ul>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await client().query([
    Prismic.Predicates.at('document.type', 'post'),
  ]);

  const paths = posts.results.map((post: Document) => {
    return {
      params: { slug: post.id },
    };
  });

  return {
    paths: paths || null,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;

  const posts = await client().getByUID('post', String(slug), {});

  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
};
