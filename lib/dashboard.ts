export type DashboardContent = {
  courseTitle: string;
  welcomeText: string;
  heading: string;
  description: string;
  activeBatchName: string;
  completedBatchName: string;
};

export const initialDashboardContent: DashboardContent = {
  courseTitle: "VIDEO EDITING BATCH",
  welcomeText: "Welcome back!",
  heading: "Batch Overview",
  description: "Manage your students, classes and attendance.",
  activeBatchName: "Batch 1",
  completedBatchName: "Batch 2",
};
