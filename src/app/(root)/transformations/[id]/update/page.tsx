import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import Header from "@/src/components/shared/Header";
import TransformationForm from "@/src/components/shared/TransformationForm";
import { transformationTypes } from "@/src/constants";
import { getUserById } from "@/src/lib/actions/user.actions";
import { getImageById } from "@/src/lib/actions/image.actions";

const Page = async ({ params: { id } }: SearchParamProps) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  const image = await getImageById(id);

  const transformation =
    transformationTypes[image.transformationType as TransformationTypeKey];

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subtitle} />

      <section className="mt-10">
        <TransformationForm
          action="Update"
          userId={user._id}
          type={image.transformationType as TransformationTypeKey}
          creditBalance={user.creditBalance}
          config={image.config}
          data={image}
        />
      </section>
    </>
  );
};

export default Page;
