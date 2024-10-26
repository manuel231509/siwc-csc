import { Backdrop, Box, CircularProgress, Grid, Skeleton } from "@mui/material";
import React, { forwardRef, Suspense } from "react";

export const SuspenseProgress = ({ children }) => {
  return (
    <Suspense
      fallback={
        <Grid
          container
          justifyContent="center"
          component={Box}
          bgcolor="inherit"
        >
          <Grid
            item
            xs={11}
            m={2}
            mt={5}
            mb={1}
            container
            justifyContent="center"
            alignContent={"center"}
          >
            <CircularProgress color="secondary" />
          </Grid>
        </Grid>
      }
    >
      {children}
    </Suspense>
  );
};

export const SuspenseProgressBackdrop = forwardRef(({ children }, ref) => {
  return (
    <Suspense
      fallback={
        <Backdrop
          sx={{
            color: "primary",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={true}
        >
          <CircularProgress color="warning" />
        </Backdrop>
      }
    >
      {children}
    </Suspense>
  );
});

export const SuspenseProgressSkeleton = ({ children, skeletonProps }) => {
  return (
    <Suspense fallback={<Skeleton {...skeletonProps} />}>{children}</Suspense>
  );
};
