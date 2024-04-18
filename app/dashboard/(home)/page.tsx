import IncomingReservations from './incoming-reservations'
import WidgetAvailability from './widget-availability'

function Home() {
  return (
    <div>
      <WidgetAvailability/>
      <IncomingReservations/>
    </div>
  )
}

export default Home