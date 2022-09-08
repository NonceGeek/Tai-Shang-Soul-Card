// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/liaohua/Tai-Shang-Soul-Card/dapp/namecard/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": require('@/pages/landing').default,
    "exact": true
  },
  {
    "path": "/dao",
    "component": require('@/pages/dao').default,
    "exact": true
  },
  {
    "path": "/detail",
    "component": require('@/pages/detail').default,
    "exact": true
  },
  {
    "path": "/field",
    "component": require('@/pages/field').default,
    "exact": true
  },
  {
    "path": "/link",
    "component": require('@/pages/link').default,
    "exact": true
  },
  {
    "path": "/gist",
    "component": require('@/pages/gist').default,
    "exact": true
  },
  {
    "path": "/home",
    "component": require('@/pages/home').default,
    "exact": true
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
