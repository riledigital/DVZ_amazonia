
const colorFireOrange = '#ff7800';
const colorActiveBlue = 'blue';

export const territoryBoundsStyle = {
  color: '#fff',
  weight: 2,
  fillOpacity: 0,
  strokeOpacity: 0.5,
  dashArray: '10',
  opacity: 0.5
};

export const  territoryBoundsStyleFocus = {
  color: '#50e3eb',
  weight: 2,
  fillOpacity: 0,
  strokeOpacity: .8,
  dashArray: '10',
  opacity: 1
};

export const  amazonLegalBoundsStyle = {
  color: '#FFE000',
  weight: 4,
  fillOpacity: 0,
  strokeOpacity: 1,
  opacity: 1
};

export const  styleActiveYear = {
  radius: 2,
  fillColor: colorActiveBlue,
  color: colorActiveBlue,
  weight: 0,
  opacity: 1,
  fillOpacity: 1,
  preferCanvas: true
  // renderer: L.Canvas
};

export const  styleInactiveYear = {
  radius: 2,
  fillColor: colorFireOrange,
  color: colorFireOrange,
  weight: 0,
  opacity: 0.5,
  fillOpacity: 0.5,
  preferCanvas: true
  // renderer: L.Canvas
};