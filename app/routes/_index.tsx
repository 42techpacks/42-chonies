import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import black_chonie from '~/assets/black-chonie.png';
import {defer, useLoaderData, type MetaFunction} from '@remix-run/react';
import {useEffect} from 'react';
import {ProductImage} from '~/components/common/ProductImage';

export const meta: MetaFunction = () => {
  return [
    {title: 'IONGAF HOME'},
    {name: 'description', content: 'IONGAF IONGAF IONGAF IONGAF'},
  ];
};

export async function loader(args: LoaderFunctionArgs) {
  const criticalData = await loadCriticalData(args);
  return defer({...criticalData});
}

async function loadCriticalData({context}: LoaderFunctionArgs) {
  const {storefront} = context;
  const [{products}] = await Promise.all([
    //TODO: change shirt to a tag
    storefront.query(THE_CHONIE_ONE, {variables: {query: 'shirt'}}),
  ]);
  const product = products.nodes[0];

  if (!product?.id) {
    //TODO: test this plays nice with milos error hanlder
    throw new Response('we got no product', {status: 404});
  }

  return {
    product,
  };
}

export default function Available() {
  const {product} = useLoaderData<typeof loader>();
  useEffect(() => {
    console.log(product);
  }, [product]);
  // Dummy Images
  const image_nodes = product.images;
  // const images = [
  //   {src: black_chonie, alt: 'Black Chonie 1'},
  //   {src: black_chonie, alt: 'Black Chonie 2'},
  //   {src: black_chonie, alt: 'Black Chonie 3'},
  //   {src: black_chonie, alt: 'Black Chonie 4'},
  //   {src: black_chonie, alt: 'Black Chonie 21'},
  //   {src: black_chonie, alt: 'Black Chonie i2'},
  //   {src: black_chonie, alt: 'Black Chonie i3'},
  //   {src: black_chonie, alt: 'Black Chonie i4'},
  //   {src: black_chonie, alt: 'Black Chonie ji1'},
  //   {src: black_chonie, alt: 'Black Chonie ji2'},
  //   {src: black_chonie, alt: 'Black Chonie ji3'},
  //   {src: black_chonie, alt: 'Black Chonie ji4'},
  // ];

  /* Load 'AVAILABLE' state by default */
  return (
    <div
      className="flex flex-col h-screen items-center justify-start text-black"
      id="available"
    >
      <div
        className="w-full flex flex-col justify-center items-center pt-[150px] pb-[350px]"
        id="available-main"
      >
        {image_nodes.nodes.map((image) => (
          <ProductImage key={image.id}  image={image} />
        ))}
      </div>
    </div>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    id
    price {
      amount
      currencyCode
    }
    selectedOptions {
      name
      value
    }
    sku
    title
  }
` as const;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    handle
    descriptionHtml
    description
    options {
      name
      optionValues {
        name
      }
    }
    images(first: 250) {
      nodes {
        id
        altText
        url
        width
        height
      }
    }
    totalInventory
    priceRange {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
    seo {
      description
      title
    }
  }
` as const;
// TODO: bring back selected optino
// ${PRODUCT_VARIANT_FRAGMENT}

const THE_CHONIE_ONE = `#graphql
  query Products(
    $country: CountryCode
    $query: String!
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(first: 1 query: $query) {
    nodes {
      ...Product
      }
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;

const PRODUCT_VARIANTS_FRAGMENT = `#graphql
  fragment ProductVariants on Product {
    variants(first: 250) {
      nodes {
        ...ProductVariant
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const VARIANTS_QUERY = `#graphql
  ${PRODUCT_VARIANTS_FRAGMENT}
  query ProductVariants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...ProductVariants
    }
  }
` as const;
