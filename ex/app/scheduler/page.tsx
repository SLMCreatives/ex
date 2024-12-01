import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import {
  Calendar,
  CalendarCurrentDate,
  CalendarDayView,
  CalendarMonthView,
  CalendarNextTrigger,
  CalendarPrevTrigger,
  CalendarTodayTrigger,
  CalendarViewTrigger,
  CalendarWeekView,
  CalendarYearView
} from "@/components/full-calendar";
import { addHours } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SchedulerPage() {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 flex flex-col gap-12 max-w-4xl mx-auto">
      <div className="w-full">
        <Calendar
          events={[
            {
              id: "1",
              start: new Date("2024-12-02 07:50:00"),
              end: addHours(new Date("2024-12-02 07:50:00"), 1),
              title: "Bahasa Malaysia",
              description: "Kertas 3",
              color: "pink"
            },

            {
              id: "2",
              start: new Date("2024-12-09 07:30:00"),
              end: new Date("2024-12-09 08:45:00"),
              title: "Fizik",
              description: "Kertas 3",
              color: "blue"
            },
            {
              id: "3",
              start: new Date("2024-12-10 07:30:00"),
              end: new Date("2024-12-10 08:45:00"),
              title: "Kimia",
              description: "Kertas 3",
              color: "purple"
            },
            {
              id: "4",
              start: new Date("2024-12-12 07:30:00"),
              end: new Date("2024-12-12 08:45:00"),
              title: "Biology",
              description: "Kertas 3",
              color: "green"
            }
          ]}
          defaultDate={new Date()}
          enableHotkeys
          view="day"
        >
          <div className="flex min-w-[90vw] lg:min-w-[50vw] flex-col mx-auto">
            <div className="flex flex-col px-6 items-center justify-between gap-8 py-6 w-full">
              <div className="grid grid-cols-4 w-full justify-between">
                <CalendarViewTrigger
                  className="aria-[current=true]:bg-accent"
                  view="day"
                >
                  Day
                </CalendarViewTrigger>
                <CalendarViewTrigger
                  view="week"
                  className="aria-[current=true]:bg-accent"
                >
                  Week
                </CalendarViewTrigger>
                <CalendarViewTrigger
                  view="month"
                  className="aria-[current=true]:bg-accent"
                >
                  Month
                </CalendarViewTrigger>
                <CalendarViewTrigger
                  view="year"
                  className="aria-[current=true]:bg-accent"
                >
                  Year
                </CalendarViewTrigger>
              </div>
              <div className="flex flex-row items-center justify-between font-bold w-full">
                <div className="flex flex-col gap-0">
                  <p className="text-sm font-normal text-foreground/30">
                    Current
                  </p>
                  <CalendarCurrentDate />
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                  <CalendarPrevTrigger>
                    <ChevronLeft className="w-6 h-6" />
                    <span className="sr-only">Previous</span>
                  </CalendarPrevTrigger>
                  <CalendarTodayTrigger>Today</CalendarTodayTrigger>
                  <CalendarNextTrigger>
                    <ChevronRight className="w-6 h-6" />
                    <span className="sr-only">Next</span>
                  </CalendarNextTrigger>
                </div>
              </div>
            </div>

            <div className="flex-1 px-0">
              <CalendarDayView />
              <CalendarWeekView />
              <CalendarMonthView />
              <CalendarYearView />
            </div>
          </div>
        </Calendar>
      </div>
    </div>
  );
}
