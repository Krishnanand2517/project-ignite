import { Suspense } from "react";
import { DelayedLoader } from "../components";

export const withSuspense = (Component) => (
  <Suspense fallback={<DelayedLoader />}>
    <Component />
  </Suspense>
);
