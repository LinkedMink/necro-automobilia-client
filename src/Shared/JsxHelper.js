import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

export const getMenuItems = (options) => {
  const items = [];
  Object.keys(options).forEach(function (key, index) {
    items.push(<MenuItem key={index} value={key}>{options[key]}</MenuItem>);
  });
  return items;
}
