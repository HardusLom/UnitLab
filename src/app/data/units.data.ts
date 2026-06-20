import { Quantity, SiPrefix, Formula } from '../models/unit.model';

/**
 * All conversion factors are expressed relative to each quantity's base unit.
 *   base = value * factor + (offset ?? 0)
 * Only temperature uses a non-zero offset (affine conversion).
 *
 * Factors are exact where an exact definition exists (e.g. 1 inch = 0.0254 m).
 */
export const QUANTITIES: Quantity[] = [
  // ---------------------------------------------------------------- LENGTH
  {
    id: 'length', name: 'Length', symbol: 'l', category: 'Length & area', baseSymbol: 'm',
    units: [
      { id: 'nm', name: 'nanometre', symbol: 'nm', system: 'metric', factor: 1e-9, wikipediaUrl: 'https://en.wikipedia.org/wiki/Nanometre' },
      { id: 'um', name: 'micrometre', symbol: 'µm', system: 'metric', factor: 1e-6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Micrometre' },
      { id: 'mm', name: 'millimetre', symbol: 'mm', system: 'metric', factor: 1e-3, wikipediaUrl: 'https://en.wikipedia.org/wiki/Millimetre' },
      { id: 'cm', name: 'centimetre', symbol: 'cm', system: 'metric', factor: 1e-2, wikipediaUrl: 'https://en.wikipedia.org/wiki/Centimetre' },
      { id: 'm', name: 'metre', symbol: 'm', system: 'metric', factor: 1, wikipediaUrl: 'https://en.wikipedia.org/wiki/Metre' },
      { id: 'km', name: 'kilometre', symbol: 'km', system: 'metric', factor: 1000, wikipediaUrl: 'https://en.wikipedia.org/wiki/Kilometre' },
      { id: 'in', name: 'inch', symbol: 'in', system: 'imperial', factor: 0.0254, wikipediaUrl: 'https://en.wikipedia.org/wiki/Inch' },
      { id: 'ft', name: 'foot', symbol: 'ft', system: 'imperial', factor: 0.3048, wikipediaUrl: 'https://en.wikipedia.org/wiki/Foot_(unit)' },
      { id: 'yd', name: 'yard', symbol: 'yd', system: 'imperial', factor: 0.9144, wikipediaUrl: 'https://en.wikipedia.org/wiki/Yard' },
      { id: 'mi', name: 'mile', symbol: 'mi', system: 'imperial', factor: 1609.344, wikipediaUrl: 'https://en.wikipedia.org/wiki/Mile' },
      { id: 'nmi', name: 'nautical mile', symbol: 'nmi', system: 'other', factor: 1852, wikipediaUrl: 'https://en.wikipedia.org/wiki/Nautical_mile' },
    ],
  },
  // ------------------------------------------------------------------ MASS
  {
    id: 'mass', name: 'Mass', symbol: 'm', category: 'Mass & force', baseSymbol: 'kg',
    units: [
      { id: 'ug', name: 'microgram', symbol: 'µg', system: 'metric', factor: 1e-9, wikipediaUrl: 'https://en.wikipedia.org/wiki/Microgram' },
      { id: 'mg', name: 'milligram', symbol: 'mg', system: 'metric', factor: 1e-6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Milligram' },
      { id: 'g', name: 'gram', symbol: 'g', system: 'metric', factor: 1e-3, wikipediaUrl: 'https://en.wikipedia.org/wiki/Gram' },
      { id: 'kg', name: 'kilogram', symbol: 'kg', system: 'metric', factor: 1, wikipediaUrl: 'https://en.wikipedia.org/wiki/Kilogram' },
      { id: 't', name: 'tonne', symbol: 't', system: 'metric', factor: 1000, wikipediaUrl: 'https://en.wikipedia.org/wiki/Tonne' },
      { id: 'oz', name: 'ounce', symbol: 'oz', system: 'imperial', factor: 0.028349523125, wikipediaUrl: 'https://en.wikipedia.org/wiki/Ounce' },
      { id: 'lb', name: 'pound', symbol: 'lb', system: 'imperial', factor: 0.45359237, wikipediaUrl: 'https://en.wikipedia.org/wiki/Pound_(mass)' },
      { id: 'st', name: 'stone', symbol: 'st', system: 'imperial', factor: 6.35029318, wikipediaUrl: 'https://en.wikipedia.org/wiki/Stone_(unit)' },
      { id: 'lt', name: 'long ton', symbol: 'LT', system: 'imperial', factor: 1016.0469088, wikipediaUrl: 'https://en.wikipedia.org/wiki/Long_ton' },
      { id: 'sht', name: 'short ton', symbol: 'ST', system: 'us', factor: 907.18474, wikipediaUrl: 'https://en.wikipedia.org/wiki/Short_ton' },
    ],
  },
  // ------------------------------------------------------------------ FORCE
  {
    id: 'force', name: 'Force', symbol: 'F', category: 'Mass & force', baseSymbol: 'N',
    units: [
      { id: 'dyn', name: 'dyne', symbol: 'dyn', system: 'metric', factor: 1e-5, wikipediaUrl: 'https://en.wikipedia.org/wiki/Dyne' },
      { id: 'n', name: 'newton', symbol: 'N', system: 'si', factor: 1, wikipediaUrl: 'https://en.wikipedia.org/wiki/Newton_(unit)' },
      { id: 'kn', name: 'kilonewton', symbol: 'kN', system: 'si', factor: 1000, wikipediaUrl: 'https://en.wikipedia.org/wiki/Newton_(unit)' },
      { id: 'mn', name: 'meganewton', symbol: 'MN', system: 'si', factor: 1e6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Newton_(unit)' },
      { id: 'kgf', name: 'kilogram-force', symbol: 'kgf', system: 'metric', factor: 9.80665, wikipediaUrl: 'https://en.wikipedia.org/wiki/Kilogram-force' },
      { id: 'lbf', name: 'pound-force', symbol: 'lbf', system: 'imperial', factor: 4.4482216152605, wikipediaUrl: 'https://en.wikipedia.org/wiki/Pound-force' },
    ],
  },
  // ------------------------------------------------------------------ AREA
  {
    id: 'area', name: 'Area', symbol: 'A', category: 'Length & area', baseSymbol: 'm²',
    units: [
      { id: 'mm2', name: 'square millimetre', symbol: 'mm²', system: 'metric', factor: 1e-6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Square_millimetre' },
      { id: 'cm2', name: 'square centimetre', symbol: 'cm²', system: 'metric', factor: 1e-4, wikipediaUrl: 'https://en.wikipedia.org/wiki/Square_centimetre' },
      { id: 'm2', name: 'square metre', symbol: 'm²', system: 'metric', factor: 1, wikipediaUrl: 'https://en.wikipedia.org/wiki/Square_metre' },
      { id: 'ha', name: 'hectare', symbol: 'ha', system: 'metric', factor: 1e4, wikipediaUrl: 'https://en.wikipedia.org/wiki/Hectare' },
      { id: 'km2', name: 'square kilometre', symbol: 'km²', system: 'metric', factor: 1e6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Square_kilometre' },
      { id: 'in2', name: 'square inch', symbol: 'in²', system: 'imperial', factor: 0.00064516, wikipediaUrl: 'https://en.wikipedia.org/wiki/Square_inch' },
      { id: 'ft2', name: 'square foot', symbol: 'ft²', system: 'imperial', factor: 0.09290304, wikipediaUrl: 'https://en.wikipedia.org/wiki/Square_foot' },
      { id: 'ac', name: 'acre', symbol: 'ac', system: 'imperial', factor: 4046.8564224, wikipediaUrl: 'https://en.wikipedia.org/wiki/Acre' },
      { id: 'mi2', name: 'square mile', symbol: 'mi²', system: 'imperial', factor: 2589988.110336, wikipediaUrl: 'https://en.wikipedia.org/wiki/Square_mile' },
    ],
  },
  // ----------------------------------------------------------------- VOLUME
  {
    id: 'volume', name: 'Volume', symbol: 'V', category: 'Volume & capacity', baseSymbol: 'm³',
    units: [
      { id: 'ml', name: 'millilitre', symbol: 'mL', system: 'metric', factor: 1e-6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Millilitre' },
      { id: 'cm3', name: 'cubic centimetre', symbol: 'cm³', system: 'metric', factor: 1e-6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Cubic_centimetre' },
      { id: 'l', name: 'litre', symbol: 'L', system: 'metric', factor: 1e-3, wikipediaUrl: 'https://en.wikipedia.org/wiki/Litre' },
      { id: 'm3', name: 'cubic metre', symbol: 'm³', system: 'metric', factor: 1, wikipediaUrl: 'https://en.wikipedia.org/wiki/Cubic_metre' },
      { id: 'kl', name: 'kilolitre', symbol: 'kL', system: 'metric', factor: 1, wikipediaUrl: 'https://en.wikipedia.org/wiki/Litre' },
      { id: 'in3', name: 'cubic inch', symbol: 'in³', system: 'imperial', factor: 0.000016387064, wikipediaUrl: 'https://en.wikipedia.org/wiki/Cubic_inch' },
      { id: 'ft3', name: 'cubic foot', symbol: 'ft³', system: 'imperial', factor: 0.028316846592, wikipediaUrl: 'https://en.wikipedia.org/wiki/Cubic_foot' },
      { id: 'tsp', name: 'teaspoon (US)', symbol: 'tsp', system: 'us', factor: 0.00000492892159375, wikipediaUrl: 'https://en.wikipedia.org/wiki/Teaspoon' },
      { id: 'tbsp', name: 'tablespoon (US)', symbol: 'tbsp', system: 'us', factor: 0.0000147867647813, wikipediaUrl: 'https://en.wikipedia.org/wiki/Tablespoon' },
      { id: 'floz_us', name: 'fluid ounce (US)', symbol: 'fl oz', system: 'us', factor: 0.0000295735295625, wikipediaUrl: 'https://en.wikipedia.org/wiki/Fluid_ounce' },
      { id: 'cup_us', name: 'cup (US)', symbol: 'cup', system: 'us', factor: 0.0002365882365, wikipediaUrl: 'https://en.wikipedia.org/wiki/Cup_(unit)' },
      { id: 'pt_us', name: 'pint (US)', symbol: 'pt', system: 'us', factor: 0.000473176473, wikipediaUrl: 'https://en.wikipedia.org/wiki/Pint' },
      { id: 'qt_us', name: 'quart (US)', symbol: 'qt', system: 'us', factor: 0.000946352946, wikipediaUrl: 'https://en.wikipedia.org/wiki/Quart' },
      { id: 'gal_us', name: 'gallon (US)', symbol: 'gal', system: 'us', factor: 0.003785411784, wikipediaUrl: 'https://en.wikipedia.org/wiki/Gallon' },
      { id: 'floz_imp', name: 'fluid ounce (imp.)', symbol: 'fl oz', system: 'imperial', factor: 0.0000284130625, wikipediaUrl: 'https://en.wikipedia.org/wiki/Fluid_ounce' },
      { id: 'pt_imp', name: 'pint (imp.)', symbol: 'pt', system: 'imperial', factor: 0.00056826125, wikipediaUrl: 'https://en.wikipedia.org/wiki/Pint' },
      { id: 'qt_imp', name: 'quart (imp.)', symbol: 'qt', system: 'imperial', factor: 0.0011365225, wikipediaUrl: 'https://en.wikipedia.org/wiki/Quart' },
      { id: 'gal_imp', name: 'gallon (imp.)', symbol: 'gal', system: 'imperial', factor: 0.00454609, wikipediaUrl: 'https://en.wikipedia.org/wiki/Gallon' },
    ],
  },
  // ------------------------------------------------------------------ SPEED
  {
    id: 'speed', name: 'Speed / velocity', symbol: 'v', category: 'Speed & acceleration', baseSymbol: 'm/s',
    units: [
      { id: 'mps', name: 'metre per second', symbol: 'm/s', system: 'metric', factor: 1, wikipediaUrl: 'https://en.wikipedia.org/wiki/Metre_per_second' },
      { id: 'kmh', name: 'kilometre per hour', symbol: 'km/h', system: 'metric', factor: 0.2777777777777778, wikipediaUrl: 'https://en.wikipedia.org/wiki/Kilometre_per_hour' },
      { id: 'mph', name: 'mile per hour', symbol: 'mph', system: 'imperial', factor: 0.44704, wikipediaUrl: 'https://en.wikipedia.org/wiki/Miles_per_hour' },
      { id: 'fps', name: 'foot per second', symbol: 'ft/s', system: 'imperial', factor: 0.3048, wikipediaUrl: 'https://en.wikipedia.org/wiki/Foot_per_second' },
      { id: 'kn', name: 'knot', symbol: 'kn', system: 'other', factor: 0.5144444444444445, wikipediaUrl: 'https://en.wikipedia.org/wiki/Knot_(unit)' },
    ],
  },
  // ----------------------------------------------------------- ACCELERATION
  {
    id: 'acceleration', name: 'Acceleration', symbol: 'a', category: 'Speed & acceleration', baseSymbol: 'm/s²',
    units: [
      { id: 'mps2', name: 'metre per second squared', symbol: 'm/s²', system: 'si', factor: 1, wikipediaUrl: 'https://en.wikipedia.org/wiki/Metre_per_second_squared' },
      { id: 'fps2', name: 'foot per second squared', symbol: 'ft/s²', system: 'imperial', factor: 0.3048, wikipediaUrl: 'https://en.wikipedia.org/wiki/Foot_per_second_squared' },
      { id: 'gal_acc', name: 'gal (cm/s²)', symbol: 'Gal', system: 'other', factor: 0.01, wikipediaUrl: 'https://en.wikipedia.org/wiki/Gal_(unit)' },
      { id: 'g0', name: 'standard gravity', symbol: 'g', system: 'other', factor: 9.80665, wikipediaUrl: 'https://en.wikipedia.org/wiki/Standard_gravity' },
    ],
  },
  // --------------------------------------------------------------- PRESSURE
  {
    id: 'pressure', name: 'Pressure', symbol: 'P', category: 'Pressure & stress', baseSymbol: 'Pa',
    units: [
      { id: 'pa', name: 'pascal', symbol: 'Pa', system: 'si', factor: 1, wikipediaUrl: 'https://en.wikipedia.org/wiki/Pascal_(unit)' },
      { id: 'hpa', name: 'hectopascal', symbol: 'hPa', system: 'si', factor: 100, wikipediaUrl: 'https://en.wikipedia.org/wiki/Pascal_(unit)' },
      { id: 'kpa', name: 'kilopascal', symbol: 'kPa', system: 'si', factor: 1000, wikipediaUrl: 'https://en.wikipedia.org/wiki/Pascal_(unit)' },
      { id: 'mpa', name: 'megapascal', symbol: 'MPa', system: 'si', factor: 1e6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Pascal_(unit)' },
      { id: 'mbar', name: 'millibar', symbol: 'mbar', system: 'metric', factor: 100, wikipediaUrl: 'https://en.wikipedia.org/wiki/Bar_(unit)' },
      { id: 'bar', name: 'bar', symbol: 'bar', system: 'metric', factor: 1e5, wikipediaUrl: 'https://en.wikipedia.org/wiki/Bar_(unit)' },
      { id: 'atm', name: 'atmosphere', symbol: 'atm', system: 'other', factor: 101325, wikipediaUrl: 'https://en.wikipedia.org/wiki/Atmosphere_(unit)' },
      { id: 'mmhg', name: 'millimetre of mercury', symbol: 'mmHg', system: 'other', factor: 133.322387415, wikipediaUrl: 'https://en.wikipedia.org/wiki/Millimetre_of_mercury' },
      { id: 'psi', name: 'pound per square inch', symbol: 'psi', system: 'imperial', factor: 6894.757293168, wikipediaUrl: 'https://en.wikipedia.org/wiki/Pound_per_square_inch' },
      { id: 'psf', name: 'pound per square foot', symbol: 'psf', system: 'imperial', factor: 47.880259, wikipediaUrl: 'https://en.wikipedia.org/wiki/Pound-force_per_square_foot' },
    ],
  },
  // ----------------------------------------------------------------- ENERGY
  {
    id: 'energy', name: 'Energy / work', symbol: 'E', category: 'Energy, work & power', baseSymbol: 'J',
    units: [
      { id: 'j', name: 'joule', symbol: 'J', system: 'si', factor: 1, wikipediaUrl: 'https://en.wikipedia.org/wiki/Joule' },
      { id: 'kj', name: 'kilojoule', symbol: 'kJ', system: 'si', factor: 1000, wikipediaUrl: 'https://en.wikipedia.org/wiki/Joule' },
      { id: 'mj', name: 'megajoule', symbol: 'MJ', system: 'si', factor: 1e6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Joule' },
      { id: 'cal', name: 'calorie', symbol: 'cal', system: 'other', factor: 4.184, wikipediaUrl: 'https://en.wikipedia.org/wiki/Calorie' },
      { id: 'kcal', name: 'kilocalorie', symbol: 'kcal', system: 'other', factor: 4184, wikipediaUrl: 'https://en.wikipedia.org/wiki/Calorie' },
      { id: 'wh', name: 'watt-hour', symbol: 'Wh', system: 'other', factor: 3600, wikipediaUrl: 'https://en.wikipedia.org/wiki/Kilowatt-hour' },
      { id: 'kwh', name: 'kilowatt-hour', symbol: 'kWh', system: 'other', factor: 3.6e6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Kilowatt-hour' },
      { id: 'ev', name: 'electronvolt', symbol: 'eV', system: 'other', factor: 1.602176634e-19, wikipediaUrl: 'https://en.wikipedia.org/wiki/Electronvolt' },
      { id: 'btu', name: 'British thermal unit', symbol: 'BTU', system: 'imperial', factor: 1055.05585262, wikipediaUrl: 'https://en.wikipedia.org/wiki/British_thermal_unit' },
      { id: 'ftlbf', name: 'foot-pound', symbol: 'ft·lbf', system: 'imperial', factor: 1.3558179483314, wikipediaUrl: 'https://en.wikipedia.org/wiki/Foot-pound_(energy)' },
    ],
  },
  // ------------------------------------------------------------------ POWER
  {
    id: 'power', name: 'Power', symbol: 'P', category: 'Energy, work & power', baseSymbol: 'W',
    units: [
      { id: 'w', name: 'watt', symbol: 'W', system: 'si', factor: 1, wikipediaUrl: 'https://en.wikipedia.org/wiki/Watt' },
      { id: 'kw', name: 'kilowatt', symbol: 'kW', system: 'si', factor: 1000, wikipediaUrl: 'https://en.wikipedia.org/wiki/Watt' },
      { id: 'mw', name: 'megawatt', symbol: 'MW', system: 'si', factor: 1e6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Watt' },
      { id: 'hp', name: 'horsepower (mechanical)', symbol: 'hp', system: 'imperial', factor: 745.6998715823, wikipediaUrl: 'https://en.wikipedia.org/wiki/Horsepower' },
      { id: 'ps', name: 'metric horsepower', symbol: 'PS', system: 'metric', factor: 735.49875, wikipediaUrl: 'https://en.wikipedia.org/wiki/Horsepower' },
      { id: 'btuh', name: 'BTU per hour', symbol: 'BTU/h', system: 'imperial', factor: 0.2930710701722, wikipediaUrl: 'https://en.wikipedia.org/wiki/British_thermal_unit' },
    ],
  },
  // ------------------------------------------------------------ TEMPERATURE
  {
    id: 'temperature', name: 'Temperature', symbol: 'T', category: 'Temperature', baseSymbol: 'K',
    units: [
      { id: 'k', name: 'kelvin', symbol: 'K', system: 'si', factor: 1, offset: 0, wikipediaUrl: 'https://en.wikipedia.org/wiki/Kelvin' },
      { id: 'c', name: 'degree Celsius', symbol: '°C', system: 'metric', factor: 1, offset: 273.15, wikipediaUrl: 'https://en.wikipedia.org/wiki/Celsius' },
      { id: 'f', name: 'degree Fahrenheit', symbol: '°F', system: 'imperial', factor: 0.5555555555555556, offset: 255.3722222222222, wikipediaUrl: 'https://en.wikipedia.org/wiki/Fahrenheit' },
      { id: 'r', name: 'degree Rankine', symbol: '°R', system: 'other', factor: 0.5555555555555556, offset: 0, wikipediaUrl: 'https://en.wikipedia.org/wiki/Rankine_scale' },
    ],
  },
  // ------------------------------------------------------------------- TIME
  {
    id: 'time', name: 'Time', symbol: 't', category: 'Time & frequency', baseSymbol: 's',
    units: [
      { id: 'ns', name: 'nanosecond', symbol: 'ns', system: 'si', factor: 1e-9, wikipediaUrl: 'https://en.wikipedia.org/wiki/Nanosecond' },
      { id: 'us', name: 'microsecond', symbol: 'µs', system: 'si', factor: 1e-6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Microsecond' },
      { id: 'ms', name: 'millisecond', symbol: 'ms', system: 'si', factor: 1e-3, wikipediaUrl: 'https://en.wikipedia.org/wiki/Millisecond' },
      { id: 's', name: 'second', symbol: 's', system: 'si', factor: 1, wikipediaUrl: 'https://en.wikipedia.org/wiki/Second' },
      { id: 'min', name: 'minute', symbol: 'min', system: 'other', factor: 60, wikipediaUrl: 'https://en.wikipedia.org/wiki/Minute' },
      { id: 'h', name: 'hour', symbol: 'h', system: 'other', factor: 3600, wikipediaUrl: 'https://en.wikipedia.org/wiki/Hour' },
      { id: 'd', name: 'day', symbol: 'd', system: 'other', factor: 86400, wikipediaUrl: 'https://en.wikipedia.org/wiki/Day' },
      { id: 'wk', name: 'week', symbol: 'wk', system: 'other', factor: 604800, wikipediaUrl: 'https://en.wikipedia.org/wiki/Week' },
      { id: 'yr', name: 'year (Julian, 365.25 d)', symbol: 'yr', system: 'other', factor: 31557600, wikipediaUrl: 'https://en.wikipedia.org/wiki/Year' },
    ],
  },
  // -------------------------------------------------------------- FREQUENCY
  {
    id: 'frequency', name: 'Frequency', symbol: 'f', category: 'Time & frequency', baseSymbol: 'Hz',
    units: [
      { id: 'hz', name: 'hertz', symbol: 'Hz', system: 'si', factor: 1, wikipediaUrl: 'https://en.wikipedia.org/wiki/Hertz' },
      { id: 'khz', name: 'kilohertz', symbol: 'kHz', system: 'si', factor: 1e3, wikipediaUrl: 'https://en.wikipedia.org/wiki/Hertz' },
      { id: 'mhz', name: 'megahertz', symbol: 'MHz', system: 'si', factor: 1e6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Hertz' },
      { id: 'ghz', name: 'gigahertz', symbol: 'GHz', system: 'si', factor: 1e9, wikipediaUrl: 'https://en.wikipedia.org/wiki/Hertz' },
      { id: 'rpm', name: 'revolution per minute', symbol: 'rpm', system: 'other', factor: 0.016666666666666666, wikipediaUrl: 'https://en.wikipedia.org/wiki/Revolutions_per_minute' },
    ],
  },
  // ------------------------------------------------------------------ ANGLE
  {
    id: 'angle', name: 'Plane angle', symbol: 'θ', category: 'Angle', baseSymbol: 'rad',
    units: [
      { id: 'rad', name: 'radian', symbol: 'rad', system: 'si', factor: 1, wikipediaUrl: 'https://en.wikipedia.org/wiki/Radian' },
      { id: 'mrad', name: 'milliradian', symbol: 'mrad', system: 'si', factor: 1e-3, wikipediaUrl: 'https://en.wikipedia.org/wiki/Milliradian' },
      { id: 'deg', name: 'degree', symbol: '°', system: 'other', factor: 0.017453292519943295, wikipediaUrl: 'https://en.wikipedia.org/wiki/Degree_(angle)' },
      { id: 'arcmin', name: 'arcminute', symbol: '′', system: 'other', factor: 0.0002908882086657216, wikipediaUrl: 'https://en.wikipedia.org/wiki/Minute_and_second_of_arc' },
      { id: 'arcsec', name: 'arcsecond', symbol: '″', system: 'other', factor: 0.00000484813681109536, wikipediaUrl: 'https://en.wikipedia.org/wiki/Minute_and_second_of_arc' },
      { id: 'grad', name: 'gradian', symbol: 'gon', system: 'other', factor: 0.015707963267948967, wikipediaUrl: 'https://en.wikipedia.org/wiki/Gradian' },
      { id: 'rev', name: 'revolution', symbol: 'rev', system: 'other', factor: 6.283185307179586, wikipediaUrl: 'https://en.wikipedia.org/wiki/Turn_(angle)' },
    ],
  },
  // ------------------------------------------------------------------- DATA
  {
    id: 'data', name: 'Data', symbol: '', category: 'Data & information', baseSymbol: 'B',
    units: [
      { id: 'bit', name: 'bit', symbol: 'b', system: 'other', factor: 0.125, wikipediaUrl: 'https://en.wikipedia.org/wiki/Bit' },
      { id: 'byte', name: 'byte', symbol: 'B', system: 'other', factor: 1, wikipediaUrl: 'https://en.wikipedia.org/wiki/Byte' },
      { id: 'kb', name: 'kilobyte (decimal)', symbol: 'kB', system: 'other', factor: 1e3, wikipediaUrl: 'https://en.wikipedia.org/wiki/Kilobyte' },
      { id: 'mb', name: 'megabyte (decimal)', symbol: 'MB', system: 'other', factor: 1e6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Megabyte' },
      { id: 'gb', name: 'gigabyte (decimal)', symbol: 'GB', system: 'other', factor: 1e9, wikipediaUrl: 'https://en.wikipedia.org/wiki/Gigabyte' },
      { id: 'tb', name: 'terabyte (decimal)', symbol: 'TB', system: 'other', factor: 1e12, wikipediaUrl: 'https://en.wikipedia.org/wiki/Terabyte' },
      { id: 'pb', name: 'petabyte (decimal)', symbol: 'PB', system: 'other', factor: 1e15, wikipediaUrl: 'https://en.wikipedia.org/wiki/Petabyte' },
      { id: 'kib', name: 'kibibyte (binary)', symbol: 'KiB', system: 'other', factor: 1024, wikipediaUrl: 'https://en.wikipedia.org/wiki/Kibibyte' },
      { id: 'mib', name: 'mebibyte (binary)', symbol: 'MiB', system: 'other', factor: 1048576, wikipediaUrl: 'https://en.wikipedia.org/wiki/Mebibyte' },
      { id: 'gib', name: 'gibibyte (binary)', symbol: 'GiB', system: 'other', factor: 1073741824, wikipediaUrl: 'https://en.wikipedia.org/wiki/Gibibyte' },
      { id: 'tib', name: 'tebibyte (binary)', symbol: 'TiB', system: 'other', factor: 1099511627776, wikipediaUrl: 'https://en.wikipedia.org/wiki/Tebibyte' },
    ],
  },
  // -------------------------------------------------------------- DATA RATE
  {
    id: 'datarate', name: 'Data rate', symbol: '', category: 'Data & information', baseSymbol: 'bit/s',
    units: [
      { id: 'bps', name: 'bit per second', symbol: 'bit/s', system: 'other', factor: 1, wikipediaUrl: 'https://en.wikipedia.org/wiki/Data_rate_units' },
      { id: 'kbps', name: 'kilobit per second', symbol: 'kbit/s', system: 'other', factor: 1e3, wikipediaUrl: 'https://en.wikipedia.org/wiki/Data_rate_units' },
      { id: 'mbps', name: 'megabit per second', symbol: 'Mbit/s', system: 'other', factor: 1e6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Data_rate_units' },
      { id: 'gbps', name: 'gigabit per second', symbol: 'Gbit/s', system: 'other', factor: 1e9, wikipediaUrl: 'https://en.wikipedia.org/wiki/Data_rate_units' },
      { id: 'Bps', name: 'byte per second', symbol: 'B/s', system: 'other', factor: 8, wikipediaUrl: 'https://en.wikipedia.org/wiki/Data_rate_units' },
      { id: 'kBps', name: 'kilobyte per second', symbol: 'kB/s', system: 'other', factor: 8e3, wikipediaUrl: 'https://en.wikipedia.org/wiki/Data_rate_units' },
      { id: 'mBps', name: 'megabyte per second', symbol: 'MB/s', system: 'other', factor: 8e6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Data_rate_units' },
    ],
  },
  // ---------------------------------------------------------------- DENSITY
  {
    id: 'density', name: 'Density', symbol: 'ρ', category: 'Density & concentration', baseSymbol: 'kg/m³',
    units: [
      { id: 'kgm3', name: 'kilogram per cubic metre', symbol: 'kg/m³', system: 'si', factor: 1, wikipediaUrl: 'https://en.wikipedia.org/wiki/Kilogram_per_cubic_metre' },
      { id: 'gcm3', name: 'gram per cubic centimetre', symbol: 'g/cm³', system: 'metric', factor: 1000, wikipediaUrl: 'https://en.wikipedia.org/wiki/Gram_per_cubic_centimetre' },
      { id: 'gml', name: 'gram per millilitre', symbol: 'g/mL', system: 'metric', factor: 1000, wikipediaUrl: 'https://en.wikipedia.org/wiki/Gram_per_millilitre' },
      { id: 'lbft3', name: 'pound per cubic foot', symbol: 'lb/ft³', system: 'imperial', factor: 16.018463373960138, wikipediaUrl: 'https://en.wikipedia.org/wiki/Pound_per_cubic_foot' },
      { id: 'lbin3', name: 'pound per cubic inch', symbol: 'lb/in³', system: 'imperial', factor: 27679.904710203125, wikipediaUrl: 'https://en.wikipedia.org/wiki/Pound_per_cubic_inch' },
    ],
  },
  // -------------------------------------------------------- ELECTRIC CURRENT
  {
    id: 'current', name: 'Electric current', symbol: 'I', category: 'Electricity & magnetism', baseSymbol: 'A',
    units: [
      { id: 'ua', name: 'microampere', symbol: 'µA', system: 'si', factor: 1e-6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Ampere' },
      { id: 'ma', name: 'milliampere', symbol: 'mA', system: 'si', factor: 1e-3, wikipediaUrl: 'https://en.wikipedia.org/wiki/Ampere' },
      { id: 'a', name: 'ampere', symbol: 'A', system: 'si', factor: 1, wikipediaUrl: 'https://en.wikipedia.org/wiki/Ampere' },
      { id: 'ka', name: 'kiloampere', symbol: 'kA', system: 'si', factor: 1e3, wikipediaUrl: 'https://en.wikipedia.org/wiki/Ampere' },
    ],
  },
  // ---------------------------------------------------------------- VOLTAGE
  {
    id: 'voltage', name: 'Voltage', symbol: 'V', category: 'Electricity & magnetism', baseSymbol: 'V',
    units: [
      { id: 'uv', name: 'microvolt', symbol: 'µV', system: 'si', factor: 1e-6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Volt' },
      { id: 'mv', name: 'millivolt', symbol: 'mV', system: 'si', factor: 1e-3, wikipediaUrl: 'https://en.wikipedia.org/wiki/Volt' },
      { id: 'v', name: 'volt', symbol: 'V', system: 'si', factor: 1, wikipediaUrl: 'https://en.wikipedia.org/wiki/Volt' },
      { id: 'kv', name: 'kilovolt', symbol: 'kV', system: 'si', factor: 1e3, wikipediaUrl: 'https://en.wikipedia.org/wiki/Volt' },
      { id: 'megv', name: 'megavolt', symbol: 'MV', system: 'si', factor: 1e6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Volt' },
    ],
  },
  // ------------------------------------------------------------- RESISTANCE
  {
    id: 'resistance', name: 'Resistance', symbol: 'R', category: 'Electricity & magnetism', baseSymbol: 'Ω',
    units: [
      { id: 'mohm', name: 'milliohm', symbol: 'mΩ', system: 'si', factor: 1e-3, wikipediaUrl: 'https://en.wikipedia.org/wiki/Ohm' },
      { id: 'ohm', name: 'ohm', symbol: 'Ω', system: 'si', factor: 1, wikipediaUrl: 'https://en.wikipedia.org/wiki/Ohm' },
      { id: 'kohm', name: 'kilohm', symbol: 'kΩ', system: 'si', factor: 1e3, wikipediaUrl: 'https://en.wikipedia.org/wiki/Ohm' },
      { id: 'megohm', name: 'megohm', symbol: 'MΩ', system: 'si', factor: 1e6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Ohm' },
    ],
  },
  // ------------------------------------------------------------ CAPACITANCE
  {
    id: 'capacitance', name: 'Capacitance', symbol: 'C', category: 'Electricity & magnetism', baseSymbol: 'F',
    units: [
      { id: 'pf', name: 'picofarad', symbol: 'pF', system: 'si', factor: 1e-12, wikipediaUrl: 'https://en.wikipedia.org/wiki/Farad' },
      { id: 'nf', name: 'nanofarad', symbol: 'nF', system: 'si', factor: 1e-9, wikipediaUrl: 'https://en.wikipedia.org/wiki/Farad' },
      { id: 'uf', name: 'microfarad', symbol: 'µF', system: 'si', factor: 1e-6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Farad' },
      { id: 'mf', name: 'millifarad', symbol: 'mF', system: 'si', factor: 1e-3, wikipediaUrl: 'https://en.wikipedia.org/wiki/Farad' },
      { id: 'f_cap', name: 'farad', symbol: 'F', system: 'si', factor: 1, wikipediaUrl: 'https://en.wikipedia.org/wiki/Farad' },
    ],
  },
  // --------------------------------------------------------- AMOUNT OF SUBST.
  {
    id: 'amount', name: 'Amount of substance', symbol: 'n', category: 'Density & concentration', baseSymbol: 'mol',
    units: [
      { id: 'umol', name: 'micromole', symbol: 'µmol', system: 'si', factor: 1e-6, wikipediaUrl: 'https://en.wikipedia.org/wiki/Mole_(unit)' },
      { id: 'mmol', name: 'millimole', symbol: 'mmol', system: 'si', factor: 1e-3, wikipediaUrl: 'https://en.wikipedia.org/wiki/Mole_(unit)' },
      { id: 'mol', name: 'mole', symbol: 'mol', system: 'si', factor: 1, wikipediaUrl: 'https://en.wikipedia.org/wiki/Mole_(unit)' },
      { id: 'kmol', name: 'kilomole', symbol: 'kmol', system: 'si', factor: 1e3, wikipediaUrl: 'https://en.wikipedia.org/wiki/Mole_(unit)' },
    ],
  },
];

export const CATEGORY_INFO: Record<string, string> = {
  'Length & area':
    'Length is the one-dimensional extent of an object; area is the two-dimensional surface it covers. ' +
    'The SI unit of length is the metre (m) and area is measured in square metres (m²). ' +
    'A key gotcha: squaring the unit squares the scale — 1 km² contains 1,000,000 m², not 1,000.',
  'Mass & force':
    'Mass is the amount of matter in an object (kg) and never changes wherever you go. ' +
    'Weight is the gravitational force acting on that mass (newtons) and varies with location. ' +
    'On the Moon you weigh about six times less but your mass is identical. ' +
    'One newton is roughly the force needed to hold a medium-sized apple against Earth\'s gravity.',
  'Volume & capacity':
    'Volume measures the three-dimensional space something occupies. One litre equals one cubic decimetre (dm³). ' +
    'US and imperial gallons are not the same: a US gallon is 3.785 L while an imperial gallon is 4.546 L — ' +
    'about 20% larger. Always check which system a recipe or fuel figure uses.',
  'Speed & acceleration':
    'Speed is the rate of change of position; velocity adds a direction to that rate. ' +
    'Acceleration is how quickly velocity changes. ' +
    'Standard gravity (g ≈ 9.81 m/s²) is the acceleration felt in free fall near Earth\'s surface ' +
    'and is a handy benchmark for comparing forces on the human body (e.g. fighter pilots pull 9g in tight turns).',
  'Pressure & stress':
    'Pressure is force spread over an area (P = F / A). One pascal (Pa) is tiny — just 1 N/m². ' +
    'Atmospheric pressure at sea level is about 101,325 Pa (1 atm), which is why weather reports use hPa or mbar. ' +
    'Car tyres are typically inflated to 2–3 bar (29–44 psi). Blood pressure is measured in mmHg.',
  'Energy, work & power':
    'Energy is the capacity to do work; power is how quickly that work is done (1 W = 1 J/s). ' +
    'A dietary calorie (kcal) is 4,184 joules — enough to raise 1 litre of water by 1 °C. ' +
    'A 60 W bulb consumes 60 joules every second. Running a 1 kW kettle for an hour uses 1 kWh, ' +
    'roughly the same energy as cycling 20 km.',
  'Temperature':
    'Celsius sets 0 °C at water\'s freezing point; Fahrenheit sets 32 °F there. ' +
    'Kelvin uses the same degree size as Celsius but starts at absolute zero (−273.15 °C), ' +
    'the theoretical coldest possible temperature — so negative kelvin values don\'t exist. ' +
    'Quick rule of thumb: °F ≈ °C × 1.8 + 32.',
  'Time & frequency':
    'Time is the SI base unit (second, s). Frequency counts repeating events per second — 1 hertz (Hz) is one cycle per second. ' +
    'Human hearing spans roughly 20 Hz to 20,000 Hz. ' +
    'Your Wi-Fi radio operates at 2.4 GHz or 5 GHz — billions of electromagnetic oscillations every second.',
  'Angle':
    'A full rotation equals 2π radians, 360°, or 400 gradians. Radians are the SI unit and simplify ' +
    'calculus formulas: arc length = radius × angle (in radians). ' +
    'Arcminutes (1/60°) and arcseconds (1/3600°) appear in astronomy and navigation. ' +
    'The full Moon spans about 30 arcminutes as seen from Earth.',
  'Data & information':
    'All digital data is built from bits (0 or 1); 8 bits form one byte. ' +
    'Decimal prefixes (kB, MB, GB) use powers of 1,000 per the SI convention; ' +
    'binary prefixes (KiB, MiB, GiB) use powers of 1,024. ' +
    'A “1 TB” drive holds 1,000,000,000,000 bytes, but your OS may display it as ~931 GiB because it counts in binary.',
  'Density & concentration':
    'Density is mass per unit volume (ρ = m / V). Water\'s density is 1,000 kg/m³ (1 g/cm³) — ' +
    'a convenient benchmark: objects denser than water sink, lighter ones float. ' +
    'The mole is the SI unit for amount of substance: one mole contains exactly 6.022 × 10²³ particles ' +
    '(Avogadro\'s number), letting chemists count atoms by weighing them.',
  'Electricity & magnetism':
    'Current (ampere, A) measures how much charge flows per second; voltage (volt, V) is the electrical ' +
    '“pressure” that drives it; resistance (ohm, Ω) opposes the flow — linked by Ohm\'s law: V = I × R. ' +
    'Capacitance (farad, F) measures charge stored per volt. A single farad is huge; ' +
    'real components are typically in the microfarad (µF) or picofarad (pF) range.',
};

export const SI_PREFIXES: SiPrefix[] = [
  { name: 'yotta', symbol: 'Y', exponent: 24 },
  { name: 'zetta', symbol: 'Z', exponent: 21 },
  { name: 'exa', symbol: 'E', exponent: 18 },
  { name: 'peta', symbol: 'P', exponent: 15 },
  { name: 'tera', symbol: 'T', exponent: 12 },
  { name: 'giga', symbol: 'G', exponent: 9 },
  { name: 'mega', symbol: 'M', exponent: 6 },
  { name: 'kilo', symbol: 'k', exponent: 3 },
  { name: 'hecto', symbol: 'h', exponent: 2 },
  { name: 'deca', symbol: 'da', exponent: 1 },
  { name: '(base)', symbol: '', exponent: 0 },
  { name: 'deci', symbol: 'd', exponent: -1 },
  { name: 'centi', symbol: 'c', exponent: -2 },
  { name: 'milli', symbol: 'm', exponent: -3 },
  { name: 'micro', symbol: 'µ', exponent: -6 },
  { name: 'nano', symbol: 'n', exponent: -9 },
  { name: 'pico', symbol: 'p', exponent: -12 },
  { name: 'femto', symbol: 'f', exponent: -15 },
  { name: 'atto', symbol: 'a', exponent: -18 },
  { name: 'zepto', symbol: 'z', exponent: -21 },
  { name: 'yocto', symbol: 'y', exponent: -24 },
];

export const FORMULAS: Formula[] = [
  {
    name: 'Newton’s second law', expression: 'F = m · a', area: 'Mechanics',
    description: 'The net force on a body equals its mass times its acceleration.',
    variables: [
      { sym: 'F', meaning: 'force', unit: 'N' },
      { sym: 'm', meaning: 'mass', unit: 'kg' },
      { sym: 'a', meaning: 'acceleration', unit: 'm/s²' },
    ],
  },
  {
    name: 'Weight', expression: 'W = m · g', area: 'Mechanics',
    description: 'Weight is the gravitational force on a mass (g ≈ 9.81 m/s²).',
    variables: [
      { sym: 'W', meaning: 'weight (force)', unit: 'N' },
      { sym: 'm', meaning: 'mass', unit: 'kg' },
      { sym: 'g', meaning: 'gravitational acceleration', unit: 'm/s²' },
    ],
  },
  {
    name: 'Pressure', expression: 'P = F / A', area: 'Mechanics',
    description: 'Pressure is force distributed over an area.',
    variables: [
      { sym: 'P', meaning: 'pressure', unit: 'Pa' },
      { sym: 'F', meaning: 'force', unit: 'N' },
      { sym: 'A', meaning: 'area', unit: 'm²' },
    ],
  },
  {
    name: 'Work', expression: 'W = F · d', area: 'Mechanics',
    description: 'Work done by a constant force over a displacement.',
    variables: [
      { sym: 'W', meaning: 'work', unit: 'J' },
      { sym: 'F', meaning: 'force', unit: 'N' },
      { sym: 'd', meaning: 'displacement', unit: 'm' },
    ],
  },
  {
    name: 'Power', expression: 'P = W / t', area: 'Mechanics',
    description: 'Power is the rate of doing work or transferring energy.',
    variables: [
      { sym: 'P', meaning: 'power', unit: 'W' },
      { sym: 'W', meaning: 'work / energy', unit: 'J' },
      { sym: 't', meaning: 'time', unit: 's' },
    ],
  },
  {
    name: 'Kinetic energy', expression: 'Eₖ = ½ · m · v²', area: 'Mechanics',
    description: 'Energy a body possesses due to its motion.',
    variables: [
      { sym: 'Eₖ', meaning: 'kinetic energy', unit: 'J' },
      { sym: 'm', meaning: 'mass', unit: 'kg' },
      { sym: 'v', meaning: 'speed', unit: 'm/s' },
    ],
  },
  {
    name: 'Gravitational potential energy', expression: 'Eₚ = m · g · h', area: 'Mechanics',
    description: 'Energy stored due to height in a gravitational field.',
    variables: [
      { sym: 'Eₚ', meaning: 'potential energy', unit: 'J' },
      { sym: 'm', meaning: 'mass', unit: 'kg' },
      { sym: 'g', meaning: 'gravitational acceleration', unit: 'm/s²' },
      { sym: 'h', meaning: 'height', unit: 'm' },
    ],
  },
  {
    name: 'Momentum', expression: 'p = m · v', area: 'Mechanics',
    description: 'Linear momentum of a moving body.',
    variables: [
      { sym: 'p', meaning: 'momentum', unit: 'kg·m/s' },
      { sym: 'm', meaning: 'mass', unit: 'kg' },
      { sym: 'v', meaning: 'velocity', unit: 'm/s' },
    ],
  },
  {
    name: 'Density', expression: 'ρ = m / V', area: 'Materials',
    description: 'Mass contained per unit of volume.',
    variables: [
      { sym: 'ρ', meaning: 'density', unit: 'kg/m³' },
      { sym: 'm', meaning: 'mass', unit: 'kg' },
      { sym: 'V', meaning: 'volume', unit: 'm³' },
    ],
  },
  {
    name: 'Average speed', expression: 'v = d / t', area: 'Kinematics',
    description: 'Distance travelled per unit time.',
    variables: [
      { sym: 'v', meaning: 'speed', unit: 'm/s' },
      { sym: 'd', meaning: 'distance', unit: 'm' },
      { sym: 't', meaning: 'time', unit: 's' },
    ],
  },
  {
    name: 'Acceleration', expression: 'a = Δv / Δt', area: 'Kinematics',
    description: 'Rate of change of velocity over time.',
    variables: [
      { sym: 'a', meaning: 'acceleration', unit: 'm/s²' },
      { sym: 'Δv', meaning: 'change in velocity', unit: 'm/s' },
      { sym: 'Δt', meaning: 'change in time', unit: 's' },
    ],
  },
  {
    name: 'Ohm’s law', expression: 'V = I · R', area: 'Electricity',
    description: 'Voltage across a resistor equals current times resistance.',
    variables: [
      { sym: 'V', meaning: 'voltage', unit: 'V' },
      { sym: 'I', meaning: 'current', unit: 'A' },
      { sym: 'R', meaning: 'resistance', unit: 'Ω' },
    ],
  },
  {
    name: 'Electrical power', expression: 'P = V · I', area: 'Electricity',
    description: 'Power dissipated by an electrical component.',
    variables: [
      { sym: 'P', meaning: 'power', unit: 'W' },
      { sym: 'V', meaning: 'voltage', unit: 'V' },
      { sym: 'I', meaning: 'current', unit: 'A' },
    ],
  },
  {
    name: 'Electric charge', expression: 'Q = I · t', area: 'Electricity',
    description: 'Charge transferred by a steady current over time.',
    variables: [
      { sym: 'Q', meaning: 'charge', unit: 'C' },
      { sym: 'I', meaning: 'current', unit: 'A' },
      { sym: 't', meaning: 'time', unit: 's' },
    ],
  },
  {
    name: 'Wave speed', expression: 'v = f · λ', area: 'Waves',
    description: 'A wave’s speed equals its frequency times its wavelength.',
    variables: [
      { sym: 'v', meaning: 'wave speed', unit: 'm/s' },
      { sym: 'f', meaning: 'frequency', unit: 'Hz' },
      { sym: 'λ', meaning: 'wavelength', unit: 'm' },
    ],
  },
  {
    name: 'Frequency & period', expression: 'f = 1 / T', area: 'Waves',
    description: 'Frequency is the reciprocal of the period.',
    variables: [
      { sym: 'f', meaning: 'frequency', unit: 'Hz' },
      { sym: 'T', meaning: 'period', unit: 's' },
    ],
  },
  {
    name: 'Heat energy', expression: 'Q = m · c · ΔT', area: 'Thermodynamics',
    description: 'Heat to change a mass’s temperature by ΔT (c = specific heat).',
    variables: [
      { sym: 'Q', meaning: 'heat energy', unit: 'J' },
      { sym: 'm', meaning: 'mass', unit: 'kg' },
      { sym: 'c', meaning: 'specific heat capacity', unit: 'J/(kg·K)' },
      { sym: 'ΔT', meaning: 'temperature change', unit: 'K' },
    ],
  },
  {
    name: 'Ideal gas law', expression: 'P · V = n · R · T', area: 'Thermodynamics',
    description: 'Relates pressure, volume, amount and temperature of an ideal gas.',
    variables: [
      { sym: 'P', meaning: 'pressure', unit: 'Pa' },
      { sym: 'V', meaning: 'volume', unit: 'm³' },
      { sym: 'n', meaning: 'amount of substance', unit: 'mol' },
      { sym: 'R', meaning: 'gas constant', unit: 'J/(mol·K)' },
      { sym: 'T', meaning: 'temperature', unit: 'K' },
    ],
  },
];
