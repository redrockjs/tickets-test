import {Label} from "@/components/ui/label"
import {Checkbox} from "@/components/ui/checkbox"
import {Button} from "@/components/ui/button"
import {parseAsArrayOf, parseAsInteger, parseAsString, useQueryState} from "nuqs";
import {cn} from "@/lib/utils.ts";
import {CurrencyEnum} from "@/constants/types/currency.ts";
import {CheckedState} from "@radix-ui/react-checkbox";
import {memo, useCallback} from "react";

enum StopsEnum {
  NO_STOPS = 0,
  ONE_STOP = 1,
  TWO_STOPS = 2,
  THREE_STOPS = 3,
}

export default function Sidebar() {

  const [currency, setCurrency] = useQueryState('currency', parseAsString.withDefault(''))

  const handleCurrencyChange = useCallback((currency: string) => () => setCurrency(currency), [setCurrency])

  const [stops, setStops] = useQueryState('stops', parseAsArrayOf(parseAsInteger).withDefault([]))

  const handleCheckAll = useCallback((checked: CheckedState) => {
    if (checked) {
      setStops([0, 1, 2, 3])
    } else {
      setStops([])
    }
  }, [setStops])

  const handleCheck = useCallback((checked: CheckedState, type: number) => {
    if (checked) {
      setStops([...stops, type])
    } else {
      setStops(stops.filter((item) => item !== type))
    }
  }, [setStops, stops])

  const handleResetSearchParams = useCallback(() => {
    setStops([])
    setCurrency('')
  }, [setCurrency, setStops])

  const Btn = memo(() =>
    <Button
      variant={"outline"}
      onClick={handleResetSearchParams}
    >
      Сброс
    </Button>
  )

  const ChkBox = memo(({id, label, condition, cb}: {
    id: string,
    label: string,
    condition: boolean,
    cb: (checked: boolean) => void
  }) => (
    <li className='flex items-center space-x-2'>
      <Checkbox
        id={id}
        checked={condition}
        onCheckedChange={cb}
      />
      <Label htmlFor={id}>{label}</Label>
    </li>
  ))

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
        <ChkBox
          id='all'
          label='Все'
          condition={stops.length === 4}
          cb={(checked) => handleCheckAll(checked)}
        />

        <ChkBox
          id='no_stops'
          label='Без пересадок'
          condition={stops?.includes(StopsEnum.NO_STOPS)}
          cb={(checked) => handleCheck(checked, StopsEnum.NO_STOPS)}
        />

        <ChkBox
          id='one_stop'
          label='1 пересадка'
          condition={stops?.includes(StopsEnum.ONE_STOP)}
          cb={(checked) => handleCheck(checked, StopsEnum.ONE_STOP)}
        />

        <ChkBox
          id='two_stops'
          label='2 пересадки'
          condition={stops?.includes(StopsEnum.TWO_STOPS)}
          cb={(checked) => handleCheck(checked, StopsEnum.TWO_STOPS)}
        />

        <ChkBox
          id='three_stops'
          label='3 пересадки'
          condition={stops?.includes(StopsEnum.THREE_STOPS)}
          cb={(checked) => handleCheck(checked, StopsEnum.THREE_STOPS)}
        />

      </ul>

      <Btn/>
    </div>
  )
}
