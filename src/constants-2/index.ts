"use server";
import { getTranslations } from "next-intl/server";

export type NavLinkType = {
  label: string;
  route: string;
  icon: string;
};

export async function NavLinks() {
  const t = await getTranslations("navLinks");
  return [
    {
      label: t("Home"),
      route: "/home",
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

export async function Plans() {
  const t = await getTranslations("Plans");
  return [
    {
      _id: 1,
      name: t("name"),
      icon: "/assets/icons/free-plan.svg",
      price: 0,
      credits: 10,
      inclusions: [
        {
          label: t("inclusions.label-1"),
          isIncluded: true,
        },
        {
          label: t("inclusions.label-2"),
          isIncluded: true,
        },
        {
          label: t("inclusions.label-3"),
          isIncluded: false,
        },
        {
          label: t("inclusions.label-4"),
          isIncluded: false,
        },
      ],
    },
    {
      _id: 2,
      name: t("name-2"),
      icon: "/assets/icons/free-plan.svg",
      price: 100,
      credits: 100,
      inclusions: [
        {
          label: t("inclusions-2.label-1"),
          isIncluded: true,
        },
        {
          label: t("inclusions-2.label-2"),
          isIncluded: true,
        },
        {
          label: t("inclusions-2.label-3"),
          isIncluded: true,
        },
        {
          label: t("inclusions-2.label-4"),
          isIncluded: false,
        },
      ],
    },
    {
      _id: 3,
      name: t("name-3"),
      icon: "/assets/icons/free-plan.svg",
      price: 199,
      credits: 1000,
      inclusions: [
        {
          label: t("inclusions-3.label-1"),
          isIncluded: true,
        },
        {
          label: t("inclusions-3.label-2"),
          isIncluded: true,
        },
        {
          label: t("inclusions-3.label-3"),
          isIncluded: true,
        },
        {
          label: t("inclusions-3.label-4"),
          isIncluded: true,
        },
      ],
    },
  ];
}

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
