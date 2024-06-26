import { Collection } from "@/src/components/shared/Collection";
import { NavLinks } from "@/src/constants-2";
import { getAllImages } from "@/src/lib/actions/image.actions";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || "";
  const images = await getAllImages({ page, searchQuery });
  const t = await getTranslations("Home");

  return (
    <>
      <section className="home">
        <h1 className="home-heading">{t("home-heading")}</h1>
        <ul className="flex-center w-full gap-20">
          {(await NavLinks()).slice(1, 6).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex-center flex-col gap-2"
            >
              <li className="flex-center w-fit rounded-full bg-white p-4 transition-transform duration-150 ease-in-out hover:scale-125">
                <Image src={link.icon} alt="image" width={24} height={24} />
              </li>
              <p className="p-14-medium text-center text-white">{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>

      <section className="sm:mt-12">
        <Collection
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
        />
      </section>
    </>
  );
};

export default Home;
