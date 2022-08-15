import { HeroSection } from "@/components";
import client from "@/lib/commerce";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function HomePage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(props);
  return (
    <div>
      <HeroSection />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: products } = await client.products.list();
  return {
    props: { products },
  };
};
