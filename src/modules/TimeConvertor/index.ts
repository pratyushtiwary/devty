import moment from 'moment-timezone'

interface Dummy extends Function, moment.Moment {}

export const availableTimezones = [
  'Europe/Andorra',
  'Asia/Dubai',
  'Asia/Kabul',
  'America/Puerto_Rico',
  'America/Antigua',
  'America/Anguilla',
  'Europe/Tirane',
  'Asia/Yerevan',
  'Africa/Lagos',
  'Africa/Luanda',
  'Antarctica/Casey',
  'Antarctica/Davis',
  'Antarctica/Mawson',
  'Antarctica/Palmer',
  'Antarctica/Rothera',
  'Antarctica/Troll',
  'Asia/Urumqi',
  'Pacific/Auckland',
  'Pacific/Port_Moresby',
  'Asia/Riyadh',
  'Antarctica/McMurdo',
  'Antarctica/DumontDUrville',
  'Antarctica/Syowa',
  'Antarctica/Vostok',
  'America/Argentina/Buenos_Aires',
  'America/Argentina/Cordoba',
  'America/Argentina/Salta',
  'America/Argentina/Jujuy',
  'America/Argentina/Tucuman',
  'America/Argentina/Catamarca',
  'America/Argentina/La_Rioja',
  'America/Argentina/San_Juan',
  'America/Argentina/Mendoza',
  'America/Argentina/San_Luis',
  'America/Argentina/Rio_Gallegos',
  'America/Argentina/Ushuaia',
  'Pacific/Pago_Pago',
  'Europe/Vienna',
  'Australia/Lord_Howe',
  'Antarctica/Macquarie',
  'Australia/Hobart',
  'Australia/Melbourne',
  'Australia/Sydney',
  'Australia/Broken_Hill',
  'Australia/Brisbane',
  'Australia/Lindeman',
  'Australia/Adelaide',
  'Australia/Darwin',
  'Australia/Perth',
  'Australia/Eucla',
  'America/Aruba',
  'Europe/Helsinki',
  'Europe/Mariehamn',
  'Asia/Baku',
  'Europe/Belgrade',
  'Europe/Sarajevo',
  'America/Barbados',
  'Asia/Dhaka',
  'Europe/Brussels',
  'Africa/Abidjan',
  'Africa/Ouagadougou',
  'Europe/Sofia',
  'Asia/Qatar',
  'Asia/Bahrain',
  'Africa/Maputo',
  'Africa/Bujumbura',
  'Africa/Porto-Novo',
  'America/St_Barthelemy',
  'Atlantic/Bermuda',
  'Asia/Kuching',
  'Asia/Brunei',
  'America/La_Paz',
  'America/Kralendijk',
  'America/Noronha',
  'America/Belem',
  'America/Fortaleza',
  'America/Recife',
  'America/Araguaina',
  'America/Maceio',
  'America/Bahia',
  'America/Sao_Paulo',
  'America/Campo_Grande',
  'America/Cuiaba',
  'America/Santarem',
  'America/Porto_Velho',
  'America/Boa_Vista',
  'America/Manaus',
  'America/Eirunepe',
  'America/Rio_Branco',
  'America/Toronto',
  'America/Nassau',
  'Asia/Thimphu',
  'Africa/Gaborone',
  'Europe/Minsk',
  'America/Belize',
  'America/St_Johns',
  'America/Halifax',
  'America/Glace_Bay',
  'America/Moncton',
  'America/Goose_Bay',
  'America/Iqaluit',
  'America/Winnipeg',
  'America/Resolute',
  'America/Rankin_Inlet',
  'America/Regina',
  'America/Swift_Current',
  'America/Edmonton',
  'America/Cambridge_Bay',
  'America/Inuvik',
  'America/Dawson_Creek',
  'America/Fort_Nelson',
  'America/Whitehorse',
  'America/Dawson',
  'America/Vancouver',
  'America/Panama',
  'America/Phoenix',
  'America/Blanc-Sablon',
  'America/Atikokan',
  'America/Creston',
  'Asia/Yangon',
  'Indian/Cocos',
  'Africa/Kinshasa',
  'Africa/Lubumbashi',
  'Africa/Bangui',
  'Africa/Brazzaville',
  'Europe/Zurich',
  'Pacific/Rarotonga',
  'America/Santiago',
  'America/Punta_Arenas',
  'Pacific/Easter',
  'Africa/Douala',
  'Asia/Shanghai',
  'America/Bogota',
  'America/Costa_Rica',
  'America/Havana',
  'Atlantic/Cape_Verde',
  'America/Curacao',
  'Asia/Bangkok',
  'Indian/Christmas',
  'Asia/Nicosia',
  'Asia/Famagusta',
  'Europe/Prague',
  'Europe/Berlin',
  'Europe/Busingen',
  'Africa/Nairobi',
  'Africa/Djibouti',
  'Europe/Copenhagen',
  'America/Dominica',
  'America/Santo_Domingo',
  'Africa/Algiers',
  'America/Guayaquil',
  'Pacific/Galapagos',
  'Europe/Tallinn',
  'Africa/Cairo',
  'Africa/El_Aaiun',
  'Africa/Asmara',
  'Europe/Madrid',
  'Africa/Ceuta',
  'Atlantic/Canary',
  'Africa/Addis_Ababa',
  'Pacific/Fiji',
  'Atlantic/Stanley',
  'Pacific/Kosrae',
  'Pacific/Guadalcanal',
  'Pacific/Chuuk',
  'Pacific/Pohnpei',
  'Atlantic/Faroe',
  'Europe/Paris',
  'Africa/Libreville',
  'Europe/London',
  'America/Grenada',
  'Asia/Tbilisi',
  'America/Cayenne',
  'Europe/Guernsey',
  'Africa/Accra',
  'Europe/Gibraltar',
  'America/Nuuk',
  'America/Danmarkshavn',
  'America/Scoresbysund',
  'America/Thule',
  'Africa/Banjul',
  'Africa/Conakry',
  'America/Guadeloupe',
  'Africa/Malabo',
  'Europe/Athens',
  'Atlantic/South_Georgia',
  'America/Guatemala',
  'Pacific/Guam',
  'Africa/Bissau',
  'America/Guyana',
  'Asia/Hong_Kong',
  'America/Tegucigalpa',
  'Europe/Zagreb',
  'America/Port-au-Prince',
  'Europe/Budapest',
  'Asia/Jakarta',
  'Asia/Pontianak',
  'Asia/Makassar',
  'Asia/Jayapura',
  'Europe/Dublin',
  'Asia/Jerusalem',
  'Europe/Isle_of_Man',
  'Asia/Kolkata',
  'Indian/Chagos',
  'Asia/Baghdad',
  'Asia/Tehran',
  'Atlantic/Reykjavik',
  'Europe/Rome',
  'Europe/Jersey',
  'America/Jamaica',
  'Asia/Amman',
  'Asia/Tokyo',
  'Asia/Bishkek',
  'Asia/Phnom_Penh',
  'Pacific/Tarawa',
  'Pacific/Kanton',
  'Pacific/Kiritimati',
  'Indian/Comoro',
  'America/St_Kitts',
  'Asia/Pyongyang',
  'Asia/Seoul',
  'Asia/Kuwait',
  'America/Cayman',
  'Asia/Almaty',
  'Asia/Qyzylorda',
  'Asia/Qostanay',
  'Asia/Aqtobe',
  'Asia/Aqtau',
  'Asia/Atyrau',
  'Asia/Oral',
  'Asia/Vientiane',
  'Asia/Beirut',
  'America/St_Lucia',
  'Europe/Vaduz',
  'Asia/Colombo',
  'Africa/Monrovia',
  'Africa/Johannesburg',
  'Africa/Maseru',
  'Europe/Vilnius',
  'Europe/Luxembourg',
  'Europe/Riga',
  'Africa/Tripoli',
  'Africa/Casablanca',
  'Europe/Monaco',
  'Europe/Chisinau',
  'Europe/Podgorica',
  'America/Marigot',
  'Indian/Antananarivo',
  'Pacific/Kwajalein',
  'Pacific/Majuro',
  'Europe/Skopje',
  'Africa/Bamako',
  'Asia/Ulaanbaatar',
  'Asia/Hovd',
  'Asia/Choibalsan',
  'Asia/Macau',
  'Pacific/Saipan',
  'America/Martinique',
  'Africa/Nouakchott',
  'America/Montserrat',
  'Europe/Malta',
  'Indian/Mauritius',
  'Indian/Maldives',
  'Africa/Blantyre',
  'America/Mexico_City',
  'America/Cancun',
  'America/Merida',
  'America/Monterrey',
  'America/Matamoros',
  'America/Chihuahua',
  'America/Ciudad_Juarez',
  'America/Ojinaga',
  'America/Mazatlan',
  'America/Bahia_Banderas',
  'America/Hermosillo',
  'America/Tijuana',
  'Asia/Singapore',
  'Asia/Kuala_Lumpur',
  'Africa/Windhoek',
  'Pacific/Noumea',
  'Africa/Niamey',
  'Pacific/Norfolk',
  'America/Managua',
  'Europe/Amsterdam',
  'Europe/Oslo',
  'Asia/Kathmandu',
  'Pacific/Nauru',
  'Pacific/Niue',
  'Pacific/Chatham',
  'Asia/Muscat',
  'America/Lima',
  'Pacific/Tahiti',
  'Pacific/Marquesas',
  'Pacific/Gambier',
  'Pacific/Bougainville',
  'Asia/Manila',
  'Asia/Karachi',
  'Europe/Warsaw',
  'America/Miquelon',
  'Pacific/Pitcairn',
  'Asia/Gaza',
  'Asia/Hebron',
  'Europe/Lisbon',
  'Atlantic/Madeira',
  'Atlantic/Azores',
  'Pacific/Palau',
  'America/Asuncion',
  'Indian/Reunion',
  'Europe/Bucharest',
  'Europe/Kaliningrad',
  'Europe/Moscow',
  'Europe/Simferopol',
  'Europe/Kirov',
  'Europe/Volgograd',
  'Europe/Astrakhan',
  'Europe/Saratov',
  'Europe/Ulyanovsk',
  'Europe/Samara',
  'Asia/Yekaterinburg',
  'Asia/Omsk',
  'Asia/Novosibirsk',
  'Asia/Barnaul',
  'Asia/Tomsk',
  'Asia/Novokuznetsk',
  'Asia/Krasnoyarsk',
  'Asia/Irkutsk',
  'Asia/Chita',
  'Asia/Yakutsk',
  'Asia/Khandyga',
  'Asia/Vladivostok',
  'Asia/Ust-Nera',
  'Asia/Magadan',
  'Asia/Sakhalin',
  'Asia/Srednekolymsk',
  'Asia/Kamchatka',
  'Asia/Anadyr',
  'Africa/Kigali',
  'Indian/Mahe',
  'Africa/Khartoum',
  'Europe/Stockholm',
  'Atlantic/St_Helena',
  'Europe/Ljubljana',
  'Arctic/Longyearbyen',
  'Europe/Bratislava',
  'Africa/Freetown',
  'Europe/San_Marino',
  'Africa/Dakar',
  'Africa/Mogadishu',
  'America/Paramaribo',
  'Africa/Juba',
  'Africa/Sao_Tome',
  'America/El_Salvador',
  'America/Lower_Princes',
  'Asia/Damascus',
  'Africa/Mbabane',
  'America/Grand_Turk',
  'Africa/Ndjamena',
  'Indian/Kerguelen',
  'Africa/Lome',
  'Asia/Dushanbe',
  'Pacific/Fakaofo',
  'Asia/Dili',
  'Asia/Ashgabat',
  'Africa/Tunis',
  'Pacific/Tongatapu',
  'Europe/Istanbul',
  'America/Port_of_Spain',
  'Pacific/Funafuti',
  'Asia/Taipei',
  'Africa/Dar_es_Salaam',
  'Europe/Kyiv',
  'Africa/Kampala',
  'Pacific/Midway',
  'Pacific/Wake',
  'America/New_York',
  'America/Detroit',
  'America/Kentucky/Louisville',
  'America/Kentucky/Monticello',
  'America/Indiana/Indianapolis',
  'America/Indiana/Vincennes',
  'America/Indiana/Winamac',
  'America/Indiana/Marengo',
  'America/Indiana/Petersburg',
  'America/Indiana/Vevay',
  'America/Chicago',
  'America/Indiana/Tell_City',
  'America/Indiana/Knox',
  'America/Menominee',
  'America/North_Dakota/Center',
  'America/North_Dakota/New_Salem',
  'America/North_Dakota/Beulah',
  'America/Denver',
  'America/Boise',
  'America/Los_Angeles',
  'America/Anchorage',
  'America/Juneau',
  'America/Sitka',
  'America/Metlakatla',
  'America/Yakutat',
  'America/Nome',
  'America/Adak',
  'Pacific/Honolulu',
  'America/Montevideo',
  'Asia/Samarkand',
  'Asia/Tashkent',
  'Europe/Vatican',
  'America/St_Vincent',
  'America/Caracas',
  'America/Tortola',
  'America/St_Thomas',
  'Asia/Ho_Chi_Minh',
  'Pacific/Efate',
  'Pacific/Wallis',
  'Pacific/Apia',
  'Asia/Aden',
  'Indian/Mayotte',
  'Africa/Lusaka',
  'Africa/Harare'
]
export interface DateObj {
  year: number
  month: number
  date: number
  hour: number
  minute: number
  second: number
}

