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
      {/* <div className="w-full flex flex-col gap-2">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          Exam Scheduler
        </div>
      </div> */}
      <div className="max-w-4xl mx-auto">
        <Calendar
          events={[
            {
              id: "1",
              start: new Date(),
              end: addHours(new Date(), 2),
              title: "Bahasa Malaysia",
              color: "pink"
            },
            {
              id: "2",
              start: addHours(new Date(), 5),
              end: addHours(new Date(), 7),
              title: "Sejarah",
              color: "blue"
            }
          ]}
          defaultDate={new Date()}
          enableHotkeys
          view="day"
        >
          <div className="flex min-w-[90vw] lg:max-w-5xl flex-col">
            <div className="flex flex-row px-6 items-center justify-between gap-2 mb-6 w-full">
              <div className="grid grid-cols-2 gap-2">
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

              <div className="flex flex-col items-center justify-center gap-2 font-bold">
                <CalendarCurrentDate />
                <div className="flex flex-row items-center justify-center gap-4">
                  <CalendarPrevTrigger>
                    <ChevronLeft size={20} />
                    <span className="sr-only">Previous</span>
                  </CalendarPrevTrigger>
                  <CalendarTodayTrigger>Today</CalendarTodayTrigger>
                  <CalendarNextTrigger>
                    <ChevronRight size={20} />
                    <span className="sr-only">Next</span>
                  </CalendarNextTrigger>
                </div>
              </div>
            </div>

            <div className="flex-1 px-6 overflow-hidden">
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
