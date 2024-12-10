import logo from '../../assets/logo-turkish-airlines.svg'
import {Button} from "@/components/ui/button.tsx";
import {TicketType} from "@/constants/types/tickets.ts";
import {format} from "date-fns";
import {ru} from 'date-fns/locale/ru'
import {parseAsString, useQueryState} from "nuqs";
import {priceConvertor} from "@/utils/priceConvertor.ts";
import {CurrencyEnum} from "@/constants/types/currency.ts";
import {stopsConvertor} from "@/utils/stopsConvertor.ts";

type CardProps = TicketType

export default function Card(
  {
    price,
    departure_date,
    departure_time,
    arrival_time,
    arrival_date,
    stops,
    origin,
    origin_name,
    destination,
    destination_name,
  }: CardProps) {

  const [currency] = useQueryState('currency', parseAsString.withDefault(''))

  const [d_day, d_month, d_year] = departure_date.split('.')
  const [a_day, a_month, a_year] = arrival_date.split('.')

  const departDate = new Date(Date.UTC(+`20${d_year}`, +d_month - 1, +d_day))
  const arriveDate = new Date(Date.UTC(+`20${a_year}`, +a_month - 1, +a_day))

  const depart = format(departDate, 'dd LLL yyyy, EEEEEE', {locale: ru})
  const arrive = format(arriveDate, 'dd LLL yyyy, EEEEEE', {locale: ru})

  const currentPrice = priceConvertor(price, currency as CurrencyEnum)

  const currentStops = `${stops} ${stopsConvertor(stops)}`

  return (
    <div className='flex flex-row gap-8 p-8 border rounded-xl shadow-md bg-white'>

      <div className='basis-1/3 flex flex-col gap-2 justify-start'>
        <img src={logo} alt="Logo" className='p-2'/>
        <Button className='py-8 bg-orange-600 hover:bg-orange-400'>
          <p className='text-xl'>Купить <br/> за {currentPrice}</p>
        </Button>
      </div>

      <div className='basis-2/3 flex flex-col gap-4'>

        <div className='flex flex-row justify-between items-center'>
          <div className='text-4xl text-gray-600'>
            {departure_time}
          </div>
          <div className='text-xl text-gray-500'>
            {currentStops}
          </div>
          <div className='text-4xl text-gray-600'>
            {arrival_time}
          </div>
        </div>

        <div className='flex flex-row justify-between'>
          <div className='flex flex-col'>
            <p className='text-gray-600'> {`${origin}, ${origin_name}`} </p>
            <p className='text-gray-400'> {depart} </p>
          </div>
          <div className='flex flex-col'>
            <p className='text-gray-600'> {`${destination_name}, ${destination}`} </p>
            <p className='text-gray-400'> {arrive} </p>
          </div>
        </div>
      </div>

    </div>
  )
}
