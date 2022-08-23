import { Head, HeroSection, ProductList } from "@/components";
import client from "@/lib/commerce";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function HomePage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { products } = props;
  return (
    <div>
      <Head title="Home" />
      <HeroSection />
      <ProductList products={products} />
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  const { data: products } = await client.products.list({ limit: 8 });
  return { props: { products } };
};
