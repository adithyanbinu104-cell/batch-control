# RootMe Batch Control

A premium, responsive learning-management dashboard built with Next.js, TypeScript, Tailwind CSS, and Lucide React.

The dashboard includes a live 3-hour session countdown, an active/completed batch switcher, an editable batch overview, a notifications panel, and accessible toast feedback.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm start
```

## Project structure

```text
app/
  globals.css          Global theme, dashboard background and motion
  layout.tsx           Root layout and Google fonts
  page.tsx             Dashboard page shell
  icon.svg             RootMe brand favicon
components/
  BatchDashboard.tsx   Client-side dashboard state and composition
  DashboardHeader.tsx  Brand, batch label, edit action and notifications
  CourseOverview.tsx   Course identity and overview copy
  CountdownTimer.tsx   Live three-hour countdown
  BatchStatusCards.tsx Active and completed batch cards
  EditDashboardModal.tsx Editable dashboard details
  Toast.tsx            Accessible feedback toast
lib/
  dashboard.ts         Shared content types and demo data
```

## Notes

- The countdown starts 23 seconds into a three-hour session so its initial state matches the `02 : 59 : 37` reference, then ticks down once per second and stops at zero.
- Batch 1 is the only ongoing batch. Batch 2 remains visually muted and marked completed.
- Click either batch card for feedback, use the bell for the notification panel, and use **Edit** to update dashboard copy and batch names.
