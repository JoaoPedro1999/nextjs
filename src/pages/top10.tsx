import { GetStaticProps } from 'next';
import React from 'react';

import { Title } from '../styles/pages/Home';

interface IProduct {
  id: string;
  title: string;
}

interface Top10Props {
  products: IProduct[];
}

export default function Top10({ products }: Top10Props) {
  return (
    <div>
      <Title>Produtos</Title>

      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await fetch('http://localhost:3333/products');

  const products = await response.json();

  return {
    props: {
      products,
    },
  };
};
