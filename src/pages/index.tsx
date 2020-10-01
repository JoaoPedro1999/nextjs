import { GetServerSideProps } from 'next';
import React, { useState, useEffect } from 'react';

import { Title } from '../styles/pages/Home';

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  return (
    <div>
      <Title>Produtos</Title>

      <ul>
        {recommendedProducts.map((recommendedProduct) => (
          <li key={recommendedProduct.id}>{recommendedProduct.title}</li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch('http://localhost:3333/recommended');

  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts,
    },
  };
};
