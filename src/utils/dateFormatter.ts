// 期間を整形する関数
export const formatPeriod = (period: string | { from: string; to: string | null }): string => {
  if (typeof period === 'string') {
    return period
  }

  const fromDate = new Date(period.from)
  const fromYear = fromDate.getFullYear()
  const fromMonth = fromDate.getMonth() + 1

  if (!period.to) {
    return `${fromYear}年${fromMonth}月 - 現在`
  }

  const toDate = new Date(period.to)
  const toYear = toDate.getFullYear()
  const toMonth = toDate.getMonth() + 1

  return `${fromYear}年${fromMonth}月 - ${toYear}年${toMonth}月`
}
