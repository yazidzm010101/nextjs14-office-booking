import Button from "@/components/Button";
import { IconCalendarPlus } from "@tabler/icons-react";
import IncomingReservations from "./IncomingReservations";
import WidgetAvailability from "./WidgetAvailability";

function Home() {
  return (
    <div>
      <WidgetAvailability />
      <IncomingReservations />
      <div className="fixed right-0 flex w-full px-4 bottom-24 sm:bottom-4">
        <Button
          size="md"
          variant="primary"
          className="w-full ms-auto xs:w-fit sm:btn-lg"
          icon={<IconCalendarPlus />}
        >
          Place Reservation
        </Button>
      </div>
    </div>
  );
}

export default Home;
