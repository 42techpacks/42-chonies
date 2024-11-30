import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import black_chonie from '~/assets/black-chonie.png';
import deshea_pissing from '~/assets/deshea3.png';
import {
  defer,
  useLoaderData,
  useRouteLoaderData,
  type MetaFunction,
} from '@remix-run/react';
import {useEffect} from 'react';
import {ProductImage} from '~/components/common/ProductImage';
import type {ProductFragment, ProductQuery} from 'storefrontapi.generated';
import {type RootLoader} from '~/root';

export const meta: MetaFunction = () => {
  return [
    {title: 'IONGAF HOME'},
    {name: 'description', content: 'IONGAF IONGAF IONGAF IONGAF'},
  ];
};

interface AvailableProps {
  product: ProductFragment;
}
export default function Available() {
  const root_data = useRouteLoaderData<RootLoader>('root');
  if (!root_data?.product) return <div>Loading... </div>;
  const product = root_data.product;
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
        {product.images.nodes.map((image) => (
          <ProductImage key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}
