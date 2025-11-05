import { useMainStore } from "stores/MainStore"
/**
 * The function `useHelpersBooking` returns two helper functions, `Currency` and `DateFormat`, which
 * can be used for formatting currency values and dates respectively.
 * @returns The function `useHelpersBooking` returns an object with two properties: `Currency` and
 * `DateFormat`.
 */
export function useHelpersBooking()
{
  const store = useMainStore()
  
  function Initials(name)
  {
    const n = name && typeof name === 'string' && name.length ? name : (name)
    return String(n)
      .split(' ')
      .map(s => (s && s[0]) ? s[0] : '')
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }

  function Currency(value,code)
  {
    let result = new Intl.NumberFormat(store.Lang, {style: 'currency',currency: code, minimumFractionDigits: 2}).format(`${value}`)
    return result
  }

  function CurrencyInput(value,code)
  {
    let result = Intl.NumberFormat(store.store.Lang, {style: 'decimal',currency: code, minimumFractionDigits: 2}).format(`${value}`)
    return result
  }

  function DateFormat(value)
  {
    let result = new Date(value).toLocaleString(store.Lang,{day:'numeric',weekday:'short',month:'short', year:'numeric',timeZone: 'UTC' })
    return result
  }

  function DateFormatLong(value)
  {
    let result = new Date(value).toLocaleString(store.Lang,{day:'numeric',weekday:'long',month:'long', year:'numeric',timeZone: 'UTC' })
    return result
  }
  function IntFilter(value) 
  {
    var currency = value
    var cur_re = /\D*(\d+|\d.*?\d)(?:\D+(\d{2}))?\D*$/;
    var parts = cur_re.exec(currency);
    var result = parseFloat(parts[1].replace(/\D/,'')+'.'+(parts[2]?parts[2]:'00'));
    return  result
    
  }
  function replaceNewLines(text) 
  {
    const formattedText = text.split('\n').join('</p><p>');
    return `<p>${formattedText}</p>`;
  }

  return { Currency, CurrencyInput, DateFormat, DateFormatLong, IntFilter, replaceNewLines, Initials }
}