export const stopsConvertor = (value: number): string => {
  switch (value) {
    case 4:
    case 3:
    case 2:
      return 'пересадки'
    case 1:
      return 'пересадка'
    default:
      return 'пересадок'
  }
}