export interface TimeConvertorOutput {
  local: string | undefined
  iso: string | undefined
  relative: string | undefined
  unix: string | undefined
  dayOfYear: string | undefined
  weekOfYear: string | undefined
  isLeapYear: string | undefined
}

function appendZero(n: number) {
  return n < 10 ? '0' + n : n
}

export interface DateTypes {
  [key: string]: string | number
}

export function getDateObj(time: Date): DateObj {
  return {
    year: time.getFullYear(),
    month: time.getMonth(),
    date: time.getDate(),
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds()
  }
}

export function renderDate(date: Date, format: string): string {
  const types: DateTypes = {
    Y: date.getFullYear(),
    m: appendZero(date.getMonth() + 1),
    d: appendZero(date.getDate()),
    H: appendZero(date.getHours()),
    i: appendZero(date.getMinutes())
  }

  const temp = format.split('')
  let final = ''

  final = temp.map((e) => types[e] || e).join('')

  return final
}

export default function TimeConvertor(
  value: DateObj | number,
  timezone: string
): TimeConvertorOutput {
  const output: TimeConvertorOutput = {
    local: undefined,
    iso: undefined,
    relative: undefined,
    unix: undefined,
    dayOfYear: undefined,
    weekOfYear: undefined,
    isLeapYear: undefined
  }

  let temp

  if (typeof value === 'number') {
    temp = new Date(value)
  } else {
    temp = new Date()
    temp.setDate(value.date)
    temp.setMonth(value.month)
    temp.setFullYear(value.year)
    temp.setHours(value.hour)
    temp.setMinutes(value.minute)
    temp.setSeconds(value.second)
  }

  if (!moment.tz.zone(timezone)) {
    timezone = moment.tz.guess()
    output.local = 'Invalid Timezone'
    output.iso = 'Invalid Timezone'
    output.relative = 'Invalid Timezone'
    output.dayOfYear = 'Invalid Timezone'
    output.unix = 'Invalid Timezone'
    output.weekOfYear = 'Invalid Timezone'
    output.isLeapYear = 'Invalid Timezone'
    return output
  }

  const tzMoment: moment.Moment = moment.tz.setDefault(timezone)
  // @ts-ignore
  const temp2 = tzMoment(renderDate(temp, 'Y-m-d H:i'))

  output.local = temp2.toString()
  output.iso = temp2.toISOString()
  output.relative = temp2.fromNow()
  output.dayOfYear = temp2.dayOfYear().toString()
  output.unix = temp2.valueOf().toString()
  output.weekOfYear = temp2.week().toString()

  const year = temp.getFullYear()

  output.isLeapYear = String(year % 100 === 0 ? year % 400 === 0 : year % 4 === 0)

  return output
}

export function convertTimezone(
  isoTime: string | undefined,
  fromTimezone: string,
  toTimezone: string
) {
  const output = {
    local: '',
    iso: ''
  }

  if (typeof isoTime === 'string') {
    if (!moment.tz.zone(fromTimezone) || !moment.tz.zone(toTimezone)) {
      output.local = 'Invalid Timezone'
      output.iso = 'Invalid Timezone'
      return output
    }
    const tzMoment = moment.tz.setDefault(fromTimezone)
    // @ts-ignore
    const temp = tzMoment(isoTime)

    const temp2 = temp.clone().tz(toTimezone)

    output.local = temp2.toString()
    output.iso = temp2.toISOString()

    return output
  } else {
    output.local = 'Invalid Date'
    output.iso = 'Invalid Date'
    return output
  }
}
