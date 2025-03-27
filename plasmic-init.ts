import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: process.env.NEXT_PUBLIC_PLASMIC_PROJECT_ID || "uo3n29zhyDGu3p4SZ2GCH9",
      token: process.env.NEXT_PUBLIC_PLASMIC_PROJECT_TOKEN || "H5rkt7nFAkilcAti8HQE9zUEMPlBD9LQIrZAdfXmh5kWXRff7fVznU7TXSvIaYNEA2ROxhQy2KVsr9pJtxyiA",
    },
  ],

  // By default Plasmic will use the last published version of your project.
  // For development, you can set preview to true, which will use the unpublished
  // project, allowing you to see your designs without publishing.  Please
  // only use this for development, as this is significantly slower.
  preview: process.env.NEXT_PUBLIC_PLASMIC_PREVIEW === "true",
});

// You can register any code components that you want to use here; see
// https://docs.plasmic.app/learn/code-components-ref/
// And configure your Plasmic project to use the host url pointing at
// the /plasmic-host page of your nextjs app (for example,
// http://localhost:3000/plasmic-host).  See
// https://docs.plasmic.app/learn/app-hosting/#set-a-plasmic-project-to-use-your-app-host

// PLASMIC.registerComponent(...);
