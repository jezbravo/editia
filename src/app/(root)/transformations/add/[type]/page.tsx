import Header from "@/src/components/shared/Header";
import TransformationForm from "@/src/components/shared/TransformationForm";
import { transformationTypes } from "@/src/constants";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/src/lib/actions/user.actions";
import { redirect } from "next/navigation";

const AddTransformationTypePage = async ({
  params: { type },
}: SearchParamProps) => {
  const { userId } = auth();
  const transformation = transformationTypes[type];
  if (!userId) redirect("/sign-in");
  const user = await getUserById(userId);
  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subtitle} />

      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  );
};

export default AddTransformationTypePage;
