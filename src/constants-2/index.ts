"use server";
import { getTranslations } from "next-intl/server";

export async function NavLinks() {
  const t = await getTranslations("navLinks");
  return [
    {
      label: t("Home"),
      route: "/",
      icon: "/assets/icons/home.svg",
    },
    {
      label: t("Image Restore"),
      route: "/transformations/add/restore",
      icon: "/assets/icons/image.svg",
    },
    {
      label: t("Generative Fill"),
      route: "/transformations/add/fill",
      icon: "/assets/icons/stars.svg",
    },
    {
      label: t("Object Remove"),
      route: "/transformations/add/remove",
      icon: "/assets/icons/scan.svg",
    },
    {
      label: t("Object Recolor"),
      route: "/transformations/add/recolor",
      icon: "/assets/icons/filter.svg",
    },
    {
      label: t("Background Remove"),
      route: "/transformations/add/removeBackground",
      icon: "/assets/icons/camera.svg",
    },
    {
      label: t("Profile"),
      route: "/profile",
      icon: "/assets/icons/profile.svg",
    },
    {
      label: t("Buy Credits"),
      route: "/credits",
      icon: "/assets/icons/bag.svg",
    },
  ];
}

// export const plans = [
//   {
//     _id: 1,
//     name: "Free",
//     icon: "/assets/icons/free-plan.svg",
//     price: 0,
//     credits: 10,
//     inclusions: [
//       {
//         label: "10 Free Credits",
//         isIncluded: true,
//       },
//       {
//         label: "Basic Access to Services",
//         isIncluded: true,
//       },
//       {
//         label: "Priority Customer Support",
//         isIncluded: false,
//       },
//       {
//         label: "Priority Updates",
//         isIncluded: false,
//       },
//     ],
//   },
//   {
//     _id: 2,
//     name: "Pro Package",
//     icon: "/assets/icons/free-plan.svg",
//     price: 100,
//     credits: 100,
//     inclusions: [
//       {
//         label: "100 Credits",
//         isIncluded: true,
//       },
//       {
//         label: "Full Access to Services",
//         isIncluded: true,
//       },
//       {
//         label: "Priority Customer Support",
//         isIncluded: true,
//       },
//       {
//         label: "Priority Updates",
//         isIncluded: false,
//       },
//     ],
//   },
//   {
//     _id: 3,
//     name: "Premium Package",
//     icon: "/assets/icons/free-plan.svg",
//     price: 199,
//     credits: 1000,
//     inclusions: [
//       {
//         label: "1000 Credits",
//         isIncluded: true,
//       },
//       {
//         label: "Full Access to Services",
//         isIncluded: true,
//       },
//       {
//         label: "Priority Customer Support",
//         isIncluded: true,
//       },
//       {
//         label: "Priority Updates",
//         isIncluded: true,
//       },
//     ],
//   },
// ];
// interface getTransformationTypes {
//   type: string;
//   title: string;
//   subtitle: string;
//   config: { [key: string]: any };
//   icon: string;
// }

export async function getTransformationTypes() {
  const t = await getTranslations("transformationTypes");
  return {
    restore: {
      type: "restore",
      title: t("restore.title"),
      subtitle: t("restore.subtitle"),
      config: { restore: true },
      icon: "image.svg",
    },
    removeBackground: {
      type: "removeBackground",
      title: t("removeBackground.title"),
      subtitle: t("removeBackground.subtitle"),
      config: { removeBackground: true },
      icon: "camera.svg",
    },
    fill: {
      type: "fill",
      title: t("fill.title"),
      subtitle: t("fill.subtitle"),
      config: { fillBackground: true },
      icon: "stars.svg",
    },
    remove: {
      type: "remove",
      title: t("remove.title"),
      subtitle: t("remove.subtitle"),
      config: {
        remove: { prompt: "", removeShadow: true, multiple: true },
      },
      icon: "scan.svg",
    },
    recolor: {
      type: "recolor",
      title: t("recolor.title"),
      subtitle: t("recolor.subtitle"),
      config: {
        recolor: { prompt: "", to: "", multiple: true },
      },
      icon: "filter.svg",
    },
  };
}

// export const aspectRatioOptions = {
//   "1:1": {
//     aspectRatio: "1:1",
//     label: "Square (1:1)",
//     width: 1000,
//     height: 1000,
//   },
//   "3:4": {
//     aspectRatio: "3:4",
//     label: "Standard Portrait (3:4)",
//     width: 1000,
//     height: 1334,
//   },
//   "9:16": {
//     aspectRatio: "9:16",
//     label: "Phone Portrait (9:16)",
//     width: 1000,
//     height: 1778,
//   },
// };

// export const defaultValues = {
//   title: "",
//   aspectRatio: "",
//   color: "",
//   prompt: "",
//   publicId: "",
// };

// export const creditFee = -1;
