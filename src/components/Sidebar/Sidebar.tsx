import {Label} from "@/components/ui/label"
import {Checkbox} from "@/components/ui/checkbox"
import {Button} from "@/components/ui/button"
import {parseAsArrayOf, parseAsInteger, parseAsString, useQueryState} from "nuqs";
import {cn} from "@/lib/utils.ts";
import {CurrencyEnum} from "@/constants/types/currency.ts";
import {CheckedState} from "@radix-ui/react-checkbox";

enum StopsEnum {
  NO_STOPS = 0,
  ONE_STOP = 1,
  TWO_STOPS = 2,
  THREE_STOPS = 3,
}

export default function Sidebar() {

  const [currency, setCurrency] = useQueryState('currency', parseAsString.withDefault(''))

  const handleCurrencyChange = (currency: string) => () => setCurrency(currency)

  const [stops, setStops] = useQueryState('stops', parseAsArrayOf(parseAsInteger).withDefault([]))

  const handleCheckAll = (checked: CheckedState) => {
    if (checked) {
      setStops([0, 1, 2, 3])
    } else {
      setStops([])
    }
  }

  const handleCheck = (checked: CheckedState, type: number) => {
    if (checked) {
      setStops([...stops, type])
    } else {
      setStops(stops.filter((item) => item !== type))
    }
  }

  const handleResetSearchParams = () => {
    setStops([])
    setCurrency('')
  }

  return (
    <div className='flex flex-col bg-white p-4 border rounded-xl shadow-md h-fit'>
      <h2 className='mb-4'>
        Валюта
      </h2>
      <ul className='flex flex-row mb-4'>
        <li>
          <Button
            variant="outline"
            onClick={handleCurrencyChange(CurrencyEnum.RUB)}
            className={cn(
              (currency === CurrencyEnum.RUB || currency === '')
                ? 'bg-blue-400 text-white hover:text-white hover:bg-blue-300'
                : '',
              'rounded-none rounded-l-md'
            )}
          >
            RUB
          </Button>
        </li>
        <li>
          <Button
            variant="outline"
            onClick={handleCurrencyChange(CurrencyEnum.USD)}
            className={cn(
              currency === CurrencyEnum.USD
                ? 'bg-blue-400 text-white hover:text-white hover:bg-blue-300'
                : '',
              'rounded-none'
            )}
          >
            USD
          </Button>
        </li>
        <li>
          <Button
            variant="outline"
            onClick={handleCurrencyChange(CurrencyEnum.EUR)}
            className={cn(
              currency === CurrencyEnum.EUR
                ? 'bg-blue-400 text-white hover:text-white hover:bg-blue-300'
                : '',
              'rounded-none rounded-r-md'
            )}
          >
            EUR
          </Button>
        </li>
      </ul>

      <h2 className='mb-4'>
        Количество пересадок
      </h2>
      <ul className='flex flex-col gap-4 mb-4'>
        <li className='flex items-center space-x-2'>
          <Checkbox
            id="all"
            checked={stops.length === 4}
            onCheckedChange={(checked) => handleCheckAll(checked)}
          />
          <Label htmlFor="all">Все</Label>
        </li>

        <li className='flex items-center space-x-2'>
          <Checkbox
            id="no_stops"
            checked={stops?.includes(StopsEnum.NO_STOPS)}
            onCheckedChange={(checked) => handleCheck(checked, StopsEnum.NO_STOPS)}
          />
          <Label htmlFor="no_stops">Без пересадок</Label>
        </li>

        <li className='flex items-center space-x-2'>
          <Checkbox
            id="one_stop"
            checked={stops?.includes(StopsEnum.ONE_STOP)}
            onCheckedChange={(checked) => handleCheck(checked, StopsEnum.ONE_STOP)}
          />
          <Label htmlFor="one_stop">1 пересадка</Label>
        </li>

        <li className='flex items-center space-x-2'>
          <Checkbox
            id="two_stops"
            checked={stops?.includes(StopsEnum.TWO_STOPS)}
            onCheckedChange={(checked) => handleCheck(checked, StopsEnum.TWO_STOPS)}
          />
          <Label htmlFor="two_stops">2 пересадки</Label>
        </li>
        <li className='flex items-center space-x-2'>
          <Checkbox
            id="three_stops"
            checked={stops?.includes(StopsEnum.THREE_STOPS)}
            onCheckedChange={(checked) => handleCheck(checked, StopsEnum.THREE_STOPS)}
          />
          <Label htmlFor="three_stops">3 пересадки</Label>
        </li>
      </ul>

      <Button
        variant={"outline"}
        onClick={handleResetSearchParams}
      >
        Сброс
      </Button>
    </div>
  )
}
