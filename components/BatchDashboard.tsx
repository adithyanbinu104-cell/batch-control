"use client";

import { useCallback, useState } from "react";
import { BatchStatusCards } from "@/components/BatchStatusCards";
import { CountdownTimer } from "@/components/CountdownTimer";
import { CourseOverview } from "@/components/CourseOverview";
import { DashboardHeader } from "@/components/DashboardHeader";
import { EditDashboardModal } from "@/components/EditDashboardModal";
import { Toast } from "@/components/Toast";
import {
  initialDashboardContent,
  type DashboardContent,
} from "@/lib/dashboard";

type ToastState = {
  id: number;
  message: string;
};

export function BatchDashboard() {
  const [content, setContent] = useState<DashboardContent>(
    initialDashboardContent,
  );
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback((message: string) => {
    setToast({ id: Date.now(), message });
  }, []);

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  const handleBatchSelect = useCallback(
    (batch: "active" | "completed") => {
      if (batch === "active") {
        showToast(
          `${content.activeBatchName} is live. Attendance and class controls are ready.`,
        );
        return;
      }

      showToast(
        `${content.completedBatchName} is completed and archived. Opening a read-only batch.`,
      );
    },
    [content.activeBatchName, content.completedBatchName, showToast],
  );

  const handleSave = (nextContent: DashboardContent) => {
    const hasEmptyField = Object.values(nextContent).some(
      (value) => value.trim().length === 0,
    );

    if (hasEmptyField) {
      showToast("Please complete every field before saving.");
      return;
    }

    setContent(nextContent);
    setIsEditOpen(false);
    showToast("Dashboard details updated successfully.");
  };

  return (
    <>
      <DashboardHeader
        activeBatchName={content.activeBatchName}
        completedBatchName={content.completedBatchName}
        onEdit={() => setIsEditOpen(true)}
      />

      <div className="relative z-10 flex flex-1 items-center px-4 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-8 xl:px-12 xl:py-10">
        <div className="grid w-full grid-cols-1 gap-9 sm:gap-11 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-center lg:gap-12 xl:gap-20">
          <CourseOverview content={content} />

          <div className="mx-auto w-full max-w-[580px] lg:mx-0 lg:ml-auto">
            <CountdownTimer />
            <BatchStatusCards
              activeBatchName={content.activeBatchName}
              completedBatchName={content.completedBatchName}
              onSelect={handleBatchSelect}
            />
          </div>
        </div>
      </div>

      <EditDashboardModal
        open={isEditOpen}
        content={content}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSave}
      />

      {toast && (
        <Toast key={toast.id} message={toast.message} onClose={closeToast} />
      )}
    </>
  );
}
