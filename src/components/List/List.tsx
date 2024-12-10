import ticketsData from '../../constants/mocks/tickets.json'
import {Card} from "@/components";
import {v4 as uuidv4} from 'uuid';
import {parseAsArrayOf, parseAsInteger, useQueryState} from "nuqs";

export default function List() {

  const [stops] = useQueryState('stops', parseAsArrayOf(parseAsInteger).withDefault([]))


  const filteredTickets = ticketsData.tickets.filter(ticket => stops.includes(ticket.stops))

  const resultTickets = filteredTickets.length === 0 ? ticketsData.tickets : filteredTickets

  return (
    <div className='flex flex-col gap-4 mb-4'>
      {resultTickets
        .map((ticket) => (
          <Card key={uuidv4()} {...ticket}/>
        ))}
    </div>
  )
}
